// @ts-check

/**
 * @typedef {Object} PasskeyCreationRawResponse
 * @property {string} id - The base64url encoded credential ID.
 * @property {ArrayBuffer} rawId - The raw credential ID.
 * @property {Object} response - The authenticator response.
 * @property {ArrayBuffer} response.attestationObject - The raw attestation object.
 * @property {ArrayBuffer} response.clientDataJSON - The raw client data JSON.
 * @property {string[]} response.transports - The available transports (e.g., 'internal', 'usb').
 * @property {string} type - The credential type (usually 'public-key').
 * @property {AuthenticationExtensionsClientOutputs} clientExtensionResults - Results of any requested extensions (like PRF).
 */

/**
 * @typedef {Object} PasskeyAssertionRawResponse
 * @property {string} id - The base64url encoded credential ID.
 * @property {ArrayBuffer} rawId - The raw credential ID.
 * @property {Object} response - The authenticator response.
 * @property {ArrayBuffer} response.authenticatorData - The raw authenticator data.
 * @property {ArrayBuffer} response.clientDataJSON - The raw client data JSON.
 * @property {ArrayBuffer} response.signature - The raw signature.
 * @property {ArrayBuffer | null} response.userHandle - The raw user handle.
 * @property {string} type - The credential type (usually 'public-key').
 * @property {AuthenticationExtensionsClientOutputs} clientExtensionResults - Results of any requested extensions.
 */

/**
 * Checks if the browser supports Passkeys (WebAuthn) and the PRF extension.
 *
 * @returns {Promise<boolean>}
 */
export async function checkPasskeySupport() {
    if (!window.PublicKeyCredential) {
        return false;
    }

    // Check for platform authenticator availability
    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    return available;
}

// /**
//  * Creates a new Passkey (Discoverable Credential).
//  *
//  * @param {string} challengeBase64 - The challenge from the server (Base64Url encoded).
//  * @param {{id: string, name: string, displayName: string}} user - The user information.
//  * @param {string} rpName - The Relying Party name.
//  * @returns {Promise<Object>} - The credential data to be sent to the server.
//  */
// export async function createPasskey(challengeBase64, user, rpName = "Wallet App") {
//     const challenge = base64UrlToBuffer(challengeBase64);
//     const userId = base64UrlToBuffer(user.id);

//     /** @type {PublicKeyCredentialCreationOptions} */
//     const publicKeyCredentialCreationOptions = {
//         challenge: challenge,
//         rp: {
//             name: rpName,
//             id: window.location.hostname,
//         },
//         user: {
//             id: userId,
//             name: user.name,
//             displayName: user.displayName,
//         },
//         pubKeyCredParams: [
//             { alg: -7, type: "public-key" }, // ES256
//             { alg: -257, type: "public-key" }, // RS256
//         ],
//         authenticatorSelection: {
//             authenticatorAttachment: "platform",
//             userVerification: "required",
//             residentKey: "required",
//             requireResidentKey: true,
//         },
//         extensions: {
//             // Request PRF extension support
//             // @ts-ignore
//             prf: {}
//         },
//         timeout: 60000,
//         attestation: "none",
//     };

//     const credential = await navigator.credentials.create({
//         publicKey: publicKeyCredentialCreationOptions,
//     });

//     if (!credential || !(credential instanceof PublicKeyCredential)) {
//         throw new Error("Credential creation failed");
//     }

//     const response = /** @type {AuthenticatorAttestationResponse} */ (credential.response);

//     // Prepare object for server
//     return {
//         id: credential.id,
//         rawId: bufferToBase64Url(credential.rawId),
//         response: {
//             attestationObject: bufferToBase64Url(response.attestationObject),
//             clientDataJSON: bufferToBase64Url(response.clientDataJSON),
//             transports: response.getTransports ? response.getTransports() : [],
//         },
//         type: credential.type,
//         clientExtensionResults: credential.getClientExtensionResults(),
//     };
// }

/**
 * Creates a new Passkey (Discoverable Credential) using raw buffers.
 *
 * @param {Uint8Array} challenge - The challenge from the server.
 * @param {{id: Uint8Array, name: string, displayName: string}} user - The user information.
 * @param {string} rpName - The Relying Party name.
 * @returns {Promise<PasskeyCreationRawResponse>} - The credential data to be sent to the server.
 */
