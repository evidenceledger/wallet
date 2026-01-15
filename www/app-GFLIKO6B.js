import {
  html,
  render,
  storage
} from "./chunks/chunk-FUD4I7SA.js";
import "./chunks/chunk-W7NC74ZX.js";

// front/src/app.js
window.myerror = storage.myerror;
window.mylog = storage.mylog;
if (!localStorage.getItem("MHRdebug")) {
  localStorage.setItem("MHRdebug", "false");
}
var debug = localStorage.getItem("MHRdebug") == "true";
console.log("DEBUG", debug);
var pageModulesMap = window.pageModules;
var parsedUrl = new URL(import.meta.url);
var fullPath = parsedUrl.pathname;
console.log("Fullpath of app:", fullPath);
var basePath = fullPath.substring(0, fullPath.lastIndexOf("/"));
console.log("Base path:", basePath);
if (basePath.length > 1) {
  for (const path in pageModulesMap) {
    pageModulesMap[path] = basePath + pageModulesMap[path];
  }
}
var homePage = window.homePage;
if (!homePage) {
  throw "No homePage was set.";
}
var myAppTitle = window.myAppTitle;
var name404 = "Page404";
var pageNameToClass = /* @__PURE__ */ new Map();
function route(pageName, classInstance) {
  pageNameToClass.set(pageName, classInstance);
}
async function goHome() {
  if (homePage != void 0) {
    await gotoPage(homePage, null);
  }
}
async function gotoPage(pageName, pageData, replace) {
  mylog("Inside gotoPage:", pageName);
  try {
    var pageClass = pageNameToClass.get(pageName);
    if (!pageClass) {
      await import(pageModulesMap[pageName]);
      if (!pageNameToClass.get(pageName)) {
        myerror("Target page does not exist: ", pageName);
        pageData = pageName;
        pageName = name404;
      }
    }
    if (!replace) {
      window.history.pushState({ pageName, pageData }, `${pageName}`);
    }
    await processPageEntered(pageNameToClass, pageName, pageData, false);
  } catch (error) {
    myerror(error);
    await processPageEntered(
      pageNameToClass,
      "ErrorPage",
      { title: error.name, msg: error.message },
      false
    );
  }
}
async function processPageEntered(pageNameToClass2, pageName, pageData, historyData) {
  for (let [name, classInstance] of pageNameToClass2) {
    classInstance.domElem.style.display = "none";
    if (name !== pageName && classInstance.exit) {
      try {
        await classInstance.exit();
      } catch (error) {
        myerror(`error calling exit() on ${name}: ${error.name}`);
      }
    }
  }
  let targetPage = pageNameToClass2.get(pageName);
  if (targetPage === void 0) {
    pageData = pageName;
    targetPage = pageNameToClass2.get(name404);
  }
  const content = document.querySelector("ion-content");
  if (content) {
    content.scrollToTop(500);
  } else {
    window.scrollTo(0, 0);
  }
  if (targetPage.enter) {
    await targetPage.enter(pageData, historyData);
  } else {
    targetPage.style.display = "block";
  }
}
window.addEventListener("popstate", async function(event) {
  var state = event.state;
  if (state == null) {
    return;
  }
  console.log(event);
  var pageName = state.pageName;
  var pageData = state.pageData;
  try {
    await processPageEntered(pageNameToClass, pageName, pageData, true);
  } catch (error) {
    myerror(error);
    await processPageEntered(
      pageNameToClass,
      "ErrorPage",
      { title: error.name, msg: error.message },
      false
    );
  }
});
async function getAndUpdateVersion() {
  let version = "1.1.3";
  window.appVersion = version;
  window.localStorage.setItem("VERSION", version);
  console.log("Version:", version);
  return;
}
window.addEventListener("DOMContentLoaded", async (event) => {
  console.log("window.DOMContentLoaded event fired");
  getAndUpdateVersion();
  await goHome();
  for (const path in pageModulesMap) {
    import(pageModulesMap[path]);
  }
});
var INSTALL_SERVICE_WORKER = false;
window.addEventListener("load", async (event) => {
  console.log("window.load event fired");
  if (true) {
    console.log("In development");
    INSTALL_SERVICE_WORKER = false;
  } else {
    console.log("In production");
    INSTALL_SERVICE_WORKER = true;
  }
  if (INSTALL_SERVICE_WORKER && "serviceWorker" in navigator) {
    const { Workbox } = await import("./chunks/workbox-window.prod.es5-BMGUVAUA.js");
    const wb = new Workbox("./sw.js");
    wb.addEventListener("message", (event2) => {
      if (event2.data.type === "CACHE_UPDATED") {
        const { updatedURL } = event2.data.payload;
        console.log(`A newer version of ${updatedURL} is available!`);
      }
    });
    wb.addEventListener("activated", async (event2) => {
      if (event2.isUpdate) {
        console.log("Service worker has been updated.", event2);
        await performAppUpgrade(true);
      } else {
        console.log("Service worker has been installed for the first time.", event2);
        await performAppUpgrade(false);
      }
    });
    wb.addEventListener("waiting", (event2) => {
      console.log(
        `A new service worker has installed, but it can't activateuntil all tabs running the current version have fully unloaded.`
      );
    });
    wb.register();
  }
});
async function performAppUpgrade(isUpdate) {
  console.log("Performing Upgrade");
  gotoPage("SWNotify", { isUpdate });
}
function T(e) {
  if (window.T) {
    return window.T(e);
  }
  return e;
}
function HeaderBar(backButton = true, loginData) {
  var backButtonHTML;
  if (backButton) {
    backButtonHTML = html` <ion-buttons slot="start">
         <ion-button onclick="history.back();">
            <ion-icon slot="start" name="chevron-back"></ion-icon>
            Back
         </ion-button>
      </ion-buttons>`;
  } else {
    backButtonHTML = html``;
  }
  var menuButton = html` <ion-buttons slot="end">
      <ion-button aria-label="Menu" onclick="eudi.gotoPage('MenuPage', '')">
         <ion-icon name="menu"></ion-icon>
      </ion-button>
   </ion-buttons>`;
  return html`
      <ion-toolbar color="primary">
         ${backButtonHTML}
         <ion-title>${loginData ? loginData : myAppTitle}</ion-title>
         ${menuButton}
      </ion-toolbar>
   `;
}
function ErrorPanel(title, message, details) {
  let theHtml = html`
      <ion-card>
         <ion-card-header>
            <ion-card-title>${title}</ion-card-title>
         </ion-card-header>

         <ion-card-content class="ion-padding-bottom">
            <div class="text-larger">${message}</div>
         </ion-card-content>

         ${details ? html`
                 <ion-card-content class="ion-padding-bottom">
                    <div class="text-medium">${details}</div>
                 </ion-card-content>
              ` : null}

         <div class="ion-margin-start ion-margin-bottom">
            <ion-button color="danger" @click=${() => cleanReload()}>
               <ion-icon slot="start" name="home"></ion-icon>
               ${T("Home")}
            </ion-button>
         </div>
      </ion-card>
   `;
  return theHtml;
}
var AbstractPage = class {
  html;
  // The uhtml html function, for subclasses
  domElem;
  // The DOM Element that holds the page
  pageName;
  // The name of the page for routing
  headerBar = HeaderBar;
  loginData = "";
  /**
   * @param {string} id - The name of the page to be registered. This will be used for page routing
   */
  constructor(id) {
    if (!id) {
      throw "A page name is needed";
    }
    this.html = html;
    this.domElem = document.createElement("page");
    this.pageName = id;
    this.domElem.id = id;
    route(this.pageName, this);
    this.domElem.style.display = "none";
    var mainElem = document.querySelector("main");
    if (mainElem) {
      mainElem.appendChild(this.domElem);
    }
  }
  /**
   * @param {import("uhtml").Renderable} theHtml
   * @param {boolean} [backButton=true]
   */
  render(theHtml, backButton = true) {
    let elem = document.getElementById("SplashScreen");
    if (elem) {
      elem.style.display = "none";
    }
    this.domElem.style.display = "block";
    let header = document.getElementById("the_header");
    let hb = HeaderBar(backButton, this.loginData);
    if (header) {
      try {
        render(header, hb);
      } catch (error) {
        console.error;
      }
    }
    render(this.domElem, theHtml);
  }
  /**
   * @param {string} title
   * @param {string} message
   * @param {string} details
   */
  showError(title, message, details) {
    this.render(ErrorPanel(title, message, details));
  }
};
function register(pageName, classDefinition) {
  new classDefinition(pageName);
}
function cleanReload() {
  window.location = window.location.origin + window.location.pathname;
  return;
}
register(
  "Page404",
  class extends AbstractPage {
    /**
     * @param {string} id
     */
    constructor(id) {
      super(id);
    }
    /**
     * @param {string} pageData
     */
    enter(pageData) {
      this.showError("Page not found", `The requested page does not exist: ${pageData}`, "");
    }
  }
);
register(
  "ErrorPage",
  class extends AbstractPage {
    /**
     * @param {string} id
     */
    constructor(id) {
      super(id);
    }
    /**
     * @param {{title:string; msg:string; details:string; back:boolean; level:string}} pageData
     */
    enter(pageData) {
      let html2 = this.html;
      if (!pageData) {
        pageData = {
          title: "Error",
          msg: "An error has happened",
          details: "",
          back: false,
          level: "error"
        };
      }
      let title = T("Error");
      if (pageData.title) {
        title = T(pageData.title);
      }
      let msg = T("An error has happened.");
      if (pageData.msg) {
        msg = T(pageData.msg);
      }
      let color = "danger";
      if (pageData.level == "info") {
        color = "primary";
      } else if (pageData.level == "warning") {
        color = "warning";
      }
      let theHtml = html2`
            <ion-card>
               <ion-card-header>
                  <ion-card-title>${title}</ion-card-title>
               </ion-card-header>

               <ion-card-content class="ion-padding-bottom">
                  <div class="text-larger">${msg}</div>

                  ${pageData.details ? html2` <div class="text-medium">${pageData.details}</div> ` : null}
               </ion-card-content>

               ${pageData.back == true ? null : html2`
                       <ion-card-content class="ion-padding-bottom">
                          <div>${T("Please click Accept to refresh the page.")}</div>
                       </ion-card-content>
                    `}

               <div class="ion-margin-start ion-margin-bottom">
                  ${pageData.back == true ? html2` <ion-button .color=${color} @click=${() => history.back()}>
                          <ion-icon slot="start" name="chevron-back"></ion-icon>${T("Back")}
                       </ion-button>` : html2` <ion-button .color=${color} @click=${() => cleanReload()}
                          >${T("Accept")}
                       </ion-button>`}
               </div>
            </ion-card>
         `;
      this.render(theHtml, pageData.back);
    }
  }
);
register("SWNotify", class extends AbstractPage {
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
function btoaUrl(input) {
  let astr = btoa(input);
  astr = astr.replace(/\+/g, "-").replace(/\//g, "_");
  return astr;
}
function atobUrl(input) {
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  let bstr = decodeURIComponent(escape(atob(input)));
  return bstr;
}
globalThis.MHR = {
  debug,
  mylog: storage.mylog,
  storage,
  route,
  goHome,
  gotoPage,
  processPageEntered,
  // @ts-ignore
  AbstractPage,
  register,
  ErrorPanel,
  cleanReload,
  html,
  render,
  btoaUrl,
  atobUrl,
  pageNameToClass
};
globalThis.eudi = {
  debug,
  mylog: storage.mylog,
  myerror: storage.myerror,
  storage,
  route,
  goHome,
  gotoPage,
  processPageEntered,
  // @ts-ignore
  AbstractPage,
  register,
  ErrorPanel,
  cleanReload,
  html,
  render,
  btoaUrl,
  atobUrl,
  pageNameToClass
};
//# sourceMappingURL=app-GFLIKO6B.js.map
