// front/src/pages/ConfirmDeleteAll.js
var gotoPage = window.MHR.gotoPage;
var goHome = window.MHR.goHome;
window.MHR.register(
  "ConfirmDeleteAll",
  class extends window.MHR.AbstractPage {
    constructor(id) {
      super(id);
    }
    enter(pageData) {
      let html = this.html;
      let title = T("Confirm Delete");
      let msg = "Are you sure you want to delete ALL credentials?";
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
      goHome();
      return;
    }
  }
);
//# sourceMappingURL=ConfirmDeleteAll-WAGRMZMH.js.map
