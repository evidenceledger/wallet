// @ts-check

/**
 * MicroWallet is the main page of the wallet application.
 * It shows the list of credentials stored in the wallet,
 * and allows the user to scan a QR code to add a new credential or authenticate
 * to a RelyingParty.
 * It is initialised and its `enter` entry point is called automatically by the nano-router
 * when the application is loaded or reloaded.
 */

import { renderAnyCredentialCard } from "../components/aggregated.js";
import { generateDidKeyDOME } from "../components/aggregated.js";
import { verifyJWT, signJWT, decodeUnsafeJWT } from "../components/aggregated.js";
import { createPasskeyRaw, getPasskeyRaw } from "../components/passkeys.js";

// Session timeout in seconds to request reauthentication
const SESSION_TIMEOUT = 60;

// Enable to debug the application
var debug = eudi.debug;

MHR.register(
   "MicroWallet",
   class extends MHR.AbstractPage {
      /**
       * @param {string} id
       */
      constructor(id) {
         super(id);
      }

      async enter() {
         mylog("MicroWallet", globalThis.document.location);

         // Check if we are debugging the application
         debug = localStorage.getItem("MHRdebug") == "true";

         // Set the default state of the proxy issuer server
         if (localStorage.getItem("proxyIssuer") === null) {
            localStorage.setItem("proxyIssuer", "false");
         }

         debugger;

         // Check if the browser supports the PRF extension for Passkeys
         if (window.PublicKeyCredential &&
            typeof PublicKeyCredential.getClientCapabilities === 'function') {
            const caps = await PublicKeyCredential.getClientCapabilities();
            const prfExtension = caps["extension:prf"];
            if (prfExtension === true) {
               console.log("This browser supports the PRF extension.");
            } else {
               console.log("This browser does not support the PRF extension.");
            }
         }

         // We store in localStorage the username for the Wallet user and the last time that the user authenticated
         // We use those items to request from the user either to create a new passkey or to authenticate
         // The first item stored is the username, under the key "username"
         // The second item stored is the last time the user authenticated, under the key "lastAuthenticationTime"

         // Check if we already have the username. If not, this is the first time the user is opening the wallet
         var username = localStorage.getItem("username");
         if (username === null) {
            mylog("no username found, redirecting to CreatePasskeyPage")
            eudi.gotoPage("CreatePasskeyPage");
            return;
         }

         // If we are here is because the user already authenticated at least once (creating a passkey or authenticating)

         // But for sanity reasons, check if we have a passkey stored
         var passkey = localStorage.getItem("thepasskey");
         if (passkey === null) {
            // Reset the passkey info, including the user name and last authentication time
            localStorage.removeItem("username");
            localStorage.removeItem("lastAuthenticationTime");
            localStorage.removeItem("thepasskey");
            mylog("no passkey found, redirecting to CreatePasskeyPage")
            eudi.gotoPage("CreatePasskeyPage");
            return;
         }

         // Retrieve the last time of authentication of the user
         var lastAuthenticationTimeString = localStorage.getItem("lastAuthenticationTime");
         // lastAuthenticationTimeString should not be null, but if it is, we set it to 0 just in case
         if (lastAuthenticationTimeString !== null) {
            console.log("Last time the user authenticated:", lastAuthenticationTimeString);
         } else {
            console.log("No last authentication time found");
            lastAuthenticationTimeString = "0";
         }
         // Convert lastAuthenticationTime which is a number of milliseconds as string to a number
         var lastAuthenticationTime = parseInt(lastAuthenticationTimeString);

         // Compare with the current time and check if it is more than SESSION_TIMEOUT seconds ago
         // If so, reauthenticate the user by redirecting to EnterPasskeyPage
         var currentTime = Date.now();
         const difference = (currentTime - lastAuthenticationTime) / 1000
         console.log("Difference in seconds:", difference);
         if (difference > SESSION_TIMEOUT) {
            console.log("The user authenticated more than " + SESSION_TIMEOUT + " seconds ago");
            eudi.gotoPage("EnterPasskeyPage");
            return;
         }

         // If we reach here, the user is authenticated and the session is valid

         // Generate a did:key if it does not exist yet
         var domedid;
         domedid = localStorage.getItem("domedid");
         if (domedid == null) {
            domedid = await generateDidKeyDOME();
            localStorage.setItem("domedid", JSON.stringify(domedid));
         } else {
            domedid = JSON.parse(domedid);
         }

         mylog("My DID is:", domedid.did);

         let html = this.html;

         // The wallet supports several ways to receive a QR code:
         // 1. Scanning with the camera. The QR is decoded with an image decoding
         //    engine, the type of QR is detected (issuance, authentication, other, ...)
         //    and the appropriate logic in the wallet is invoked.
         // 2. Pasting from the clipboard an image, which the user has captured somehow.
         //    The process of the image is virtually identical to the previous one, with the exception
         //    that the QR code engine is applied to a static image instead of a video stream.
         // 3. As part of the URL used to invoke the wallet. This is a special mechanism which is
         //    tied to the particular URL of the wallet and should be used only in special circumstances.
         //    If the URL specifies a QR then the wallet checks it and stores in local storage. Afterwards
         //    it cleans the URL and reloads the app.

         let params = new URL(globalThis.document.location.href).searchParams;

         // Some verifiers (eg. EBSI), for some authentication flows, use redirections during the flow.
         // We detect that this is the case by checking the URL
         if (document.URL.includes("state=") && document.URL.includes("auth-mock")) {
            mylog("Redirected with state:", document.URL);
            MHR.gotoPage("CredentialIssuance", document.URL);
            return;
         }

         // This is to enable resetting the application by loading a special URL.
         // It always asks permission from the user.
         if (document.URL.includes("reset")) {
            alert("going to reset");
            await window.eudi.storage.resetDatabase();
            // Reload the application
            window.eudi.cleanReload();
            return;
         }

         // There was a redirection with authorization code flow
         if (document.URL.includes("code=")) {
            mylog("Redirected with code:", document.URL);
            MHR.gotoPage("CredentialIssuance", document.URL);
            return;
         }

         // This is an authentication request in the URL. Process and display it
         let scope = params.get("scope");
         if (scope !== null) {
            mylog("detected scope:", scope);
            MHR.gotoPage("AuthenticationRequestPage", { url: document.URL, sameDevice: true });
            return;
         }

         // Authentication Request which has to be retrieved from the passed request_uri
         let request_uri = params.get("request_uri");
         if (request_uri) {
            // Unescape the query parameter
            request_uri = decodeURIComponent(request_uri);
            mylog("MicroWallet request_uri", request_uri);
            MHR.gotoPage("AuthenticationRequestPage", { url: document.URL, sameDevice: true });
            return;
         }

         // Check if we are in a credential issuance scenario
         let credential_offer_uri = params.get("credential_offer_uri");
         if (credential_offer_uri) {
            mylog("MicroWallet credential_offer_uri", credential_offer_uri);
            MHR.gotoPage("CredentialIssuance", document.location.href);
            return;
         }

         // The URL specifies a command
         let command = params.get("command");
         if (command) {
            mylog("MicroWallet command", command);
            switch (command) {
               case "getvc":
                  var vc_id = params.get("vcid");
                  await MHR.gotoPage("CredentialIssuance", vc_id);
                  return;

               default:
                  break;
            }
         }

         // We are here if no recognized URL was passed to the Wallet

         // Retrieve all recent credentials from storage (all for the moment)
         var credentials = await MHR.storage.credentialsGetAllRecent(-1);

         // We always get an array, even if it is empty (no credentials match).
         // Otherwise, it is an error.
         if (!credentials) {
            myerror("Error getting recent credentials: received null array");
            MHR.gotoPage("ErrorPage", {
               title: "Error",
               msg: "Error getting recent credentials",
            });
            return;
         }

         if (debug) {
            mylog(credentials);
         }

         // Pre-render each of the known credentials
         const theDivs = [];

         for (const vcraw of credentials) {
            // We only understand credentials in "jwt_vc" or "jwt_vc_json" format
            if (vcraw.type == "jwt_vc" || vcraw.type == "jwt_vc_json") {
               console.log(vcraw);

               // We use the hash of the credential as its unique ID in this application
               const currentId = vcraw.hash;

               // Get the unencoded payload
               const vc = vcraw.decoded;

               const status = vcraw.status;

               // Generate the HTML representing the credential
               const div = html`
                  <ion-card>
                     ${renderAnyCredentialCard(vc, vcraw.status)}

                     <div class="ion-padding-start ion-padding-end ion-padding-bottom">
                        <ion-button @click=${() => MHR.gotoPage("DisplayVC", vcraw)}>
                           <ion-icon slot="start" name="construct"></ion-icon>
                           ${T("Details")}
                        </ion-button>

                        <ion-button
                           class="ion-float-right"
                           color="danger"
                           @click=${() => this.presentActionSheet(currentId)}
                        >
                           <ion-icon slot="start" name="trash"></ion-icon>
                           ${T("Delete")}
                        </ion-button>
                     </div>
                  </ion-card>
               `;

               theDivs.push(div);
            }
         }

         var theHtml;

         if (theDivs.length > 0) {
            theHtml = html`
               <ion-grid>
                  <ion-row>
                     <ion-col size="6">
                        <ion-card class="scanbutton">
                           <ion-card-content>
                              <h2>Use the camera to authenticate or receive a credential.</h2>
                           </ion-card-content>

                           <div class="ion-margin-start ion-margin-bottom">
                              <ion-button @click=${() => MHR.gotoPage("ScanQrPage")}>
                                 <ion-icon slot="start" name="camera"></ion-icon>
                                 ${T("Scan QR")}
                              </ion-button>
                           </div>
                        </ion-card>
                     </ion-col>
                     <ion-col size="6">
                        <ion-card class="scanbutton">
                           <ion-card-content>
                              <h2>Paste a QR code image you captured from elsewhere.</h2>
                           </ion-card-content>

                           <div class="ion-margin-start ion-margin-bottom">
                              <ion-button @click=${() => pasteImage()}>
                                 <ion-icon slot="start" name="clipboard"></ion-icon>
                                 ${T("Paste QR")}
                              </ion-button>
                           </div>
                        </ion-card>
                     </ion-col>
                  </ion-row>
               </ion-grid>

               ${theDivs}

               <ion-action-sheet id="mw_actionSheet" @ionActionSheetDidDismiss=${(ev) => this.deleteVC(ev)}>
               </ion-action-sheet>
            `;
         } else {
            mylog("No credentials");

            // We do not have a QR in the local storage
            theHtml = html`
               <ion-grid>
                  <ion-row>
                     <ion-col>
                        <div class="text-title ion-text-center ion-padding">The Wallet is empy</div>
                        <div class="text-message ion-padding">
                           You need to obtain a Verifiable Credential from an Issuer, by scanning the QR in
                           the screen of the Issuer page.
                        </div>
                     </ion-col>
                  </ion-row>
                  <ion-row>
                     <ion-col size="6">
                        <ion-card class="scanbutton">
                           <div class="ion-margin-start ion-margin-top">
                              <ion-button @click=${() => MHR.gotoPage("ScanQrPage")}>
                                 <ion-icon slot="start" name="camera"></ion-icon>
                                 ${T("Scan QR")}
                              </ion-button>
                           </div>

                           <ion-card-content>
                              <h2>Use the camera to authenticate or receive a new credential.</h2>
                           </ion-card-content>
                        </ion-card>
                     </ion-col>
                     <ion-col size="6">
                        <ion-card class="scanbutton">
                           <div class="ion-margin-start ion-margin-top">
                              <ion-button @click=${() => pasteImage()}>
                                 <ion-icon slot="start" name="clipboard"></ion-icon>
                                 ${T("Paste QR")}
                              </ion-button>
                           </div>

                           <ion-card-content>
                              <h2>Paste a QR code image you captured from elsewhere in your device.</h2>
                           </ion-card-content>
                        </ion-card>
                     </ion-col>
                  </ion-row>
               </ion-grid>
            `;
         }

         this.render(theHtml, false);
      }

      /**
       * @param {string} currentId
       */
      async presentActionSheet(currentId) {
         const actionSheet = document.getElementById("mw_actionSheet");
         // @ts-ignore
         actionSheet.header = "Confirm to delete credential";
         // @ts-ignore
         actionSheet.buttons = [
            {
               text: "Delete",
               role: "destructive",
               data: {
                  action: "delete",
               },
            },
            {
               text: "Cancel",
               role: "cancel",
               data: {
                  action: "cancel",
               },
            },
         ];

         this.credentialIdToDelete = currentId;
         // @ts-ignore
         await actionSheet.present();
      }

      async deleteVC(ev) {
         // Delete only if event is delete
         if (ev.detail.data) {
            if (ev.detail.data.action == "delete") {
               // Get the credential to delete
               const currentId = this.credentialIdToDelete;
               mylog("deleting credential", currentId);
               await MHR.storage.credentialsDelete(currentId);
               MHR.goHome();
               return;
            }
         }
      }
   }
);

