import "../chunks/chunk-EYB4XBPC.js";
import {
  html
} from "../chunks/chunk-TSJ2HKAF.js";
import "../chunks/chunk-W7NC74ZX.js";

// front/src/pages/SWNotify.js
window.MHR.register("SWNotify", class SWNotify extends window.MHR.AbstractPage {
  constructor(id) {
    super(id);
  }
  enter(pageData) {
    let msg;
    if (pageData && pageData.isUpdate) {
      msg = T("Application updated");
    } else {
      msg = T("Application available");
    }
    let theHtml = html`
        <ion-card>
            <ion-card-header>
            <ion-card-title>${msg}</ion-card-title>
            </ion-card-header>

            <ion-card-content class="ion-padding-bottom">
            <div class="text-larger">
                <p>${T("There is a new version of the application and it has already been updated.")}</p>
                <p>${T("Please click Accept to refresh the page.")}</p>
            </div>
            </ion-card-content>

            <div class="ion-margin-start ion-margin-bottom">
            <ion-button @click=${() => MHR.cleanReload()}>
                <ion-icon slot="start" name="home"></ion-icon>
                ${T("Home")}
            </ion-button>
            </div>
        </ion-card>
        `;
    this.render(theHtml);
  }
});
//# sourceMappingURL=SWNotify-3SN423PI.js.map
