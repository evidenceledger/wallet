// front/src/pages/SettingsPage.js
var MHR = window.MHR;
var gotoPage = MHR.gotoPage;
var goHome = MHR.goHome;
var storage = MHR.storage;
var myerror = window.MHR.storage.myerror;
var mylog = window.MHR.storage.mylog;
var html = MHR.html;
MHR.register(
  "SettingsPage",
  class extends MHR.AbstractPage {
    /**
     * @param {string} id
     */
    constructor(id) {
      super(id);
    }
    async enter() {
      let currentDebug = localStorage.getItem("MHRdebug") == "true";
      let proxyIssuer = localStorage.getItem("proxyIssuer") == "true";
      var mainPage = html`
            <ion-card>
               <ion-item>
                  <ion-toggle
                     @ionChange=${(e) => {
        currentDebug = e.target.checked;
        if (currentDebug) {
          window.localStorage.setItem("MHRdebug", "true");
        } else {
          window.localStorage.setItem("MHRdebug", "false");
        }
        MHR.debug = currentDebug;
        console.log("DEBUG", currentDebug);
      }}
                     id="Debug"
                     name="Debug"
                     label-placement="end"
                     justify="start"
                     ?checked=${currentDebug}
                     >Set debug mode
                  </ion-toggle>
               </ion-item>
               <ion-item>
                  <ion-toggle
                     @ionChange=${(e) => {
        proxyIssuer = e.target.checked;
        if (proxyIssuer) {
          window.localStorage.setItem("proxyIssuer", "true");
        } else {
          window.localStorage.setItem("proxyIssuer", "false");
        }
        console.log("proxyIssuer", proxyIssuer);
      }}
                     id="proxyIssuer"
                     name="proxyIssuer"
                     label-placement="end"
                     justify="start"
                     ?checked=${proxyIssuer}
                     >Proxy for Issuer/Verifier (bypass CORS)
                  </ion-toggle>
               </ion-item>
            </ion-card>
         `;
      this.render(mainPage);
    }
  }
);
//# sourceMappingURL=SettingsPage-AEYF2SPL.js.map
