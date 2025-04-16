// @ts-check

// Copy some globals to make code less verbose
let gotoPage = eudi.gotoPage;
let goHome = eudi.goHome;
let storage = eudi.storage;
let myerror = eudi.storage.myerror;
let mylog = eudi.storage.mylog;
let html = eudi.html;

eudi.register(
   "SettingsPage",
   class extends eudi.AbstractPage {
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
                        eudi.debug = currentDebug;
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
