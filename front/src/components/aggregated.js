export { render, html } from 'https://esm.run/uhtml/dev';

export { storage } from "./db.js";

export { getPlatformOS, getVideoDevices, getPreferredVideoDevice } from "./camerainfo.js"

export { T } from "../i18n/tr.js";

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