MHR.register(
   "CreatePasskeyPage",
   class extends MHR.AbstractPage {
      /**
       * @param {string} id
       */
      constructor(id) {
         super(id);
      }

      async enter() {
         mylog("CreatePasskeyPage", globalThis.document.location);

         let html = this.html;

         // We have to create a form to let the user enter the user name he wants and then start the passkey creation process
         // The form has to be implemented with the Ionic framework, assuming the skeleton of the app has already been created
         // We create here just the "inner" form/page to inform the user and let the user accept (or cancel) the process
         let theHtml = html`
         <style>
         ion-radio::part(container) {
            width: 30px;
            height: 30px;

            border-radius: 8px;
            border: 2px solid #ddd;
         }

         ion-radio::part(mark) {
            background: none;
            transition: none;
            transform: none;
            border-radius: 0;
         }

         ion-radio.radio-checked::part(container) {
            background: black;
            border-color: transparent;
         }

         ion-radio.radio-checked::part(mark) {
            width: 6px;
            height: 10px;

            border-width: 0px 2px 2px 0px;
            border-style: solid;
            border-color: #fff;

            transform: rotate(45deg);
         }
         </style>

         <div class="ion-padding">
            <div class="ion-text-center ion-padding-bottom">
               <ion-icon name="finger-print-outline" style="font-size: 64px; color: var(--ion-color-primary);"></ion-icon>
               <h2>Create a Passkey</h2>
               <p>It will be used to protect your credentials saved to your device.</p>
            </div>

            <ion-list lines="none">

               <ion-item style="border: 1px solid #ddd; border-radius: 8px;">
                  <ion-icon slot="start" name="person-outline"></ion-icon>
                  <ion-input 
                     id="username-input"
                     label="Enter a name for the passkey" 
                     label-placement="stacked" 
                     placeholder="User name"
                     autofocus
                     helper-text="This name will be used to identify the passkey on your device."
                     required
                  ></ion-input>
               </ion-item>
            </ion-list>

            <p>Select the type of passkey that you want and click continue:</p>

            <ion-list lines="none">

               <ion-radio-group id="radio-group" value="platform">
                  
                  <ion-item class="ion-margin-bottom" style="border: 1px solid #ddd; border-radius: 8px;">
                  <ion-icon slot="start" name="cloud-done-outline"></ion-icon>
                  <ion-label>
                     <h3>On this device (Recommended)</h3>
                     <p>Syncs with your phone and cloud account for easy access.</p>
                  </ion-label>
                  <ion-radio slot="end" value="platform"></ion-radio>
                  </ion-item>

                  <ion-item style="border: 1px solid #ddd; border-radius: 8px;">
                  <ion-icon slot="start" name="key-outline"></ion-icon>
                  <ion-label>
                     <h3>On external security key</h3>
                     <p>Use a physical USB or NFC key for maximum protection.</p>
                  </ion-label>
                  <ion-radio slot="end" value="cross-platform"></ion-radio>
                  </ion-item>

               </ion-radio-group>
            </ion-list>

            <div class="ion-padding-top">
               <ion-button expand="block" shape="round" @click=${() => this.createPasskey()}>
                  Continue
               </ion-button>
            </div>
         </div>
         `;

         this.render(theHtml, false);
      }

      async createPasskey() {
         debugger;
         const usernameInput = document.getElementById("username-input");
         // @ts-ignore
         const username = await usernameInput.getInputElement().then(el => el.value);

         if (!username) {
            alert("Please enter a username");
            return;
         }

         // Generate a local challenge (32 random bytes) as there is no server
         const challenge = window.crypto.getRandomValues(new Uint8Array(32));

         // Generate a deterministic user ID from the username
         const userid = new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(username)));
         const user = { id: userid, name: username, displayName: username }

         // Check what type of passkey to create
         const radioGroup = document.getElementById("radio-group");
         // @ts-ignore
         const selectedValue = radioGroup.value;

         mylog("Creating passkey", challenge, user, selectedValue);

         try {
            const response = await createPasskeyRaw(challenge, user, selectedValue);
            mylog(response);
            debugger
            // Store the username and the last authentication time
            localStorage.setItem("username", username)
            localStorage.setItem("lastAuthenticationTime", Date.now().toString())
         } catch (err) {
            debugger
            alert(err)
            const error = this.handlePasskeyError(err);
            if (error.type == "unknown") {
               alert(err.message)
            } else {
               alert(error.message)
            }
         }

         eudi.cleanReload()

      }

      /**
       * @param {{ name: any; message: any; }} err
       * @returns {{ ok: boolean, type: string, message: string }}
       */
      handlePasskeyError(err) {
         if (!(err instanceof DOMException)) {
            return { ok: false, type: "unknown", message: "Unexpected error" };
         }
         switch (err.name) {
            case "NotAllowedError": return { ok: false, type: "cancel", message: "The operation was cancelled or timed out." };
            case "InvalidStateError": return { ok: false, type: "exists", message: "A passkey for this account already exists." };
            case "SecurityError": return { ok: false, type: "security", message: "Security constraints prevented the operation." };
            case "ConstraintError": return { ok: false, type: "verification", message: "User verification requirements were not met." };
            case "NotSupportedError": return { ok: false, type: "unsupported", message: "Passkeys are not supported on this device." };
            default: return { ok: false, type: "unknown", message: err.message };
         }
      }

      /**
       * @param {any} message
       */
      async showToast(message, color = "danger") {
         // @ts-ignore
         const toast = await window.Ionic.toastController.create({
            message,
            duration: 2500,
            color
         });
         toast.present();
      }

   }
);