export async function createPasskeyRaw(challenge, user, rpName = "Wallet App") {

    /** @type {PublicKeyCredentialCreationOptions} */
    const publicKeyCredentialCreationOptions = {
        challenge: challenge,
        rp: {
            name: rpName,
            id: window.location.hostname,
        },
        user: {
            id: user.id,
            name: user.name,
            displayName: user.displayName,
        },
        pubKeyCredParams: [
            { alg: -7, type: "public-key" }, // ES256
        ],
        authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
            residentKey: "required",
            requireResidentKey: true,
        },
        extensions: {
            // Request PRF extension support
            // @ts-ignore
            prf: {}
        },
        timeout: 60000,
        attestation: "none",
    };

    const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
    });

    if (!credential || !(credential instanceof PublicKeyCredential)) {
        throw new Error("Credential creation failed");
    }

    const clientExtensionResults = credential.getClientExtensionResults();

    // @ts-ignore
    if (!clientExtensionResults.prf || !clientExtensionResults.prf.enabled) {
        throw new Error("PRF extension not supported");
    }

    const response = /** @type {AuthenticatorAttestationResponse} */ (credential.response);

    // Prepare object for server
    return {
        id: credential.id,
        rawId: credential.rawId,
        response: {
            attestationObject: response.attestationObject,
            clientDataJSON: response.clientDataJSON,
            transports: response.getTransports ? response.getTransports() : [],
        },
        type: credential.type,
        clientExtensionResults: clientExtensionResults,
    };
}

/**
 * Authenticates the user using a Passkey (Assertion).
 * Generates a local challenge and performs basic client-side verifications.
 *
 * @param {PublicKeyCredentialDescriptor[]} [allowCredentials=[]] - List of allowed credentials.
 * @returns {Promise<PasskeyAssertionRawResponse>} - The assertion data.
 */
export async function getPasskeyRaw(allowCredentials = []) {
    // Generate a local challenge (32 random bytes) as there is no server
    const challenge = window.crypto.getRandomValues(new Uint8Array(32));

    /** @type {PublicKeyCredentialRequestOptions} */
    const publicKeyCredentialRequestOptions = {
        challenge: challenge,
        rpId: window.location.hostname,
        allowCredentials: allowCredentials,
        userVerification: "required",
        extensions: {
            // Request PRF extension support if needed for local encryption keys
            // @ts-ignore
            prf: {}
        },
        timeout: 60000,
    };

    const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
    });

    if (!credential || !(credential instanceof PublicKeyCredential)) {
        throw new Error("Authentication failed");
    }

    const response = /** @type {AuthenticatorAssertionResponse} */ (credential.response);

    // --- Basic Verifications (Local "Server-side" checks) ---

    // 1. Verify clientDataJSON
    const clientDataJSON = JSON.parse(new TextDecoder().decode(response.clientDataJSON));
    
    if (clientDataJSON.type !== "webauthn.get") {
        throw new Error("Invalid credential type");
    }

    if (clientDataJSON.origin !== window.location.origin) {
        throw new Error("Origin mismatch");
    }

    const receivedChallenge = base64UrlToBuffer(clientDataJSON.challenge);
    if (!buffersEqual(receivedChallenge, challenge)) {
        throw new Error("Challenge mismatch");
    }

    // 2. Verify authenticatorData
    const authData = new Uint8Array(response.authenticatorData);
    
    // Verify RP ID Hash (first 32 bytes of authData)
    const rpIdHash = authData.slice(0, 32);
    const expectedRpIdHash = new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(window.location.hostname)));
    if (!buffersEqual(rpIdHash, expectedRpIdHash)) {
        throw new Error("RP ID hash mismatch");
    }

    // Verify Flags (byte 32)
    const flags = authData[32];
    const UP = !!(flags & 0x01); // User Present bit
    const UV = !!(flags & 0x04); // User Verified bit
    
    if (!UP) throw new Error("User not present");
    if (!UV) throw new Error("User not verified");

    return {
        id: credential.id,
        rawId: credential.rawId,
        response: {
            authenticatorData: response.authenticatorData,
            clientDataJSON: response.clientDataJSON,
            signature: response.signature,
            userHandle: response.userHandle,
        },
        type: credential.type,
        clientExtensionResults: credential.getClientExtensionResults(),
    };
}

// Helper functions

/**
 * @param {string | any[]} base64url
 */
function base64UrlToBuffer(base64url) {
    const padding = '='.repeat((4 - base64url.length % 4) % 4);
    const base64 = (base64url + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

/**
 * @param {any} buffer
 */
function bufferToBase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Compares two Uint8Array buffers for equality.
 * 
 * @param {Uint8Array} a 
 * @param {Uint8Array} b 
 * @returns {boolean}
 */
function buffersEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}