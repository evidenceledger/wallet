import {
  decodeUnsafeJWT,
  gBase64,
  renderAnyCredentialCard,
  signJWT
} from "../chunks/chunk-EYB4XBPC.js";
import "../chunks/chunk-TSJ2HKAF.js";
import "../chunks/chunk-W7NC74ZX.js";

// front/src/pages/AuthenticationRequestPage.js
var MHR = globalThis.MHR;
var gotoPage = MHR.gotoPage;
var goHome = MHR.goHome;
var storage = MHR.storage;
var myerror = globalThis.MHR.storage.myerror;
var mylog = globalThis.MHR.storage.mylog;
var html = MHR.html;
var debug = localStorage.getItem("MHRdebug") == "true";
var viaServer = "https://wallet.mycredential.eu/serverhandler";
var proxyIssuer = true;
MHR.register(
  "AuthenticationRequestPage",
  class extends MHR.AbstractPage {
    WebAuthnSupported = false;
    PlatformAuthenticatorSupported = false;
    constructor(id) {
      super(id);
    }
    /**
     * @param {string} openIdUrl The url for an OID4VP Authentication Request
     */
    async enter(openIdUrl) {
      let html2 = this.html;
      proxyIssuer = localStorage.getItem("proxyIssuer") == "true";
      if (debug) {
        alert(`SelectCredential: ${openIdUrl}`);
      }
      mylog("Inside AuthenticationRequestPage:", openIdUrl);
      if (openIdUrl == null) {
        myerror("No URL has been specified");
        this.showError("Error", "No URL has been specified");
        return;
      }
      if (globalThis.PublicKeyCredential) {
        console.log("WebAuthn is supported");
        this.WebAuthnSupported = true;
        let available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (available) {
          this.PlatformAuthenticatorSupported = true;
        }
      } else {
        console.log("WebAuthn NOT supported");
      }
      openIdUrl = openIdUrl.replace("openid4vp://?", "https://wallet.example.com/?");
      const inputURL = new URL(openIdUrl);
      if (debug) {
        alert(inputURL);
      }
      const params = new URLSearchParams(inputURL.search);
      var request_uri = params.get("request_uri");
      if (!request_uri) {
        gotoPage("ErrorPage", {
          title: "Error",
          msg: "'request_uri' parameter not found in URL"
        });
        return;
      }
      request_uri = decodeURIComponent(request_uri);
      if (debug) {
        alert(request_uri);
      }
      const authRequestJWT = await getAuthRequest(request_uri);
      if (!authRequestJWT) {
        mylog("authRequest is null, aborting");
        return;
      }
      if (authRequestJWT == "error") {
        alert("checking error after getAuthRequestDelegated");
        this.showError("Error", "Error fetching Authorization Request");
        return;
      }
      console.log(authRequestJWT);
      if (debug) {
        this.displayAR(authRequestJWT);
      } else {
        await this.displayCredentials(authRequestJWT);
      }
      return;
    }
    /**
     * Displays the Authentication Request (AR) details on the UI, for debugging purposes
     *
     * @param {string} authRequestJWT - The JWT containing the Authentication Request.
     * @returns {<void>}
     */
    displayAR(authRequestJWT) {
      let html2 = this.html;
      const authRequest = decodeUnsafeJWT(authRequestJWT);
      mylog("Decoded authRequest", authRequest);
      var ar = authRequest.body;
      let theHtml = html2`
            <div class="margin-small text-small">
               <p><b>client_id: </b>${ar.client_id}</p>
               <p><b>client_id_scheme: </b>${ar.client_id_schemne}</p>
               <p><b>response_uri: </b>${ar.response_uri}</p>
               <p><b>response_type: </b>${ar.response_type}</p>
               <p><b>response_mode: </b>${ar.response_mode}</p>
               <p><b>nonce: </b>${ar.nonce}</p>
               <p><b>state: </b>${ar.state}</p>
               <p><b>scope: </b>${ar.scope}</p>

               <div class="ion-margin-start ion-margin-bottom">
                  <ion-button @click=${() => this.displayCredentials(authRequestJWT)}
                     >Continue
                  </ion-button>
               </div>
            </div>
         `;
      this.render(theHtml);
    }
    /**
     * Displays the credentials that the user has in the Wallet and that match the requested type in the AR.
     * The user must select the one he wants to send to the Verifier, or cancel the operation
     *
     * @param {string} authRequestJWT - The JWT containing the Authentication Request.
     * @returns {Promise<void>} A promise that resolves when the list of credentials are rendered.
     */
    async displayCredentials(authRequestJWT) {
      const authRequest = decodeUnsafeJWT(authRequestJWT);
      mylog("Decoded authRequest", authRequest);
      var ar = authRequest.body;
      var rpURL = new URL(ar.response_uri);
      mylog("rpURL", rpURL);
      var rpDomain = rpURL.hostname;
      var credStructs = await storage.credentialsGetAllRecent();
      if (!credStructs) {
        let theHtml2 = html`
               <div class="w3-panel w3-margin w3-card w3-center w3-round color-error">
                  <p>You do not have a Verifiable Credential.</p>
                  <p>Please go to an Issuer to obtain one.</p>
               </div>
            `;
        this.render(theHtml2);
        return;
      }
      const scopeParts = ar.scope.split(".");
      if (scopeParts.length == 0) {
        myerror("Invalid scope specified");
        this.showError("Error", "Invalid scope specified");
        return;
      }
      const displayCredType = scopeParts[scopeParts.length - 1];
      var credentials = [];
      for (const cc of credStructs) {
        const vc = cc.decoded;
        mylog(vc);
        const vctype = vc.type;
        mylog("vctype:", vctype);
        if (vctype.includes(displayCredType)) {
          mylog("adding credential");
          credentials.push(cc);
        }
      }
      if (credentials.length == 0) {
        var msg = html`
               <p>
                  <b>${rpDomain}</b> has requested a Verifiable Credential of type
                  ${displayCredType}, but you do not have any credential of that type.
               </p>
               <p>Please go to an Issuer to obtain one.</p>
            `;
        this.showError("Error", msg);
        return;
      }
      let theHtml = html`
            <ion-card color="warning">
               <ion-card-header>
                  <ion-card-title>Authentication Request</ion-card-title>
               </ion-card-header>
               <ion-card-content>
                  <b>${rpDomain}</b> has requested a Verifiable Credential of type
                  ${displayCredType}. Use one of the credentials below to authenticate.
               </ion-card-content>
            </ion-card>

            ${credentials.map(
        (cred) => html`${this.vcToHtml(
          cred,
          ar.nonce,
          ar.response_uri,
          ar.state,
          this.WebAuthnSupported
        )}`
      )}
         `;
      this.render(theHtml);
    }
    // Render the credential with buttons so the user can select it for authentication
    vcToHtml(cc, nonce, response_uri, state, webAuthnSupported) {
      mylog("in VCToHTML");
      const vc = cc.decoded;
      mylog(vc);
      const holder = vc.credentialSubject?.mandate?.mandatee?.id;
      mylog("holder:", holder);
      var credentials = [cc.encoded];
      const div = html`
            <ion-card>
               ${renderAnyCredentialCard(vc)}

               <div class="ion-margin-start ion-margin-bottom">
                  <ion-button @click=${() => MHR.cleanReload()}>
                     <ion-icon slot="start" name="chevron-back"></ion-icon>
                     ${T("Cancel")}
                  </ion-button>

                  <ion-button
                     @click=${(e) => this.sendAuthenticationResponse(
        e,
        holder,
        response_uri,
        credentials,
        state,
        nonce,
        webAuthnSupported
      )}
                  >
                     <ion-icon slot="start" name="paper-plane"></ion-icon>
                     ${T("Send Credential")}
                  </ion-button>
               </div>
            </ion-card>
         `;
      return div;
    }
    // sendAuthenticationResponse prepares an Authentication Response and sends it to the server as specified in the endpoint
    async sendAuthenticationResponse(e, holder, response_uri, credentials, state, nonce, webAuthnSupported) {
      e.preventDefault();
      debugger;
      var domedid = localStorage.getItem("domedid");
      domedid = JSON.parse(domedid);
      const endpointURL = new URL(response_uri);
      const origin = endpointURL.origin;
      mylog("sending AuthenticationResponse to:", response_uri);
      const uuid = globalThis.crypto.randomUUID();
      const now = Math.floor(Date.now() / 1e3);
      const didIdentifier = holder.substring("did:key:".length);
      var jwtHeaders = {
        kid: holder + "#" + didIdentifier,
        typ: "JWT",
        alg: "ES256"
      };
      var vpClaim = {
        context: ["https://www.w3.org/ns/credentials/v2"],
        type: ["VerifiablePresentation"],
        id: uuid,
        verifiableCredential: credentials,
        holder
      };
      var vp_token_payload = {
        jti: uuid,
        sub: holder,
        aud: "https://self-issued.me/v2",
        iat: now,
        nbf: now,
        exp: now + 480,
        iss: holder,
        nonce,
        vp: vpClaim
      };
      const jwt = await signJWT(jwtHeaders, vp_token_payload, domedid.privateKey);
      const vp_token = gBase64.encodeURI(jwt);
      mylog("The encoded vpToken ", vp_token);
      var formBody = "vp_token=" + vp_token + "&state=" + state;
      mylog(formBody);
      debugger;
      try {
        const response = await doPOST(
          response_uri,
          formBody,
          "application/x-www-form-urlencoded"
        );
        await gotoPage("AuthenticationResponseSuccess");
      } catch (error) {
        myerror(error);
        this.showError("Error authenticating", error.message);
      }
      return;
    }
  }
);
window.MHR.register(
  "AuthenticationResponseSuccess",
  class extends window.MHR.AbstractPage {
    constructor(id) {
      super(id);
    }
    enter(pageData) {
      let html2 = this.html;
      let theHtml = html2`
            <ion-card>
               <ion-card-header>
                  <ion-card-title>Authentication success</ion-card-title>
               </ion-card-header>

               <ion-card-content class="ion-padding-bottom">
                  <div class="text-larger">The authentication process has been completed</div>
               </ion-card-content>

               <div class="ion-margin-start ion-margin-bottom">
                  <ion-button @click=${() => window.MHR.cleanReload()}>
                     <ion-icon slot="start" name="home"></ion-icon>
                     ${T("Home")}
                  </ion-button>
               </div>
            </ion-card>
         `;
      this.render(theHtml);
    }
  }
);
async function getAuthRequest(uri) {
  mylog("Fetching AuthReq from", uri);
  var response = await fetch(uri);
  if (!response.ok) {
    var errorText = await response.text();
    myerror(errorText);
    throw Error("Error fetching Authorization Request: " + errorText);
  }
  var responseText = await response.text();
  return responseText;
}
async function doPOST(serverURL, body, mimetype = "application/json", authorization) {
  debugger;
  if (!serverURL) {
    throw new Error("No serverURL");
  }
  var response;
  if (proxyIssuer) {
    let forwardBody = {
      method: "POST",
      url: serverURL,
      mimetype,
      body
    };
    if (authorization) {
      forwardBody["authorization"] = authorization;
    }
    response = await fetch(viaServer, {
      method: "POST",
      body: JSON.stringify(forwardBody),
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-cache"
    });
  } else {
    response = await fetch(serverURL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": mimetype
      },
      cache: "no-cache"
    });
  }
  console.log(response);
  if (response.ok) {
    try {
      var responseJSON = await response.json();
      console.log(responseJSON);
      mylog(`doPOST ${serverURL}:`, responseJSON);
      return responseJSON;
    } catch (error) {
      return;
    }
  } else if (response.status == 401) {
    throw new Error("Unauthorized");
  } else {
    myerror(`Error in request to server (${serverURL}): ${response.statusText}`, body);
    throw new Error("Error in request to server");
  }
}
//# sourceMappingURL=AuthenticationRequestPage-GTAJZBAX.js.map
