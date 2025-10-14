import {
  import_easyqrcodejs
} from "../chunks/chunk-ULNROR7V.js";
import "../chunks/chunk-W7NC74ZX.js";

// front/src/pages/DisplayQR.js
window.MHR.register("DisplayQR", class DisplayQR extends window.MHR.AbstractPage {
  constructor(id) {
    super(id);
  }
  enter() {
    let html = this.html;
    const myqr = window.localStorage.getItem("MYEUDCC");
    console.log(myqr);
    let qrelement = document.createElement("div");
    let params = {
      text: myqr,
      correctLevel: import_easyqrcodejs.QRCode.CorrectLevel.L,
      width: 300,
      height: 300
    };
    var qrcode = new import_easyqrcodejs.QRCode(qrelement, params);
    let theHtml = html`
        <div style="text-align:center; margin-top:100px">
            ${qrelement}
        </div>
        `;
    this.render(theHtml);
  }
});
//# sourceMappingURL=DisplayQR-T5XVSCA2.js.map
