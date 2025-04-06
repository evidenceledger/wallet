import {
  html
} from "../chunks/chunk-THCKPUYZ.js";
import "../chunks/chunk-W7NC74ZX.js";

// front/src/pages/DisplayNormalQR.js
window.MHR.register(
  "DisplayNormalQR",
  class DisplayNormalQR extends window.MHR.AbstractPage {
    constructor(id) {
      super(id);
    }
    // We receive the QR data to process
    enter(qrData) {
      if (qrData == null) {
        qrData = "No data received";
      }
      let isURL = false;
      if (qrData.startsWith("https://") || qrData.startsWith("http://")) {
        isURL = true;
      }
      let theHtml = html`
            <ion-grid>
               <ion-row>
                  <ion-col>
                     <div class="text-title ion-text-center ion-padding">QR code</div>
                     <div class="text-message ion-padding-horizontal">
                        The QR code is not an EUDI Wallet code, but seems a normal one
                        (like in restaurants or ads).
                     </div>
                     <div class="text-message ion-padding-horizontal">
                        You can click on it only if you trust it.
                     </div>
                  </ion-col>
               </ion-row>
               <ion-row>
                  <a href="${qrData}" class="text-larger ion-padding ion-text-wrap text-breakable">${qrData}</a>
               </ion-row>
               <ion-row>
                  <div class="text-message ion-padding">
                     <ion-button @click=${() => history.back()}>
                        <ion-icon slot="start" name="chevron-back"></ion-icon>
                        ${T("Back")}
                     </ion-button>
                  </div>
               </ion-row>
            </ion-grid>

         `;
      this.render(theHtml);
    }
  }
);
//# sourceMappingURL=DisplayNormalQR-4LONP3H6.js.map
