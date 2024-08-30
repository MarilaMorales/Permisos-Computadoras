// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"eHEDQ":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "5ae39c98a500a5cb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"2QBv6":[function(require,module,exports) {
var _getJs = require("../../services/get.js");
var _putJs = require("../../services/put.js");
//Lo que se carga dentro de esto, se ejecuta cuando la apgina cargue totalmente, HTML CSS Scripts Boostrap etc
window.onload = function() {
    mostrarSolicitudes(); //Tabla Solicitudes Pendientes
    mostrarHistorial(); // Tabla Historial de Solicitudes
    // Asigna eventListener al botón de búsqueda
    let botonBuscar = document.querySelector(".btn-outline-success");
    botonBuscar.addEventListener("click", filtrarSolicitudes);
    // Asignar eventListener al select para filtrar por estado
    document.getElementById("solicitudSearch").addEventListener("change", function() {
        estadoSelect = this.value.trim();
        filtrarSolicitudes();
    });
    // Declarar estadoSelect
    let estadoSelect = "";
    // Asignar event listener al campo de búsqueda para filtrar mientras se escribe
    let inputSearch = document.getElementById("inputSearch");
    inputSearch.addEventListener("input", filtrarSolicitudes);
    // Manejo de la visibilidad de secciones
    let navLinks = document.querySelectorAll(".navbar-nav .nav-link"); //Selecciona todos los enlaces de navegación en el menú q se usan pa cambiar entre los taps.
    let sections = document.querySelectorAll("section"); //Igual nada mas que con las secciones
    //Se usa para navegar entre secciones
    function mostrarSeccion(seccionId) {
        sections.forEach(function(section) {
            if (section.id === seccionId) section.style.display = "block"; // Mostrar la sección seleccionada
            else section.style.display = "none"; // Ocultar las demás secciones
        });
    }
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(eventoSeccion) {
            eventoSeccion.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            let seccionId = link.getAttribute("data-target"); // Obtener el id de la sección desde el HTML de data-target
            mostrarSeccion(seccionId);
        });
    });
    // Mostrar la primera sección al cargar la página
    mostrarSeccion("solicitudesPendientes");
};
// Función para mostrar las solicitudes pendientes
async function mostrarSolicitudes() {
    try {
        let solicitudes = await (0, _getJs.getPermisos)(); //usa await para esperar a que las Promesas se resuelvan
        let solicitudesPendientes = filtrarPendientes(solicitudes); //filtra las solicitudes pendientes y las muestra en la tabla.
        mostrarEnTabla(solicitudesPendientes); // Llama a la función mostrarEnTabla
    } catch (error) {
        console.error("Error al mostrar solicitudes:", error);
    }
}
// Función para mostrar todo el historial
async function mostrarHistorial() {
    try {
        let solicitudes = await (0, _getJs.getPermisos)(); ////usa await para esperar a que las Promesas se resuelvan
        mostrarHistorialEnTabla(solicitudes); // Llama a la función 
        filtrarSolicitudes(); // Esto permite aplicar los filtros a la tabla y que muestre solo lo q dicen los filtros
    } catch (error) {
        console.error("Error al mostrar historial:", error);
    }
}
// Filtrar solicitudes que no tienen estado
function filtrarPendientes(solicitudes) {
    return solicitudes.filter(function(solicitud) {
        return !solicitud.estado; // Filtra solicitudes que no tienen el campo 'estado' definido
    });
}
// Mostrar solicitudes pendientes en la tabla
function mostrarEnTabla(solicitudes) {
    let tabla = document.getElementById("tablaSolicitudes");
    let tbody = tabla.querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar la tabla
    for(let i = 0; i < solicitudes.length; i++){
        let solicitud = solicitudes[i];
        let fila = document.createElement("tr");
        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = solicitud.usuario;
        fila.appendChild(celdaNombre);
        let celdaCodigo = document.createElement("td");
        celdaCodigo.textContent = solicitud.codigoComputadora;
        fila.appendChild(celdaCodigo);
        let celdaFechaSalida = document.createElement("td");
        celdaFechaSalida.textContent = solicitud.fechaSalida;
        fila.appendChild(celdaFechaSalida);
        let celdaFechaEntrega = document.createElement("td");
        celdaFechaEntrega.textContent = solicitud.fechaRegreso;
        fila.appendChild(celdaFechaEntrega);
        let celdaAcciones = document.createElement("td");
        let botonAceptar = document.createElement("button");
        botonAceptar.textContent = "Aceptar"; //Agrega los botones a la tabla y el clik
        botonAceptar.onclick = function() {
            actualizarSolicitud(solicitud.id, "aceptado");
        };
        celdaAcciones.appendChild(botonAceptar);
        let botonRechazar = document.createElement("button");
        botonRechazar.textContent = "Rechazar";
        botonRechazar.onclick = function() {
            actualizarSolicitud(solicitud.id, "rechazado");
        };
        celdaAcciones.appendChild(botonRechazar);
        fila.appendChild(celdaAcciones);
        tbody.appendChild(fila);
    }
}
// Mostrar historial en la tabla
function mostrarHistorialEnTabla(solicitudes) {
    let tablaHistorial = document.getElementById("Historial");
    let tbody = tablaHistorial.querySelector("tbody"); // Usar querySelector en lugar de getElementsByTagName
    tbody.innerHTML = ""; // Limpiar la tabla
    for(let i = 0; i < solicitudes.length; i++){
        let solicitud = solicitudes[i];
        let fila = document.createElement("tr");
        fila.className = "filaHistorial"; // Añadido clase filaHistorial
        let celdaNombre = document.createElement("td");
        celdaNombre.className = "nombre"; // Añadido clase nombre
        celdaNombre.textContent = solicitud.usuario;
        fila.appendChild(celdaNombre);
        let celdaCodigo = document.createElement("td");
        celdaCodigo.textContent = solicitud.codigoComputadora;
        fila.appendChild(celdaCodigo);
        let celdaFechaSalida = document.createElement("td");
        celdaFechaSalida.textContent = solicitud.fechaSalida;
        fila.appendChild(celdaFechaSalida);
        let celdaFechaEntrega = document.createElement("td");
        celdaFechaEntrega.textContent = solicitud.fechaRegreso;
        fila.appendChild(celdaFechaEntrega);
        let celdaEstado = document.createElement("td");
        celdaEstado.className = "estado"; // Añadido clase estado
        celdaEstado.textContent = solicitud.estado || "Pendiente"; // Muestra 'Pendiente' si no hay estado
        fila.appendChild(celdaEstado);
        tbody.appendChild(fila);
    }
}
// Función para filtrar solicitudes en el historial
function filtrarSolicitudes() {
    // Obtener los valores de entrada
    let inputSearch = document.getElementById("inputSearch").value.toLowerCase().trim(); //Se obtiene lod el Input y se pone en minuscula y elimina espaco¿io
    let estadoSelect = document.getElementById("solicitudSearch").value.trim();
    let fechaInicio = document.getElementById("fechaInicio").value;
    let fechaFinal = document.getElementById("fechaFinal").value;
    // Convertir fechas a objetos Date para facilitar comparacion 
    if (fechaInicio) fechaInicio = new Date(fechaInicio);
    else fechaInicio = null;
    if (fechaFinal) fechaFinal = new Date(fechaFinal);
    else fechaFinal = null;
    // Obtener todas las filas del historial
    let tbody = document.getElementById("Historial").querySelector("tbody"); // Obtiene el cuerpo de la tabla con id Historial.
    let filas = tbody.getElementsByClassName("filaHistorial"); //obtiene todas las filas
    // Filtrar filas
    let filteredRows = []; //Arreglo vacío para almacenar las filas que coinciden con los filtros aplicados.
    for(let i = 0; i < filas.length; i++){
        let fila = filas[i];
        let nombre = fila.getElementsByClassName("nombre")[0].textContent.toLowerCase().trim(); //Obtiene y limpia los valores de nombre y estado de cada fila.
        let estado = fila.getElementsByClassName("estado")[0].textContent.toLowerCase().trim();
        let fechaSalida = new Date(fila.children[2].textContent.trim());
        let fechaRegreso = new Date(fila.children[3].textContent.trim());
        // Verificar si el nombre coincide con la búsqueda
        let nombreCoincide = nombre.includes(inputSearch);
        // Verificar el estado
        let estadoCoincide = false;
        if (estadoSelect === "todos") estadoCoincide = true; // Mostrar todas las solicitudes si se selecciona 'todos'
        else estadoCoincide = estado === estadoSelect; // Comparar el estado de la fila con el seleccionado
        // Verificar si la fecha de salida y regreso están dentro del rango especificado
        let fechaDentroRango = true;
        if (fechaInicio && fechaSalida < fechaInicio) fechaDentroRango = false;
        if (fechaFinal && fechaRegreso > fechaFinal) fechaDentroRango = false;
        // Agregar fila a la lista de filas filtradas si coincide con los filtros
        if (nombreCoincide && estadoCoincide && fechaDentroRango) filteredRows.push(fila);
    }
    // Mostrar u ocultar filas según la lista de filas filtradas, se oculta lo que no cumple con lo filtrado
    for(let i = 0; i < filas.length; i++){
        let fila = filas[i];
        if (filteredRows.includes(fila)) fila.style.display = ""; // Mostrar la fila
        else fila.style.display = "none"; // Ocultar la fila
    }
}
// Función para actualizar una solicitud
async function actualizarSolicitud(id, estado) {
    try {
        // Obtener la solicitud original antes de actualizar
        let solicitudes = await (0, _getJs.getPermisos)();
        let solicitudOriginal = null; //Variable para almacenar la solicitud que coincide con el ID proporcionado.
        // Buscar la solicitud por ID
        for(let i = 0; i < solicitudes.length; i++)if (solicitudes[i].id === id) {
            solicitudOriginal = solicitudes[i];
            break;
        }
        // Si no se encuentra la solicitud, lanza un error
        if (solicitudOriginal === null) throw new Error("Solicitud no encontrada");
        // Crear un objeto con todos los datos originales más el nuevo estado
        let solicitudActualizada = {
            id: solicitudOriginal.id,
            usuario: solicitudOriginal.usuario,
            codigoComputadora: solicitudOriginal.codigoComputadora,
            fechaSalida: solicitudOriginal.fechaSalida,
            fechaRegreso: solicitudOriginal.fechaRegreso,
            estado: estado // Actualizar solo el campo estado
        };
        // Enviar la solicitud actualizada al servidor
        await (0, _putJs.putSolicitud)(id, solicitudActualizada); // Llama a la función putSolicitud para enviar la solicitud actualizada al servidor.
        console.log("Solicitud actualizada:", id, estado);
        mostrarSolicitudes(); // Recargar solicitudes después de actualizar
        mostrarHistorial(); // Recargar historial después de actualizar
    } catch (error) {
        console.error("Error al actualizar la solicitud:", error);
    }
}

},{"../../services/get.js":"ilQdp","../../services/put.js":"7XAoa"}],"ilQdp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GetAdmins", ()=>GetAdmins);
parcelHelpers.export(exports, "getUsers", ()=>getUsers);
parcelHelpers.export(exports, "getPermisos", ()=>getPermisos);
async function getUsers() {
    try {
        const response = await fetch("http://localhost:3001/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error("Error fetching users");
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
async function GetAdmins() {
    try {
        let response = await fetch("http://localhost:3001/admins");
        if (!response.ok) throw new Error("No sirve");
        let dataAdmin = await response.json();
        console.log(dataAdmin);
        return dataAdmin;
    } catch (error) {
        console.error("No sirve la cochinada de este fetch", error);
    }
}
async function getPermisos() {
    try {
        let response = await fetch("http://localhost:3001/permisos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error("Error al obtener solicitudes");
        let permisos = await response.json();
        return permisos;
    } catch (error) {
        console.error("Error al obtener solicitudes:", error);
        throw error;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6W6Fr"}],"6W6Fr":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7XAoa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "putSolicitud", ()=>putSolicitud) // async function putSolicitud(id, nuevoEstado) {
 //     try {
 //         const response = await fetch(`http://localhost:3001/permisos/${id}`, {
 //             method: 'PUT',
 //             headers: {
 //                 'Content-Type': 'application/json'
 //             },
 //             body: JSON.stringify({ estado: nuevoEstado }) // Actualiza el estado en el servidor
 //         });
 //         if (!response.ok) {
 //             throw new Error('Error al actualizar el estado');
 //         }
 //         return await response.json();
 //     } catch (error) {
 //         console.error('Error al actualizar solicitud:', error);
 //         throw error;
 //     }
 // }
 // export { putSolicitud };
;
async function putSolicitud(id, solicitudActualizada) {
    try {
        const response = await fetch(`http://localhost:3001/permisos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(solicitudActualizada) // Envía la solicitud completa con todos los campos actualizados
        });
        if (!response.ok) throw new Error("Error al actualizar el estado");
        return await response.json();
    } catch (error) {
        console.error("Error al actualizar solicitud:", error);
        throw error;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6W6Fr"}]},["eHEDQ","2QBv6"], "2QBv6", "parcelRequire2e59")

//# sourceMappingURL=Administracion.a500a5cb.js.map
