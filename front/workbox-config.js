module.exports = {
  "globDirectory": "www/",
  "globPatterns": [
    "**/*.{css,ico,png,jpg,svg,html,js,txt,webmanifest}"
    // ["**\/*.{js,wasm,css,html}"]
  ],
  "swDest": "www/sw.js",
  "mode": "development",
  
  "clientsClaim": true,
  "skipWaiting": true,
  "sourcemap": true
};