let gotoPage = window.MHR.gotoPage;
let goHome = window.MHR.goHome;

window.MHR.register(
   "ConfirmDeleteAll",
   class extends window.MHR.AbstractPage {
      constructor(id) {
         super(id);
      }

      enter(pageData) {
         let html = this.html;

         // We expect pageData to be an object with two fields:
         // - title: the string to be used for the title of the message
         // - msg: the string with the details

         // Provide a default title if the user did not set the title
         let title = T("Confirm Delete");

         // Provide a default message if the user did not specify it
         let msg = "Are you sure you want to delete ALL credentials?";

         // Display the title and message, with a button that goes to the home page
         let theHtml = html`
            <ion-card>
               <ion-card-header>
                  <ion-card-title>${title}</ion-card-title>
               </ion-card-header>

               <ion-card-content class="ion-padding-bottom">
                  <div class="text-larger">${msg}</div>
               </ion-card-content>

               <div class="ion-margin-start ion-margin-bottom">
                  <ion-button @click=${() => history.back()}>
                     <ion-icon slot="start" name="chevron-back"></ion-icon>
                     ${T("Cancel")}
                  </ion-button>

                  <ion-button color="danger" @click=${() => this.deleteALLVCs()}>
                     <ion-icon slot="start" name="trash"></ion-icon>
                     ${T("Delete all credentials")}
                  </ion-button>
               </div>
            </ion-card>
         `;

         this.render(theHtml);
      }

      async deleteALLVCs() {
         await window.MHR.storage.credentialsDeleteAll();
         // Reload the application
         goHome();
         return;
      }
   }
);
