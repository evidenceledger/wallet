// @ts-check

// @ts-ignore
const MHR = window.MHR;

// Copy some globals to make code less verbose
let gotoPage = MHR.gotoPage;
let goHome = MHR.goHome;
let storage = MHR.storage;
let myerror = window.MHR.storage.myerror;
let mylog = window.MHR.storage.mylog;
let html = MHR.html;

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
