// front/src/pages/MenuPage.js
var gotoPage = window.MHR.gotoPage;
var goHome = window.MHR.goHome;
var storage = window.MHR.storage;
window.MHR.register(
  "MenuPage",
  class extends window.MHR.AbstractPage {
    constructor(id) {
      super(id);
    }
    enter() {
      let html = this.html;
      var menu = html`
            <ion-list>
               ${window.menuItems.map(
        ({ page, params, text }) => html`
                     <ion-item>
                        <ion-label
                           onclick=${() => {
          MHR.gotoPage(page, params, true);
        }}
                        >
                           <span class="text-menu">
                              ${text}
                           </span>
                           ${params?.warning ? html`<ion-icon class="text-message" name="warning" style="color:red;"></ion-icon>` : null}
                        </ion-label>
                     </ion-item>
                  `
      )}
            </ion-list>
         `;
      this.render(menu, true);
    }
  }
);
//# sourceMappingURL=MenuPage-WUYT4VCX.js.map
