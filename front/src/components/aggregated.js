export { getPlatformOS, getVideoDevices, getPreferredVideoDevice } from "./camerainfo.js"

// app.js
export { render, html, svg } from "uhtml";
export { T } from "../i18n/tr.js";
export { storage } from "./db.js";

// AuthenticationRequestPage
export { Base64 } from "js-base64";
export { decodeUnsafeJWT } from "./jwt.js";
export { renderAnyCredentialCard } from "./renderAnyCredential.js";

// CredentialIssuance
export { credentialsSave } from "./db.js";
export {
   getOrCreateDidKey,
   importFromJWK,
   verify,
   verifyJWT,
   signWithJWK,
   signJWT,
} from "./crypto.js";

// DisplayQR
export { QRCode } from 'easyqrcodejs'

// MicroWallet
export { generateP256did as generateDidKeyDOME } from "./crypto_ec.js";

