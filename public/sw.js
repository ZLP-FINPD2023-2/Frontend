if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const d=e=>a(e,i),r={module:{uri:i},exports:c,require:d};s[i]=Promise.all(n.map((e=>r[e]||d(e)))).then((e=>(t(...e),c)))}}define(["./workbox-8637ed29"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/498-813c9085e5546176.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/627-3b8c4faa0b7c1791.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/73-50b9dd8cad6fb549.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/791-49ba688e193b1330.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/8d8a8e2a-c4337fb626992fab.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/app/_not-found-0aa6e79ad638dd18.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/app/auth/page-1030d86b7d0a0b54.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/app/forgot/page-8e4e9419b7b6ed5b.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/app/layout-8b227de7d29359af.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/app/page-60b68953be403fb3.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/app/reg/page-023299a14e806b7e.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/main-app-0274ff58547c0f5f.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/main-decdeb496c78ad8c.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/pages/_app-51a2e98342df25f8.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/pages/_error-a5d9e58d0a50d9e2.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f0ef3658e4ba0cb7.js",revision:"edyL1xUqJ2A45GZwdHKlZ"},{url:"/_next/static/css/8f9ab2eb3ed416fc.css",revision:"8f9ab2eb3ed416fc"},{url:"/_next/static/edyL1xUqJ2A45GZwdHKlZ/_buildManifest.js",revision:"27b0b483827c127bcf27079d17f9f176"},{url:"/_next/static/edyL1xUqJ2A45GZwdHKlZ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/34dd45dcdd6d47ee-s.woff2",revision:"4061e1fa6aa9a45d49aa1737d2826560"},{url:"/_next/static/media/513657b02c5c193f-s.p.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/86fdec36ddd9097e-s.p.woff2",revision:"1a5f20725a57243f64429b25b5f24075"},{url:"/_next/static/media/9e58c89b9633dcad-s.p.woff2",revision:"566f7796dca987bfa0ca16389bbcfb4d"},{url:"/_next/static/media/a1ab2e69d2f53384-s.woff2",revision:"c73422f422632560946874b11671ded7"},{url:"/_next/static/media/c4a41ea065a0023c-s.woff2",revision:"06e8ee29490189c118050515c65e7d20"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/de2ba2ebf355004e-s.woff2",revision:"207eff257cb1b3c0007a30cda723a750"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
