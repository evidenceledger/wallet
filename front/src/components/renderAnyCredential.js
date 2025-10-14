// The logo in the header
import photo_man from "../img/photo_man.png";
import photo_woman from "../img/photo_woman.png";
import avatar from "../img/logo.png";

// Setup some local variables for convenience
var html = window.eudi.html;
let myerror = window.eudi.myerror;
let mylog = window.eudi.mylog;

/**
 * renderAnyCredentialCard creates the HTML rendering the credential as a Card.
 * The result can be embedded in other HTML for presenting the credential.
 * The minimum requirement is that the credential has a 'type' field according to the W3C VC spec.
 *
 * @param {JSONObject}  vc - The Verifiable Credential, in JSON format.
 * @param {string}  status - One of 'offered', 'tobesigned' or 'signed'.
 * @returns {Tag<HTMLElement>} - The HTML representing the credential
 */
export function renderAnyCredentialCard(vc, status = "signed") {
   var credCard;
   console.log("renderAnyCredentialCard", vc);
   if (vc.vc) {
      vc = vc.vc;
   }
   const vctypes = vc.type;

   if (vctypes.includes("LEARCredentialEmployee")) {
      credCard = renderLEARCredentialCard(vc, status);
   } else {
      throw new Error(`credential type unknown: ${vctypes}`);
   }

   return credCard;
}

/**
 * renderLEARCredentialCard creates the HTML rendering the credential as a Card.
 * The result can be embedded in other HTML for presenting the credential.
 *
 * @param {JSONObject}  vc - The Verifiable Credential.
 * @param {string}  status - One of 'offered', 'tobesigned' or 'signed'.
 * @returns {Tag<HTMLElement>} - The HTML representing the credential
 */
export function renderLEARCredentialCard(vc, status) {
   mylog("renderLEARCredentialCard with:", status, vc);

   // TODO: perform some verifications to make sure the credential is a LEARCredential
   const vctypes = vc.type;
   if (vctypes.indexOf("LEARCredentialEmployee") == -1) {
      throw new Error("renderLEARCredentialCard: credential is not of type LEARCredentialEmployee");
   }

   const vcs = vc.credentialSubject;
   if (!vcs) {
      throw new Error("renderLEARCredentialCard: credentialSubject does not exist");
   }
   if (!vcs.mandate) {
      throw new Error("renderLEARCredentialCard: mandate object does not exist");
   }
   if (!vcs.mandate.mandator) {
      throw new Error("renderLEARCredentialCard: mandator data does not exist");
   }
   if (!vcs.mandate.mandatee) {
      throw new Error("renderLEARCredentialCard: mandatee data does not exist");
   }
   if (!vcs.mandate.power) {
      throw new Error("renderLEARCredentialCard: power data does not exist");
   }

   // Get the name of the holder (mandatee)
   // Support legacy credentials (for the moment) with snake case fields
   var first_name = vcs.mandate.mandatee.first_name;
   if (!first_name) {
      first_name = vcs.mandate.mandatee.firstName;
   }
   var last_name = vcs.mandate.mandatee.last_name;
   if (!last_name) {
      last_name = vcs.mandate.mandatee.lastName;
   }

   var validFrom = vc.validFrom;
   var validUntil = vc.validUntil;
   if (validFrom) {
      validFrom = validFrom.slice(0, 19);
   }
   if (validUntil) {
      validUntil = validUntil.slice(0, 19);
   }

   // The image to appear in the credential
   // TODO: Gender will not be in the credential in the future
   var avatar = photo_man;
   const gender = vcs.mandate.mandatee.gender;
   if (gender && gender.toUpperCase() == "F") {
      avatar = photo_woman;
   }

   // To make it easier for the template to present the powers
   const powers = vcs.mandate.power;

   debugger;

   let renderOnePower = (pow) => {
      let h = eudi.html`
         <ion-label>
            ${pow.domain}
            ${pow.function}
            ${JSON.stringify(pow.action)}
         </ion-label>`;
      return h
   };

   let renderPowers = (powers) => powers.map((pow) => {
      return eudi.html`
         <ion-item>
            ${renderOnePower(pow)}
         </ion-item>`;
   });

   const learCard = eudi.html`
      <ion-card-header>
         <ion-card-title>${first_name} ${last_name}</ion-card-title>
         <ion-card-subtitle>${vcs.mandate.mandator.organization}</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content class="ion-padding-bottom">
         <div>
            <ion-list>
               <ion-item>
                  <ion-thumbnail slot="start">
                     <img alt="Avatar" src=${avatar} />
                  </ion-thumbnail>
                  <ion-label>
                     <table>
                        <tr>
                           <td><b>From:</b></td>
                           <td>${validFrom}</td>
                        </tr>
                        <tr>
                           <td><b>To: </b></td>
                           <td>${validUntil}</td>
                        </tr>
                     </table>
                  </ion-label>
                  ${
                     status != "signed"
                        ? eudi.html`<ion-label color="danger"><b>Status: signature pending</b></ion-label>`
                        : null
                  }
               </ion-item>

               ${renderPowers(powers)}
            </ion-list>
         </div>
      </ion-card-content>
   `;
   return learCard;
}