MHR.register(
   "EnterPasskeyPage",
   class extends MHR.AbstractPage {
      /**
       * @param {string} id
       */
      constructor(id) {
         super(id);
      }

      async enter() {
         mylog("EnterPasskeyPage", globalThis.document.location);

         let html = this.html;

         let username = localStorage.getItem("username");
         if (!username) {
            alert("No user found");
            return;
         }

         try {
            const credentialResponse = await getPasskeyRaw()
            mylog(credentialResponse)
            // Update in localstorage the current time to record the last time the user authenticated
            localStorage.setItem("lastAuthenticationTime", Date.now().toString());

         } catch (error) {
            mylog(error)
            alert(error.message)
         }

         eudi.cleanReload()

      }
   }
);


function base64ToBytes(base64) {
   const binString = atob(base64);
   return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function atobUrl(input) {
   // Replace non-url compatible chars with base64 standard chars
   input = input.replace(/-/g, "+").replace(/_/g, "/");

   // Decode using the standard Javascript function
   let bstr = decodeURIComponent(escape(atob(input)));

   return bstr;
}

function btoaUrl(input) {
   // Encode using the standard Javascript function
   let astr = btoa(input);

   // Replace non-url compatible chars with base64 standard chars
   astr = astr.replace(/\+/g, "-").replace(/\//g, "_");

   return astr;
}

async function pasteImage() {
   try {
      const clipboardContents = await navigator.clipboard.read();
      for (const item of clipboardContents) {
         // @ts-ignore
         if (!item.types.includes("image/png")) {
            throw new Error("Clipboard does not contain PNG image data.");
         }
         const blob = await item.getType("image/png");
         var destinationImage = URL.createObjectURL(blob);
         const zxing = await import("@zxing/browser");
         const zxingReader = new zxing.BrowserQRCodeReader();
         const resultImage = await zxingReader.decodeFromImageUrl(destinationImage);
         mylog(resultImage.getText());
         detectQRtype(resultImage.getText());
      }
   } catch (error) {
      mylog(error.message);
   }
}

// Try to detect the type of data received
/**
 * @param {string} qrData
 */
function detectQRtype(qrData) {
   if (!qrData || !qrData.startsWith) {
      myerror("detectQRtype: data is not string");
      this.showError("Error", "detectQRtype: data is not string");
      return;
   }

   if (qrData.startsWith("openid4vp:")) {
      // An Authentication Request, for Verifiable Presentation
      mylog("Authentication Request");
      window.MHR.gotoPage("AuthenticationRequestPage", { url: qrData, sameDevice: false });
      return;
   } else if (qrData.startsWith("openid-credential-offer://")) {
      // An OpenID Credential Issuance
      mylog("Credential Issuance");
      // Create a valid URL
      qrData = qrData.replace("openid-credential-offer://", "https://www.example.com/");
      window.MHR.gotoPage("CredentialIssuance", qrData);
      return;
   } else if (qrData.includes("credential_offer_uri=")) {
      mylog("Credential Issuance");
      // Create a valid URL
      qrData = qrData.replace("openid-credential-offer://", "https://www.example.com/");
      window.MHR.gotoPage("CredentialIssuance", qrData);
      return;
   } else if (qrData.startsWith("https")) {
      let params = new URL(qrData).searchParams;
      let jar = params.get("jar");
      if (jar == "yes") {
         mylog("Going to ", "AuthenticationRequestPage", qrData);
         window.MHR.gotoPage("AuthenticationRequestPage", { url: qrData, sameDevice: false });
         return;
      }

      // Normal QR with a URL where the real data is located
      // We require secure connections with https, and do not accept http schemas
      mylog("Going to ", this.displayPage);
      window.MHR.gotoPage(this.displayPage, qrData);
      return true;
   } else {
      myerror("detectQRtype: unrecognized QR code");
      this.showError("Error", "detectQRtype: unrecognized QR code");
      return;
   }
}
