const default_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let squareTo = "";
const BOOKS = [];
let userName = null;
let lastClassification = null;
let moveIndex_ = 999;
let isGameOverFlag = true;

const MoveClassification = {
  Brilliant: "brilliant",
  Great: "great",
  Best: "best",
  Excellent: "excellent",
  Good: "good",
  Book: "book",
  Inaccuracy: "inaccuracy",
  Mistake: "mistake",
  Miss: "miss",
  Blunder: "blunder",
  Forced: "forced",
};

let lastUrl = window.location.pathname

const swalThemeCSS = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');
    :root {
      --olive-vivid:   #4a7c1f;
      --olive-mid:     #5a8a30;
      --olive-border:  rgba(74,124,31,0.30);
      --bg-panel:      #faf8f5;
      --bg-card:       #ffffff;
      --bg-hover:      #eeeae3;
      --border-strong: rgba(74,124,31,0.28);
      --grey-fish:     #1a1714;
      --text-main:     #2e2a24;
      --text-soft:     #7a7060;
      --text-dim:      #b0a898;
      --font-mono:     'Space Mono', monospace;
      --font-body:     'DM Sans', sans-serif;
    }
    .swal2-popup.swal-rederic {
      font-family: var(--font-body) !important;
      background: var(--bg-panel) !important;
      border: 1px solid var(--border-strong) !important;
      border-radius: 18px !important;
      padding: 32px 28px 24px !important;
      box-shadow: 0 0 0 1px rgba(74,124,31,0.04) inset, 0 24px 70px rgba(0,0,0,0.13) !important;
      max-width: 460px !important;
      width: 94% !important;
      position: relative;
    }
    .swal2-popup.swal-rederic::before {
      content: '';
      position: absolute;
      top: 0; left: 10%; right: 10%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--olive-mid), transparent);
      border-radius: 0 0 4px 4px;
    }
    .swal2-popup.swal-rederic .swal2-title {
      font-family: var(--font-mono) !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      letter-spacing: 3px !important;
      text-transform: uppercase !important;
      color: var(--grey-fish) !important;
    }
    .swal2-popup.swal-rederic .swal2-html-container {
      color: var(--text-soft) !important;
      font-size: 13.5px !important;
      line-height: 1.65 !important;
      margin: 0 !important;
    }
    .swal2-popup.swal-rederic .swal2-close {
      color: var(--text-dim) !important;
      font-size: 22px !important;
      border-radius: 6px !important;
      transition: all 0.2s !important;
    }
    .swal2-popup.swal-rederic .swal2-close:hover {
      color: var(--grey-fish) !important;
      background: var(--bg-hover) !important;
    }
    .swal2-popup.swal-rederic .swal2-confirm {
      font-family: var(--font-mono) !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      letter-spacing: 1.5px !important;
      text-transform: uppercase !important;
      padding: 10px 26px !important;
      border-radius: 8px !important;
      background: rgba(74,124,31,0.12) !important;
      border: 1px solid var(--olive-mid) !important;
      color: var(--olive-vivid) !important;
      box-shadow: none !important;
      transition: all 0.2s ease !important;
    }
    .swal2-popup.swal-rederic .swal2-confirm:hover {
      background: rgba(74,124,31,0.22) !important;
      border-color: var(--olive-vivid) !important;
      color: var(--grey-fish) !important;
    }
    .swal2-popup.swal-rederic .swal2-cancel {
      font-family: var(--font-mono) !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      letter-spacing: 1.5px !important;
      text-transform: uppercase !important;
      padding: 10px 26px !important;
      border-radius: 8px !important;
      background: transparent !important;
      border: 1px solid var(--border-strong) !important;
      color: var(--text-soft) !important;
      box-shadow: none !important;
      transition: all 0.2s ease !important;
    }
    .swal2-popup.swal-rederic .swal2-cancel:hover {
      background: var(--bg-hover) !important;
      color: var(--text-main) !important;
    }
    .swal2-popup.swal-rederic .swal2-actions {
      margin-top: 18px !important;
      gap: 10px !important;
    }
    .swal2-container.swal2-backdrop-show {
      background: rgba(26,23,20,0.55) !important;
      backdrop-filter: blur(4px) !important;
    }

    .chv3-loading-wrap {
      margin: 18px 0 8px;
    }
    .chv3-loading-label {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-dim);
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .chv3-bar-track {
      width: 100%;
      height: 6px;
      background: rgba(74,124,31,0.12);
      border-radius: 99px;
      overflow: hidden;
      border: 1px solid var(--olive-border);
    }
    .chv3-bar-fill {
      height: 100%;
      width: 0%;
      background: var(--olive-mid);
      border-radius: 99px;
      transition: width 0.35s ease;
    }
    .chv3-game-label {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-dim);
      margin-top: 7px;
      min-height: 14px;
      text-align: left;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 12px;
    }
    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border-strong);
      border-radius: 10px;
      padding: 13px 10px;
      text-align: center;
    }
    .stat-card .s-label {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--text-dim);
      display: block;
      margin-bottom: 5px;
    }
    .stat-card .s-value {
      font-family: var(--font-mono);
      font-size: 22px;
      font-weight: 700;
      color: var(--grey-fish);
    }
    .stat-card.s-win  .s-value { color: #3a7d1e; }
    .stat-card.s-lost .s-value { color: #b84040; }
    .stat-card.s-draw .s-value { color: #8a7040; }
    .stat-card.s-acc  .s-value { color: #4a7c1f; }

    .safety-row {
      background: var(--bg-card);
      border: 1px solid var(--border-strong);
      border-radius: 10px;
      padding: 13px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }
    .safety-row .s-label {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--text-dim);
      display: block;
      margin-bottom: 4px;
    }
    .safety-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 5px 11px;
      border-radius: 6px;
    }
    .badge-legit   { background: rgba(58,125,30,0.13);  color: #3a7d1e; border: 1px solid rgba(58,125,30,0.3); }
    .badge-sus     { background: rgba(186,64,64,0.10);  color: #b84040; border: 1px solid rgba(186,64,64,0.3); }
    .badge-cheater { background: rgba(60,60,60,0.10);   color: #2e2a24; border: 1px solid rgba(60,60,60,0.25); }
    .dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
    .dot-legit   { background: #3a7d1e; }
    .dot-sus     { background: #b84040; }
    .dot-cheater { background: #888; }

    .swal-footer-note {
      padding: 11px 14px;
      background: rgba(74,124,31,0.06);
      border: 1px solid var(--olive-border);
      border-radius: 9px;
      font-family: var(--font-mono);
      font-size: 11px;
      line-height: 1.6;
      color: var(--text-dim);
      text-align: left;
      margin-bottom: 14px;
    }
    .swal-footer-note::before { content: '// '; color: var(--olive-vivid); font-weight: 700; }
    .swal-author {
      display: block;
      text-align: right;
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-dim);
    }
  </style>
`;

const bookPath = chrome.runtime.getURL("book/book.bin");
const wasmkomodoPath = chrome.runtime.getURL("lib/dragon3.3.wasm");
const wasmStockfishPath = chrome.runtime.getURL("lib/stockfish.wasm");
const wasmTorchPath = chrome.runtime.getURL("lib/torch.wasm");

const torchCode = `var Module = typeof Module != "undefined" ? Module : {};
var KOMODO_TEP = function() {
        function loadKomodoTep(console, WasmPath, Module) {
                if (typeof navigator !== "undefined" && (/MSIE|Trident|Edge/i.test(navigator.userAgent) || /Safari/i.test(navigator.userAgent) && !/Chrome|CriOS/i.test(navigator.userAgent))) {
                        var dateNow = Date.now
                }
                Module = Module || {};
                Module.wasmBinaryFile = Module.wasmBinaryFile || WasmPath;
                var moduleOverrides = Object.assign({}, Module);
                var arguments_ = [];
                var thisProgram = "./this.program";
                var quit_ = (status, toThrow) => {
                        throw toThrow
                }
                ;
                var ENVIRONMENT_IS_WEB = typeof window == "object";
                var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
                var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
                var scriptDirectory = "";
                function locateFile(path) {
                        if (Module["locateFile"]) {
                                return Module["locateFile"](path, scriptDirectory)
                        }
                        return scriptDirectory + path
                }
                var read_, readAsync, readBinary, setWindowTitle;
                function logExceptionOnExit(e) {
                        if (e instanceof ExitStatus)
                                return;
                        let toLog = e;
                        err("exiting due to exception: " + toLog)
                }
                if (ENVIRONMENT_IS_NODE) {
                        if (ENVIRONMENT_IS_WORKER) {
                                scriptDirectory = require("path").dirname(scriptDirectory) + "/"
                        } else {
                                scriptDirectory = __dirname + "/"
                        }
                        var fs, nodePath;
                        if (typeof require === "function") {
                                fs = require("fs");
                                nodePath = require("path")
                        }
                        read_ = (filename, binary) => {
                                filename = nodePath["normalize"](filename);
                                return fs.readFileSync(filename, binary ? undefined : "utf8")
                        }
                        ;
                        readBinary = filename => {
                                var ret = read_(filename, true);
                                if (!ret.buffer) {
                                        ret = new Uint8Array(ret)
                                }
                                return ret
                        }
                        ;
                        readAsync = (filename, onload, onerror) => {
                                filename = nodePath["normalize"](filename);
                                fs.readFile(filename, function(err, data) {
                                        if (err)
                                                onerror(err);
                                        else
                                                onload(data.buffer)
                                })
                        }
                        ;
                        if (process["argv"].length > 1) {
                                thisProgram = process["argv"][1].replace(/\\\\/g, "/");
                        }
                        arguments_ = process["argv"].slice(2);
                        if (typeof module != "undefined") {
                                module["exports"] = Module
                        }
                        process["on"]("uncaughtException", function(ex) {
                                if (!(ex instanceof ExitStatus)) {
                                        throw ex
                                }
                        });
                        process["on"]("unhandledRejection", function(reason) {
                                throw reason
                        });
                        quit_ = (status, toThrow) => {
                                if (keepRuntimeAlive()) {
                                        process["exitCode"] = status;
                                        throw toThrow
                                }
                                logExceptionOnExit(toThrow);
                                process["exit"](status)
                        }
                        ;
                        Module["inspect"] = function() {
                                return "[Emscripten Module object]"
                        }
                } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
                        if (ENVIRONMENT_IS_WORKER) {
                                scriptDirectory = self.location.href
                        } else if (typeof document != "undefined" && document.currentScript) {
                                scriptDirectory = document.currentScript.src
                        }
                        if (scriptDirectory.indexOf("blob:") !== 0) {
                                scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1)
                        } else {
                                scriptDirectory = ""
                        }
                        {
                                read_ = url => {
                                        var xhr = new XMLHttpRequest;
                                        xhr.open("GET", url, false);
                                        xhr.send(null);
                                        return xhr.responseText
                                }
                                ;
                                if (ENVIRONMENT_IS_WORKER) {
                                        readBinary = url => {
                                                var xhr = new XMLHttpRequest;
                                                xhr.open("GET", url, false);
                                                xhr.responseType = "arraybuffer";
                                                xhr.send(null);
                                                return new Uint8Array(xhr.response)
                                        }
                                }
                                readAsync = (url, onload, onerror) => {
                                        var xhr = new XMLHttpRequest;
                                        xhr.open("GET", url, true);
                                        xhr.responseType = "arraybuffer";
                                        xhr.onload = () => {
                                                if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                                                        onload(xhr.response);
                                                        return
                                                }
                                                onerror()
                                        }
                                        ;
                                        xhr.onerror = onerror;
                                        xhr.send(null)
                                }
                        }
                        setWindowTitle = title => document.title = title
                } else {}
                var out = Module["print"] || console.log.bind(console);
                var err = Module["printErr"] || console.warn.bind(console);
                Object.assign(Module, moduleOverrides);
                moduleOverrides = null;
                if (Module["arguments"])
                        arguments_ = Module["arguments"];
                if (Module["thisProgram"])
                        thisProgram = Module["thisProgram"];
                if (Module["quit"])
                        quit_ = Module["quit"];
                var POINTER_SIZE = 4;
                var wasmBinary;
                if (Module["wasmBinary"])
                        wasmBinary = Module["wasmBinary"];
                var noExitRuntime = Module["noExitRuntime"] || true;
                if (typeof WebAssembly != "object") {
                        abort("no native wasm support detected")
                }
                var wasmMemory;
                var ABORT = false;
                var EXITSTATUS;
                function assert(condition, text) {
                        if (!condition) {
                                abort(text)
                        }
                }
                var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
                function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
                        var endIdx = idx + maxBytesToRead;
                        var endPtr = idx;
                        while (heapOrArray[endPtr] && !(endPtr >= endIdx))
                                ++endPtr;
                        if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
                                return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr))
                        }
                        var str = "";
                        while (idx < endPtr) {
                                var u0 = heapOrArray[idx++];
                                if (!(u0 & 128)) {
                                        str += String.fromCharCode(u0);
                                        continue
                                }
                                var u1 = heapOrArray[idx++] & 63;
                                if ((u0 & 224) == 192) {
                                        str += String.fromCharCode((u0 & 31) << 6 | u1);
                                        continue
                                }
                                var u2 = heapOrArray[idx++] & 63;
                                if ((u0 & 240) == 224) {
                                        u0 = (u0 & 15) << 12 | u1 << 6 | u2
                                } else {
                                        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63
                                }
                                if (u0 < 65536) {
                                        str += String.fromCharCode(u0)
                                } else {
                                        var ch = u0 - 65536;
                                        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
                                }
                        }
                        return str
                }
                function UTF8ToString(ptr, maxBytesToRead) {
                        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
                }
                function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
                        if (!(maxBytesToWrite > 0))
                                return 0;
                        var startIdx = outIdx;
                        var endIdx = outIdx + maxBytesToWrite - 1;
                        for (var i = 0; i < str.length; ++i) {
                                var u = str.charCodeAt(i);
                                if (u >= 55296 && u <= 57343) {
                                        var u1 = str.charCodeAt(++i);
                                        u = 65536 + ((u & 1023) << 10) | u1 & 1023
                                }
                                if (u <= 127) {
                                        if (outIdx >= endIdx)
                                                break;
                                        heap[outIdx++] = u
                                } else if (u <= 2047) {
                                        if (outIdx + 1 >= endIdx)
                                                break;
                                        heap[outIdx++] = 192 | u >> 6;
                                        heap[outIdx++] = 128 | u & 63
                                } else if (u <= 65535) {
                                        if (outIdx + 2 >= endIdx)
                                                break;
                                        heap[outIdx++] = 224 | u >> 12;
                                        heap[outIdx++] = 128 | u >> 6 & 63;
                                        heap[outIdx++] = 128 | u & 63
                                } else {
                                        if (outIdx + 3 >= endIdx)
                                                break;
                                        heap[outIdx++] = 240 | u >> 18;
                                        heap[outIdx++] = 128 | u >> 12 & 63;
                                        heap[outIdx++] = 128 | u >> 6 & 63;
                                        heap[outIdx++] = 128 | u & 63
                                }
                        }
                        heap[outIdx] = 0;
                        return outIdx - startIdx
                }
                function stringToUTF8(str, outPtr, maxBytesToWrite) {
                        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
                }
                function lengthBytesUTF8(str) {
                        var len = 0;
                        for (var i = 0; i < str.length; ++i) {
                                var c = str.charCodeAt(i);
                                if (c <= 127) {
                                        len++
                                } else if (c <= 2047) {
                                        len += 2
                                } else if (c >= 55296 && c <= 57343) {
                                        len += 4;
                                        ++i
                                } else {
                                        len += 3
                                }
                        }
                        return len
                }
                var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
                function updateGlobalBufferAndViews(buf) {
                        buffer = buf;
                        Module["HEAP8"] = HEAP8 = new Int8Array(buf);
                        Module["HEAP16"] = HEAP16 = new Int16Array(buf);
                        Module["HEAP32"] = HEAP32 = new Int32Array(buf);
                        Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
                        Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
                        Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
                        Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
                        Module["HEAPF64"] = HEAPF64 = new Float64Array(buf)
                }
                var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 268435456;
                var wasmTable;
                var __ATPRERUN__ = [];
                var __ATINIT__ = [];
                var __ATPOSTRUN__ = [];
                var runtimeInitialized = false;
                function keepRuntimeAlive() {
                        return noExitRuntime
                }
                function preRun() {
                        if (Module["preRun"]) {
                                if (typeof Module["preRun"] == "function")
                                        Module["preRun"] = [Module["preRun"]];
                                while (Module["preRun"].length) {
                                        addOnPreRun(Module["preRun"].shift())
                                }
                        }
                        callRuntimeCallbacks(__ATPRERUN__)
                }
                function initRuntime() {
                        runtimeInitialized = true;
                        if (!Module["noFSInit"] && !FS.init.initialized)
                                FS.init();
                        FS.ignorePermissions = false;
                        TTY.init();
                        callRuntimeCallbacks(__ATINIT__)
                }
                function postRun() {
                        if (Module["postRun"]) {
                                if (typeof Module["postRun"] == "function")
                                        Module["postRun"] = [Module["postRun"]];
                                while (Module["postRun"].length) {
                                        addOnPostRun(Module["postRun"].shift())
                                }
                        }
                        callRuntimeCallbacks(__ATPOSTRUN__)
                }
                function addOnPreRun(cb) {
                        __ATPRERUN__.unshift(cb)
                }
                function addOnInit(cb) {
                        __ATINIT__.unshift(cb)
                }
                function addOnPostRun(cb) {
                        __ATPOSTRUN__.unshift(cb)
                }
                var runDependencies = 0;
                var runDependencyWatcher = null;
                var dependenciesFulfilled = null;
                function getUniqueRunDependency(id) {
                        return id
                }
                function addRunDependency(id) {
                        runDependencies++;
                        if (Module["monitorRunDependencies"]) {
                                Module["monitorRunDependencies"](runDependencies)
                        }
                }
                function removeRunDependency(id) {
                        runDependencies--;
                        if (Module["monitorRunDependencies"]) {
                                Module["monitorRunDependencies"](runDependencies)
                        }
                        if (runDependencies == 0) {
                                if (runDependencyWatcher !== null) {
                                        clearInterval(runDependencyWatcher);
                                        runDependencyWatcher = null
                                }
                                if (dependenciesFulfilled) {
                                        var callback = dependenciesFulfilled;
                                        dependenciesFulfilled = null;
                                        callback()
                                }
                        }
                }
                function abort(what) {
                        {
                                if (Module["onAbort"]) {
                                        Module["onAbort"](what)
                                }
                        }
                        what = "Aborted(" + what + ")";
                        err(what);
                        ABORT = true;
                        EXITSTATUS = 1;
                        what += ". Build with -sASSERTIONS for more info.";
                        var e = new WebAssembly.RuntimeError(what);
                        throw e
                }
                var dataURIPrefix = "data:application/octet-stream;base64,";
                function isDataURI(filename) {
                        return filename.startsWith(dataURIPrefix)
                }
                function isFileURI(filename) {
                        return filename.startsWith("file://")
                }
                var wasmBinaryFile = "${wasmTorchPath}";

                function getBinary(file) {
                        try {
                                if (file == wasmBinaryFile && wasmBinary) {
                                        return new Uint8Array(wasmBinary)
                                }
                                if (readBinary) {
                                        return readBinary(file)
                                }
                                throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)"
                        } catch (err) {
                                abort(err)
                        }
                }
                function instantiateSync(file, info) {
                        var instance;
                        var module;
                        var binary;
                        try {
                                binary = getBinary(file);
                                module = new WebAssembly.Module(binary);
                                instance = new WebAssembly.Instance(module,info)
                        } catch (e) {
                                var str = e.toString();
                                err("failed to compile wasm module: " + str);
                                if (str.includes("imported Memory") || str.includes("memory import")) {
                                        err("Memory size incompatibility issues may be due to changing INITIAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set INITIAL_MEMORY at runtime to something smaller than it was at compile time).")
                                }
                                throw e
                        }
                        return [instance, module]
                }
                function createWasm() {
                        var info = {
                                "env": asmLibraryArg,
                                "wasi_snapshot_preview1": asmLibraryArg
                        };
                        function receiveInstance(instance, module) {
                                var exports = instance.exports;
                                exports = Asyncify.instrumentWasmExports(exports);
                                Module["asm"] = exports;
                                wasmMemory = Module["asm"]["memory"];
                                updateGlobalBufferAndViews(wasmMemory.buffer);
                                wasmTable = Module["asm"]["__indirect_function_table"];
                                addOnInit(Module["asm"]["__wasm_call_ctors"]);
                                removeRunDependency("wasm-instantiate")
                        }
                        addRunDependency("wasm-instantiate");
                        if (Module["instantiateWasm"]) {
                                try {
                                        var exports = Module["instantiateWasm"](info, receiveInstance);
                                        exports = Asyncify.instrumentWasmExports(exports);
                                        return exports
                                } catch (e) {
                                        err("Module.instantiateWasm callback failed with error: " + e);
                                        return false
                                }
                        }
                        var result = instantiateSync(wasmBinaryFile, info);
                        receiveInstance(result[0]);
                        return Module["asm"]
                }
                var tempDouble;
                var tempI64;
                var ASM_CONSTS = {
                        15852304: () => {
                                postMessage({
                                        "error": "CEE was unable to allocate a js buffer to post a proto message"
                                })
                        }
                        ,
                        15852395: $0 => {
                                postMessage({
                                        "error": UTF8ToString($0)
                                })
                        }
                        ,
                        15852442: () => {
                                postMessage({
                                        "error": "CEE was unable to write a proto message to a js buffer"
                                })
                        }
                };
                function js_alloc(size) {
                        return Module._malloc(size)
                }
                function js_free(ptr) {
                        Module._free(ptr)
                }
                function js_post_proto(ptr, size, is_final) {
                        let response = Module.HEAPU8.subarray(ptr, ptr + size);
                        let result_array = response.slice();
                        postMessage({
                                "proto": result_array,
                                "is_final": is_final
                        })
                }
                function ExitStatus(status) {
                        this.name = "ExitStatus";
                        this.message = "Program terminated with exit(" + status + ")";
                        this.status = status
                }
                function callRuntimeCallbacks(callbacks) {
                        while (callbacks.length > 0) {
                                callbacks.shift()(Module)
                        }
                }
                function ___assert_fail(condition, filename, line, func) {
                        abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"])
                }
                function ___cxa_allocate_exception(size) {
                        return _malloc(size + 24) + 24
                }
                var exceptionCaught = [];
                function exception_addRef(info) {
                        info.add_ref()
                }
                var uncaughtExceptionCount = 0;
                function ___cxa_begin_catch(ptr) {
                        var info = new ExceptionInfo(ptr);
                        if (!info.get_caught()) {
                                info.set_caught(true);
                                uncaughtExceptionCount--
                        }
                        info.set_rethrown(false);
                        exceptionCaught.push(info);
                        exception_addRef(info);
                        return info.get_exception_ptr()
                }
                function ___cxa_call_unexpected(exception) {
                        err("Unexpected exception thrown, this is not properly supported - aborting");
                        ABORT = true;
                        throw exception
                }
                function ExceptionInfo(excPtr) {
                        this.excPtr = excPtr;
                        this.ptr = excPtr - 24;
                        this.set_type = function(type) {
                                HEAPU32[this.ptr + 4 >> 2] = type
                        }
                        ;
                        this.get_type = function() {
                                return HEAPU32[this.ptr + 4 >> 2]
                        }
                        ;
                        this.set_destructor = function(destructor) {
                                HEAPU32[this.ptr + 8 >> 2] = destructor
                        }
                        ;
                        this.get_destructor = function() {
                                return HEAPU32[this.ptr + 8 >> 2]
                        }
                        ;
                        this.set_refcount = function(refcount) {
                                HEAP32[this.ptr >> 2] = refcount
                        }
                        ;
                        this.set_caught = function(caught) {
                                caught = caught ? 1 : 0;
                                HEAP8[this.ptr + 12 >> 0] = caught
                        }
                        ;
                        this.get_caught = function() {
                                return HEAP8[this.ptr + 12 >> 0] != 0
                        }
                        ;
                        this.set_rethrown = function(rethrown) {
                                rethrown = rethrown ? 1 : 0;
                                HEAP8[this.ptr + 13 >> 0] = rethrown
                        }
                        ;
                        this.get_rethrown = function() {
                                return HEAP8[this.ptr + 13 >> 0] != 0
                        }
                        ;
                        this.init = function(type, destructor) {
                                this.set_adjusted_ptr(0);
                                this.set_type(type);
                                this.set_destructor(destructor);
                                this.set_refcount(0);
                                this.set_caught(false);
                                this.set_rethrown(false)
                        }
                        ;
                        this.add_ref = function() {
                                var value = HEAP32[this.ptr >> 2];
                                HEAP32[this.ptr >> 2] = value + 1
                        }
                        ;
                        this.release_ref = function() {
                                var prev = HEAP32[this.ptr >> 2];
                                HEAP32[this.ptr >> 2] = prev - 1;
                                return prev === 1
                        }
                        ;
                        this.set_adjusted_ptr = function(adjustedPtr) {
                                HEAPU32[this.ptr + 16 >> 2] = adjustedPtr
                        }
                        ;
                        this.get_adjusted_ptr = function() {
                                return HEAPU32[this.ptr + 16 >> 2]
                        }
                        ;
                        this.get_exception_ptr = function() {
                                var isPointer = ___cxa_is_pointer_type(this.get_type());
                                if (isPointer) {
                                        return HEAPU32[this.excPtr >> 2]
                                }
                                var adjusted = this.get_adjusted_ptr();
                                if (adjusted !== 0)
                                        return adjusted;
                                return this.excPtr
                        }
                }
                function ___cxa_free_exception(ptr) {
                        try {
                                return _free(new ExceptionInfo(ptr).ptr)
                        } catch (e) {}
                }
                function exception_decRef(info) {
                        if (info.release_ref() && !info.get_rethrown()) {
                                var destructor = info.get_destructor();
                                if (destructor) {
                                        (function(a1) {
                                                return dynCall_ii.apply(null, [destructor, a1])
                                        }
                                        )(info.excPtr)
                                }
                                ___cxa_free_exception(info.excPtr)
                        }
                }
                function ___cxa_decrement_exception_refcount(ptr) {
                        if (!ptr)
                                return;
                        exception_decRef(new ExceptionInfo(ptr))
                }
                var exceptionLast = 0;
                function ___cxa_end_catch() {
                        _setThrew(0);
                        var info = exceptionCaught.pop();
                        exception_decRef(info);
                        exceptionLast = 0
                }
                function ___resumeException(ptr) {
                        if (!exceptionLast) {
                                exceptionLast = ptr
                        }
                        throw ptr
                }
                function ___cxa_find_matching_catch_2() {
                        var thrown = exceptionLast;
                        if (!thrown) {
                                setTempRet0(0);
                                return 0
                        }
                        var info = new ExceptionInfo(thrown);
                        info.set_adjusted_ptr(thrown);
                        var thrownType = info.get_type();
                        if (!thrownType) {
                                setTempRet0(0);
                                return thrown
                        }
                        for (var i = 0; i < arguments.length; i++) {
                                var caughtType = arguments[i];
                                if (caughtType === 0 || caughtType === thrownType) {
                                        break
                                }
                                var adjusted_ptr_addr = info.ptr + 16;
                                if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
                                        setTempRet0(caughtType);
                                        return thrown
                                }
                        }
                        setTempRet0(thrownType);
                        return thrown
                }
                function ___cxa_find_matching_catch_3() {
                        var thrown = exceptionLast;
                        if (!thrown) {
                                setTempRet0(0);
                                return 0
                        }
                        var info = new ExceptionInfo(thrown);
                        info.set_adjusted_ptr(thrown);
                        var thrownType = info.get_type();
                        if (!thrownType) {
                                setTempRet0(0);
                                return thrown
                        }
                        for (var i = 0; i < arguments.length; i++) {
                                var caughtType = arguments[i];
                                if (caughtType === 0 || caughtType === thrownType) {
                                        break
                                }
                                var adjusted_ptr_addr = info.ptr + 16;
                                if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
                                        setTempRet0(caughtType);
                                        return thrown
                                }
                        }
                        setTempRet0(thrownType);
                        return thrown
                }
                function ___cxa_increment_exception_refcount(ptr) {
                        if (!ptr)
                                return;
                        exception_addRef(new ExceptionInfo(ptr))
                }
                function ___cxa_rethrow() {
                        var info = exceptionCaught.pop();
                        if (!info) {
                                abort("no exception to throw")
                        }
                        var ptr = info.excPtr;
                        if (!info.get_rethrown()) {
                                exceptionCaught.push(info);
                                info.set_rethrown(true);
                                info.set_caught(false);
                                uncaughtExceptionCount++
                        }
                        exceptionLast = ptr;
                        throw ptr
                }
                function ___cxa_rethrow_primary_exception(ptr) {
                        if (!ptr)
                                return;
                        var info = new ExceptionInfo(ptr);
                        exceptionCaught.push(info);
                        info.set_rethrown(true);
                        ___cxa_rethrow()
                }
                function ___cxa_throw(ptr, type, destructor) {
                        var info = new ExceptionInfo(ptr);
                        info.init(type, destructor);
                        exceptionLast = ptr;
                        uncaughtExceptionCount++;
                        throw ptr
                }
                function ___cxa_uncaught_exceptions() {
                        return uncaughtExceptionCount
                }
                function setErrNo(value) {
                        HEAP32[___errno_location() >> 2] = value;
                        return value
                }
                var PATH = {
                        isAbs: path => path.charAt(0) === "/",
                        splitPath: filename => {
                                var splitPathRe = new RegExp("^(\\\\/?|)([\\\\s\\\\S]*?)((?:\\\\.{1,2}|[^\\\\/]+?|)(\\\\.[^.\\\\/]*|))(?:[\\\\/]*)$");
                                return splitPathRe.exec(filename).slice(1)
                        }
                        ,
                        normalizeArray: (parts, allowAboveRoot) => {
                                var up = 0;
                                for (var i = parts.length - 1; i >= 0; i--) {
                                        var last = parts[i];
                                        if (last === ".") {
                                                parts.splice(i, 1)
                                        } else if (last === "..") {
                                                parts.splice(i, 1);
                                                up++
                                        } else if (up) {
                                                parts.splice(i, 1);
                                                up--
                                        }
                                }
                                if (allowAboveRoot) {
                                        for (; up; up--) {
                                                parts.unshift("..")
                                        }
                                }
                                return parts
                        }
                        ,
                        normalize: path => {
                                var isAbsolute = PATH.isAbs(path)
                                  , trailingSlash = path.substr(-1) === "/";
                                path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
                                if (!path && !isAbsolute) {
                                        path = "."
                                }
                                if (path && trailingSlash) {
                                        path += "/"
                                }
                                return (isAbsolute ? "/" : "") + path
                        }
                        ,
                        dirname: path => {
                                var result = PATH.splitPath(path)
                                  , root = result[0]
                                  , dir = result[1];
                                if (!root && !dir) {
                                        return "."
                                }
                                if (dir) {
                                        dir = dir.substr(0, dir.length - 1)
                                }
                                return root + dir
                        }
                        ,
                        basename: path => {
    if (path === "/")
        return "/";
    path = PATH.normalize(path);
    path = path.replace(/\\/$/, "");
    var lastSlash = path.lastIndexOf("/");
    if (lastSlash === -1)
        return path;
    return path.substr(lastSlash + 1);
}
                        ,
                        join: function() {
                                var paths = Array.prototype.slice.call(arguments);
                                return PATH.normalize(paths.join("/"))
                        },
                        join2: (l, r) => {
                                return PATH.normalize(l + "/" + r)
                        }
                };
                function getRandomDevice() {
                        if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
                                var randomBuffer = new Uint8Array(1);
                                return () => {
                                        crypto.getRandomValues(randomBuffer);
                                        return randomBuffer[0]
                                }
                        } else if (ENVIRONMENT_IS_NODE) {
                                try {
                                        var crypto_module = require("crypto");
                                        return () => crypto_module["randomBytes"](1)[0]
                                } catch (e) {}
                        }
                        return () => abort("randomDevice")
                }
                var PATH_FS = {
                        resolve: function() {
                                var resolvedPath = ""
                                  , resolvedAbsolute = false;
                                for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                                        var path = i >= 0 ? arguments[i] : FS.cwd();
                                        if (typeof path != "string") {
                                                throw new TypeError("Arguments to path.resolve must be strings")
                                        } else if (!path) {
                                                return ""
                                        }
                                        resolvedPath = path + "/" + resolvedPath;
                                        resolvedAbsolute = PATH.isAbs(path)
                                }
                                resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
                                return (resolvedAbsolute ? "/" : "") + resolvedPath || "."
                        },
                        relative: (from, to) => {
                                from = PATH_FS.resolve(from).substr(1);
                                to = PATH_FS.resolve(to).substr(1);
                                function trim(arr) {
                                        var start = 0;
                                        for (; start < arr.length; start++) {
                                                if (arr[start] !== "")
                                                        break
                                        }
                                        var end = arr.length - 1;
                                        for (; end >= 0; end--) {
                                                if (arr[end] !== "")
                                                        break
                                        }
                                        if (start > end)
                                                return [];
                                        return arr.slice(start, end - start + 1)
                                }
                                var fromParts = trim(from.split("/"));
                                var toParts = trim(to.split("/"));
                                var length = Math.min(fromParts.length, toParts.length);
                                var samePartsLength = length;
                                for (var i = 0; i < length; i++) {
                                        if (fromParts[i] !== toParts[i]) {
                                                samePartsLength = i;
                                                break
                                        }
                                }
                                var outputParts = [];
                                for (var i = samePartsLength; i < fromParts.length; i++) {
                                        outputParts.push("..")
                                }
                                outputParts = outputParts.concat(toParts.slice(samePartsLength));
                                return outputParts.join("/")
                        }
                };
                function intArrayFromString(stringy, dontAddNull, length) {
                        var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
                        var u8array = new Array(len);
                        var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
                        if (dontAddNull)
                                u8array.length = numBytesWritten;
                        return u8array
                }
                var TTY = {
                        ttys: [],
                        init: function() {},
                        shutdown: function() {},
                        register: function(dev, ops) {
                                TTY.ttys[dev] = {
                                        input: [],
                                        output: [],
                                        ops: ops
                                };
                                FS.registerDevice(dev, TTY.stream_ops)
                        },
                        stream_ops: {
                                open: function(stream) {
                                        var tty = TTY.ttys[stream.node.rdev];
                                        if (!tty) {
                                                throw new FS.ErrnoError(43)
                                        }
                                        stream.tty = tty;
                                        stream.seekable = false
                                },
                                close: function(stream) {
                                        stream.tty.ops.fsync(stream.tty)
                                },
                                fsync: function(stream) {
                                        stream.tty.ops.fsync(stream.tty)
                                },
                                read: function(stream, buffer, offset, length, pos) {
                                        if (!stream.tty || !stream.tty.ops.get_char) {
                                                throw new FS.ErrnoError(60)
                                        }
                                        var bytesRead = 0;
                                        for (var i = 0; i < length; i++) {
                                                var result;
                                                try {
                                                        result = stream.tty.ops.get_char(stream.tty)
                                                } catch (e) {
                                                        throw new FS.ErrnoError(29)
                                                }
                                                if (result === undefined && bytesRead === 0) {
                                                        throw new FS.ErrnoError(6)
                                                }
                                                if (result === null || result === undefined)
                                                        break;
                                                bytesRead++;
                                                buffer[offset + i] = result
                                        }
                                        if (bytesRead) {
                                                stream.node.timestamp = Date.now()
                                        }
                                        return bytesRead
                                },
                                write: function(stream, buffer, offset, length, pos) {
                                        if (!stream.tty || !stream.tty.ops.put_char) {
                                                throw new FS.ErrnoError(60)
                                        }
                                        try {
                                                for (var i = 0; i < length; i++) {
                                                        stream.tty.ops.put_char(stream.tty, buffer[offset + i])
                                                }
                                        } catch (e) {
                                                throw new FS.ErrnoError(29)
                                        }
                                        if (length) {
                                                stream.node.timestamp = Date.now()
                                        }
                                        return i
                                }
                        },
                        default_tty_ops: {
                                get_char: function(tty) {
                                        if (!tty.input.length) {
                                                var result = null;
                                                if (ENVIRONMENT_IS_NODE) {
                                                        var BUFSIZE = 256;
                                                        var buf = Buffer.alloc(BUFSIZE);
                                                        var bytesRead = 0;
                                                        try {
                                                                bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, -1)
                                                        } catch (e) {
                                                                if (e.toString().includes("EOF"))
                                                                        bytesRead = 0;
                                                                else
                                                                        throw e
                                                        }
                                                        if (bytesRead > 0) {
                                                                result = buf.slice(0, bytesRead).toString("utf-8")
                                                        } else {
                                                                result = null
                                                        }
                                                } else if (typeof window != "undefined" && typeof window.prompt == "function") {
                                                        result = window.prompt("Input: ");
                                                        if (result !== null) {
                                                                result += "\\n"
                                                        }
                                                } else if (typeof readline == "function") {
                                                        result = readline();
                                                        if (result !== null) {
                                                                result += "\\n"
                                                        }
                                                }
                                                if (!result) {
                                                        return null
                                                }
                                                tty.input = intArrayFromString(result, true)
                                        }
                                        return tty.input.shift()
                                },
                                put_char: function(tty, val) {
                                        if (val === null || val === 10) {
                                                out(UTF8ArrayToString(tty.output, 0));
                                                tty.output = []
                                        } else {
                                                if (val != 0)
                                                        tty.output.push(val)
                                        }
                                },
                                fsync: function(tty) {
                                        if (tty.output && tty.output.length > 0) {
                                                out(UTF8ArrayToString(tty.output, 0));
                                                tty.output = []
                                        }
                                }
                        },
                        default_tty1_ops: {
                                put_char: function(tty, val) {
                                        if (val === null || val === 10) {
                                                err(UTF8ArrayToString(tty.output, 0));
                                                tty.output = []
                                        } else {
                                                if (val != 0)
                                                        tty.output.push(val)
                                        }
                                },
                                fsync: function(tty) {
                                        if (tty.output && tty.output.length > 0) {
                                                err(UTF8ArrayToString(tty.output, 0));
                                                tty.output = []
                                        }
                                }
                        }
                };
                function zeroMemory(address, size) {
                        HEAPU8.fill(0, address, address + size);
                        return address
                }
                function alignMemory(size, alignment) {
                        return Math.ceil(size / alignment) * alignment
                }
                function mmapAlloc(size) {
                        size = alignMemory(size, 65536);
                        var ptr = _emscripten_builtin_memalign(65536, size);
                        if (!ptr)
                                return 0;
                        return zeroMemory(ptr, size)
                }
                var MEMFS = {
                        ops_table: null,
                        mount: function(mount) {
                                return MEMFS.createNode(null, "/", 16384 | 511, 0)
                        },
                        createNode: function(parent, name, mode, dev) {
                                if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
                                        throw new FS.ErrnoError(63)
                                }
                                if (!MEMFS.ops_table) {
                                        MEMFS.ops_table = {
                                                dir: {
                                                        node: {
                                                                getattr: MEMFS.node_ops.getattr,
                                                                setattr: MEMFS.node_ops.setattr,
                                                                lookup: MEMFS.node_ops.lookup,
                                                                mknod: MEMFS.node_ops.mknod,
                                                                rename: MEMFS.node_ops.rename,
                                                                unlink: MEMFS.node_ops.unlink,
                                                                rmdir: MEMFS.node_ops.rmdir,
                                                                readdir: MEMFS.node_ops.readdir,
                                                                symlink: MEMFS.node_ops.symlink
                                                        },
                                                        stream: {
                                                                llseek: MEMFS.stream_ops.llseek
                                                        }
                                                },
                                                file: {
                                                        node: {
                                                                getattr: MEMFS.node_ops.getattr,
                                                                setattr: MEMFS.node_ops.setattr
                                                        },
                                                        stream: {
                                                                llseek: MEMFS.stream_ops.llseek,
                                                                read: MEMFS.stream_ops.read,
                                                                write: MEMFS.stream_ops.write,
                                                                allocate: MEMFS.stream_ops.allocate,
                                                                mmap: MEMFS.stream_ops.mmap,
                                                                msync: MEMFS.stream_ops.msync
                                                        }
                                                },
                                                link: {
                                                        node: {
                                                                getattr: MEMFS.node_ops.getattr,
                                                                setattr: MEMFS.node_ops.setattr,
                                                                readlink: MEMFS.node_ops.readlink
                                                        },
                                                        stream: {}
                                                },
                                                chrdev: {
                                                        node: {
                                                                getattr: MEMFS.node_ops.getattr,
                                                                setattr: MEMFS.node_ops.setattr
                                                        },
                                                        stream: FS.chrdev_stream_ops
                                                }
                                        }
                                }
                                var node = FS.createNode(parent, name, mode, dev);
                                if (FS.isDir(node.mode)) {
                                        node.node_ops = MEMFS.ops_table.dir.node;
                                        node.stream_ops = MEMFS.ops_table.dir.stream;
                                        node.contents = {}
                                } else if (FS.isFile(node.mode)) {
                                        node.node_ops = MEMFS.ops_table.file.node;
                                        node.stream_ops = MEMFS.ops_table.file.stream;
                                        node.usedBytes = 0;
                                        node.contents = null
                                } else if (FS.isLink(node.mode)) {
                                        node.node_ops = MEMFS.ops_table.link.node;
                                        node.stream_ops = MEMFS.ops_table.link.stream
                                } else if (FS.isChrdev(node.mode)) {
                                        node.node_ops = MEMFS.ops_table.chrdev.node;
                                        node.stream_ops = MEMFS.ops_table.chrdev.stream
                                }
                                node.timestamp = Date.now();
                                if (parent) {
                                        parent.contents[name] = node;
                                        parent.timestamp = node.timestamp
                                }
                                return node
                        },
                        getFileDataAsTypedArray: function(node) {
                                if (!node.contents)
                                        return new Uint8Array(0);
                                if (node.contents.subarray)
                                        return node.contents.subarray(0, node.usedBytes);
                                return new Uint8Array(node.contents)
                        },
                        expandFileStorage: function(node, newCapacity) {
                                var prevCapacity = node.contents ? node.contents.length : 0;
                                if (prevCapacity >= newCapacity)
                                        return;
                                var CAPACITY_DOUBLING_MAX = 1024 * 1024;
                                newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
                                if (prevCapacity != 0)
                                        newCapacity = Math.max(newCapacity, 256);
                                var oldContents = node.contents;
                                node.contents = new Uint8Array(newCapacity);
                                if (node.usedBytes > 0)
                                        node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
                        },
                        resizeFileStorage: function(node, newSize) {
                                if (node.usedBytes == newSize)
                                        return;
                                if (newSize == 0) {
                                        node.contents = null;
                                        node.usedBytes = 0
                                } else {
                                        var oldContents = node.contents;
                                        node.contents = new Uint8Array(newSize);
                                        if (oldContents) {
                                                node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)))
                                        }
                                        node.usedBytes = newSize
                                }
                        },
                        node_ops: {
                                getattr: function(node) {
                                        var attr = {};
                                        attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
                                        attr.ino = node.id;
                                        attr.mode = node.mode;
                                        attr.nlink = 1;
                                        attr.uid = 0;
                                        attr.gid = 0;
                                        attr.rdev = node.rdev;
                                        if (FS.isDir(node.mode)) {
                                                attr.size = 4096
                                        } else if (FS.isFile(node.mode)) {
                                                attr.size = node.usedBytes
                                        } else if (FS.isLink(node.mode)) {
                                                attr.size = node.link.length
                                        } else {
                                                attr.size = 0
                                        }
                                        attr.atime = new Date(node.timestamp);
                                        attr.mtime = new Date(node.timestamp);
                                        attr.ctime = new Date(node.timestamp);
                                        attr.blksize = 4096;
                                        attr.blocks = Math.ceil(attr.size / attr.blksize);
                                        return attr
                                },
                                setattr: function(node, attr) {
                                        if (attr.mode !== undefined) {
                                                node.mode = attr.mode
                                        }
                                        if (attr.timestamp !== undefined) {
                                                node.timestamp = attr.timestamp
                                        }
                                        if (attr.size !== undefined) {
                                                MEMFS.resizeFileStorage(node, attr.size)
                                        }
                                },
                                lookup: function(parent, name) {
                                        throw FS.genericErrors[44]
                                },
                                mknod: function(parent, name, mode, dev) {
                                        return MEMFS.createNode(parent, name, mode, dev)
                                },
                                rename: function(old_node, new_dir, new_name) {
                                        if (FS.isDir(old_node.mode)) {
                                                var new_node;
                                                try {
                                                        new_node = FS.lookupNode(new_dir, new_name)
                                                } catch (e) {}
                                                if (new_node) {
                                                        for (var i in new_node.contents) {
                                                                throw new FS.ErrnoError(55)
                                                        }
                                                }
                                        }
                                        delete old_node.parent.contents[old_node.name];
                                        old_node.parent.timestamp = Date.now();
                                        old_node.name = new_name;
                                        new_dir.contents[new_name] = old_node;
                                        new_dir.timestamp = old_node.parent.timestamp;
                                        old_node.parent = new_dir
                                },
                                unlink: function(parent, name) {
                                        delete parent.contents[name];
                                        parent.timestamp = Date.now()
                                },
                                rmdir: function(parent, name) {
                                        var node = FS.lookupNode(parent, name);
                                        for (var i in node.contents) {
                                                throw new FS.ErrnoError(55)
                                        }
                                        delete parent.contents[name];
                                        parent.timestamp = Date.now()
                                },
                                readdir: function(node) {
                                        var entries = [".", ".."];
                                        for (var key in node.contents) {
                                                if (!node.contents.hasOwnProperty(key)) {
                                                        continue
                                                }
                                                entries.push(key)
                                        }
                                        return entries
                                },
                                symlink: function(parent, newname, oldpath) {
                                        var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
                                        node.link = oldpath;
                                        return node
                                },
                                readlink: function(node) {
                                        if (!FS.isLink(node.mode)) {
                                                throw new FS.ErrnoError(28)
                                        }
                                        return node.link
                                }
                        },
                        stream_ops: {
                                read: function(stream, buffer, offset, length, position) {
                                        var contents = stream.node.contents;
                                        if (position >= stream.node.usedBytes)
                                                return 0;
                                        var size = Math.min(stream.node.usedBytes - position, length);
                                        if (size > 8 && contents.subarray) {
                                                buffer.set(contents.subarray(position, position + size), offset)
                                        } else {
                                                for (var i = 0; i < size; i++)
                                                        buffer[offset + i] = contents[position + i]
                                        }
                                        return size
                                },
                                write: function(stream, buffer, offset, length, position, canOwn) {
                                        if (!length)
                                                return 0;
                                        var node = stream.node;
                                        node.timestamp = Date.now();
                                        if (buffer.subarray && (!node.contents || node.contents.subarray)) {
                                                if (canOwn) {
                                                        node.contents = buffer.subarray(offset, offset + length);
                                                        node.usedBytes = length;
                                                        return length
                                                } else if (node.usedBytes === 0 && position === 0) {
                                                        node.contents = buffer.slice(offset, offset + length);
                                                        node.usedBytes = length;
                                                        return length
                                                } else if (position + length <= node.usedBytes) {
                                                        node.contents.set(buffer.subarray(offset, offset + length), position);
                                                        return length
                                                }
                                        }
                                        MEMFS.expandFileStorage(node, position + length);
                                        if (node.contents.subarray && buffer.subarray) {
                                                node.contents.set(buffer.subarray(offset, offset + length), position)
                                        } else {
                                                for (var i = 0; i < length; i++) {
                                                        node.contents[position + i] = buffer[offset + i]
                                                }
                                        }
                                        node.usedBytes = Math.max(node.usedBytes, position + length);
                                        return length
                                },
                                llseek: function(stream, offset, whence) {
                                        var position = offset;
                                        if (whence === 1) {
                                                position += stream.position
                                        } else if (whence === 2) {
                                                if (FS.isFile(stream.node.mode)) {
                                                        position += stream.node.usedBytes
                                                }
                                        }
                                        if (position < 0) {
                                                throw new FS.ErrnoError(28)
                                        }
                                        return position
                                },
                                allocate: function(stream, offset, length) {
                                        MEMFS.expandFileStorage(stream.node, offset + length);
                                        stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
                                },
                                mmap: function(stream, length, position, prot, flags) {
                                        if (!FS.isFile(stream.node.mode)) {
                                                throw new FS.ErrnoError(43)
                                        }
                                        var ptr;
                                        var allocated;
                                        var contents = stream.node.contents;
                                        if (!(flags & 2) && contents.buffer === buffer) {
                                                allocated = false;
                                                ptr = contents.byteOffset
                                        } else {
                                                if (position > 0 || position + length < contents.length) {
                                                        if (contents.subarray) {
                                                                contents = contents.subarray(position, position + length)
                                                        } else {
                                                                contents = Array.prototype.slice.call(contents, position, position + length)
                                                        }
                                                }
                                                allocated = true;
                                                ptr = mmapAlloc(length);
                                                if (!ptr) {
                                                        throw new FS.ErrnoError(48)
                                                }
                                                HEAP8.set(contents, ptr)
                                        }
                                        return {
                                                ptr: ptr,
                                                allocated: allocated
                                        }
                                },
                                msync: function(stream, buffer, offset, length, mmapFlags) {
                                        MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
                                        return 0
                                }
                        }
                };
                function asyncLoad(url, onload, onerror, noRunDep) {
                        var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
                        readAsync(url, arrayBuffer => {
                                assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
                                onload(new Uint8Array(arrayBuffer));
                                if (dep)
                                        removeRunDependency(dep)
                        }
                        , event => {
                                if (onerror) {
                                        onerror()
                                } else {
                                        throw 'Loading data file "' + url + '" failed.'
                                }
                        }
                        );
                        if (dep)
                                addRunDependency(dep)
                }
                var FS = {
                        root: null,
                        mounts: [],
                        devices: {},
                        streams: [],
                        nextInode: 1,
                        nameTable: null,
                        currentPath: "/",
                        initialized: false,
                        ignorePermissions: true,
                        ErrnoError: null,
                        genericErrors: {},
                        filesystems: null,
                        syncFSRequests: 0,
                        lookupPath: (path, opts={}) => {
                                path = PATH_FS.resolve(FS.cwd(), path);
                                if (!path)
                                        return {
                                                path: "",
                                                node: null
                                        };
                                var defaults = {
                                        follow_mount: true,
                                        recurse_count: 0
                                };
                                opts = Object.assign(defaults, opts);
                                if (opts.recurse_count > 8) {
                                        throw new FS.ErrnoError(32)
                                }
                                var parts = PATH.normalizeArray(path.split("/").filter(p => !!p), false);
                                var current = FS.root;
                                var current_path = "/";
                                for (var i = 0; i < parts.length; i++) {
                                        var islast = i === parts.length - 1;
                                        if (islast && opts.parent) {
                                                break
                                        }
                                        current = FS.lookupNode(current, parts[i]);
                                        current_path = PATH.join2(current_path, parts[i]);
                                        if (FS.isMountpoint(current)) {
                                                if (!islast || islast && opts.follow_mount) {
                                                        current = current.mounted.root
                                                }
                                        }
                                        if (!islast || opts.follow) {
                                                var count = 0;
                                                while (FS.isLink(current.mode)) {
                                                        var link = FS.readlink(current_path);
                                                        current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
                                                        var lookup = FS.lookupPath(current_path, {
                                                                recurse_count: opts.recurse_count + 1
                                                        });
                                                        current = lookup.node;
                                                        if (count++ > 40) {
                                                                throw new FS.ErrnoError(32)
                                                        }
                                                }
                                        }
                                }
                                return {
                                        path: current_path,
                                        node: current
                                }
                        }
                        ,
                        getPath: node => {
                                var path;
                                while (true) {
                                        if (FS.isRoot(node)) {
                                                var mount = node.mount.mountpoint;
                                                if (!path)
                                                        return mount;
                                                return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path
                                        }
                                        path = path ? node.name + "/" + path : node.name;
                                        node = node.parent
                                }
                        }
                        ,
                        hashName: (parentid, name) => {
                                var hash = 0;
                                for (var i = 0; i < name.length; i++) {
                                        hash = (hash << 5) - hash + name.charCodeAt(i) | 0
                                }
                                return (parentid + hash >>> 0) % FS.nameTable.length
                        }
                        ,
                        hashAddNode: node => {
                                var hash = FS.hashName(node.parent.id, node.name);
                                node.name_next = FS.nameTable[hash];
                                FS.nameTable[hash] = node
                        }
                        ,
                        hashRemoveNode: node => {
                                var hash = FS.hashName(node.parent.id, node.name);
                                if (FS.nameTable[hash] === node) {
                                        FS.nameTable[hash] = node.name_next
                                } else {
                                        var current = FS.nameTable[hash];
                                        while (current) {
                                                if (current.name_next === node) {
                                                        current.name_next = node.name_next;
                                                        break
                                                }
                                                current = current.name_next
                                        }
                                }
                        }
                        ,
                        lookupNode: (parent, name) => {
                                var errCode = FS.mayLookup(parent);
                                if (errCode) {
                                        throw new FS.ErrnoError(errCode,parent)
                                }
                                var hash = FS.hashName(parent.id, name);
                                for (var node = FS.nameTable[hash]; node; node = node.name_next) {
                                        var nodeName = node.name;
                                        if (node.parent.id === parent.id && nodeName === name) {
                                                return node
                                        }
                                }
                                return FS.lookup(parent, name)
                        }
                        ,
                        createNode: (parent, name, mode, rdev) => {
                                var node = new FS.FSNode(parent,name,mode,rdev);
                                FS.hashAddNode(node);
                                return node
                        }
                        ,
                        destroyNode: node => {
                                FS.hashRemoveNode(node)
                        }
                        ,
                        isRoot: node => {
                                return node === node.parent
                        }
                        ,
                        isMountpoint: node => {
                                return !!node.mounted
                        }
                        ,
                        isFile: mode => {
                                return (mode & 61440) === 32768
                        }
                        ,
                        isDir: mode => {
                                return (mode & 61440) === 16384
                        }
                        ,
                        isLink: mode => {
                                return (mode & 61440) === 40960
                        }
                        ,
                        isChrdev: mode => {
                                return (mode & 61440) === 8192
                        }
                        ,
                        isBlkdev: mode => {
                                return (mode & 61440) === 24576
                        }
                        ,
                        isFIFO: mode => {
                                return (mode & 61440) === 4096
                        }
                        ,
                        isSocket: mode => {
                                return (mode & 49152) === 49152
                        }
                        ,
                        flagModes: {
                                "r": 0,
                                "r+": 2,
                                "w": 577,
                                "w+": 578,
                                "a": 1089,
                                "a+": 1090
                        },
                        modeStringToFlags: str => {
                                var flags = FS.flagModes[str];
                                if (typeof flags == "undefined") {
                                        throw new Error("Unknown file open mode: " + str)
                                }
                                return flags
                        }
                        ,
                        flagsToPermissionString: flag => {
                                var perms = ["r", "w", "rw"][flag & 3];
                                if (flag & 512) {
                                        perms += "w"
                                }
                                return perms
                        }
                        ,
                        nodePermissions: (node, perms) => {
                                if (FS.ignorePermissions) {
                                        return 0
                                }
                                if (perms.includes("r") && !(node.mode & 292)) {
                                        return 2
                                } else if (perms.includes("w") && !(node.mode & 146)) {
                                        return 2
                                } else if (perms.includes("x") && !(node.mode & 73)) {
                                        return 2
                                }
                                return 0
                        }
                        ,
                        mayLookup: dir => {
                                var errCode = FS.nodePermissions(dir, "x");
                                if (errCode)
                                        return errCode;
                                if (!dir.node_ops.lookup)
                                        return 2;
                                return 0
                        }
                        ,
                        mayCreate: (dir, name) => {
                                try {
                                        var node = FS.lookupNode(dir, name);
                                        return 20
                                } catch (e) {}
                                return FS.nodePermissions(dir, "wx")
                        }
                        ,
                        mayDelete: (dir, name, isdir) => {
                                var node;
                                try {
                                        node = FS.lookupNode(dir, name)
                                } catch (e) {
                                        return e.errno
                                }
                                var errCode = FS.nodePermissions(dir, "wx");
                                if (errCode) {
                                        return errCode
                                }
                                if (isdir) {
                                        if (!FS.isDir(node.mode)) {
                                                return 54
                                        }
                                        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                                                return 10
                                        }
                                } else {
                                        if (FS.isDir(node.mode)) {
                                                return 31
                                        }
                                }
                                return 0
                        }
                        ,
                        mayOpen: (node, flags) => {
                                if (!node) {
                                        return 44
                                }
                                if (FS.isLink(node.mode)) {
                                        return 32
                                } else if (FS.isDir(node.mode)) {
                                        if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
                                                return 31
                                        }
                                }
                                return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
                        }
                        ,
                        MAX_OPEN_FDS: 4096,
                        nextfd: (fd_start=0, fd_end=FS.MAX_OPEN_FDS) => {
                                for (var fd = fd_start; fd <= fd_end; fd++) {
                                        if (!FS.streams[fd]) {
                                                return fd
                                        }
                                }
                                throw new FS.ErrnoError(33)
                        }
                        ,
                        getStream: fd => FS.streams[fd],
                        createStream: (stream, fd_start, fd_end) => {
                                if (!FS.FSStream) {
                                        FS.FSStream = function() {
                                                this.shared = {}
                                        }
                                        ;
                                        FS.FSStream.prototype = {};
                                        Object.defineProperties(FS.FSStream.prototype, {
                                                object: {
                                                        get: function() {
                                                                return this.node
                                                        },
                                                        set: function(val) {
                                                                this.node = val
                                                        }
                                                },
                                                isRead: {
                                                        get: function() {
                                                                return (this.flags & 2097155) !== 1
                                                        }
                                                },
                                                isWrite: {
                                                        get: function() {
                                                                return (this.flags & 2097155) !== 0
                                                        }
                                                },
                                                isAppend: {
                                                        get: function() {
                                                                return this.flags & 1024
                                                        }
                                                },
                                                flags: {
                                                        get: function() {
                                                                return this.shared.flags
                                                        },
                                                        set: function(val) {
                                                                this.shared.flags = val
                                                        }
                                                },
                                                position: {
                                                        get: function() {
                                                                return this.shared.position
                                                        },
                                                        set: function(val) {
                                                                this.shared.position = val
                                                        }
                                                }
                                        })
                                }
                                stream = Object.assign(new FS.FSStream, stream);
                                var fd = FS.nextfd(fd_start, fd_end);
                                stream.fd = fd;
                                FS.streams[fd] = stream;
                                return stream
                        }
                        ,
                        closeStream: fd => {
                                FS.streams[fd] = null
                        }
                        ,
                        chrdev_stream_ops: {
                                open: stream => {
                                        var device = FS.getDevice(stream.node.rdev);
                                        stream.stream_ops = device.stream_ops;
                                        if (stream.stream_ops.open) {
                                                stream.stream_ops.open(stream)
                                        }
                                }
                                ,
                                llseek: () => {
                                        throw new FS.ErrnoError(70)
                                }
                        },
                        major: dev => dev >> 8,
                        minor: dev => dev & 255,
                        makedev: (ma, mi) => ma << 8 | mi,
                        registerDevice: (dev, ops) => {
                                FS.devices[dev] = {
                                        stream_ops: ops
                                }
                        }
                        ,
                        getDevice: dev => FS.devices[dev],
                        getMounts: mount => {
                                var mounts = [];
                                var check = [mount];
                                while (check.length) {
                                        var m = check.pop();
                                        mounts.push(m);
                                        check.push.apply(check, m.mounts)
                                }
                                return mounts
                        }
                        ,
                        syncfs: (populate, callback) => {
                                if (typeof populate == "function") {
                                        callback = populate;
                                        populate = false
                                }
                                FS.syncFSRequests++;
                                if (FS.syncFSRequests > 1) {
                                        err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work")
                                }
                                var mounts = FS.getMounts(FS.root.mount);
                                var completed = 0;
                                function doCallback(errCode) {
                                        FS.syncFSRequests--;
                                        return callback(errCode)
                                }
                                function done(errCode) {
                                        if (errCode) {
                                                if (!done.errored) {
                                                        done.errored = true;
                                                        return doCallback(errCode)
                                                }
                                                return
                                        }
                                        if (++completed >= mounts.length) {
                                                doCallback(null)
                                        }
                                }
                                mounts.forEach(mount => {
                                        if (!mount.type.syncfs) {
                                                return done(null)
                                        }
                                        mount.type.syncfs(mount, populate, done)
                                }
                                )
                        }
                        ,
                        mount: (type, opts, mountpoint) => {
                                var root = mountpoint === "/";
                                var pseudo = !mountpoint;
                                var node;
                                if (root && FS.root) {
                                        throw new FS.ErrnoError(10)
                                } else if (!root && !pseudo) {
                                        var lookup = FS.lookupPath(mountpoint, {
                                                follow_mount: false
                                        });
                                        mountpoint = lookup.path;
                                        node = lookup.node;
                                        if (FS.isMountpoint(node)) {
                                                throw new FS.ErrnoError(10)
                                        }
                                        if (!FS.isDir(node.mode)) {
                                                throw new FS.ErrnoError(54)
                                        }
                                }
                                var mount = {
                                        type: type,
                                        opts: opts,
                                        mountpoint: mountpoint,
                                        mounts: []
                                };
                                var mountRoot = type.mount(mount);
                                mountRoot.mount = mount;
                                mount.root = mountRoot;
                                if (root) {
                                        FS.root = mountRoot
                                } else if (node) {
                                        node.mounted = mount;
                                        if (node.mount) {
                                                node.mount.mounts.push(mount)
                                        }
                                }
                                return mountRoot
                        }
                        ,
                        unmount: mountpoint => {
                                var lookup = FS.lookupPath(mountpoint, {
                                        follow_mount: false
                                });
                                if (!FS.isMountpoint(lookup.node)) {
                                        throw new FS.ErrnoError(28)
                                }
                                var node = lookup.node;
                                var mount = node.mounted;
                                var mounts = FS.getMounts(mount);
                                Object.keys(FS.nameTable).forEach(hash => {
                                        var current = FS.nameTable[hash];
                                        while (current) {
                                                var next = current.name_next;
                                                if (mounts.includes(current.mount)) {
                                                        FS.destroyNode(current)
                                                }
                                                current = next
                                        }
                                }
                                );
                                node.mounted = null;
                                var idx = node.mount.mounts.indexOf(mount);
                                node.mount.mounts.splice(idx, 1)
                        }
                        ,
                        lookup: (parent, name) => {
                                return parent.node_ops.lookup(parent, name)
                        }
                        ,
                        mknod: (path, mode, dev) => {
                                var lookup = FS.lookupPath(path, {
                                        parent: true
                                });
                                var parent = lookup.node;
                                var name = PATH.basename(path);
                                if (!name || name === "." || name === "..") {
                                        throw new FS.ErrnoError(28)
                                }
                                var errCode = FS.mayCreate(parent, name);
                                if (errCode) {
                                        throw new FS.ErrnoError(errCode)
                                }
                                if (!parent.node_ops.mknod) {
                                        throw new FS.ErrnoError(63)
                                }
                                return parent.node_ops.mknod(parent, name, mode, dev)
                        }
                        ,
                        create: (path, mode) => {
                                mode = mode !== undefined ? mode : 438;
                                mode &= 4095;
                                mode |= 32768;
                                return FS.mknod(path, mode, 0)
                        }
                        ,
                        mkdir: (path, mode) => {
                                mode = mode !== undefined ? mode : 511;
                                mode &= 511 | 512;
                                mode |= 16384;
                                return FS.mknod(path, mode, 0)
                        }
                        ,
                        mkdirTree: (path, mode) => {
                                var dirs = path.split("/");
                                var d = "";
                                for (var i = 0; i < dirs.length; ++i) {
                                        if (!dirs[i])
                                                continue;
                                        d += "/" + dirs[i];
                                        try {
                                                FS.mkdir(d, mode)
                                        } catch (e) {
                                                if (e.errno != 20)
                                                        throw e
                                        }
                                }
                        }
                        ,
                        mkdev: (path, mode, dev) => {
                                if (typeof dev == "undefined") {
                                        dev = mode;
                                        mode = 438
                                }
                                mode |= 8192;
                                return FS.mknod(path, mode, dev)
                        }
                        ,
                        symlink: (oldpath, newpath) => {
                                if (!PATH_FS.resolve(oldpath)) {
                                        throw new FS.ErrnoError(44)
                                }
                                var lookup = FS.lookupPath(newpath, {
                                        parent: true
                                });
                                var parent = lookup.node;
                                if (!parent) {
                                        throw new FS.ErrnoError(44)
                                }
                                var newname = PATH.basename(newpath);
                                var errCode = FS.mayCreate(parent, newname);
                                if (errCode) {
                                        throw new FS.ErrnoError(errCode)
                                }
                                if (!parent.node_ops.symlink) {
                                        throw new FS.ErrnoError(63)
                                }
                                return parent.node_ops.symlink(parent, newname, oldpath)
                        }
                        ,
                        rename: (old_path, new_path) => {
                                var old_dirname = PATH.dirname(old_path);
                                var new_dirname = PATH.dirname(new_path);
                                var old_name = PATH.basename(old_path);
                                var new_name = PATH.basename(new_path);
                                var lookup, old_dir, new_dir;
                                lookup = FS.lookupPath(old_path, {
                                        parent: true
                                });
                                old_dir = lookup.node;
                                lookup = FS.lookupPath(new_path, {
                                        parent: true
                                });
                                new_dir = lookup.node;
                                if (!old_dir || !new_dir)
                                        throw new FS.ErrnoError(44);
                                if (old_dir.mount !== new_dir.mount) {
                                        throw new FS.ErrnoError(75)
                                }
                                var old_node = FS.lookupNode(old_dir, old_name);
                                var relative = PATH_FS.relative(old_path, new_dirname);
                                if (relative.charAt(0) !== ".") {
                                        throw new FS.ErrnoError(28)
                                }
                                relative = PATH_FS.relative(new_path, old_dirname);
                                if (relative.charAt(0) !== ".") {
                                        throw new FS.ErrnoError(55)
                                }
                                var new_node;
                                try {
                                        new_node = FS.lookupNode(new_dir, new_name)
                                } catch (e) {}
                                if (old_node === new_node) {
                                        return
                                }
                                var isdir = FS.isDir(old_node.mode);
                                var errCode = FS.mayDelete(old_dir, old_name, isdir);
                                if (errCode) {
                                        throw new FS.ErrnoError(errCode)
                                }
                                errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
                                if (errCode) {
                                        throw new FS.ErrnoError(errCode)
                                }
                                if (!old_dir.node_ops.rename) {
                                        throw new FS.ErrnoError(63)
                                }
                                if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
                                        throw new FS.ErrnoError(10)
                                }
                                if (new_dir !== old_dir) {
                                        errCode = FS.nodePermissions(old_dir, "w");
                                        if (errCode) {
                                                throw new FS.ErrnoError(errCode)
                                        }
                                }
                                FS.hashRemoveNode(old_node);
                                try {
                                        old_dir.node_ops.rename(old_node, new_dir, new_name)
                                } catch (e) {
                                        throw e
                                } finally {
                                        FS.hashAddNode(old_node)
                                }
                        }
                        ,
                        rmdir: path => {
                                var lookup = FS.lookupPath(path, {
                                        parent: true
                                });
                                var parent = lookup.node;
                                var name = PATH.basename(path);
                                var node = FS.lookupNode(parent, name);
                                var errCode = FS.mayDelete(parent, name, true);
                                if (errCode) {
                                        throw new FS.ErrnoError(errCode)
                                }
                                if (!parent.node_ops.rmdir) {
                                        throw new FS.ErrnoError(63)
                                }
                                if (FS.isMountpoint(node)) {
                                        throw new FS.ErrnoError(10)
                                }
                                parent.node_ops.rmdir(parent, name);
                                FS.destroyNode(node)
                        }
                        ,
                        readdir: path => {
                                var lookup = FS.lookupPath(path, {
                                        follow: true
                                });
                                var node = lookup.node;
                                if (!node.node_ops.readdir) {
                                        throw new FS.ErrnoError(54)
                                }
                                return node.node_ops.readdir(node)
                        }
                        ,
                        unlink: path => {
                                var lookup = FS.lookupPath(path, {
                                        parent: true
                                });
                                var parent = lookup.node;
                                if (!parent) {
                                        throw new FS.ErrnoError(44)
                                }
                                var name = PATH.basename(path);
                                var node = FS.lookupNode(parent, name);
                                var errCode = FS.mayDelete(parent, name, false);
                                if (errCode) {
                                        throw new FS.ErrnoError(errCode)
                                }
                                if (!parent.node_ops.unlink) {
                                        throw new FS.ErrnoError(63)
                                }
                                if (FS.isMountpoint(node)) {
                                        throw new FS.ErrnoError(10)
                                }
                                parent.node_ops.unlink(parent, name);
                                FS.destroyNode(node)
                        }
                        ,
                        readlink: path => {
                                var lookup = FS.lookupPath(path);
                                var link = lookup.node;
                                if (!link) {
                                        throw new FS.ErrnoError(44)
                                }
                                if (!link.node_ops.readlink) {
                                        throw new FS.ErrnoError(28)
                                }
                                return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link))
                        }
                        ,
                        stat: (path, dontFollow) => {
                                var lookup = FS.lookupPath(path, {
                                        follow: !dontFollow
                                });
                                var node = lookup.node;
                                if (!node) {
                                        throw new FS.ErrnoError(44)
                                }
                                if (!node.node_ops.getattr) {
                                        throw new FS.ErrnoError(63)
                                }
                                return node.node_ops.getattr(node)
                        }
                        ,
                        lstat: path => {
                                return FS.stat(path, true)
                        }
                        ,
                        chmod: (path, mode, dontFollow) => {
                                var node;
                                if (typeof path == "string") {
                                        var lookup = FS.lookupPath(path, {
                                                follow: !dontFollow
                                        });
                                        node = lookup.node
                                } else {
                                        node = path
                                }
                                if (!node.node_ops.setattr) {
                                        throw new FS.ErrnoError(63)
                                }
                                node.node_ops.setattr(node, {
                                        mode: mode & 4095 | node.mode & ~4095,
                                        timestamp: Date.now()
                                })
                        }
                        ,
                        lchmod: (path, mode) => {
                                FS.chmod(path, mode, true)
                        }
                        ,
                        fchmod: (fd, mode) => {
                                var stream = FS.getStream(fd);
                                if (!stream) {
                                        throw new FS.ErrnoError(8)
                                }
                                FS.chmod(stream.node, mode)
                        }
                        ,
                        chown: (path, uid, gid, dontFollow) => {
                                var node;
                                if (typeof path == "string") {
                                        var lookup = FS.lookupPath(path, {
                                                follow: !dontFollow
                                        });
                                        node = lookup.node
                                } else {
                                        node = path
                                }
                                if (!node.node_ops.setattr) {
                                        throw new FS.ErrnoError(63)
                                }
                                node.node_ops.setattr(node, {
                                        timestamp: Date.now()
                                })
                        }
                        ,
                        lchown: (path, uid, gid) => {
                                FS.chown(path, uid, gid, true)
                        }
                        ,
                        fchown: (fd, uid, gid) => {
                                var stream = FS.getStream(fd);
                                if (!stream) {
                                        throw new FS.ErrnoError(8)
                                }
                                FS.chown(stream.node, uid, gid)
                        }
                        ,
                        truncate: (path, len) => {
                                if (len < 0) {
                                        throw new FS.ErrnoError(28)
                                }
                                var node;
                                if (typeof path == "string") {
                                        var lookup = FS.lookupPath(path, {
                                                follow: true
                                        });
                                        node = lookup.node
                                } else {
                                        node = path
                                }
                                if (!node.node_ops.setattr) {
                                        throw new FS.ErrnoError(63)
                                }
                                if (FS.isDir(node.mode)) {
                                        throw new FS.ErrnoError(31)
                                }
                                if (!FS.isFile(node.mode)) {
                                        throw new FS.ErrnoError(28)
                                }
                                var errCode = FS.nodePermissions(node, "w");
                                if (errCode) {
                                        throw new FS.ErrnoError(errCode)
                                }
                                node.node_ops.setattr(node, {
                                        size: len,
                                        timestamp: Date.now()
                                })
                        }
                        ,
                        ftruncate: (fd, len) => {
                                var stream = FS.getStream(fd);
                                if (!stream) {
                                        throw new FS.ErrnoError(8)
                                }
                                if ((stream.flags & 2097155) === 0) {
                                        throw new FS.ErrnoError(28)
                                }
                                FS.truncate(stream.node, len)
                        }
                        ,
                        utime: (path, atime, mtime) => {
                                var lookup = FS.lookupPath(path, {
                                        follow: true
                                });
                                var node = lookup.node;
                                node.node_ops.setattr(node, {
                                        timestamp: Math.max(atime, mtime)
                                })
                        }
                        ,
                        open: (path, flags, mode) => {
                                if (path === "") {
                                        throw new FS.ErrnoError(44)
                                }
                                flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags;
                                mode = typeof mode == "undefined" ? 438 : mode;
                                if (flags & 64) {
                                        mode = mode & 4095 | 32768
                                } else {
                                        mode = 0
                                }
                                var node;
                                if (typeof path == "object") {
                                        node = path
                                } else {
                                        path = PATH.normalize(path);
                                        try {
                                                var lookup = FS.lookupPath(path, {
                                                        follow: !(flags & 131072)
                                                });
                                                node = lookup.node
                                        } catch (e) {}
                                }
                                var created = false;
                                if (flags & 64) {
                                        if (node) {
                                                if (flags & 128) {
                                                        throw new FS.ErrnoError(20)
                                                }
                                        } else {
                                                node = FS.mknod(path, mode, 0);
                                                created = true
                                        }
                                }
                                if (!node) {
                                        throw new FS.ErrnoError(44)
                                }
                                if (FS.isChrdev(node.mode)) {
                                        flags &= ~512
                                }
                                if (flags & 65536 && !FS.isDir(node.mode)) {
                                        throw new FS.ErrnoError(54)
                                }
                                if (!created) {
                                        var errCode = FS.mayOpen(node, flags);
                                        if (errCode) {
                                                throw new FS.ErrnoError(errCode)
                                        }
                                }
                                if (flags & 512 && !created) {
                                        FS.truncate(node, 0)
                                }
                                flags &= ~(128 | 512 | 131072);
                                var stream = FS.createStream({
                                        node: node,
                                        path: FS.getPath(node),
                                        flags: flags,
                                        seekable: true,
                                        position: 0,
                                        stream_ops: node.stream_ops,
                                        ungotten: [],
                                        error: false
                                });
                                if (stream.stream_ops.open) {
                                        stream.stream_ops.open(stream)
                                }
                                if (Module["logReadFiles"] && !(flags & 1)) {
                                        if (!FS.readFiles)
                                                FS.readFiles = {};
                                        if (!(path in FS.readFiles)) {
                                                FS.readFiles[path] = 1
                                        }
                                }
                                return stream
                        }
                        ,
                        close: stream => {
                                if (FS.isClosed(stream)) {
                                        throw new FS.ErrnoError(8)
                                }
                                if (stream.getdents)
                                        stream.getdents = null;
                                try {
                                        if (stream.stream_ops.close) {
                                                stream.stream_ops.close(stream)
                                        }
                                } catch (e) {
                                        throw e
                                } finally {
                                        FS.closeStream(stream.fd)
                                }
                                stream.fd = null
                        }
                        ,
                        isClosed: stream => {
                                return stream.fd === null
                        }
                        ,
                        llseek: (stream, offset, whence) => {
                                if (FS.isClosed(stream)) {
                                        throw new FS.ErrnoError(8)
                                }
                                if (!stream.seekable || !stream.stream_ops.llseek) {
                                        throw new FS.ErrnoError(70)
                                }
                                if (whence != 0 && whence != 1 && whence != 2) {
                                        throw new FS.ErrnoError(28)
                                }
                                stream.position = stream.stream_ops.llseek(stream, offset, whence);
                                stream.ungotten = [];
                                return stream.position
                        }
                        ,
                        read: (stream, buffer, offset, length, position) => {
                                if (length < 0 || position < 0) {
                                        throw new FS.ErrnoError(28)
                                }
                                if (FS.isClosed(stream)) {
                                        throw new FS.ErrnoError(8)
                                }
                                if ((stream.flags & 2097155) === 1) {
                                        throw new FS.ErrnoError(8)
                                }
                                if (FS.isDir(stream.node.mode)) {
                                        throw new FS.ErrnoError(31)
                                }
                                if (!stream.stream_ops.read) {
                                        throw new FS.ErrnoError(28)
                                }
                                var seeking = typeof position != "undefined";
                                if (!seeking) {
                                        position = stream.position
                                } else if (!stream.seekable) {
                                        throw new FS.ErrnoError(70)
                                }
                                var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
                                if (!seeking)
                                        stream.position += bytesRead;
                                return bytesRead
                        }
                        ,
                        write: (stream, buffer, offset, length, position, canOwn) => {
                                if (length < 0 || position < 0) {
                                        throw new FS.ErrnoError(28)
                                }
                                if (FS.isClosed(stream)) {
                                        throw new FS.ErrnoError(8)
                                }
                                if ((stream.flags & 2097155) === 0) {
                                        throw new FS.ErrnoError(8)
                                }
                                if (FS.isDir(stream.node.mode)) {
                                        throw new FS.ErrnoError(31)
                                }
                                if (!stream.stream_ops.write) {
                                        throw new FS.ErrnoError(28)
                                }
                                if (stream.seekable && stream.flags & 1024) {
                                        FS.llseek(stream, 0, 2)
                                }
                                var seeking = typeof position != "undefined";
                                if (!seeking) {
                                        position = stream.position
                                } else if (!stream.seekable) {
                                        throw new FS.ErrnoError(70)
                                }
                                var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
                                if (!seeking)
                                        stream.position += bytesWritten;
                                return bytesWritten
                        }
                        ,
                        allocate: (stream, offset, length) => {
                                if (FS.isClosed(stream)) {
                                        throw new FS.ErrnoError(8)
                                }
                                if (offset < 0 || length <= 0) {
                                        throw new FS.ErrnoError(28)
                                }
                                if ((stream.flags & 2097155) === 0) {
                                        throw new FS.ErrnoError(8)
                                }
                                if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
                                        throw new FS.ErrnoError(43)
                                }
                                if (!stream.stream_ops.allocate) {
                                        throw new FS.ErrnoError(138)
                                }
                                stream.stream_ops.allocate(stream, offset, length)
                        }
                        ,
                        mmap: (stream, length, position, prot, flags) => {
                                if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
                                        throw new FS.ErrnoError(2)
                                }
                                if ((stream.flags & 2097155) === 1) {
                                        throw new FS.ErrnoError(2)
                                }
                                if (!stream.stream_ops.mmap) {
                                        throw new FS.ErrnoError(43)
                                }
                                return stream.stream_ops.mmap(stream, length, position, prot, flags)
                        }
                        ,
                        msync: (stream, buffer, offset, length, mmapFlags) => {
                                if (!stream.stream_ops.msync) {
                                        return 0
                                }
                                return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
                        }
                        ,
                        munmap: stream => 0,
                        ioctl: (stream, cmd, arg) => {
                                if (!stream.stream_ops.ioctl) {
                                        throw new FS.ErrnoError(59)
                                }
                                return stream.stream_ops.ioctl(stream, cmd, arg)
                        }
                        ,
                        readFile: (path, opts={}) => {
                                opts.flags = opts.flags || 0;
                                opts.encoding = opts.encoding || "binary";
                                if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
                                        throw new Error('Invalid encoding type "' + opts.encoding + '"')
                                }
                                var ret;
                                var stream = FS.open(path, opts.flags);
                                var stat = FS.stat(path);
                                var length = stat.size;
                                var buf = new Uint8Array(length);
                                FS.read(stream, buf, 0, length, 0);
                                if (opts.encoding === "utf8") {
                                        ret = UTF8ArrayToString(buf, 0)
                                } else if (opts.encoding === "binary") {
                                        ret = buf
                                }
                                FS.close(stream);
                                return ret
                        }
                        ,
                        writeFile: (path, data, opts={}) => {
                                opts.flags = opts.flags || 577;
                                var stream = FS.open(path, opts.flags, opts.mode);
                                if (typeof data == "string") {
                                        var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
                                        var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
                                        FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
                                } else if (ArrayBuffer.isView(data)) {
                                        FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
                                } else {
                                        throw new Error("Unsupported data type")
                                }
                                FS.close(stream)
                        }
                        ,
                        cwd: () => FS.currentPath,
                        chdir: path => {
                                var lookup = FS.lookupPath(path, {
                                        follow: true
                                });
                                if (lookup.node === null) {
                                        throw new FS.ErrnoError(44)
                                }
                                if (!FS.isDir(lookup.node.mode)) {
                                        throw new FS.ErrnoError(54)
                                }
                                var errCode = FS.nodePermissions(lookup.node, "x");
                                if (errCode) {
                                        throw new FS.ErrnoError(errCode)
                                }
                                FS.currentPath = lookup.path
                        }
                        ,
                        createDefaultDirectories: () => {
                                FS.mkdir("/tmp");
                                FS.mkdir("/home");
                                FS.mkdir("/home/web_user")
                        }
                        ,
                        createDefaultDevices: () => {
                                FS.mkdir("/dev");
                                FS.registerDevice(FS.makedev(1, 3), {
                                        read: () => 0,
                                        write: (stream, buffer, offset, length, pos) => length
                                });
                                FS.mkdev("/dev/null", FS.makedev(1, 3));
                                TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
                                TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
                                FS.mkdev("/dev/tty", FS.makedev(5, 0));
                                FS.mkdev("/dev/tty1", FS.makedev(6, 0));
                                var random_device = getRandomDevice();
                                FS.createDevice("/dev", "random", random_device);
                                FS.createDevice("/dev", "urandom", random_device);
                                FS.mkdir("/dev/shm");
                                FS.mkdir("/dev/shm/tmp")
                        }
                        ,
                        createSpecialDirectories: () => {
                                FS.mkdir("/proc");
                                var proc_self = FS.mkdir("/proc/self");
                                FS.mkdir("/proc/self/fd");
                                FS.mount({
                                        mount: () => {
                                                var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
                                                node.node_ops = {
                                                        lookup: (parent, name) => {
                                                                var fd = +name;
                                                                var stream = FS.getStream(fd);
                                                                if (!stream)
                                                                        throw new FS.ErrnoError(8);
                                                                var ret = {
                                                                        parent: null,
                                                                        mount: {
                                                                                mountpoint: "fake"
                                                                        },
                                                                        node_ops: {
                                                                                readlink: () => stream.path
                                                                        }
                                                                };
                                                                ret.parent = ret;
                                                                return ret
                                                        }
                                                };
                                                return node
                                        }
                                }, {}, "/proc/self/fd")
                        }
                        ,
                        createStandardStreams: () => {
                                if (Module["stdin"]) {
                                        FS.createDevice("/dev", "stdin", Module["stdin"])
                                } else {
                                        FS.symlink("/dev/tty", "/dev/stdin")
                                }
                                if (Module["stdout"]) {
                                        FS.createDevice("/dev", "stdout", null, Module["stdout"])
                                } else {
                                        FS.symlink("/dev/tty", "/dev/stdout")
                                }
                                if (Module["stderr"]) {
                                        FS.createDevice("/dev", "stderr", null, Module["stderr"])
                                } else {
                                        FS.symlink("/dev/tty1", "/dev/stderr")
                                }
                                var stdin = FS.open("/dev/stdin", 0);
                                var stdout = FS.open("/dev/stdout", 1);
                                var stderr = FS.open("/dev/stderr", 1)
                        }
                        ,
                        ensureErrnoError: () => {
                                if (FS.ErrnoError)
                                        return;
                                FS.ErrnoError = function ErrnoError(errno, node) {
                                        this.node = node;
                                        this.setErrno = function(errno) {
                                                this.errno = errno
                                        }
                                        ;
                                        this.setErrno(errno);
                                        this.message = "FS error"
                                }
                                ;
                                FS.ErrnoError.prototype = new Error;
                                FS.ErrnoError.prototype.constructor = FS.ErrnoError;
                                [44].forEach(code => {
                                        FS.genericErrors[code] = new FS.ErrnoError(code);
                                        FS.genericErrors[code].stack = "<generic error, no stack>"
                                }
                                )
                        }
                        ,
                        staticInit: () => {
                                FS.ensureErrnoError();
                                FS.nameTable = new Array(4096);
                                FS.mount(MEMFS, {}, "/");
                                FS.createDefaultDirectories();
                                FS.createDefaultDevices();
                                FS.createSpecialDirectories();
                                FS.filesystems = {
                                        "MEMFS": MEMFS
                                }
                        }
                        ,
                        init: (input, output, error) => {
                                FS.init.initialized = true;
                                FS.ensureErrnoError();
                                Module["stdin"] = input || Module["stdin"];
                                Module["stdout"] = output || Module["stdout"];
                                Module["stderr"] = error || Module["stderr"];
                                FS.createStandardStreams()
                        }
                        ,
                        quit: () => {
                                FS.init.initialized = false;
                                for (var i = 0; i < FS.streams.length; i++) {
                                        var stream = FS.streams[i];
                                        if (!stream) {
                                                continue
                                        }
                                        FS.close(stream)
                                }
                        }
                        ,
                        getMode: (canRead, canWrite) => {
                                var mode = 0;
                                if (canRead)
                                        mode |= 292 | 73;
                                if (canWrite)
                                        mode |= 146;
                                return mode
                        }
                        ,
                        findObject: (path, dontResolveLastLink) => {
                                var ret = FS.analyzePath(path, dontResolveLastLink);
                                if (!ret.exists) {
                                        return null
                                }
                                return ret.object
                        }
                        ,
                        analyzePath: (path, dontResolveLastLink) => {
                                try {
                                        var lookup = FS.lookupPath(path, {
                                                follow: !dontResolveLastLink
                                        });
                                        path = lookup.path
                                } catch (e) {}
                                var ret = {
                                        isRoot: false,
                                        exists: false,
                                        error: 0,
                                        name: null,
                                        path: null,
                                        object: null,
                                        parentExists: false,
                                        parentPath: null,
                                        parentObject: null
                                };
                                try {
                                        var lookup = FS.lookupPath(path, {
                                                parent: true
                                        });
                                        ret.parentExists = true;
                                        ret.parentPath = lookup.path;
                                        ret.parentObject = lookup.node;
                                        ret.name = PATH.basename(path);
                                        lookup = FS.lookupPath(path, {
                                                follow: !dontResolveLastLink
                                        });
                                        ret.exists = true;
                                        ret.path = lookup.path;
                                        ret.object = lookup.node;
                                        ret.name = lookup.node.name;
                                        ret.isRoot = lookup.path === "/"
                                } catch (e) {
                                        ret.error = e.errno
                                }
                                return ret
                        }
                        ,
                        createPath: (parent, path, canRead, canWrite) => {
                                parent = typeof parent == "string" ? parent : FS.getPath(parent);
                                var parts = path.split("/").reverse();
                                while (parts.length) {
                                        var part = parts.pop();
                                        if (!part)
                                                continue;
                                        var current = PATH.join2(parent, part);
                                        try {
                                                FS.mkdir(current)
                                        } catch (e) {}
                                        parent = current
                                }
                                return current
                        }
                        ,
                        createFile: (parent, name, properties, canRead, canWrite) => {
                                var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
                                var mode = FS.getMode(canRead, canWrite);
                                return FS.create(path, mode)
                        }
                        ,
                        createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
                                var path = name;
                                if (parent) {
                                        parent = typeof parent == "string" ? parent : FS.getPath(parent);
                                        path = name ? PATH.join2(parent, name) : parent
                                }
                                var mode = FS.getMode(canRead, canWrite);
                                var node = FS.create(path, mode);
                                if (data) {
                                        if (typeof data == "string") {
                                                var arr = new Array(data.length);
                                                for (var i = 0, len = data.length; i < len; ++i)
                                                        arr[i] = data.charCodeAt(i);
                                                data = arr
                                        }
                                        FS.chmod(node, mode | 146);
                                        var stream = FS.open(node, 577);
                                        FS.write(stream, data, 0, data.length, 0, canOwn);
                                        FS.close(stream);
                                        FS.chmod(node, mode)
                                }
                                return node
                        }
                        ,
                        createDevice: (parent, name, input, output) => {
                                var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
                                var mode = FS.getMode(!!input, !!output);
                                if (!FS.createDevice.major)
                                        FS.createDevice.major = 64;
                                var dev = FS.makedev(FS.createDevice.major++, 0);
                                FS.registerDevice(dev, {
                                        open: stream => {
                                                stream.seekable = false
                                        }
                                        ,
                                        close: stream => {
                                                if (output && output.buffer && output.buffer.length) {
                                                        output(10)
                                                }
                                        }
                                        ,
                                        read: (stream, buffer, offset, length, pos) => {
                                                var bytesRead = 0;
                                                for (var i = 0; i < length; i++) {
                                                        var result;
                                                        try {
                                                                result = input()
                                                        } catch (e) {
                                                                throw new FS.ErrnoError(29)
                                                        }
                                                        if (result === undefined && bytesRead === 0) {
                                                                throw new FS.ErrnoError(6)
                                                        }
                                                        if (result === null || result === undefined)
                                                                break;
                                                        bytesRead++;
                                                        buffer[offset + i] = result
                                                }
                                                if (bytesRead) {
                                                        stream.node.timestamp = Date.now()
                                                }
                                                return bytesRead
                                        }
                                        ,
                                        write: (stream, buffer, offset, length, pos) => {
                                                for (var i = 0; i < length; i++) {
                                                        try {
                                                                output(buffer[offset + i])
                                                        } catch (e) {
                                                                throw new FS.ErrnoError(29)
                                                        }
                                                }
                                                if (length) {
                                                        stream.node.timestamp = Date.now()
                                                }
                                                return i
                                        }
                                });
                                return FS.mkdev(path, mode, dev)
                        }
                        ,
                        forceLoadFile: obj => {
                                if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
                                        return true;
                                if (typeof XMLHttpRequest != "undefined") {
                                        throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")
                                } else if (read_) {
                                        try {
                                                obj.contents = intArrayFromString(read_(obj.url), true);
                                                obj.usedBytes = obj.contents.length
                                        } catch (e) {
                                                throw new FS.ErrnoError(29)
                                        }
                                } else {
                                        throw new Error("Cannot load without read() or XMLHttpRequest.")
                                }
                        }
                        ,
                        createLazyFile: (parent, name, url, canRead, canWrite) => {
                                function LazyUint8Array() {
                                        this.lengthKnown = false;
                                        this.chunks = []
                                }
                                LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
                                        if (idx > this.length - 1 || idx < 0) {
                                                return undefined
                                        }
                                        var chunkOffset = idx % this.chunkSize;
                                        var chunkNum = idx / this.chunkSize | 0;
                                        return this.getter(chunkNum)[chunkOffset]
                                }
                                ;
                                LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
                                        this.getter = getter
                                }
                                ;
                                LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
                                        var xhr = new XMLHttpRequest;
                                        xhr.open("HEAD", url, false);
                                        xhr.send(null);
                                        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                                                throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                                        var datalength = Number(xhr.getResponseHeader("Content-length"));
                                        var header;
                                        var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
                                        var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
                                        var chunkSize = 1024 * 1024;
                                        if (!hasByteServing)
                                                chunkSize = datalength;
                                        var doXHR = (from, to) => {
                                                if (from > to)
                                                        throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                                                if (to > datalength - 1)
                                                        throw new Error("only " + datalength + " bytes available! programmer error!");
                                                var xhr = new XMLHttpRequest;
                                                xhr.open("GET", url, false);
                                                if (datalength !== chunkSize)
                                                        xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
                                                xhr.responseType = "arraybuffer";
                                                if (xhr.overrideMimeType) {
                                                        xhr.overrideMimeType("text/plain; charset=x-user-defined")
                                                }
                                                xhr.send(null);
                                                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                                                        throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                                                if (xhr.response !== undefined) {
                                                        return new Uint8Array(xhr.response || [])
                                                }
                                                return intArrayFromString(xhr.responseText || "", true)
                                        }
                                        ;
                                        var lazyArray = this;
                                        lazyArray.setDataGetter(chunkNum => {
                                                var start = chunkNum * chunkSize;
                                                var end = (chunkNum + 1) * chunkSize - 1;
                                                end = Math.min(end, datalength - 1);
                                                if (typeof lazyArray.chunks[chunkNum] == "undefined") {
                                                        lazyArray.chunks[chunkNum] = doXHR(start, end)
                                                }
                                                if (typeof lazyArray.chunks[chunkNum] == "undefined")
                                                        throw new Error("doXHR failed!");
                                                return lazyArray.chunks[chunkNum]
                                        }
                                        );
                                        if (usesGzip || !datalength) {
                                                chunkSize = datalength = 1;
                                                datalength = this.getter(0).length;
                                                chunkSize = datalength;
                                                out("LazyFiles on gzip forces download of the whole file when length is accessed")
                                        }
                                        this._length = datalength;
                                        this._chunkSize = chunkSize;
                                        this.lengthKnown = true
                                }
                                ;
                                if (typeof XMLHttpRequest != "undefined") {
                                        if (!ENVIRONMENT_IS_WORKER)
                                                throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                                        var lazyArray = new LazyUint8Array;
                                        Object.defineProperties(lazyArray, {
                                                length: {
                                                        get: function() {
                                                                if (!this.lengthKnown) {
                                                                        this.cacheLength()
                                                                }
                                                                return this._length
                                                        }
                                                },
                                                chunkSize: {
                                                        get: function() {
                                                                if (!this.lengthKnown) {
                                                                        this.cacheLength()
                                                                }
                                                                return this._chunkSize
                                                        }
                                                }
                                        });
                                        var properties = {
                                                isDevice: false,
                                                contents: lazyArray
                                        }
                                } else {
                                        var properties = {
                                                isDevice: false,
                                                url: url
                                        }
                                }
                                var node = FS.createFile(parent, name, properties, canRead, canWrite);
                                if (properties.contents) {
                                        node.contents = properties.contents
                                } else if (properties.url) {
                                        node.contents = null;
                                        node.url = properties.url
                                }
                                Object.defineProperties(node, {
                                        usedBytes: {
                                                get: function() {
                                                        return this.contents.length
                                                }
                                        }
                                });
                                var stream_ops = {};
                                var keys = Object.keys(node.stream_ops);
                                keys.forEach(key => {
                                        var fn = node.stream_ops[key];
                                        stream_ops[key] = function forceLoadLazyFile() {
                                                FS.forceLoadFile(node);
                                                return fn.apply(null, arguments)
                                        }
                                }
                                );
                                function writeChunks(stream, buffer, offset, length, position) {
                                        var contents = stream.node.contents;
                                        if (position >= contents.length)
                                                return 0;
                                        var size = Math.min(contents.length - position, length);
                                        if (contents.slice) {
                                                for (var i = 0; i < size; i++) {
                                                        buffer[offset + i] = contents[position + i]
                                                }
                                        } else {
                                                for (var i = 0; i < size; i++) {
                                                        buffer[offset + i] = contents.get(position + i)
                                                }
                                        }
                                        return size
                                }
                                stream_ops.read = (stream, buffer, offset, length, position) => {
                                        FS.forceLoadFile(node);
                                        return writeChunks(stream, buffer, offset, length, position)
                                }
                                ;
                                stream_ops.mmap = (stream, length, position, prot, flags) => {
                                        FS.forceLoadFile(node);
                                        var ptr = mmapAlloc(length);
                                        if (!ptr) {
                                                throw new FS.ErrnoError(48)
                                        }
                                        writeChunks(stream, HEAP8, ptr, length, position);
                                        return {
                                                ptr: ptr,
                                                allocated: true
                                        }
                                }
                                ;
                                node.stream_ops = stream_ops;
                                return node
                        }
                        ,
                        createPreloadedFile: (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
                                var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
                                var dep = getUniqueRunDependency("cp " + fullname);
                                function processData(byteArray) {
                                        function finish(byteArray) {
                                                if (preFinish)
                                                        preFinish();
                                                if (!dontCreateFile) {
                                                        FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
                                                }
                                                if (onload)
                                                        onload();
                                                removeRunDependency(dep)
                                        }
                                        if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
                                                if (onerror)
                                                        onerror();
                                                removeRunDependency(dep)
                                        }
                                        )) {
                                                return
                                        }
                                        finish(byteArray)
                                }
                                addRunDependency(dep);
                                if (typeof url == "string") {
                                        asyncLoad(url, byteArray => processData(byteArray), onerror)
                                } else {
                                        processData(url)
                                }
                        }
                        ,
                        indexedDB: () => {
                                return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
                        }
                        ,
                        DB_NAME: () => {
                                return "EM_FS_" + window.location.pathname
                        }
                        ,
                        DB_VERSION: 20,
                        DB_STORE_NAME: "FILE_DATA",
                        saveFilesToDB: (paths, onload, onerror) => {
                                onload = onload || ( () => {}
                                );
                                onerror = onerror || ( () => {}
                                );
                                var indexedDB = FS.indexedDB();
                                try {
                                        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
                                } catch (e) {
                                        return onerror(e)
                                }
                                openRequest.onupgradeneeded = () => {
                                        out("creating db");
                                        var db = openRequest.result;
                                        db.createObjectStore(FS.DB_STORE_NAME)
                                }
                                ;
                                openRequest.onsuccess = () => {
                                        var db = openRequest.result;
                                        var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
                                        var files = transaction.objectStore(FS.DB_STORE_NAME);
                                        var ok = 0
                                          , fail = 0
                                          , total = paths.length;
                                        function finish() {
                                                if (fail == 0)
                                                        onload();
                                                else
                                                        onerror()
                                        }
                                        paths.forEach(path => {
                                                var putRequest = files.put(FS.analyzePath(path).object.contents, path);
                                                putRequest.onsuccess = () => {
                                                        ok++;
                                                        if (ok + fail == total)
                                                                finish()
                                                }
                                                ;
                                                putRequest.onerror = () => {
                                                        fail++;
                                                        if (ok + fail == total)
                                                                finish()
                                                }
                                        }
                                        );
                                        transaction.onerror = onerror
                                }
                                ;
                                openRequest.onerror = onerror
                        }
                        ,
                        loadFilesFromDB: (paths, onload, onerror) => {
                                onload = onload || ( () => {}
                                );
                                onerror = onerror || ( () => {}
                                );
                                var indexedDB = FS.indexedDB();
                                try {
                                        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
                                } catch (e) {
                                        return onerror(e)
                                }
                                openRequest.onupgradeneeded = onerror;
                                openRequest.onsuccess = () => {
                                        var db = openRequest.result;
                                        try {
                                                var transaction = db.transaction([FS.DB_STORE_NAME], "readonly")
                                        } catch (e) {
                                                onerror(e);
                                                return
                                        }
                                        var files = transaction.objectStore(FS.DB_STORE_NAME);
                                        var ok = 0
                                          , fail = 0
                                          , total = paths.length;
                                        function finish() {
                                                if (fail == 0)
                                                        onload();
                                                else
                                                        onerror()
                                        }
                                        paths.forEach(path => {
                                                var getRequest = files.get(path);
                                                getRequest.onsuccess = () => {
                                                        if (FS.analyzePath(path).exists) {
                                                                FS.unlink(path)
                                                        }
                                                        FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
                                                        ok++;
                                                        if (ok + fail == total)
                                                                finish()
                                                }
                                                ;
                                                getRequest.onerror = () => {
                                                        fail++;
                                                        if (ok + fail == total)
                                                                finish()
                                                }
                                        }
                                        );
                                        transaction.onerror = onerror
                                }
                                ;
                                openRequest.onerror = onerror
                        }
                };
                var SYSCALLS = {
                        DEFAULT_POLLMASK: 5,
                        calculateAt: function(dirfd, path, allowEmpty) {
                                if (PATH.isAbs(path)) {
                                        return path
                                }
                                var dir;
                                if (dirfd === -100) {
                                        dir = FS.cwd()
                                } else {
                                        var dirstream = SYSCALLS.getStreamFromFD(dirfd);
                                        dir = dirstream.path
                                }
                                if (path.length == 0) {
                                        if (!allowEmpty) {
                                                throw new FS.ErrnoError(44)
                                        }
                                        return dir
                                }
                                return PATH.join2(dir, path)
                        },
                        doStat: function(func, path, buf) {
                                try {
                                        var stat = func(path)
                                } catch (e) {
                                        if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
                                                return -54
                                        }
                                        throw e
                                }
                                HEAP32[buf >> 2] = stat.dev;
                                HEAP32[buf + 8 >> 2] = stat.ino;
                                HEAP32[buf + 12 >> 2] = stat.mode;
                                HEAPU32[buf + 16 >> 2] = stat.nlink;
                                HEAP32[buf + 20 >> 2] = stat.uid;
                                HEAP32[buf + 24 >> 2] = stat.gid;
                                HEAP32[buf + 28 >> 2] = stat.rdev;
                                tempI64 = [stat.size >>> 0, (tempDouble = stat.size,
                                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                                HEAP32[buf + 40 >> 2] = tempI64[0],
                                HEAP32[buf + 44 >> 2] = tempI64[1];
                                HEAP32[buf + 48 >> 2] = 4096;
                                HEAP32[buf + 52 >> 2] = stat.blocks;
                                tempI64 = [Math.floor(stat.atime.getTime() / 1e3) >>> 0, (tempDouble = Math.floor(stat.atime.getTime() / 1e3),
                                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                                HEAP32[buf + 56 >> 2] = tempI64[0],
                                HEAP32[buf + 60 >> 2] = tempI64[1];
                                HEAPU32[buf + 64 >> 2] = 0;
                                tempI64 = [Math.floor(stat.mtime.getTime() / 1e3) >>> 0, (tempDouble = Math.floor(stat.mtime.getTime() / 1e3),
                                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                                HEAP32[buf + 72 >> 2] = tempI64[0],
                                HEAP32[buf + 76 >> 2] = tempI64[1];
                                HEAPU32[buf + 80 >> 2] = 0;
                                tempI64 = [Math.floor(stat.ctime.getTime() / 1e3) >>> 0, (tempDouble = Math.floor(stat.ctime.getTime() / 1e3),
                                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                                HEAP32[buf + 88 >> 2] = tempI64[0],
                                HEAP32[buf + 92 >> 2] = tempI64[1];
                                HEAPU32[buf + 96 >> 2] = 0;
                                tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino,
                                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                                HEAP32[buf + 104 >> 2] = tempI64[0],
                                HEAP32[buf + 108 >> 2] = tempI64[1];
                                return 0
                        },
                        doMsync: function(addr, stream, len, flags, offset) {
                                if (!FS.isFile(stream.node.mode)) {
                                        throw new FS.ErrnoError(43)
                                }
                                if (flags & 2) {
                                        return 0
                                }
                                var buffer = HEAPU8.slice(addr, addr + len);
                                FS.msync(stream, buffer, offset, len, flags)
                        },
                        varargs: undefined,
                        get: function() {
                                SYSCALLS.varargs += 4;
                                var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
                                return ret
                        },
                        getStr: function(ptr) {
                                var ret = UTF8ToString(ptr);
                                return ret
                        },
                        getStreamFromFD: function(fd) {
                                var stream = FS.getStream(fd);
                                if (!stream)
                                        throw new FS.ErrnoError(8);
                                return stream
                        }
                };
                function ___syscall_fcntl64(fd, cmd, varargs) {
                        SYSCALLS.varargs = varargs;
                        try {
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                switch (cmd) {
                                case 0:
                                        {
                                                var arg = SYSCALLS.get();
                                                if (arg < 0) {
                                                        return -28
                                                }
                                                var newStream;
                                                newStream = FS.createStream(stream, arg);
                                                return newStream.fd
                                        }
                                case 1:
                                case 2:
                                        return 0;
                                case 3:
                                        return stream.flags;
                                case 4:
                                        {
                                                var arg = SYSCALLS.get();
                                                stream.flags |= arg;
                                                return 0
                                        }
                                case 5:
                                        {
                                                var arg = SYSCALLS.get();
                                                var offset = 0;
                                                HEAP16[arg + offset >> 1] = 2;
                                                return 0
                                        }
                                case 6:
                                case 7:
                                        return 0;
                                case 16:
                                case 8:
                                        return -28;
                                case 9:
                                        setErrNo(28);
                                        return -1;
                                default:
                                        {
                                                return -28
                                        }
                                }
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return -e.errno
                        }
                }
                function ___syscall_fstat64(fd, buf) {
                        try {
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                return SYSCALLS.doStat(FS.stat, stream.path, buf)
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return -e.errno
                        }
                }
                function ___syscall_ioctl(fd, op, varargs) {
                        SYSCALLS.varargs = varargs;
                        try {
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                switch (op) {
                                case 21509:
                                case 21505:
                                        {
                                                if (!stream.tty)
                                                        return -59;
                                                return 0
                                        }
                                case 21510:
                                case 21511:
                                case 21512:
                                case 21506:
                                case 21507:
                                case 21508:
                                        {
                                                if (!stream.tty)
                                                        return -59;
                                                return 0
                                        }
                                case 21519:
                                        {
                                                if (!stream.tty)
                                                        return -59;
                                                var argp = SYSCALLS.get();
                                                HEAP32[argp >> 2] = 0;
                                                return 0
                                        }
                                case 21520:
                                        {
                                                if (!stream.tty)
                                                        return -59;
                                                return -28
                                        }
                                case 21531:
                                        {
                                                var argp = SYSCALLS.get();
                                                return FS.ioctl(stream, op, argp)
                                        }
                                case 21523:
                                        {
                                                if (!stream.tty)
                                                        return -59;
                                                return 0
                                        }
                                case 21524:
                                        {
                                                if (!stream.tty)
                                                        return -59;
                                                return 0
                                        }
                                default:
                                        return -28
                                }
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return -e.errno
                        }
                }
                function ___syscall_lstat64(path, buf) {
                        try {
                                path = SYSCALLS.getStr(path);
                                return SYSCALLS.doStat(FS.lstat, path, buf)
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return -e.errno
                        }
                }
                function ___syscall_mkdirat(dirfd, path, mode) {
                        try {
                                path = SYSCALLS.getStr(path);
                                path = SYSCALLS.calculateAt(dirfd, path);
                                path = PATH.normalize(path);
                                if (path[path.length - 1] === "/")
                                        path = path.substr(0, path.length - 1);
                                FS.mkdir(path, mode, 0);
                                return 0
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return -e.errno
                        }
                }
                function ___syscall_newfstatat(dirfd, path, buf, flags) {
                        try {
                                path = SYSCALLS.getStr(path);
                                var nofollow = flags & 256;
                                var allowEmpty = flags & 4096;
                                flags = flags & ~4352;
                                path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
                                return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf)
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return -e.errno
                        }
                }
                function ___syscall_openat(dirfd, path, flags, varargs) {
                        SYSCALLS.varargs = varargs;
                        try {
                                path = SYSCALLS.getStr(path);
                                path = SYSCALLS.calculateAt(dirfd, path);
                                var mode = varargs ? SYSCALLS.get() : 0;
                                return FS.open(path, flags, mode).fd
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return -e.errno
                        }
                }
                function ___syscall_stat64(path, buf) {
                        try {
                                path = SYSCALLS.getStr(path);
                                return SYSCALLS.doStat(FS.stat, path, buf)
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return -e.errno
                        }
                }
                function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {}
                function getShiftFromSize(size) {
                        switch (size) {
                        case 1:
                                return 0;
                        case 2:
                                return 1;
                        case 4:
                                return 2;
                        case 8:
                                return 3;
                        default:
                                throw new TypeError("Unknown type size: " + size)
                        }
                }
                function embind_init_charCodes() {
                        var codes = new Array(256);
                        for (var i = 0; i < 256; ++i) {
                                codes[i] = String.fromCharCode(i)
                        }
                        embind_charCodes = codes
                }
                var embind_charCodes = undefined;
                function readLatin1String(ptr) {
                        var ret = "";
                        var c = ptr;
                        while (HEAPU8[c]) {
                                ret += embind_charCodes[HEAPU8[c++]]
                        }
                        return ret
                }
                var awaitingDependencies = {};
                var registeredTypes = {};
                var typeDependencies = {};
                var char_0 = 48;
                var char_9 = 57;
                function makeLegalFunctionName(name) {
                        if (undefined === name) {
                                return "_unknown"
                        }
                        name = name.replace(/[^a-zA-Z0-9_]/g, "$");
                        var f = name.charCodeAt(0);
                        if (f >= char_0 && f <= char_9) {
                                return "_" + name
                        }
                        return name
                }
                function createNamedFunction(name, body) {
                        name = makeLegalFunctionName(name);
                        return new Function("body","return function " + name + "() {\\n" + '    "use strict";' + "    return body.apply(this, arguments);\\n" + "};\\n")(body)
                }
                function extendError(baseErrorType, errorName) {
                        var errorClass = createNamedFunction(errorName, function(message) {
                                this.name = errorName;
                                this.message = message;
                                var stack = new Error(message).stack;
                                if (stack !== undefined) {
                                        this.stack = this.toString() + "\\n" + stack.replace(/^Error(:[^\\n]*)?\\n/, "");
                                }
                        });
                        errorClass.prototype = Object.create(baseErrorType.prototype);
                        errorClass.prototype.constructor = errorClass;
                        errorClass.prototype.toString = function() {
                                if (this.message === undefined) {
                                        return this.name
                                } else {
                                        return this.name + ": " + this.message
                                }
                        }
                        ;
                        return errorClass
                }
                var BindingError = undefined;
                function throwBindingError(message) {
                        throw new BindingError(message)
                }
                var InternalError = undefined;
                function throwInternalError(message) {
                        throw new InternalError(message)
                }
                function registerType(rawType, registeredInstance, options={}) {
                        if (!("argPackAdvance"in registeredInstance)) {
                                throw new TypeError("registerType registeredInstance requires argPackAdvance")
                        }
                        var name = registeredInstance.name;
                        if (!rawType) {
                                throwBindingError('type "' + name + '" must have a positive integer typeid pointer')
                        }
                        if (registeredTypes.hasOwnProperty(rawType)) {
                                if (options.ignoreDuplicateRegistrations) {
                                        return
                                } else {
                                        throwBindingError("Cannot register type '" + name + "' twice")
                                }
                        }
                        registeredTypes[rawType] = registeredInstance;
                        delete typeDependencies[rawType];
                        if (awaitingDependencies.hasOwnProperty(rawType)) {
                                var callbacks = awaitingDependencies[rawType];
                                delete awaitingDependencies[rawType];
                                callbacks.forEach(cb => cb())
                        }
                }
                function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
                        var shift = getShiftFromSize(size);
                        name = readLatin1String(name);
                        registerType(rawType, {
                                name: name,
                                "fromWireType": function(wt) {
                                        return !!wt
                                },
                                "toWireType": function(destructors, o) {
                                        return o ? trueValue : falseValue
                                },
                                "argPackAdvance": 8,
                                "readValueFromPointer": function(pointer) {
                                        var heap;
                                        if (size === 1) {
                                                heap = HEAP8
                                        } else if (size === 2) {
                                                heap = HEAP16
                                        } else if (size === 4) {
                                                heap = HEAP32
                                        } else {
                                                throw new TypeError("Unknown boolean type size: " + name)
                                        }
                                        return this["fromWireType"](heap[pointer >> shift])
                                },
                                destructorFunction: null
                        })
                }
                var emval_free_list = [];
                var emval_handle_array = [{}, {
                        value: undefined
                }, {
                        value: null
                }, {
                        value: true
                }, {
                        value: false
                }];
                function __emval_decref(handle) {
                        if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
                                emval_handle_array[handle] = undefined;
                                emval_free_list.push(handle)
                        }
                }
                function count_emval_handles() {
                        var count = 0;
                        for (var i = 5; i < emval_handle_array.length; ++i) {
                                if (emval_handle_array[i] !== undefined) {
                                        ++count
                                }
                        }
                        return count
                }
                function get_first_emval() {
                        for (var i = 5; i < emval_handle_array.length; ++i) {
                                if (emval_handle_array[i] !== undefined) {
                                        return emval_handle_array[i]
                                }
                        }
                        return null
                }
                function init_emval() {
                        Module["count_emval_handles"] = count_emval_handles;
                        Module["get_first_emval"] = get_first_emval
                }
                var Emval = {
                        toValue: handle => {
                                if (!handle) {
                                        throwBindingError("Cannot use deleted val. handle = " + handle)
                                }
                                return emval_handle_array[handle].value
                        }
                        ,
                        toHandle: value => {
                                switch (value) {
                                case undefined:
                                        return 1;
                                case null:
                                        return 2;
                                case true:
                                        return 3;
                                case false:
                                        return 4;
                                default:
                                        {
                                                var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
                                                emval_handle_array[handle] = {
                                                        refcount: 1,
                                                        value: value
                                                };
                                                return handle
                                        }
                                }
                        }
                };
                function simpleReadValueFromPointer(pointer) {
                        return this["fromWireType"](HEAP32[pointer >> 2])
                }
                function __embind_register_emval(rawType, name) {
                        name = readLatin1String(name);
                        registerType(rawType, {
                                name: name,
                                "fromWireType": function(handle) {
                                        var rv = Emval.toValue(handle);
                                        __emval_decref(handle);
                                        return rv
                                },
                                "toWireType": function(destructors, value) {
                                        return Emval.toHandle(value)
                                },
                                "argPackAdvance": 8,
                                "readValueFromPointer": simpleReadValueFromPointer,
                                destructorFunction: null
                        })
                }
                function floatReadValueFromPointer(name, shift) {
                        switch (shift) {
                        case 2:
                                return function(pointer) {
                                        return this["fromWireType"](HEAPF32[pointer >> 2])
                                }
                                ;
                        case 3:
                                return function(pointer) {
                                        return this["fromWireType"](HEAPF64[pointer >> 3])
                                }
                                ;
                        default:
                                throw new TypeError("Unknown float type: " + name)
                        }
                }
                function __embind_register_float(rawType, name, size) {
                        var shift = getShiftFromSize(size);
                        name = readLatin1String(name);
                        registerType(rawType, {
                                name: name,
                                "fromWireType": function(value) {
                                        return value
                                },
                                "toWireType": function(destructors, value) {
                                        return value
                                },
                                "argPackAdvance": 8,
                                "readValueFromPointer": floatReadValueFromPointer(name, shift),
                                destructorFunction: null
                        })
                }
                function integerReadValueFromPointer(name, shift, signed) {
                        switch (shift) {
                        case 0:
                                return signed ? function readS8FromPointer(pointer) {
                                        return HEAP8[pointer]
                                }
                                : function readU8FromPointer(pointer) {
                                        return HEAPU8[pointer]
                                }
                                ;
                        case 1:
                                return signed ? function readS16FromPointer(pointer) {
                                        return HEAP16[pointer >> 1]
                                }
                                : function readU16FromPointer(pointer) {
                                        return HEAPU16[pointer >> 1]
                                }
                                ;
                        case 2:
                                return signed ? function readS32FromPointer(pointer) {
                                        return HEAP32[pointer >> 2]
                                }
                                : function readU32FromPointer(pointer) {
                                        return HEAPU32[pointer >> 2]
                                }
                                ;
                        default:
                                throw new TypeError("Unknown integer type: " + name)
                        }
                }
                function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
                        name = readLatin1String(name);
                        if (maxRange === -1) {
                                maxRange = 4294967295
                        }
                        var shift = getShiftFromSize(size);
                        var fromWireType = value => value;
                        if (minRange === 0) {
                                var bitshift = 32 - 8 * size;
                                fromWireType = value => value << bitshift >>> bitshift
                        }
                        var isUnsignedType = name.includes("unsigned");
                        var checkAssertions = (value, toTypeName) => {}
                        ;
                        var toWireType;
                        if (isUnsignedType) {
                                toWireType = function(destructors, value) {
                                        checkAssertions(value, this.name);
                                        return value >>> 0
                                }
                        } else {
                                toWireType = function(destructors, value) {
                                        checkAssertions(value, this.name);
                                        return value
                                }
                        }
                        registerType(primitiveType, {
                                name: name,
                                "fromWireType": fromWireType,
                                "toWireType": toWireType,
                                "argPackAdvance": 8,
                                "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
                                destructorFunction: null
                        })
                }
                function __embind_register_memory_view(rawType, dataTypeIndex, name) {
                        var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
                        var TA = typeMapping[dataTypeIndex];
                        function decodeMemoryView(handle) {
                                handle = handle >> 2;
                                var heap = HEAPU32;
                                var size = heap[handle];
                                var data = heap[handle + 1];
                                return new TA(buffer,data,size)
                        }
                        name = readLatin1String(name);
                        registerType(rawType, {
                                name: name,
                                "fromWireType": decodeMemoryView,
                                "argPackAdvance": 8,
                                "readValueFromPointer": decodeMemoryView
                        }, {
                                ignoreDuplicateRegistrations: true
                        })
                }
                function __embind_register_std_string(rawType, name) {
                        name = readLatin1String(name);
                        var stdStringIsUTF8 = name === "std::string";
                        registerType(rawType, {
                                name: name,
                                "fromWireType": function(value) {
                                        var length = HEAPU32[value >> 2];
                                        var payload = value + 4;
                                        var str;
                                        if (stdStringIsUTF8) {
                                                var decodeStartPtr = payload;
                                                for (var i = 0; i <= length; ++i) {
                                                        var currentBytePtr = payload + i;
                                                        if (i == length || HEAPU8[currentBytePtr] == 0) {
                                                                var maxRead = currentBytePtr - decodeStartPtr;
                                                                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                                                                if (str === undefined) {
                                                                        str = stringSegment
                                                                } else {
                                                                        str += String.fromCharCode(0);
                                                                        str += stringSegment
                                                                }
                                                                decodeStartPtr = currentBytePtr + 1
                                                        }
                                                }
                                        } else {
                                                var a = new Array(length);
                                                for (var i = 0; i < length; ++i) {
                                                        a[i] = String.fromCharCode(HEAPU8[payload + i])
                                                }
                                                str = a.join("")
                                        }
                                        _free(value);
                                        return str
                                },
                                "toWireType": function(destructors, value) {
                                        if (value instanceof ArrayBuffer) {
                                                value = new Uint8Array(value)
                                        }
                                        var length;
                                        var valueIsOfTypeString = typeof value == "string";
                                        if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
                                                throwBindingError("Cannot pass non-string to std::string")
                                        }
                                        if (stdStringIsUTF8 && valueIsOfTypeString) {
                                                length = lengthBytesUTF8(value)
                                        } else {
                                                length = value.length
                                        }
                                        var base = _malloc(4 + length + 1);
                                        var ptr = base + 4;
                                        HEAPU32[base >> 2] = length;
                                        if (stdStringIsUTF8 && valueIsOfTypeString) {
                                                stringToUTF8(value, ptr, length + 1)
                                        } else {
                                                if (valueIsOfTypeString) {
                                                        for (var i = 0; i < length; ++i) {
                                                                var charCode = value.charCodeAt(i);
                                                                if (charCode > 255) {
                                                                        _free(ptr);
                                                                        throwBindingError("String has UTF-16 code units that do not fit in 8 bits")
                                                                }
                                                                HEAPU8[ptr + i] = charCode
                                                        }
                                                } else {
                                                        for (var i = 0; i < length; ++i) {
                                                                HEAPU8[ptr + i] = value[i]
                                                        }
                                                }
                                        }
                                        if (destructors !== null) {
                                                destructors.push(_free, base)
                                        }
                                        return base
                                },
                                "argPackAdvance": 8,
                                "readValueFromPointer": simpleReadValueFromPointer,
                                destructorFunction: function(ptr) {
                                        _free(ptr)
                                }
                        })
                }
                var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : undefined;
                function UTF16ToString(ptr, maxBytesToRead) {
                        var endPtr = ptr;
                        var idx = endPtr >> 1;
                        var maxIdx = idx + maxBytesToRead / 2;
                        while (!(idx >= maxIdx) && HEAPU16[idx])
                                ++idx;
                        endPtr = idx << 1;
                        if (endPtr - ptr > 32 && UTF16Decoder)
                                return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
                        var str = "";
                        for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
                                var codeUnit = HEAP16[ptr + i * 2 >> 1];
                                if (codeUnit == 0)
                                        break;
                                str += String.fromCharCode(codeUnit)
                        }
                        return str
                }
                function stringToUTF16(str, outPtr, maxBytesToWrite) {
                        if (maxBytesToWrite === undefined) {
                                maxBytesToWrite = 2147483647
                        }
                        if (maxBytesToWrite < 2)
                                return 0;
                        maxBytesToWrite -= 2;
                        var startPtr = outPtr;
                        var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
                        for (var i = 0; i < numCharsToWrite; ++i) {
                                var codeUnit = str.charCodeAt(i);
                                HEAP16[outPtr >> 1] = codeUnit;
                                outPtr += 2
                        }
                        HEAP16[outPtr >> 1] = 0;
                        return outPtr - startPtr
                }
                function lengthBytesUTF16(str) {
                        return str.length * 2
                }
                function UTF32ToString(ptr, maxBytesToRead) {
                        var i = 0;
                        var str = "";
                        while (!(i >= maxBytesToRead / 4)) {
                                var utf32 = HEAP32[ptr + i * 4 >> 2];
                                if (utf32 == 0)
                                        break;
                                ++i;
                                if (utf32 >= 65536) {
                                        var ch = utf32 - 65536;
                                        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
                                } else {
                                        str += String.fromCharCode(utf32)
                                }
                        }
                        return str
                }
                function stringToUTF32(str, outPtr, maxBytesToWrite) {
                        if (maxBytesToWrite === undefined) {
                                maxBytesToWrite = 2147483647
                        }
                        if (maxBytesToWrite < 4)
                                return 0;
                        var startPtr = outPtr;
                        var endPtr = startPtr + maxBytesToWrite - 4;
                        for (var i = 0; i < str.length; ++i) {
                                var codeUnit = str.charCodeAt(i);
                                if (codeUnit >= 55296 && codeUnit <= 57343) {
                                        var trailSurrogate = str.charCodeAt(++i);
                                        codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023
                                }
                                HEAP32[outPtr >> 2] = codeUnit;
                                outPtr += 4;
                                if (outPtr + 4 > endPtr)
                                        break
                        }
                        HEAP32[outPtr >> 2] = 0;
                        return outPtr - startPtr
                }
                function lengthBytesUTF32(str) {
                        var len = 0;
                        for (var i = 0; i < str.length; ++i) {
                                var codeUnit = str.charCodeAt(i);
                                if (codeUnit >= 55296 && codeUnit <= 57343)
                                        ++i;
                                len += 4
                        }
                        return len
                }
                function __embind_register_std_wstring(rawType, charSize, name) {
                        name = readLatin1String(name);
                        var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
                        if (charSize === 2) {
                                decodeString = UTF16ToString;
                                encodeString = stringToUTF16;
                                lengthBytesUTF = lengthBytesUTF16;
                                getHeap = () => HEAPU16;
                                shift = 1
                        } else if (charSize === 4) {
                                decodeString = UTF32ToString;
                                encodeString = stringToUTF32;
                                lengthBytesUTF = lengthBytesUTF32;
                                getHeap = () => HEAPU32;
                                shift = 2
                        }
                        registerType(rawType, {
                                name: name,
                                "fromWireType": function(value) {
                                        var length = HEAPU32[value >> 2];
                                        var HEAP = getHeap();
                                        var str;
                                        var decodeStartPtr = value + 4;
                                        for (var i = 0; i <= length; ++i) {
                                                var currentBytePtr = value + 4 + i * charSize;
                                                if (i == length || HEAP[currentBytePtr >> shift] == 0) {
                                                        var maxReadBytes = currentBytePtr - decodeStartPtr;
                                                        var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                                                        if (str === undefined) {
                                                                str = stringSegment
                                                        } else {
                                                                str += String.fromCharCode(0);
                                                                str += stringSegment
                                                        }
                                                        decodeStartPtr = currentBytePtr + charSize
                                                }
                                        }
                                        _free(value);
                                        return str
                                },
                                "toWireType": function(destructors, value) {
                                        if (!(typeof value == "string")) {
                                                throwBindingError("Cannot pass non-string to C++ string type " + name)
                                        }
                                        var length = lengthBytesUTF(value);
                                        var ptr = _malloc(4 + length + charSize);
                                        HEAPU32[ptr >> 2] = length >> shift;
                                        encodeString(value, ptr + 4, length + charSize);
                                        if (destructors !== null) {
                                                destructors.push(_free, ptr)
                                        }
                                        return ptr
                                },
                                "argPackAdvance": 8,
                                "readValueFromPointer": simpleReadValueFromPointer,
                                destructorFunction: function(ptr) {
                                        _free(ptr)
                                }
                        })
                }
                function __embind_register_void(rawType, name) {
                        name = readLatin1String(name);
                        registerType(rawType, {
                                isVoid: true,
                                name: name,
                                "argPackAdvance": 0,
                                "fromWireType": function() {
                                        return undefined
                                },
                                "toWireType": function(destructors, o) {
                                        return undefined
                                }
                        })
                }
                var nowIsMonotonic = true;
                function __emscripten_get_now_is_monotonic() {
                        return nowIsMonotonic
                }
                function readI53FromI64(ptr) {
                        return HEAPU32[ptr >> 2] + HEAP32[ptr + 4 >> 2] * 4294967296
                }
                function __gmtime_js(time, tmPtr) {
                        var date = new Date(readI53FromI64(time) * 1e3);
                        HEAP32[tmPtr >> 2] = date.getUTCSeconds();
                        HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
                        HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
                        HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
                        HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
                        HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
                        HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
                        var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
                        var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
                        HEAP32[tmPtr + 28 >> 2] = yday
                }
                function __localtime_js(time, tmPtr) {
                        var date = new Date(readI53FromI64(time) * 1e3);
                        HEAP32[tmPtr >> 2] = date.getSeconds();
                        HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
                        HEAP32[tmPtr + 8 >> 2] = date.getHours();
                        HEAP32[tmPtr + 12 >> 2] = date.getDate();
                        HEAP32[tmPtr + 16 >> 2] = date.getMonth();
                        HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
                        HEAP32[tmPtr + 24 >> 2] = date.getDay();
                        var start = new Date(date.getFullYear(),0,1);
                        var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
                        HEAP32[tmPtr + 28 >> 2] = yday;
                        HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
                        var summerOffset = new Date(date.getFullYear(),6,1).getTimezoneOffset();
                        var winterOffset = start.getTimezoneOffset();
                        var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
                        HEAP32[tmPtr + 32 >> 2] = dst
                }
                function __mmap_js(len, prot, flags, fd, off, allocated, addr) {
                        try {
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                var res = FS.mmap(stream, len, off, prot, flags);
                                var ptr = res.ptr;
                                HEAP32[allocated >> 2] = res.allocated;
                                HEAPU32[addr >> 2] = ptr;
                                return 0
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return -e.errno
                        }
                }
                function __munmap_js(addr, len, prot, flags, fd, offset) {
                        try {
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                if (prot & 2) {
                                        SYSCALLS.doMsync(addr, stream, len, flags, offset)
                                }
                                FS.munmap(stream)
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return -e.errno
                        }
                }
                function allocateUTF8(str) {
                        var size = lengthBytesUTF8(str) + 1;
                        var ret = _malloc(size);
                        if (ret)
                                stringToUTF8Array(str, HEAP8, ret, size);
                        return ret
                }
                function _tzset_impl(timezone, daylight, tzname) {
                        var currentYear = (new Date).getFullYear();
                        var winter = new Date(currentYear,0,1);
                        var summer = new Date(currentYear,6,1);
                        var winterOffset = winter.getTimezoneOffset();
                        var summerOffset = summer.getTimezoneOffset();
                        var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
                        HEAP32[timezone >> 2] = stdTimezoneOffset * 60;
                        HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
                        function extractZone(date) {
                                var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                                return match ? match[1] : "GMT"
                        }
                        var winterName = extractZone(winter);
                        var summerName = extractZone(summer);
                        var winterNamePtr = allocateUTF8(winterName);
                        var summerNamePtr = allocateUTF8(summerName);
                        if (summerOffset < winterOffset) {
                                HEAPU32[tzname >> 2] = winterNamePtr;
                                HEAPU32[tzname + 4 >> 2] = summerNamePtr
                        } else {
                                HEAPU32[tzname >> 2] = summerNamePtr;
                                HEAPU32[tzname + 4 >> 2] = winterNamePtr
                        }
                }
                function __tzset_js(timezone, daylight, tzname) {
                        if (__tzset_js.called)
                                return;
                        __tzset_js.called = true;
                        _tzset_impl(timezone, daylight, tzname)
                }
                function _abort() {
                        abort("")
                }
                var readAsmConstArgsArray = [];
                function readAsmConstArgs(sigPtr, buf) {
                        readAsmConstArgsArray.length = 0;
                        var ch;
                        buf >>= 2;
                        while (ch = HEAPU8[sigPtr++]) {
                                buf += ch != 105 & buf;
                                readAsmConstArgsArray.push(ch == 105 ? HEAP32[buf] : HEAPF64[buf++ >> 1]);
                                ++buf
                        }
                        return readAsmConstArgsArray
                }
                function _emscripten_asm_const_int(code, sigPtr, argbuf) {
                        var args = readAsmConstArgs(sigPtr, argbuf);
                        return ASM_CONSTS[code].apply(null, args)
                }
                function _emscripten_date_now() {
                        return Date.now()
                }
                function getHeapMax() {
                        return HEAPU8.length
                }
                function _emscripten_get_heap_max() {
                        return getHeapMax()
                }
                var _emscripten_get_now;
                if (ENVIRONMENT_IS_NODE) {
                        _emscripten_get_now = () => {
                                var t = process["hrtime"]();
                                return t[0] * 1e3 + t[1] / 1e6
                        }
                } else
                        _emscripten_get_now = () => performance.now();
                function _emscripten_memcpy_big(dest, src, num) {
                        HEAPU8.copyWithin(dest, src, src + num)
                }
                function abortOnCannotGrowMemory(requestedSize) {
                        abort("OOM")
                }
                function _emscripten_resize_heap(requestedSize) {
                        var oldSize = HEAPU8.length;
                        requestedSize = requestedSize >>> 0;
                        abortOnCannotGrowMemory(requestedSize)
                }
                function handleException(e) {
                        if (e instanceof ExitStatus || e == "unwind") {
                                return EXITSTATUS
                        }
                        quit_(1, e)
                }
                function callUserCallback(func) {
                        if (ABORT) {
                                return
                        }
                        try {
                                func()
                        } catch (e) {
                                handleException(e)
                        }
                }
                function safeSetTimeout(func, timeout) {
                        return setTimeout(function() {
                                callUserCallback(func)
                        }, timeout)
                }
                function _emscripten_sleep(ms) {
                        return Asyncify.handleSleep(wakeUp => safeSetTimeout(wakeUp, ms))
                }
                var ENV = {};
                function getExecutableName() {
                        return thisProgram || "./this.program"
                }
                function getEnvStrings() {
                        if (!getEnvStrings.strings) {
                                var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
                                var env = {
                                        "USER": "web_user",
                                        "LOGNAME": "web_user",
                                        "PATH": "/",
                                        "PWD": "/",
                                        "HOME": "/home/web_user",
                                        "LANG": lang,
                                        "_": getExecutableName()
                                };
                                for (var x in ENV) {
                                        if (ENV[x] === undefined)
                                                delete env[x];
                                        else
                                                env[x] = ENV[x]
                                }
                                var strings = [];
                                for (var x in env) {
                                        strings.push(x + "=" + env[x])
                                }
                                getEnvStrings.strings = strings
                        }
                        return getEnvStrings.strings
                }
                function writeAsciiToMemory(str, buffer, dontAddNull) {
                        for (var i = 0; i < str.length; ++i) {
                                HEAP8[buffer++ >> 0] = str.charCodeAt(i)
                        }
                        if (!dontAddNull)
                                HEAP8[buffer >> 0] = 0
                }
                function _environ_get(__environ, environ_buf) {
                        var bufSize = 0;
                        getEnvStrings().forEach(function(string, i) {
                                var ptr = environ_buf + bufSize;
                                HEAPU32[__environ + i * 4 >> 2] = ptr;
                                writeAsciiToMemory(string, ptr);
                                bufSize += string.length + 1
                        });
                        return 0
                }
                function _environ_sizes_get(penviron_count, penviron_buf_size) {
                        var strings = getEnvStrings();
                        HEAPU32[penviron_count >> 2] = strings.length;
                        var bufSize = 0;
                        strings.forEach(function(string) {
                                bufSize += string.length + 1
                        });
                        HEAPU32[penviron_buf_size >> 2] = bufSize;
                        return 0
                }
                function _proc_exit(code) {
                        EXITSTATUS = code;
                        if (!keepRuntimeAlive()) {
                                if (Module["onExit"])
                                        Module["onExit"](code);
                                ABORT = true
                        }
                        quit_(code, new ExitStatus(code))
                }
                function exitJS(status, implicit) {
                        EXITSTATUS = status;
                        _proc_exit(status)
                }
                var _exit = exitJS;
                function _fd_close(fd) {
                        try {
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                FS.close(stream);
                                return 0
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return e.errno
                        }
                }
                function _fd_fdstat_get(fd, pbuf) {
                        try {
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
                                HEAP8[pbuf >> 0] = type;
                                return 0
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return e.errno
                        }
                }
                function doReadv(stream, iov, iovcnt, offset) {
                        var ret = 0;
                        for (var i = 0; i < iovcnt; i++) {
                                var ptr = HEAPU32[iov >> 2];
                                var len = HEAPU32[iov + 4 >> 2];
                                iov += 8;
                                var curr = FS.read(stream, HEAP8, ptr, len, offset);
                                if (curr < 0)
                                        return -1;
                                ret += curr;
                                if (curr < len)
                                        break
                        }
                        return ret
                }
                function _fd_read(fd, iov, iovcnt, pnum) {
                        try {
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                var num = doReadv(stream, iov, iovcnt);
                                HEAPU32[pnum >> 2] = num;
                                return 0
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return e.errno
                        }
                }
                function convertI32PairToI53Checked(lo, hi) {
                        return hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN
                }
                function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
                        try {
                                var offset = convertI32PairToI53Checked(offset_low, offset_high);
                                if (isNaN(offset))
                                        return 61;
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                FS.llseek(stream, offset, whence);
                                tempI64 = [stream.position >>> 0, (tempDouble = stream.position,
                                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                                HEAP32[newOffset >> 2] = tempI64[0],
                                HEAP32[newOffset + 4 >> 2] = tempI64[1];
                                if (stream.getdents && offset === 0 && whence === 0)
                                        stream.getdents = null;
                                return 0
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return e.errno
                        }
                }
                function _fd_sync(fd) {
                        try {
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                return Asyncify.handleSleep(function(wakeUp) {
                                        var mount = stream.node.mount;
                                        if (!mount.type.syncfs) {
                                                wakeUp(0);
                                                return
                                        }
                                        mount.type.syncfs(mount, false, function(err) {
                                                if (err) {
                                                        wakeUp(function() {
                                                                return 29
                                                        });
                                                        return
                                                }
                                                wakeUp(0)
                                        })
                                })
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return e.errno
                        }
                }
                function doWritev(stream, iov, iovcnt, offset) {
                        var ret = 0;
                        for (var i = 0; i < iovcnt; i++) {
                                var ptr = HEAPU32[iov >> 2];
                                var len = HEAPU32[iov + 4 >> 2];
                                iov += 8;
                                var curr = FS.write(stream, HEAP8, ptr, len, offset);
                                if (curr < 0)
                                        return -1;
                                ret += curr
                        }
                        return ret
                }
                function _fd_write(fd, iov, iovcnt, pnum) {
                        try {
                                var stream = SYSCALLS.getStreamFromFD(fd);
                                var num = doWritev(stream, iov, iovcnt);
                                HEAPU32[pnum >> 2] = num;
                                return 0
                        } catch (e) {
                                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                                        throw e;
                                return e.errno
                        }
                }
                function _getentropy(buffer, size) {
                        if (!_getentropy.randomDevice) {
                                _getentropy.randomDevice = getRandomDevice()
                        }
                        for (var i = 0; i < size; i++) {
                                HEAP8[buffer + i >> 0] = _getentropy.randomDevice()
                        }
                        return 0
                }
                function __isLeapYear(year) {
                        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
                }
                function __arraySum(array, index) {
                        var sum = 0;
                        for (var i = 0; i <= index; sum += array[i++]) {}
                        return sum
                }
                var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                function __addDays(date, days) {
                        var newDate = new Date(date.getTime());
                        while (days > 0) {
                                var leap = __isLeapYear(newDate.getFullYear());
                                var currentMonth = newDate.getMonth();
                                var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
                                if (days > daysInCurrentMonth - newDate.getDate()) {
                                        days -= daysInCurrentMonth - newDate.getDate() + 1;
                                        newDate.setDate(1);
                                        if (currentMonth < 11) {
                                                newDate.setMonth(currentMonth + 1)
                                        } else {
                                                newDate.setMonth(0);
                                                newDate.setFullYear(newDate.getFullYear() + 1)
                                        }
                                } else {
                                        newDate.setDate(newDate.getDate() + days);
                                        return newDate
                                }
                        }
                        return newDate
                }
                function writeArrayToMemory(array, buffer) {
                        HEAP8.set(array, buffer)
                }
                function _strftime(s, maxsize, format, tm) {
                        var tm_zone = HEAP32[tm + 40 >> 2];
                        var date = {
                                tm_sec: HEAP32[tm >> 2],
                                tm_min: HEAP32[tm + 4 >> 2],
                                tm_hour: HEAP32[tm + 8 >> 2],
                                tm_mday: HEAP32[tm + 12 >> 2],
                                tm_mon: HEAP32[tm + 16 >> 2],
                                tm_year: HEAP32[tm + 20 >> 2],
                                tm_wday: HEAP32[tm + 24 >> 2],
                                tm_yday: HEAP32[tm + 28 >> 2],
                                tm_isdst: HEAP32[tm + 32 >> 2],
                                tm_gmtoff: HEAP32[tm + 36 >> 2],
                                tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
                        };
                        var pattern = UTF8ToString(format);
                        var EXPANSION_RULES_1 = {
                                "%c": "%a %b %d %H:%M:%S %Y",
                                "%D": "%m/%d/%y",
                                "%F": "%Y-%m-%d",
                                "%h": "%b",
                                "%r": "%I:%M:%S %p",
                                "%R": "%H:%M",
                                "%T": "%H:%M:%S",
                                "%x": "%m/%d/%y",
                                "%X": "%H:%M:%S",
                                "%Ec": "%c",
                                "%EC": "%C",
                                "%Ex": "%m/%d/%y",
                                "%EX": "%H:%M:%S",
                                "%Ey": "%y",
                                "%EY": "%Y",
                                "%Od": "%d",
                                "%Oe": "%e",
                                "%OH": "%H",
                                "%OI": "%I",
                                "%Om": "%m",
                                "%OM": "%M",
                                "%OS": "%S",
                                "%Ou": "%u",
                                "%OU": "%U",
                                "%OV": "%V",
                                "%Ow": "%w",
                                "%OW": "%W",
                                "%Oy": "%y"
                        };
                        for (var rule in EXPANSION_RULES_1) {
                                pattern = pattern.replace(new RegExp(rule,"g"), EXPANSION_RULES_1[rule])
                        }
                        var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        function leadingSomething(value, digits, character) {
                                var str = typeof value == "number" ? value.toString() : value || "";
                                while (str.length < digits) {
                                        str = character[0] + str
                                }
                                return str
                        }
                        function leadingNulls(value, digits) {
                                return leadingSomething(value, digits, "0")
                        }
                        function compareByDay(date1, date2) {
                                function sgn(value) {
                                        return value < 0 ? -1 : value > 0 ? 1 : 0
                                }
                                var compare;
                                if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
                                        if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
                                                compare = sgn(date1.getDate() - date2.getDate())
                                        }
                                }
                                return compare
                        }
                        function getFirstWeekStartDate(janFourth) {
                                switch (janFourth.getDay()) {
                                case 0:
                                        return new Date(janFourth.getFullYear() - 1,11,29);
                                case 1:
                                        return janFourth;
                                case 2:
                                        return new Date(janFourth.getFullYear(),0,3);
                                case 3:
                                        return new Date(janFourth.getFullYear(),0,2);
                                case 4:
                                        return new Date(janFourth.getFullYear(),0,1);
                                case 5:
                                        return new Date(janFourth.getFullYear() - 1,11,31);
                                case 6:
                                        return new Date(janFourth.getFullYear() - 1,11,30)
                                }
                        }
                        function getWeekBasedYear(date) {
                                var thisDate = __addDays(new Date(date.tm_year + 1900,0,1), date.tm_yday);
                                var janFourthThisYear = new Date(thisDate.getFullYear(),0,4);
                                var janFourthNextYear = new Date(thisDate.getFullYear() + 1,0,4);
                                var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
                                var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
                                if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
                                        if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                                                return thisDate.getFullYear() + 1
                                        }
                                        return thisDate.getFullYear()
                                }
                                return thisDate.getFullYear() - 1
                        }
                        var EXPANSION_RULES_2 = {
                                "%a": function(date) {
                                        return WEEKDAYS[date.tm_wday].substring(0, 3)
                                },
                                "%A": function(date) {
                                        return WEEKDAYS[date.tm_wday]
                                },
                                "%b": function(date) {
                                        return MONTHS[date.tm_mon].substring(0, 3)
                                },
                                "%B": function(date) {
                                        return MONTHS[date.tm_mon]
                                },
                                "%C": function(date) {
                                        var year = date.tm_year + 1900;
                                        return leadingNulls(year / 100 | 0, 2)
                                },
                                "%d": function(date) {
                                        return leadingNulls(date.tm_mday, 2)
                                },
                                "%e": function(date) {
                                        return leadingSomething(date.tm_mday, 2, " ")
                                },
                                "%g": function(date) {
                                        return getWeekBasedYear(date).toString().substring(2)
                                },
                                "%G": function(date) {
                                        return getWeekBasedYear(date)
                                },
                                "%H": function(date) {
                                        return leadingNulls(date.tm_hour, 2)
                                },
                                "%I": function(date) {
                                        var twelveHour = date.tm_hour;
                                        if (twelveHour == 0)
                                                twelveHour = 12;
                                        else if (twelveHour > 12)
                                                twelveHour -= 12;
                                        return leadingNulls(twelveHour, 2)
                                },
                                "%j": function(date) {
                                        return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3)
                                },
                                "%m": function(date) {
                                        return leadingNulls(date.tm_mon + 1, 2)
                                },
                                "%M": function(date) {
                                        return leadingNulls(date.tm_min, 2)
                                },
                                "%n": function() {
                                        return "\\n"
                                },
                                "%p": function(date) {
                                        if (date.tm_hour >= 0 && date.tm_hour < 12) {
                                                return "AM"
                                        }
                                        return "PM"
                                },
                                "%S": function(date) {
                                        return leadingNulls(date.tm_sec, 2)
                                },
                                "%t": function() {
                                        return "\t"
                                },
                                "%u": function(date) {
                                        return date.tm_wday || 7
                                },
                                "%U": function(date) {
                                        var days = date.tm_yday + 7 - date.tm_wday;
                                        return leadingNulls(Math.floor(days / 7), 2)
                                },
                                "%V": function(date) {
                                        var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
                                        if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
                                                val++
                                        }
                                        if (!val) {
                                                val = 52;
                                                var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
                                                if (dec31 == 4 || dec31 == 5 && __isLeapYear(date.tm_year % 400 - 1)) {
                                                        val++
                                                }
                                        } else if (val == 53) {
                                                var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
                                                if (jan1 != 4 && (jan1 != 3 || !__isLeapYear(date.tm_year)))
                                                        val = 1
                                        }
                                        return leadingNulls(val, 2)
                                },
                                "%w": function(date) {
                                        return date.tm_wday
                                },
                                "%W": function(date) {
                                        var days = date.tm_yday + 7 - (date.tm_wday + 6) % 7;
                                        return leadingNulls(Math.floor(days / 7), 2)
                                },
                                "%y": function(date) {
                                        return (date.tm_year + 1900).toString().substring(2)
                                },
                                "%Y": function(date) {
                                        return date.tm_year + 1900
                                },
                                "%z": function(date) {
                                        var off = date.tm_gmtoff;
                                        var ahead = off >= 0;
                                        off = Math.abs(off) / 60;
                                        off = off / 60 * 100 + off % 60;
                                        return (ahead ? "+" : "-") + String("0000" + off).slice(-4)
                                },
                                "%Z": function(date) {
                                        return date.tm_zone
                                },
                                "%%": function() {
                                        return "%"
                                }
                        };
                        pattern = pattern.replace(/%%/g, "\0\0");
                        for (var rule in EXPANSION_RULES_2) {
                                if (pattern.includes(rule)) {
                                        pattern = pattern.replace(new RegExp(rule,"g"), EXPANSION_RULES_2[rule](date))
                                }
                        }
                        pattern = pattern.replace(/\0\0/g, "%");
                        var bytes = intArrayFromString(pattern, false);
                        if (bytes.length > maxsize) {
                                return 0
                        }
                        writeArrayToMemory(bytes, s);
                        return bytes.length - 1
                }
                function _strftime_l(s, maxsize, format, tm, loc) {
                        return _strftime(s, maxsize, format, tm)
                }
                var wasmTableMirror = [];
                function runAndAbortIfError(func) {
                        try {
                                return func()
                        } catch (e) {
                                abort(e)
                        }
                }
                function runtimeKeepalivePush() {}
                function runtimeKeepalivePop() {}
                var Asyncify = {
                        instrumentWasmImports: function(imports) {
                                var ASYNCIFY_IMPORTS = ["env.invoke_*", "env.emscripten_sleep", "env.emscripten_wget", "env.emscripten_wget_data", "env.emscripten_idb_load", "env.emscripten_idb_store", "env.emscripten_idb_delete", "env.emscripten_idb_exists", "env.emscripten_idb_load_blob", "env.emscripten_idb_store_blob", "env.SDL_Delay", "env.emscripten_scan_registers", "env.emscripten_lazy_load_code", "env.emscripten_fiber_swap", "wasi_snapshot_preview1.fd_sync", "env.__wasi_fd_sync", "env._emval_await", "env._dlopen_js", "env.__asyncjs__*"].map(x => x.split(".")[1]);
                                for (var x in imports) {
                                        (function(x) {
                                                var original = imports[x];
                                                var sig = original.sig;
                                                if (typeof original == "function") {
                                                        var isAsyncifyImport = ASYNCIFY_IMPORTS.indexOf(x) >= 0 || x.startsWith("__asyncjs__")
                                                }
                                        }
                                        )(x)
                                }
                        },
                        instrumentWasmExports: function(exports) {
                                var ret = {};
                                for (var x in exports) {
                                        (function(x) {
                                                var original = exports[x];
                                                if (typeof original == "function") {
                                                        ret[x] = function() {
                                                                Asyncify.exportCallStack.push(x);
                                                                try {
                                                                        return original.apply(null, arguments)
                                                                } finally {
                                                                        if (!ABORT) {
                                                                                var y = Asyncify.exportCallStack.pop();
                                                                                assert(y === x);
                                                                                Asyncify.maybeStopUnwind()
                                                                        }
                                                                }
                                                        }
                                                } else {
                                                        ret[x] = original
                                                }
                                        }
                                        )(x)
                                }
                                return ret
                        },
                        State: {
                                Normal: 0,
                                Unwinding: 1,
                                Rewinding: 2,
                                Disabled: 3
                        },
                        state: 0,
                        StackSize: 10485760,
                        currData: null,
                        handleSleepReturnValue: 0,
                        exportCallStack: [],
                        callStackNameToId: {},
                        callStackIdToName: {},
                        callStackId: 0,
                        asyncPromiseHandlers: null,
                        sleepCallbacks: [],
                        getCallStackId: function(funcName) {
                                var id = Asyncify.callStackNameToId[funcName];
                                if (id === undefined) {
                                        id = Asyncify.callStackId++;
                                        Asyncify.callStackNameToId[funcName] = id;
                                        Asyncify.callStackIdToName[id] = funcName
                                }
                                return id
                        },
                        maybeStopUnwind: function() {
                                if (Asyncify.currData && Asyncify.state === Asyncify.State.Unwinding && Asyncify.exportCallStack.length === 0) {
                                        Asyncify.state = Asyncify.State.Normal;
                                        runAndAbortIfError(_asyncify_stop_unwind);
                                        if (typeof Fibers != "undefined") {
                                                Fibers.trampoline()
                                        }
                                }
                        },
                        whenDone: function() {
                                return new Promise( (resolve, reject) => {
                                        Asyncify.asyncPromiseHandlers = {
                                                resolve: resolve,
                                                reject: reject
                                        }
                                }
                                )
                        },
                        allocateData: function() {
                                var ptr = _malloc(12 + Asyncify.StackSize);
                                Asyncify.setDataHeader(ptr, ptr + 12, Asyncify.StackSize);
                                Asyncify.setDataRewindFunc(ptr);
                                return ptr
                        },
                        setDataHeader: function(ptr, stack, stackSize) {
                                HEAP32[ptr >> 2] = stack;
                                HEAP32[ptr + 4 >> 2] = stack + stackSize
                        },
                        setDataRewindFunc: function(ptr) {
                                var bottomOfCallStack = Asyncify.exportCallStack[0];
                                var rewindId = Asyncify.getCallStackId(bottomOfCallStack);
                                HEAP32[ptr + 8 >> 2] = rewindId
                        },
                        getDataRewindFunc: function(ptr) {
                                var id = HEAP32[ptr + 8 >> 2];
                                var name = Asyncify.callStackIdToName[id];
                                var func = Module["asm"][name];
                                return func
                        },
                        doRewind: function(ptr) {
                                var start = Asyncify.getDataRewindFunc(ptr);
                                return start()
                        },
                        handleSleep: function(startAsync) {
                                if (ABORT)
                                        return;
                                if (Asyncify.state === Asyncify.State.Normal) {
                                        var reachedCallback = false;
                                        var reachedAfterCallback = false;
                                        startAsync(handleSleepReturnValue => {
                                                if (ABORT)
                                                        return;
                                                Asyncify.handleSleepReturnValue = handleSleepReturnValue || 0;
                                                reachedCallback = true;
                                                if (!reachedAfterCallback) {
                                                        return
                                                }
                                                Asyncify.state = Asyncify.State.Rewinding;
                                                runAndAbortIfError( () => _asyncify_start_rewind(Asyncify.currData));
                                                if (typeof Browser != "undefined" && Browser.mainLoop.func) {
                                                        Browser.mainLoop.resume()
                                                }
                                                var asyncWasmReturnValue, isError = false;
                                                try {
                                                        asyncWasmReturnValue = Asyncify.doRewind(Asyncify.currData)
                                                } catch (err) {
                                                        asyncWasmReturnValue = err;
                                                        isError = true
                                                }
                                                var handled = false;
                                                if (!Asyncify.currData) {
                                                        var asyncPromiseHandlers = Asyncify.asyncPromiseHandlers;
                                                        if (asyncPromiseHandlers) {
                                                                Asyncify.asyncPromiseHandlers = null;
                                                                (isError ? asyncPromiseHandlers.reject : asyncPromiseHandlers.resolve)(asyncWasmReturnValue);
                                                                handled = true
                                                        }
                                                }
                                                if (isError && !handled) {
                                                        throw asyncWasmReturnValue
                                                }
                                        }
                                        );
                                        reachedAfterCallback = true;
                                        if (!reachedCallback) {
                                                Asyncify.state = Asyncify.State.Unwinding;
                                                Asyncify.currData = Asyncify.allocateData();
                                                if (typeof Browser != "undefined" && Browser.mainLoop.func) {
                                                        Browser.mainLoop.pause()
                                                }
                                                runAndAbortIfError( () => _asyncify_start_unwind(Asyncify.currData))
                                        }
                                } else if (Asyncify.state === Asyncify.State.Rewinding) {
                                        Asyncify.state = Asyncify.State.Normal;
                                        runAndAbortIfError(_asyncify_stop_rewind);
                                        _free(Asyncify.currData);
                                        Asyncify.currData = null;
                                        Asyncify.sleepCallbacks.forEach(func => callUserCallback(func))
                                } else {
                                        abort("invalid state: " + Asyncify.state)
                                }
                                return Asyncify.handleSleepReturnValue
                        },
                        handleAsync: function(startAsync) {
                                return Asyncify.handleSleep(wakeUp => {
                                        startAsync().then(wakeUp)
                                }
                                )
                        }
                };
                function getCFunc(ident) {
                        var func = Module["_" + ident];
                        return func
                }
                function ccall(ident, returnType, argTypes, args, opts) {
                        var toC = {
                                "string": str => {
                                        var ret = 0;
                                        if (str !== null && str !== undefined && str !== 0) {
                                                var len = (str.length << 2) + 1;
                                                ret = stackAlloc(len);
                                                stringToUTF8(str, ret, len)
                                        }
                                        return ret
                                }
                                ,
                                "array": arr => {
                                        var ret = stackAlloc(arr.length);
                                        writeArrayToMemory(arr, ret);
                                        return ret
                                }
                        };
                        function convertReturnValue(ret) {
                                if (returnType === "string") {
                                        return UTF8ToString(ret)
                                }
                                if (returnType === "boolean")
                                        return Boolean(ret);
                                return ret
                        }
                        var func = getCFunc(ident);
                        var cArgs = [];
                        var stack = 0;
                        if (args) {
                                for (var i = 0; i < args.length; i++) {
                                        var converter = toC[argTypes[i]];
                                        if (converter) {
                                                if (stack === 0)
                                                        stack = stackSave();
                                                cArgs[i] = converter(args[i])
                                        } else {
                                                cArgs[i] = args[i]
                                        }
                                }
                        }
                        var previousAsync = Asyncify.currData;
                        var ret = func.apply(null, cArgs);
                        function onDone(ret) {
                                runtimeKeepalivePop();
                                if (stack !== 0)
                                        stackRestore(stack);
                                return convertReturnValue(ret)
                        }
                        runtimeKeepalivePush();
                        var asyncMode = opts && opts.async;
                        if (Asyncify.currData != previousAsync) {
                                return Asyncify.whenDone().then(onDone)
                        }
                        ret = onDone(ret);
                        if (asyncMode)
                                return Promise.resolve(ret);
                        return ret
                }
                var FSNode = function(parent, name, mode, rdev) {
                        if (!parent) {
                                parent = this
                        }
                        this.parent = parent;
                        this.mount = parent.mount;
                        this.mounted = null;
                        this.id = FS.nextInode++;
                        this.name = name;
                        this.mode = mode;
                        this.node_ops = {};
                        this.stream_ops = {};
                        this.rdev = rdev
                };
                var readMode = 292 | 73;
                var writeMode = 146;
                Object.defineProperties(FSNode.prototype, {
                        read: {
                                get: function() {
                                        return (this.mode & readMode) === readMode
                                },
                                set: function(val) {
                                        val ? this.mode |= readMode : this.mode &= ~readMode
                                }
                        },
                        write: {
                                get: function() {
                                        return (this.mode & writeMode) === writeMode
                                },
                                set: function(val) {
                                        val ? this.mode |= writeMode : this.mode &= ~writeMode
                                }
                        },
                        isFolder: {
                                get: function() {
                                        return FS.isDir(this.mode)
                                }
                        },
                        isDevice: {
                                get: function() {
                                        return FS.isChrdev(this.mode)
                                }
                        }
                });
                FS.FSNode = FSNode;
                FS.staticInit();
                embind_init_charCodes();
                BindingError = Module["BindingError"] = extendError(Error, "BindingError");
                InternalError = Module["InternalError"] = extendError(Error, "InternalError");
                init_emval();
                var asmLibraryArg = {
                        "__assert_fail": ___assert_fail,
                        "__cxa_allocate_exception": ___cxa_allocate_exception,
                        "__cxa_begin_catch": ___cxa_begin_catch,
                        "__cxa_call_unexpected": ___cxa_call_unexpected,
                        "__cxa_decrement_exception_refcount": ___cxa_decrement_exception_refcount,
                        "__cxa_end_catch": ___cxa_end_catch,
                        "__cxa_find_matching_catch_2": ___cxa_find_matching_catch_2,
                        "__cxa_find_matching_catch_3": ___cxa_find_matching_catch_3,
                        "__cxa_free_exception": ___cxa_free_exception,
                        "__cxa_increment_exception_refcount": ___cxa_increment_exception_refcount,
                        "__cxa_rethrow": ___cxa_rethrow,
                        "__cxa_rethrow_primary_exception": ___cxa_rethrow_primary_exception,
                        "__cxa_throw": ___cxa_throw,
                        "__cxa_uncaught_exceptions": ___cxa_uncaught_exceptions,
                        "__resumeException": ___resumeException,
                        "__syscall_fcntl64": ___syscall_fcntl64,
                        "__syscall_fstat64": ___syscall_fstat64,
                        "__syscall_ioctl": ___syscall_ioctl,
                        "__syscall_lstat64": ___syscall_lstat64,
                        "__syscall_mkdirat": ___syscall_mkdirat,
                        "__syscall_newfstatat": ___syscall_newfstatat,
                        "__syscall_openat": ___syscall_openat,
                        "__syscall_stat64": ___syscall_stat64,
                        "_embind_register_bigint": __embind_register_bigint,
                        "_embind_register_bool": __embind_register_bool,
                        "_embind_register_emval": __embind_register_emval,
                        "_embind_register_float": __embind_register_float,
                        "_embind_register_integer": __embind_register_integer,
                        "_embind_register_memory_view": __embind_register_memory_view,
                        "_embind_register_std_string": __embind_register_std_string,
                        "_embind_register_std_wstring": __embind_register_std_wstring,
                        "_embind_register_void": __embind_register_void,
                        "_emscripten_get_now_is_monotonic": __emscripten_get_now_is_monotonic,
                        "_gmtime_js": __gmtime_js,
                        "_localtime_js": __localtime_js,
                        "_mmap_js": __mmap_js,
                        "_munmap_js": __munmap_js,
                        "_tzset_js": __tzset_js,
                        "abort": _abort,
                        "emscripten_asm_const_int": _emscripten_asm_const_int,
                        "emscripten_date_now": _emscripten_date_now,
                        "emscripten_get_heap_max": _emscripten_get_heap_max,
                        "emscripten_get_now": _emscripten_get_now,
                        "emscripten_memcpy_big": _emscripten_memcpy_big,
                        "emscripten_resize_heap": _emscripten_resize_heap,
                        "emscripten_sleep": _emscripten_sleep,
                        "environ_get": _environ_get,
                        "environ_sizes_get": _environ_sizes_get,
                        "exit": _exit,
                        "fd_close": _fd_close,
                        "fd_fdstat_get": _fd_fdstat_get,
                        "fd_read": _fd_read,
                        "fd_seek": _fd_seek,
                        "fd_sync": _fd_sync,
                        "fd_write": _fd_write,
                        "getentropy": _getentropy,
                        "invoke_diii": invoke_diii,
                        "invoke_fiii": invoke_fiii,
                        "invoke_i": invoke_i,
                        "invoke_ii": invoke_ii,
                        "invoke_iii": invoke_iii,
                        "invoke_iiii": invoke_iiii,
                        "invoke_iiiii": invoke_iiiii,
                        "invoke_iiiiid": invoke_iiiiid,
                        "invoke_iiiiii": invoke_iiiiii,
                        "invoke_iiiiiii": invoke_iiiiiii,
                        "invoke_iiiiiiii": invoke_iiiiiiii,
                        "invoke_iiiiiiiiiii": invoke_iiiiiiiiiii,
                        "invoke_iiiiiiiiiiii": invoke_iiiiiiiiiiii,
                        "invoke_iiiiiiiiiiiii": invoke_iiiiiiiiiiiii,
                        "invoke_iiiiij": invoke_iiiiij,
                        "invoke_j": invoke_j,
                        "invoke_ji": invoke_ji,
                        "invoke_jiiii": invoke_jiiii,
                        "invoke_v": invoke_v,
                        "invoke_vi": invoke_vi,
                        "invoke_vii": invoke_vii,
                        "invoke_viid": invoke_viid,
                        "invoke_viii": invoke_viii,
                        "invoke_viiii": invoke_viiii,
                        "invoke_viiiiiii": invoke_viiiiiii,
                        "invoke_viiiiiiiiii": invoke_viiiiiiiiii,
                        "invoke_viiiiiiiiiiiiiii": invoke_viiiiiiiiiiiiiii,
                        "js_alloc": js_alloc,
                        "js_free": js_free,
                        "js_post_proto": js_post_proto,
                        "strftime_l": _strftime_l
                };
                var asm = createWasm();
                var ___wasm_call_ctors = Module["___wasm_call_ctors"] = asm["__wasm_call_ctors"];
                var _uci_command = Module["_uci_command"] = asm["uci_command"];
                var _init = Module["_init"] = asm["init"];
                var _CEE_InitWithOpts = Module["_CEE_InitWithOpts"] = asm["CEE_InitWithOpts"];
                var _CEE_Init = Module["_CEE_Init"] = asm["CEE_Init"];
                var _CEE_Dispose = Module["_CEE_Dispose"] = asm["CEE_Dispose"];
                var _CEE_DisposeGame = Module["_CEE_DisposeGame"] = asm["CEE_DisposeGame"];
                var _CEE_DisposeAllGames = Module["_CEE_DisposeAllGames"] = asm["CEE_DisposeAllGames"];
                var _CEE_Play = Module["_CEE_Play"] = asm["CEE_Play"];
                var _CEE_GetLastMove = Module["_CEE_GetLastMove"] = asm["CEE_GetLastMove"];
                var _CEE_NewFeature = Module["_CEE_NewFeature"] = asm["CEE_NewFeature"];
                var _CEE_DisposeFeature = Module["_CEE_DisposeFeature"] = asm["CEE_DisposeFeature"];
                var _CEE_Run = Module["_CEE_Run"] = asm["CEE_Run"];
                var _CEE_Stop = Module["_CEE_Stop"] = asm["CEE_Stop"];
                var _CEE_Join = Module["_CEE_Join"] = asm["CEE_Join"];
                var _CEE_EnableNotifications = Module["_CEE_EnableNotifications"] = asm["CEE_EnableNotifications"];
                var _CEE_DisableNotifications = Module["_CEE_DisableNotifications"] = asm["CEE_DisableNotifications"];
                var _CEE_WaitForNotification = Module["_CEE_WaitForNotification"] = asm["CEE_WaitForNotification"];
                var _CEE_StopNotificationWaiting = Module["_CEE_StopNotificationWaiting"] = asm["CEE_StopNotificationWaiting"];
                var _CEE_GetLastError = Module["_CEE_GetLastError"] = asm["CEE_GetLastError"];
                var _CEE_ClearLastError = Module["_CEE_ClearLastError"] = asm["CEE_ClearLastError"];
                var _CEE_EnableLog = Module["_CEE_EnableLog"] = asm["CEE_EnableLog"];
                var _CEE_DisableLog = Module["_CEE_DisableLog"] = asm["CEE_DisableLog"];
                var _CEE_IsValidGamePoint = Module["_CEE_IsValidGamePoint"] = asm["CEE_IsValidGamePoint"];
                var ___errno_location = Module["___errno_location"] = asm["__errno_location"];
                var _free = Module["_free"] = asm["free"];
                var _malloc = Module["_malloc"] = asm["malloc"];
                var __ZN3TEP7ktprintENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE = Module["__ZN3TEP7ktprintENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE"] = asm["_ZN3TEP7ktprintENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE"];
                var __ZN3TEP2pbEy = Module["__ZN3TEP2pbEy"] = asm["_ZN3TEP2pbEy"];
                var __ZN3TEP2pbEyNS_6SquareE = Module["__ZN3TEP2pbEyNS_6SquareE"] = asm["_ZN3TEP2pbEyNS_6SquareE"];
                var __ZN3TEP2pbEyNS_6SquareES0_ = Module["__ZN3TEP2pbEyNS_6SquareES0_"] = asm["_ZN3TEP2pbEyNS_6SquareES0_"];
                var ___getTypeName = Module["___getTypeName"] = asm["__getTypeName"];
                var __embind_initialize_bindings = Module["__embind_initialize_bindings"] = asm["_embind_initialize_bindings"];
                var _emscripten_builtin_memalign = Module["_emscripten_builtin_memalign"] = asm["emscripten_builtin_memalign"];
                var _setThrew = Module["_setThrew"] = asm["setThrew"];
                var setTempRet0 = Module["setTempRet0"] = asm["setTempRet0"];
                var getTempRet0 = Module["getTempRet0"] = asm["getTempRet0"];
                var _emscripten_stack_set_limits = Module["_emscripten_stack_set_limits"] = asm["emscripten_stack_set_limits"];
                var _emscripten_stack_get_base = Module["_emscripten_stack_get_base"] = asm["emscripten_stack_get_base"];
                var _emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = asm["emscripten_stack_get_end"];
                var stackSave = Module["stackSave"] = asm["stackSave"];
                var stackRestore = Module["stackRestore"] = asm["stackRestore"];
                var stackAlloc = Module["stackAlloc"] = asm["stackAlloc"];
                var ___cxa_can_catch = Module["___cxa_can_catch"] = asm["__cxa_can_catch"];
                var ___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = asm["__cxa_is_pointer_type"];
                var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
                var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
                var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
                var dynCall_v = Module["dynCall_v"] = asm["dynCall_v"];
                var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
                var dynCall_viii = Module["dynCall_viii"] = asm["dynCall_viii"];
                var dynCall_viiii = Module["dynCall_viiii"] = asm["dynCall_viiii"];
                var dynCall_iiiii = Module["dynCall_iiiii"] = asm["dynCall_iiiii"];
                var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
                var dynCall_vij = Module["dynCall_vij"] = asm["dynCall_vij"];
                var dynCall_viiiii = Module["dynCall_viiiii"] = asm["dynCall_viiiii"];
                var dynCall_viijii = Module["dynCall_viijii"] = asm["dynCall_viijii"];
                var dynCall_dii = Module["dynCall_dii"] = asm["dynCall_dii"];
                var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = asm["dynCall_iiiiiiiii"];
                var dynCall_iiiiii = Module["dynCall_iiiiii"] = asm["dynCall_iiiiii"];
                var dynCall_jiiiiiii = Module["dynCall_jiiiiiii"] = asm["dynCall_jiiiiiii"];
                var dynCall_jii = Module["dynCall_jii"] = asm["dynCall_jii"];
                var dynCall_i = Module["dynCall_i"] = asm["dynCall_i"];
                var dynCall_jiji = Module["dynCall_jiji"] = asm["dynCall_jiji"];
                var dynCall_iidiiii = Module["dynCall_iidiiii"] = asm["dynCall_iidiiii"];
                var dynCall_j = Module["dynCall_j"] = asm["dynCall_j"];
                var dynCall_ji = Module["dynCall_ji"] = asm["dynCall_ji"];
                var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = asm["dynCall_iiiiiii"];
                var dynCall_iiiiij = Module["dynCall_iiiiij"] = asm["dynCall_iiiiij"];
                var dynCall_iiiiid = Module["dynCall_iiiiid"] = asm["dynCall_iiiiid"];
                var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = asm["dynCall_iiiiiiii"];
                var dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = asm["dynCall_iiiiiiiiiii"];
                var dynCall_jiiii = Module["dynCall_jiiii"] = asm["dynCall_jiiii"];
                var dynCall_iiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiii"] = asm["dynCall_iiiiiiiiiiiii"];
                var dynCall_fiii = Module["dynCall_fiii"] = asm["dynCall_fiii"];
                var dynCall_diii = Module["dynCall_diii"] = asm["dynCall_diii"];
                var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = asm["dynCall_viiiiiii"];
                var dynCall_iiiiiiiiiiii = Module["dynCall_iiiiiiiiiiii"] = asm["dynCall_iiiiiiiiiiii"];
                var dynCall_viiiiiiiiii = Module["dynCall_viiiiiiiiii"] = asm["dynCall_viiiiiiiiii"];
                var dynCall_viiiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiiii"] = asm["dynCall_viiiiiiiiiiiiiii"];
                var dynCall_iiiiijj = Module["dynCall_iiiiijj"] = asm["dynCall_iiiiijj"];
                var dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = asm["dynCall_iiiiiijj"];
                var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm["dynCall_viiiiii"];
                var dynCall_viid = Module["dynCall_viid"] = asm["dynCall_viid"];
                var _asyncify_start_unwind = Module["_asyncify_start_unwind"] = asm["asyncify_start_unwind"];
                var _asyncify_stop_unwind = Module["_asyncify_stop_unwind"] = asm["asyncify_stop_unwind"];
                var _asyncify_start_rewind = Module["_asyncify_start_rewind"] = asm["asyncify_start_rewind"];
                var _asyncify_stop_rewind = Module["_asyncify_stop_rewind"] = asm["asyncify_stop_rewind"];
                var ___start_em_js = Module["___start_em_js"] = 15852020;
                var ___stop_em_js = Module["___stop_em_js"] = 15852304;
                function invoke_iiii(index, a1, a2, a3) {
                        var sp = stackSave();
                        try {
                                return dynCall_iiii(index, a1, a2, a3)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_ii(index, a1) {
                        var sp = stackSave();
                        try {
                                return dynCall_ii(index, a1)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_iii(index, a1, a2) {
                        var sp = stackSave();
                        try {
                                return dynCall_iii(index, a1, a2)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_vii(index, a1, a2) {
                        var sp = stackSave();
                        try {
                                dynCall_vii(index, a1, a2)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_viiii(index, a1, a2, a3, a4) {
                        var sp = stackSave();
                        try {
                                dynCall_viiii(index, a1, a2, a3, a4)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_viii(index, a1, a2, a3) {
                        var sp = stackSave();
                        try {
                                dynCall_viii(index, a1, a2, a3)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_v(index) {
                        var sp = stackSave();
                        try {
                                dynCall_v(index)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_iiiii(index, a1, a2, a3, a4) {
                        var sp = stackSave();
                        try {
                                return dynCall_iiiii(index, a1, a2, a3, a4)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_vi(index, a1) {
                        var sp = stackSave();
                        try {
                                dynCall_vi(index, a1)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
                        var sp = stackSave();
                        try {
                                return dynCall_iiiiii(index, a1, a2, a3, a4, a5)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_i(index) {
                        var sp = stackSave();
                        try {
                                return dynCall_i(index)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
                        var sp = stackSave();
                        try {
                                return dynCall_iiiiiii(index, a1, a2, a3, a4, a5, a6)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_iiiiid(index, a1, a2, a3, a4, a5) {
                        var sp = stackSave();
                        try {
                                return dynCall_iiiiid(index, a1, a2, a3, a4, a5)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
                        var sp = stackSave();
                        try {
                                return dynCall_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
                        var sp = stackSave();
                        try {
                                return dynCall_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
                        var sp = stackSave();
                        try {
                                return dynCall_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_fiii(index, a1, a2, a3) {
                        var sp = stackSave();
                        try {
                                return dynCall_fiii(index, a1, a2, a3)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_diii(index, a1, a2, a3) {
                        var sp = stackSave();
                        try {
                                return dynCall_diii(index, a1, a2, a3)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
                        var sp = stackSave();
                        try {
                                dynCall_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
                        var sp = stackSave();
                        try {
                                return dynCall_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
                        var sp = stackSave();
                        try {
                                dynCall_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
                        var sp = stackSave();
                        try {
                                dynCall_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_viid(index, a1, a2, a3) {
                        var sp = stackSave();
                        try {
                                dynCall_viid(index, a1, a2, a3)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_j(index) {
                        var sp = stackSave();
                        try {
                                return dynCall_j(index)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_ji(index, a1) {
                        var sp = stackSave();
                        try {
                                return dynCall_ji(index, a1)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_iiiiij(index, a1, a2, a3, a4, a5, a6) {
                        var sp = stackSave();
                        try {
                                return dynCall_iiiiij(index, a1, a2, a3, a4, a5, a6)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                function invoke_jiiii(index, a1, a2, a3, a4) {
                        var sp = stackSave();
                        try {
                                return dynCall_jiiii(index, a1, a2, a3, a4)
                        } catch (e) {
                                stackRestore(sp);
                                if (e !== e + 0)
                                        throw e;
                                _setThrew(1, 0)
                        }
                }
                Module["stackAlloc"] = stackAlloc;
                Module["stackSave"] = stackSave;
                Module["ccall"] = ccall;
                var calledRun;
                dependenciesFulfilled = function runCaller() {
                        if (!calledRun)
                                run();
                        if (!calledRun)
                                dependenciesFulfilled = runCaller
                }
                ;
                function run(args) {
                        args = args || arguments_;
                        if (runDependencies > 0) {
                                return
                        }
                        preRun();
                        if (runDependencies > 0) {
                                return
                        }
                        function doRun() {
                                if (calledRun)
                                        return;
                                calledRun = true;
                                Module["calledRun"] = true;
                                if (ABORT)
                                        return;
                                initRuntime();
                                if (Module["onRuntimeInitialized"])
                                        Module["onRuntimeInitialized"]();
                                postRun()
                        }
                        if (Module["setStatus"]) {
                                Module["setStatus"]("Running...");
                                setTimeout(function() {
                                        setTimeout(function() {
                                                Module["setStatus"]("")
                                        }, 1);
                                        doRun()
                                }, 1)
                        } else {
                                doRun()
                        }
                }
                if (Module["preInit"]) {
                        if (typeof Module["preInit"] == "function")
                                Module["preInit"] = [Module["preInit"]];
                        while (Module["preInit"].length > 0) {
                                Module["preInit"].pop()()
                        }
                }
                run();
                return Module
        }
        let api_call_map = function() {
                function get_last_error(Module) {
                        return Module.ccall("CEE_GetLastError", "string", [], [])
                }
                function js_buf_to_c_buf(Module, js_buf) {
                        if (!js_buf) {
                                return [0, 0]
                        }
                        let c_buf_size = js_buf.length * js_buf.BYTES_PER_ELEMENT;
                        let c_buf = Module._malloc(c_buf_size);
                        Module.HEAPU8.set(js_buf, c_buf);
                        return [c_buf, c_buf_size]
                }
                return {
                        "CEE_DisposeGame": (Module, args) => {
                                let game_point = args[0];
                                Module.ccall("CEE_DisposeGame", "void", ["number"], [game_point]);
                                postMessage({
                                        retval: 1
                                })
                        }
                        ,
                        "CEE_Play": (Module, args) => {
                                let game_point = args[0];
                                let uci_move = args[1];
                                let new_game_point = Module.ccall("CEE_Play", "number", ["number", "string"], [game_point, uci_move]);
                                if (new_game_point < 0) {
                                        postMessage({
                                                "error": get_last_error(Module)
                                        });
                                        return
                                }
                                postMessage({
                                        retval: new_game_point
                                })
                        }
                        ,
                        "CEE_GetLastMove": (Module, args) => {
                                let game_point = args[0];
                                let uci_move = Module.ccall("CEE_GetLastMove", "string", ["number"], [game_point]);
                                if (!uci_move < 0) {
                                        postMessage({
                                                "error": get_last_error(Module)
                                        });
                                        return
                                }
                                postMessage({
                                        retval: uci_move
                                })
                        }
                        ,
                        "CEE_NewFeature": (Module, args) => {
                                let game_point = args[0];
                                let feature_id = args[1];
                                let feature_proto = args[2];
                                let c_buf = js_buf_to_c_buf(Module, feature_proto);
                                let buf = c_buf[0];
                                let size = c_buf[1];
                                try {
                                        let feature_handle = Module.ccall("CEE_NewFeature", "number", ["number", "number", "number", "number"], [game_point, feature_id, buf, size]);
                                        if (feature_handle < 0) {
                                                postMessage({
                                                        "error": get_last_error(Module)
                                                });
                                                return
                                        }
                                        postMessage({
                                                retval: feature_handle
                                        })
                                } finally {
                                        if (buf !== 0) {
                                                Module._free(buf)
                                        }
                                }
                        }
                        ,
                        "CEE_Run": (Module, args) => {
                                let feature_handle = args[0];
                                let ret = Module.ccall("CEE_Run", "number", ["number", "number"], [feature_handle, 0]);
                                if (ret <= 0) {
                                        postMessage({
                                                "error": get_last_error(Module)
                                        });
                                        return
                                }
                        }
                        ,
                        "CEE_DisposeFeature": (Module, args) => {
                                let game_point = args[0];
                                Module.ccall("CEE_DisposeFeature", "void", ["number"], [game_point]);
                                postMessage({
                                        retval: 1
                                })
                        }
                        ,
                        "CEE_EnableLog": (Module, args) => {
                                Module.ccall("CEE_EnableLog", "void", [], []);
                                postMessage({
                                        retval: 1
                                })
                        }
                        ,
                        "CEE_DisableLog": (Module, args) => {
                                Module.ccall("CEE_DisableLog", "void", [], []);
                                postMessage({
                                        retval: 1
                                })
                        }
                        ,
                        "CEE_LoadCharmModel": (Module, args) => {
                                let model_data = args[0];
                                let[c_buf,c_buf_size] = js_buf_to_c_buf(Module, model_data);
                                try {
                                        let ret = Module.ccall("CEE_LoadCharmModel", "number", ["number", "number"], [c_buf, c_buf_size]);
                                        if (ret < 0) {
                                                console.log("error loading charm model")
                                        }
                                } finally {
                                        if (c_buf !== 0) {
                                                Module._free(c_buf)
                                        }
                                }
                        }
                }
        }();
        function api_call(Module, msg) {
                let call = api_call_map[msg.call];
                if (call === undefined) {
                        postMessage({
                                "error": "Unknown API call: 'call' should contain a valid API call name"
                        });
                        return
                }
                if (msg.args === undefined) {
                        msg.args = []
                }
                call(Module, msg.args)
        }
        return function() {
                var Module = null, CREATE_KTEP_WORKER_API;
                CREATE_KTEP_WORKER_API = function(WasmPath, options) {
                        var workerObj, kTepConsole, cmds = [], wait = typeof setImmediate === "function" ? setImmediate : setTimeout;
                        function initWasmAndKomodoTep() {
                                var onRuntimeInitialized, onKomodoTepInitialized;
                                if (typeof options.onRuntimeInitialized === "function") {
                                        onRuntimeInitialized = options.onRuntimeInitialized
                                }
                                if (typeof options.onKomodoTepInitialized === "function") {
                                        onKomodoTepInitialized = options.onKomodoTepInitialized
                                }
                                Module = {
                                        onRuntimeInitialized: function onWasmRuntimeInitialized() {
                                                RuntimeInitialized = true;
                                                if (onRuntimeInitialized) {
                                                        onRuntimeInitialized()
                                                }
                                        }
                                };
                                loadKomodoTep(kTepConsole, WasmPath, Module);
                                if (Module.print) {
                                        Module.print = kTepConsole.log
                                }
                                if (Module.printErr) {
                                        Module.printErr = kTepConsole.log
                                }
                                Module.ccall("init", "number", [], []);
                                if (onKomodoTepInitialized) {
                                        onKomodoTepInitialized()
                                }
                        }
                        options = options || {};
                        kTepConsole = {
                                log: function log(line) {
                                        if (workerObj.onmessage) {
                                                workerObj.onmessage(line)
                                        } else {
                                                console.error("You must set onmessage");
                                                console.info(line)
                                        }
                                },
                                time: function time(s) {
                                        if (typeof console !== "undefined" && console.time)
                                                console.time(s)
                                },
                                timeEnd: function timeEnd(s) {
                                        if (typeof console !== "undefined" && console.timeEnd)
                                                console.timeEnd(s)
                                }
                        };
                        kTepConsole.info = kTepConsole.warn = kTepConsole.log;
                        workerObj = {
                                postMessage: function sendMessage(args, sync) {
                                        function make_ccall(...ccall_args) {
                                                var res = null;
                                                function impl() {
                                                        if (Module) {
                                                                res = Module.ccall(...ccall_args)
                                                        } else {
                                                                setTimeout(impl, 100)
                                                        }
                                                }
                                                impl();
                                                return res
                                        }
                                        let uci_handler = () => {
                                                cmds.push(args);
                                                make_ccall("uci_command", "number", ["string"], [cmds.shift()])
                                        }
                                        ;
                                        let bin_handler = () => {
                                                let cmd = args[0];
                                                let pb_request = args[1];
                                                let req_buf_size = pb_request.length * pb_request.BYTES_PER_ELEMENT;
                                                let req_buf = Module._malloc(req_buf_size);
                                                Module.HEAPU8.set(pb_request, req_buf);
                                                const resp_buf_size = 8192;
                                                let resp_buf = Module._malloc(resp_buf_size);
                                                let bytes_written = Module.ccall(cmd, "number", ["number", "number", "number", "number"], [req_buf, req_buf_size, resp_buf, resp_buf_size]);
                                                let pb_response = Module.HEAPU8.subarray(resp_buf, resp_buf + bytes_written);
                                                Module._free(req_buf);
                                                let result_array = pb_response.slice();
                                                Module._free(resp_buf);
                                                if (sync) {
                                                        return result_array
                                                } else {
                                                        postMessage([cmd, result_array])
                                                }
                                        }
                                        ;
                                        let api_handler = () => {
                                                var res = null;
                                                function impl() {
                                                        if (Module) {
                                                                res = api_call(Module, args)
                                                        } else {
                                                                setTimeout(impl, 100)
                                                        }
                                                }
                                                impl();
                                                return res
                                        }
                                        ;
                                        let handler = typeof args === "string" ? uci_handler : Array.isArray(args) ? bin_handler : api_handler;
                                        if (sync) {
                                                return handler()
                                        } else {
                                                wait(handler.ccall, 1)
                                        }
                                }
                        };
                        if (options.onmessage) {
                                if (typeof options.onmessage === "function") {
                                        workerObj.onmessage = options.onmessage;
                                        initWasmAndKomodoTep()
                                } else {
                                        throw new Error("onmessage should be a function, got '" + typeof options.onmessage + "'.")
                                }
                        } else {
                                wait(initWasmAndKomodoTep, 1)
                        }
                        return workerObj
                }
                ;
                CREATE_KTEP_WORKER_API.getModule = function() {
                        return Module
                }
                ;
                CREATE_KTEP_WORKER_API.isInitialized = function() {
                        return RuntimeInitialized
                }
                ;
                return CREATE_KTEP_WORKER_API
        }()
}();
function komodoTepCLICompleter(line) {
        var completions = ["d", "eval", "exit", "flip", "go", "isready", "ponderhit", "position fen ", "position startpos", "position startpos moves", "quit", "setoption name Clear Hash value ", "setoption name Contempt value ", "setoption name Hash value ", "setoption name Minimum Thinking Time value ", "setoption name Move Overhead value ", "setoption name MultiPV value ", "setoption name Ponder value ", "setoption name Skill Level Maximum Error value ", "setoption name Skill Level Probability value ", "setoption name Skill Level value ", "setoption name Slow Mover value ", "setoption name Threads value ", "setoption name UCI_Chess960 value false", "setoption name UCI_Chess960 value true", "setoption name UCI_Variant value chess", "setoption name UCI_Variant value atomic", "setoption name UCI_Variant value crazyhouse", "setoption name UCI_Variant value giveaway", "setoption name UCI_Variant value horde", "setoption name UCI_Variant value kingofthehill", "setoption name UCI_Variant value racingkings", "setoption name UCI_Variant value relay", "setoption name UCI_Variant value threecheck", "setoption name nodestime value ", "stop", "uci", "ucinewgame"];
        var completionsMid = ["binc ", "btime ", "confidence ", "depth ", "infinite ", "mate ", "maxdepth ", "maxtime ", "mindepth ", "mintime ", "moves ", "movestogo ", "movetime ", "ponder ", "searchmoves ", "shallow ", "winc ", "wtime "];
        function filter(c) {
                return c.indexOf(line) === 0
        }
        var hits = completions.filter(filter);
        if (!hits.length) {
                line = line.replace(/^.*\s/, "");
                if (line) {
                        hits = completionsMid.filter(filter)
                } else {
                        hits = completionsMid
                }
        }
        return [hits, line]
}
(function() {
        var isNode, komodoTep;
        isNode = typeof global !== "undefined" && Object.prototype.toString.call(global.process) === "[object process]";
        if (isNode) {
                if (require.main === module) {
                        komodoTep = KOMODO_TEP(require("path").join(__dirname, "explanation-engine.wasm"));
                        komodoTep.onmessage = function onlog(line) {
                                console.log(line)
                        }
                        ;
                        require("readline").createInterface({
                                input: process.stdin,
                                output: process.stdout,
                                completer: komodoTepCLICompleter,
                                historySize: 100
                        }).on("line", function online(line) {
                                if (line) {
                                        if (line === "quit" || line === "exit") {
                                                process.exit()
                                        }
                                        komodoTep.postMessage(line, true)
                                }
                        }).setPrompt("");
                        process.stdin.on("end", function onend() {
                                process.exit()
                        })
                } else {
                        module.exports = KOMODO_TEP
                }
        } else if (typeof onmessage !== "undefined" && (typeof window === "undefined" || typeof window.document === "undefined")) {
                if (self && self.location && self.location.hash) {
                        komodoTep = KOMODO_TEP(self.location.hash.substr(1))
                } else {
                        komodoTep = KOMODO_TEP()
                }
                onmessage = function(event) {
                        komodoTep.postMessage(event.data, true)
                }
                ;
                komodoTep.onmessage = function onlog(line) {
                        postMessage(line)
                }
        }
}
)();
`;

const komodoCode = `
    var Module = typeof Module != "undefined" ? Module : {};
    var KOMODO_TEP = (function () {
    function loadKomodoTep(console, WasmPath, Module) {
    if (
      typeof navigator !== "undefined" &&
      (/MSIE|Trident|Edge/i.test(navigator.userAgent) ||
        (/Safari/i.test(navigator.userAgent) &&
          !/Chrome|CriOS/i.test(navigator.userAgent)))
    ) {
      var dateNow = Date.now;
    }
    Module = Module || {};
    Module.wasmBinaryFile = Module.wasmBinaryFile || WasmPath;
    var moduleOverrides = Object.assign({}, Module);
    var arguments_ = [];
    var thisProgram = "./this.program";
    var quit_ = (status, toThrow) => {
      throw toThrow;
    };
    var ENVIRONMENT_IS_WEB = typeof window == "object";
    var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
    var ENVIRONMENT_IS_NODE =
      typeof process == "object" &&
      typeof process.versions == "object" &&
      typeof process.versions.node == "string";
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var read_, readAsync, readBinary, setWindowTitle;
    function logExceptionOnExit(e) {
      if (e instanceof ExitStatus) return;
      let toLog = e;
      err("exiting due to exception: " + toLog);
    }
    if (ENVIRONMENT_IS_NODE) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = require("path").dirname(scriptDirectory) + "/";
      } else {
        scriptDirectory = __dirname + "/";
      }
      var fs, nodePath;
      if (typeof require === "function") {
        fs = require("fs");
        nodePath = require("path");
      }
      read_ = (filename, binary) => {
        filename = nodePath["normalize"](filename);
        return fs.readFileSync(filename, binary ? undefined : "utf8");
      };
      readBinary = (filename) => {
        var ret = read_(filename, true);
        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }
        return ret;
      };
      readAsync = (filename, onload, onerror) => {
        filename = nodePath["normalize"](filename);
        fs.readFile(filename, function (err, data) {
          if (err) onerror(err);
          else onload(data.buffer);
        });
      };
      if (process["argv"].length > 1) {
        thisProgram = process["argv"][1].replace(/\\\\/g, "/");
      }
      arguments_ = process["argv"].slice(2);
      if (typeof module != "undefined") {
        module["exports"] = Module;
      }
      process["on"]("uncaughtException", function (ex) {
        if (!(ex instanceof ExitStatus)) {
          throw ex;
        }
      });
      process["on"]("unhandledRejection", function (reason) {
        throw reason;
      });
      quit_ = (status, toThrow) => {
        if (keepRuntimeAlive()) {
          process["exitCode"] = status;
          throw toThrow;
        }
        logExceptionOnExit(toThrow);
        process["exit"](status);
      };
      Module["inspect"] = function () {
        return "[Emscripten Module object]";
      };
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (scriptDirectory.indexOf("blob:") !== 0) {
        scriptDirectory = scriptDirectory.substr(
          0,
          scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1,
        );
      } else {
        scriptDirectory = "";
      }
      {
        read_ = (url) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.send(null);
          return xhr.responseText;
        };
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          };
        }
        readAsync = (url, onload, onerror) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
              onload(xhr.response);
              return;
            }
            onerror();
          };
          xhr.onerror = onerror;
          xhr.send(null);
        };
      }
      setWindowTitle = (title) => (document.title = title);
    } else {
    }
    var out = Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.warn.bind(console);
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    if (Module["arguments"]) arguments_ = Module["arguments"];
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    if (Module["quit"]) quit_ = Module["quit"];
    var wasmBinary;
    if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
    var noExitRuntime = Module["noExitRuntime"] || true;
    if (typeof WebAssembly != "object") {
      abort("no native wasm support detected");
    }
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    function assert(condition, text) {
      if (!condition) {
        abort(text);
      }
    }
    var UTF8Decoder =
      typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
    function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = "";
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode(((u0 & 31) << 6) | u1);
          continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          u0 =
            ((u0 & 7) << 18) |
            (u1 << 12) |
            (u2 << 6) |
            (heapOrArray[idx++] & 63);
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
        }
      }
      return str;
    }
    function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
    }
    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0)) return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i);
          u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
        }
        if (u <= 127) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 192 | (u >> 6);
          heap[outIdx++] = 128 | (u & 63);
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 224 | (u >> 12);
          heap[outIdx++] = 128 | ((u >> 6) & 63);
          heap[outIdx++] = 128 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 240 | (u >> 18);
          heap[outIdx++] = 128 | ((u >> 12) & 63);
          heap[outIdx++] = 128 | ((u >> 6) & 63);
          heap[outIdx++] = 128 | (u & 63);
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    }
    function lengthBytesUTF8(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i;
        } else {
          len += 3;
        }
      }
      return len;
    }
    var buffer,
      HEAP8,
      HEAPU8,
      HEAP16,
      HEAPU16,
      HEAP32,
      HEAPU32,
      HEAPF32,
      HEAPF64;
    function updateGlobalBufferAndViews(buf) {
      buffer = buf;
      Module["HEAP8"] = HEAP8 = new Int8Array(buf);
      Module["HEAP16"] = HEAP16 = new Int16Array(buf);
      Module["HEAP32"] = HEAP32 = new Int32Array(buf);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
      Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
      Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
      Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
      Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
    }
    var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 268435456;
    var wasmTable;
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    function keepRuntimeAlive() {
      return noExitRuntime;
    }
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      runtimeInitialized = true;
      if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
      FS.ignorePermissions = false;
      TTY.init();
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
    function getUniqueRunDependency(id) {
      return id;
    }
    function addRunDependency(id) {
      runDependencies++;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
    }
    function removeRunDependency(id) {
      runDependencies--;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    function abort(what) {
      {
        if (Module["onAbort"]) {
          Module["onAbort"](what);
        }
      }
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      EXITSTATUS = 1;
      what += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(what);
      throw e;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename) {
      return filename.startsWith(dataURIPrefix);
    }
    var wasmBinaryFile =
      "${wasmkomodoPath}";
    // wasmBinaryFile = Module.wasmBinaryFile || "explanation-engine.wasm";
    // if (!isDataURI(wasmBinaryFile)) {
    //   wasmBinaryFile = Module.wasmBinaryFile || locateFile(wasmBinaryFile);
    // }
    function getBinary(file) {
      try {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        if (readBinary) {
          return readBinary(file);
        }
        throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
      } catch (err) {
        abort(err);
      }
    }
    function instantiateSync(file, info) {
      var instance;
      var module;
      var binary;
      try {
        binary = getBinary(file);
        module = new WebAssembly.Module(binary);
        instance = new WebAssembly.Instance(module, info);
      } catch (e) {
        var str = e.toString();
        err("failed to compile wasm module: " + str);
        if (str.includes("imported Memory") || str.includes("memory import")) {
          err(
            "Memory size incompatibility issues may be due to changing INITIAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set INITIAL_MEMORY at runtime to something smaller than it was at compile time).",
          );
        }
        throw e;
      }
      return [instance, module];
    }
    function createWasm() {
      var info = {
        a: asmLibraryArg,
      };
      function receiveInstance(instance, module) {
        var exports = instance.exports;
        Module["asm"] = exports;
        wasmMemory = Module["asm"]["Ba"];
        updateGlobalBufferAndViews(wasmMemory.buffer);
        wasmTable = Module["asm"]["Da"];
        addOnInit(Module["asm"]["Ca"]);
        removeRunDependency("wasm-instantiate");
      }
      addRunDependency("wasm-instantiate");
      if (Module["instantiateWasm"]) {
        try {
          var exports = Module["instantiateWasm"](info, receiveInstance);
          return exports;
        } catch (e) {
          err("Module.instantiateWasm callback failed with error: " + e);
          return false;
        }
      }
      var result = instantiateSync(wasmBinaryFile, info);
      receiveInstance(result[0]);
      return Module["asm"];
    }
    var tempDouble;
    var tempI64;
    var ASM_CONSTS = {
      10648120: () => {
        postMessage({
          error:
            "CEE was unable to allocate a js buffer to post a proto message",
        });
      },
      10648211: ($0) => {
        postMessage({
          error: UTF8ToString($0),
        });
      },
      10648258: () => {
        postMessage({
          error: "CEE was unable to write a proto message to a js buffer",
        });
      },
    };
    function js_alloc(size) {
      return Module._malloc(size);
    }
    function js_free(ptr) {
      Module._free(ptr);
    }
    function js_post_proto(ptr, size, is_final) {
      let response = Module.HEAPU8.subarray(ptr, ptr + size);
      let result_array = response.slice();
      postMessage({
        proto: result_array,
        is_final: is_final,
      });
    }
    function ExitStatus(status) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + status + ")";
      this.status = status;
    }
    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    }
    function ___cxa_allocate_exception(size) {
      return _malloc(size + 24) + 24;
    }
    var exceptionCaught = [];
    function exception_addRef(info) {
      info.add_ref();
    }
    var uncaughtExceptionCount = 0;
    function ___cxa_begin_catch(ptr) {
      var info = new ExceptionInfo(ptr);
      if (!info.get_caught()) {
        info.set_caught(true);
        uncaughtExceptionCount--;
      }
      info.set_rethrown(false);
      exceptionCaught.push(info);
      exception_addRef(info);
      return info.get_exception_ptr();
    }
    function ___cxa_call_unexpected(exception) {
      err(
        "Unexpected exception thrown, this is not properly supported - aborting",
      );
      ABORT = true;
      throw exception;
    }
    function ExceptionInfo(excPtr) {
      this.excPtr = excPtr;
      this.ptr = excPtr - 24;
      this.set_type = function (type) {
        HEAPU32[(this.ptr + 4) >> 2] = type;
      };
      this.get_type = function () {
        return HEAPU32[(this.ptr + 4) >> 2];
      };
      this.set_destructor = function (destructor) {
        HEAPU32[(this.ptr + 8) >> 2] = destructor;
      };
      this.get_destructor = function () {
        return HEAPU32[(this.ptr + 8) >> 2];
      };
      this.set_refcount = function (refcount) {
        HEAP32[this.ptr >> 2] = refcount;
      };
      this.set_caught = function (caught) {
        caught = caught ? 1 : 0;
        HEAP8[(this.ptr + 12) >> 0] = caught;
      };
      this.get_caught = function () {
        return HEAP8[(this.ptr + 12) >> 0] != 0;
      };
      this.set_rethrown = function (rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(this.ptr + 13) >> 0] = rethrown;
      };
      this.get_rethrown = function () {
        return HEAP8[(this.ptr + 13) >> 0] != 0;
      };
      this.init = function (type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
        this.set_refcount(0);
        this.set_caught(false);
        this.set_rethrown(false);
      };
      this.add_ref = function () {
        var value = HEAP32[this.ptr >> 2];
        HEAP32[this.ptr >> 2] = value + 1;
      };
      this.release_ref = function () {
        var prev = HEAP32[this.ptr >> 2];
        HEAP32[this.ptr >> 2] = prev - 1;
        return prev === 1;
      };
      this.set_adjusted_ptr = function (adjustedPtr) {
        HEAPU32[(this.ptr + 16) >> 2] = adjustedPtr;
      };
      this.get_adjusted_ptr = function () {
        return HEAPU32[(this.ptr + 16) >> 2];
      };
      this.get_exception_ptr = function () {
        var isPointer = ___cxa_is_pointer_type(this.get_type());
        if (isPointer) {
          return HEAPU32[this.excPtr >> 2];
        }
        var adjusted = this.get_adjusted_ptr();
        if (adjusted !== 0) return adjusted;
        return this.excPtr;
      };
    }
    function ___cxa_free_exception(ptr) {
      try {
        return _free(new ExceptionInfo(ptr).ptr);
      } catch (e) {}
    }
    var wasmTableMirror = [];
    function getWasmTableEntry(funcPtr) {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length)
          wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      return func;
    }
    function exception_decRef(info) {
      if (info.release_ref() && !info.get_rethrown()) {
        var destructor = info.get_destructor();
        if (destructor) {
          getWasmTableEntry(destructor)(info.excPtr);
        }
        ___cxa_free_exception(info.excPtr);
      }
    }
    function ___cxa_decrement_exception_refcount(ptr) {
      if (!ptr) return;
      exception_decRef(new ExceptionInfo(ptr));
    }
    var exceptionLast = 0;
    function ___cxa_end_catch() {
      _setThrew(0);
      var info = exceptionCaught.pop();
      exception_decRef(info);
      exceptionLast = 0;
    }
    function ___resumeException(ptr) {
      if (!exceptionLast) {
        exceptionLast = ptr;
      }
      throw ptr;
    }
    function ___cxa_find_matching_catch_2() {
      var thrown = exceptionLast;
      if (!thrown) {
        setTempRet0(0);
        return 0;
      }
      var info = new ExceptionInfo(thrown);
      info.set_adjusted_ptr(thrown);
      var thrownType = info.get_type();
      if (!thrownType) {
        setTempRet0(0);
        return thrown;
      }
      for (var i = 0; i < arguments.length; i++) {
        var caughtType = arguments[i];
        if (caughtType === 0 || caughtType === thrownType) {
          break;
        }
        var adjusted_ptr_addr = info.ptr + 16;
        if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
          setTempRet0(caughtType);
          return thrown;
        }
      }
      setTempRet0(thrownType);
      return thrown;
    }
    function ___cxa_find_matching_catch_3() {
      var thrown = exceptionLast;
      if (!thrown) {
        setTempRet0(0);
        return 0;
      }
      var info = new ExceptionInfo(thrown);
      info.set_adjusted_ptr(thrown);
      var thrownType = info.get_type();
      if (!thrownType) {
        setTempRet0(0);
        return thrown;
      }
      for (var i = 0; i < arguments.length; i++) {
        var caughtType = arguments[i];
        if (caughtType === 0 || caughtType === thrownType) {
          break;
        }
        var adjusted_ptr_addr = info.ptr + 16;
        if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
          setTempRet0(caughtType);
          return thrown;
        }
      }
      setTempRet0(thrownType);
      return thrown;
    }
    function ___cxa_increment_exception_refcount(ptr) {
      if (!ptr) return;
      exception_addRef(new ExceptionInfo(ptr));
    }
    function ___cxa_rethrow() {
      var info = exceptionCaught.pop();
      if (!info) {
        abort("no exception to throw");
      }
      var ptr = info.excPtr;
      if (!info.get_rethrown()) {
        exceptionCaught.push(info);
        info.set_rethrown(true);
        info.set_caught(false);
        uncaughtExceptionCount++;
      }
      exceptionLast = ptr;
      throw ptr;
    }
    function ___cxa_rethrow_primary_exception(ptr) {
      if (!ptr) return;
      var info = new ExceptionInfo(ptr);
      exceptionCaught.push(info);
      info.set_rethrown(true);
      ___cxa_rethrow();
    }
    function ___cxa_throw(ptr, type, destructor) {
      var info = new ExceptionInfo(ptr);
      info.init(type, destructor);
      exceptionLast = ptr;
      uncaughtExceptionCount++;
      throw ptr;
    }
    function ___cxa_uncaught_exceptions() {
      return uncaughtExceptionCount;
    }
    function setErrNo(value) {
      HEAP32[___errno_location() >> 2] = value;
      return value;
    }
    var PATH = {
      isAbs: (path) => path.charAt(0) === "/",
      splitPath: (filename) => {
        var splitPathRe = /^(\\/?|)([\\s\\S]*?)((?:\\.{1,2}|[^\\/]+?|)(\\.[^.\\/]*|))(?:[\\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
      normalizeArray: (parts, allowAboveRoot) => {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === ".") {
            parts.splice(i, 1);
          } else if (last === "..") {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift("..");
          }
        }
        return parts;
      },
      normalize: (path) => {
        var isAbsolute = PATH.isAbs(path),
          trailingSlash = path.substr(-1) === "/";
        path = PATH.normalizeArray(
          path.split("/").filter((p) => !!p),
          !isAbsolute,
        ).join("/");
        if (!path && !isAbsolute) {
          path = ".";
        }
        if (path && trailingSlash) {
          path += "/";
        }
        return (isAbsolute ? "/" : "") + path;
      },
      dirname: (path) => {
        var result = PATH.splitPath(path),
          root = result[0],
          dir = result[1];
        if (!root && !dir) {
          return ".";
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
      basename: (path) => {
        if (path === "/") return "/";
        path = PATH.normalize(path);
        path = path.replace(/\\\/$/, "");
        var lastSlash = path.lastIndexOf("/");
        if (lastSlash === -1) return path;
        return path.substr(lastSlash + 1);
      },
      join: function () {
        var paths = Array.prototype.slice.call(arguments);
        return PATH.normalize(paths.join("/"));
      },
      join2: (l, r) => {
        return PATH.normalize(l + "/" + r);
      },
    };
    function getRandomDevice() {
      if (
        typeof crypto == "object" &&
        typeof crypto["getRandomValues"] == "function"
      ) {
        var randomBuffer = new Uint8Array(1);
        return () => {
          crypto.getRandomValues(randomBuffer);
          return randomBuffer[0];
        };
      } else if (ENVIRONMENT_IS_NODE) {
        try {
          var crypto_module = require("crypto");
          return () => crypto_module["randomBytes"](1)[0];
        } catch (e) {}
      }
      return () => abort("randomDevice");
    }
    var PATH_FS = {
      resolve: function () {
        var resolvedPath = "",
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : FS.cwd();
          if (typeof path != "string") {
            throw new TypeError("Arguments to path.resolve must be strings");
          } else if (!path) {
            return "";
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        resolvedPath = PATH.normalizeArray(
          resolvedPath.split("/").filter((p) => !!p),
          !resolvedAbsolute,
        ).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
      },
      relative: (from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== "") break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== "") break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push("..");
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/");
      },
    };
    function intArrayFromString(stringy, dontAddNull, length) {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(
        stringy,
        u8array,
        0,
        u8array.length,
      );
      if (dontAddNull) u8array.length = numBytesWritten;
      return u8array;
    }
    var TTY = {
      ttys: [],
      init: function () {},
      shutdown: function () {},
      register: function (dev, ops) {
        TTY.ttys[dev] = {
          input: [],
          output: [],
          ops: ops,
        };
        FS.registerDevice(dev, TTY.stream_ops);
      },
      stream_ops: {
        open: function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
        close: function (stream) {
          stream.tty.ops.fsync(stream.tty);
        },
        fsync: function (stream) {
          stream.tty.ops.fsync(stream.tty);
        },
        read: function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset + i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
        write: function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        },
      },
      default_tty_ops: {
        get_char: function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              var BUFSIZE = 256;
              var buf = Buffer.alloc(BUFSIZE);
              var bytesRead = 0;
              try {
                bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, -1);
              } catch (e) {
                if (e.toString().includes("EOF")) bytesRead = 0;
                else throw e;
              }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString("utf-8");
              } else {
                result = null;
              }
            } else if (
              typeof window != "undefined" &&
              typeof window.prompt == "function"
            ) {
              result = window.prompt("Input: ");
              if (result !== null) {
                result += "\\n";
              }
            } else if (typeof readline == "function") {
              result = readline();
              if (result !== null) {
                result += "\\n";
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },
        put_char: function (tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
        fsync: function (tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
      },
      default_tty1_ops: {
        put_char: function (tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
        fsync: function (tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
      },
    };
    function zeroMemory(address, size) {
      HEAPU8.fill(0, address, address + size);
      return address;
    }
    function alignMemory(size, alignment) {
      return Math.ceil(size / alignment) * alignment;
    }
    function mmapAlloc(size) {
      size = alignMemory(size, 65536);
      var ptr = _emscripten_builtin_memalign(65536, size);
      if (!ptr) return 0;
      return zeroMemory(ptr, size);
    }
    var MEMFS = {
      ops_table: null,
      mount: function (mount) {
        return MEMFS.createNode(null, "/", 16384 | 511, 0);
      },
      createNode: function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink,
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
              },
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync,
              },
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink,
              },
              stream: {},
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
              },
              stream: FS.chrdev_stream_ops,
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0;
          node.contents = null;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
      getFileDataAsTypedArray: function (node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray)
          return node.contents.subarray(0, node.usedBytes);
        return new Uint8Array(node.contents);
      },
      expandFileStorage: function (node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return;
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(
          newCapacity,
          (prevCapacity *
            (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>>
            0,
        );
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity);
        if (node.usedBytes > 0)
          node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
      },
      resizeFileStorage: function (node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null;
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize);
          if (oldContents) {
            node.contents.set(
              oldContents.subarray(0, Math.min(newSize, node.usedBytes)),
            );
          }
          node.usedBytes = newSize;
        }
      },
      node_ops: {
        getattr: function (node) {
          var attr = {};
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
        setattr: function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
        lookup: function (parent, name) {
          throw FS.genericErrors[44];
        },
        mknod: function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
        rename: function (old_node, new_dir, new_name) {
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {}
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now();
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
          old_node.parent = new_dir;
        },
        unlink: function (parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
        rmdir: function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
        readdir: function (node) {
          var entries = [".", ".."];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },
        symlink: function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
          node.link = oldpath;
          return node;
        },
        readlink: function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
      },
      stream_ops: {
        read: function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) {
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++)
              buffer[offset + i] = contents[position + i];
          }
          return size;
        },
        write: function (stream, buffer, offset, length, position, canOwn) {
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
          if (buffer.subarray && (!node.contents || node.contents.subarray)) {
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) {
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) {
              node.contents.set(
                buffer.subarray(offset, offset + length),
                position,
              );
              return length;
            }
          }
          MEMFS.expandFileStorage(node, position + length);
          if (node.contents.subarray && buffer.subarray) {
            node.contents.set(
              buffer.subarray(offset, offset + length),
              position,
            );
          } else {
            for (var i = 0; i < length; i++) {
              node.contents[position + i] = buffer[offset + i];
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
        llseek: function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
        allocate: function (stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(
            stream.node.usedBytes,
            offset + length,
          );
        },
        mmap: function (stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          if (!(flags & 2) && contents.buffer === buffer) {
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(
                  contents,
                  position,
                  position + length,
                );
              }
            }
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return {
            ptr: ptr,
            allocated: allocated,
          };
        },
        msync: function (stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          return 0;
        },
      },
    };
    function asyncLoad(url, onload, onerror, noRunDep) {
      var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
      readAsync(
        url,
        (arrayBuffer) => {
          assert(
            arrayBuffer,
            'Loading data file "' + url + '" failed (no arrayBuffer).',
          );
          onload(new Uint8Array(arrayBuffer));
          if (dep) removeRunDependency(dep);
        },
        (event) => {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        },
      );
      if (dep) addRunDependency(dep);
    }
    var FS = {
      root: null,
      mounts: [],
      devices: {},
      streams: [],
      nextInode: 1,
      nameTable: null,
      currentPath: "/",
      initialized: false,
      ignorePermissions: true,
      ErrnoError: null,
      genericErrors: {},
      filesystems: null,
      syncFSRequests: 0,
      lookupPath: (path, opts = {}) => {
        path = PATH_FS.resolve(FS.cwd(), path);
        if (!path)
          return {
            path: "",
            node: null,
          };
        var defaults = {
          follow_mount: true,
          recurse_count: 0,
        };
        opts = Object.assign(defaults, opts);
        if (opts.recurse_count > 8) {
          throw new FS.ErrnoError(32);
        }
        var parts = PATH.normalizeArray(
          path.split("/").filter((p) => !!p),
          false,
        );
        var current = FS.root;
        var current_path = "/";
        for (var i = 0; i < parts.length; i++) {
          var islast = i === parts.length - 1;
          if (islast && opts.parent) {
            break;
          }
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
              var lookup = FS.lookupPath(current_path, {
                recurse_count: opts.recurse_count + 1,
              });
              current = lookup.node;
              if (count++ > 40) {
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
        return {
          path: current_path,
          node: current,
        };
      },
      getPath: (node) => {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length - 1] !== "/"
              ? mount + "/" + path
              : mount + path;
          }
          path = path ? node.name + "/" + path : node.name;
          node = node.parent;
        }
      },
      hashName: (parentid, name) => {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
      hashAddNode: (node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
      hashRemoveNode: (node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
      lookupNode: (parent, name) => {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        return FS.lookup(parent, name);
      },
      createNode: (parent, name, mode, rdev) => {
        var node = new FS.FSNode(parent, name, mode, rdev);
        FS.hashAddNode(node);
        return node;
      },
      destroyNode: (node) => {
        FS.hashRemoveNode(node);
      },
      isRoot: (node) => {
        return node === node.parent;
      },
      isMountpoint: (node) => {
        return !!node.mounted;
      },
      isFile: (mode) => {
        return (mode & 61440) === 32768;
      },
      isDir: (mode) => {
        return (mode & 61440) === 16384;
      },
      isLink: (mode) => {
        return (mode & 61440) === 40960;
      },
      isChrdev: (mode) => {
        return (mode & 61440) === 8192;
      },
      isBlkdev: (mode) => {
        return (mode & 61440) === 24576;
      },
      isFIFO: (mode) => {
        return (mode & 61440) === 4096;
      },
      isSocket: (mode) => {
        return (mode & 49152) === 49152;
      },
      flagModes: {
        r: 0,
        "r+": 2,
        w: 577,
        "w+": 578,
        a: 1089,
        "a+": 1090,
      },
      modeStringToFlags: (str) => {
        var flags = FS.flagModes[str];
        if (typeof flags == "undefined") {
          throw new Error("Unknown file open mode: " + str);
        }
        return flags;
      },
      flagsToPermissionString: (flag) => {
        var perms = ["r", "w", "rw"][flag & 3];
        if (flag & 512) {
          perms += "w";
        }
        return perms;
      },
      nodePermissions: (node, perms) => {
        if (FS.ignorePermissions) {
          return 0;
        }
        if (perms.includes("r") && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes("w") && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes("x") && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
      mayLookup: (dir) => {
        var errCode = FS.nodePermissions(dir, "x");
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
      mayCreate: (dir, name) => {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {}
        return FS.nodePermissions(dir, "wx");
      },
      mayDelete: (dir, name, isdir) => {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, "wx");
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
      mayOpen: (node, flags) => {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
      MAX_OPEN_FDS: 4096,
      nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
      getStream: (fd) => FS.streams[fd],
      createStream: (stream, fd_start, fd_end) => {
        if (!FS.FSStream) {
          FS.FSStream = function () {
            this.shared = {};
          };
          FS.FSStream.prototype = {};
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function () {
                return this.node;
              },
              set: function (val) {
                this.node = val;
              },
            },
            isRead: {
              get: function () {
                return (this.flags & 2097155) !== 1;
              },
            },
            isWrite: {
              get: function () {
                return (this.flags & 2097155) !== 0;
              },
            },
            isAppend: {
              get: function () {
                return this.flags & 1024;
              },
            },
            flags: {
              get: function () {
                return this.shared.flags;
              },
              set: function (val) {
                this.shared.flags = val;
              },
            },
            position: {
              get: function () {
                return this.shared.position;
              },
              set: function (val) {
                this.shared.position = val;
              },
            },
          });
        }
        stream = Object.assign(new FS.FSStream(), stream);
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
      closeStream: (fd) => {
        FS.streams[fd] = null;
      },
      chrdev_stream_ops: {
        open: (stream) => {
          var device = FS.getDevice(stream.node.rdev);
          stream.stream_ops = device.stream_ops;
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },
        llseek: () => {
          throw new FS.ErrnoError(70);
        },
      },
      major: (dev) => dev >> 8,
      minor: (dev) => dev & 255,
      makedev: (ma, mi) => (ma << 8) | mi,
      registerDevice: (dev, ops) => {
        FS.devices[dev] = {
          stream_ops: ops,
        };
      },
      getDevice: (dev) => FS.devices[dev],
      getMounts: (mount) => {
        var mounts = [];
        var check = [mount];
        while (check.length) {
          var m = check.pop();
          mounts.push(m);
          check.push.apply(check, m.mounts);
        }
        return mounts;
      },
      syncfs: (populate, callback) => {
        if (typeof populate == "function") {
          callback = populate;
          populate = false;
        }
        FS.syncFSRequests++;
        if (FS.syncFSRequests > 1) {
          err(
            "warning: " +
              FS.syncFSRequests +
              " FS.syncfs operations in flight at once, probably just doing extra work",
          );
        }
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
        function doCallback(errCode) {
          FS.syncFSRequests--;
          return callback(errCode);
        }
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        }
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
      mount: (type, opts, mountpoint) => {
        var root = mountpoint === "/";
        var pseudo = !mountpoint;
        var node;
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, {
            follow_mount: false,
          });
          mountpoint = lookup.path;
          node = lookup.node;
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: [],
        };
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          node.mounted = mount;
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
        return mountRoot;
      },
      unmount: (mountpoint) => {
        var lookup = FS.lookupPath(mountpoint, {
          follow_mount: false,
        });
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
          while (current) {
            var next = current.name_next;
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
            current = next;
          }
        });
        node.mounted = null;
        var idx = node.mount.mounts.indexOf(mount);
        node.mount.mounts.splice(idx, 1);
      },
      lookup: (parent, name) => {
        return parent.node_ops.lookup(parent, name);
      },
      mknod: (path, mode, dev) => {
        var lookup = FS.lookupPath(path, {
          parent: true,
        });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === "." || name === "..") {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
      create: (path, mode) => {
        mode = mode !== undefined ? mode : 438;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
      mkdir: (path, mode) => {
        mode = mode !== undefined ? mode : 511;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
      mkdirTree: (path, mode) => {
        var dirs = path.split("/");
        var d = "";
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += "/" + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch (e) {
            if (e.errno != 20) throw e;
          }
        }
      },
      mkdev: (path, mode, dev) => {
        if (typeof dev == "undefined") {
          dev = mode;
          mode = 438;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
      symlink: (oldpath, newpath) => {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, {
          parent: true,
        });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
      rename: (old_path, new_path) => {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        var lookup, old_dir, new_dir;
        lookup = FS.lookupPath(old_path, {
          parent: true,
        });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, {
          parent: true,
        });
        new_dir = lookup.node;
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        var old_node = FS.lookupNode(old_dir, old_name);
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== ".") {
          throw new FS.ErrnoError(28);
        }
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== ".") {
          throw new FS.ErrnoError(55);
        }
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {}
        if (old_node === new_node) {
          return;
        }
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        errCode = new_node
          ? FS.mayDelete(new_dir, new_name, isdir)
          : FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (
          FS.isMountpoint(old_node) ||
          (new_node && FS.isMountpoint(new_node))
        ) {
          throw new FS.ErrnoError(10);
        }
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        FS.hashRemoveNode(old_node);
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          FS.hashAddNode(old_node);
        }
      },
      rmdir: (path) => {
        var lookup = FS.lookupPath(path, {
          parent: true,
        });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
      readdir: (path) => {
        var lookup = FS.lookupPath(path, {
          follow: true,
        });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
      unlink: (path) => {
        var lookup = FS.lookupPath(path, {
          parent: true,
        });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
      readlink: (path) => {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(
          FS.getPath(link.parent),
          link.node_ops.readlink(link),
        );
      },
      stat: (path, dontFollow) => {
        var lookup = FS.lookupPath(path, {
          follow: !dontFollow,
        });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
      lstat: (path) => {
        return FS.stat(path, true);
      },
      chmod: (path, mode, dontFollow) => {
        var node;
        if (typeof path == "string") {
          var lookup = FS.lookupPath(path, {
            follow: !dontFollow,
          });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now(),
        });
      },
      lchmod: (path, mode) => {
        FS.chmod(path, mode, true);
      },
      fchmod: (fd, mode) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },
      chown: (path, uid, gid, dontFollow) => {
        var node;
        if (typeof path == "string") {
          var lookup = FS.lookupPath(path, {
            follow: !dontFollow,
          });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now(),
        });
      },
      lchown: (path, uid, gid) => {
        FS.chown(path, uid, gid, true);
      },
      fchown: (fd, uid, gid) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },
      truncate: (path, len) => {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == "string") {
          var lookup = FS.lookupPath(path, {
            follow: true,
          });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, "w");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now(),
        });
      },
      ftruncate: (fd, len) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
      utime: (path, atime, mtime) => {
        var lookup = FS.lookupPath(path, {
          follow: true,
        });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime),
        });
      },
      open: (path, flags, mode) => {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode == "undefined" ? 438 : mode;
        if (flags & 64) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == "object") {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072),
            });
            node = lookup.node;
          } catch (e) {}
        }
        var created = false;
        if (flags & 64) {
          if (node) {
            if (flags & 128) {
              throw new FS.ErrnoError(20);
            }
          } else {
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        if (flags & 65536 && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        if (flags & 512 && !created) {
          FS.truncate(node, 0);
        }
        flags &= ~(128 | 512 | 131072);
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          ungotten: [],
          error: false,
        });
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module["logReadFiles"] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
      close: (stream) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null;
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
      isClosed: (stream) => {
        return stream.fd === null;
      },
      llseek: (stream, offset, whence) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
      read: (stream, buffer, offset, length, position) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != "undefined";
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(
          stream,
          buffer,
          offset,
          length,
          position,
        );
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
      write: (stream, buffer, offset, length, position, canOwn) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != "undefined";
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(
          stream,
          buffer,
          offset,
          length,
          position,
          canOwn,
        );
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
      allocate: (stream, offset, length) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
      mmap: (stream, length, position, prot, flags) => {
        if (
          (prot & 2) !== 0 &&
          (flags & 2) === 0 &&
          (stream.flags & 2097155) !== 2
        ) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
      msync: (stream, buffer, offset, length, mmapFlags) => {
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(
          stream,
          buffer,
          offset,
          length,
          mmapFlags,
        );
      },
      munmap: (stream) => 0,
      ioctl: (stream, cmd, arg) => {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
      readFile: (path, opts = {}) => {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || "binary";
        if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === "utf8") {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === "binary") {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
      writeFile: (path, data, opts = {}) => {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == "string") {
          var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error("Unsupported data type");
        }
        FS.close(stream);
      },
      cwd: () => FS.currentPath,
      chdir: (path) => {
        var lookup = FS.lookupPath(path, {
          follow: true,
        });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, "x");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
      createDefaultDirectories: () => {
        FS.mkdir("/tmp");
        FS.mkdir("/home");
        FS.mkdir("/home/web_user");
      },
      createDefaultDevices: () => {
        FS.mkdir("/dev");
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev("/dev/null", FS.makedev(1, 3));
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev("/dev/tty", FS.makedev(5, 0));
        FS.mkdev("/dev/tty1", FS.makedev(6, 0));
        var random_device = getRandomDevice();
        FS.createDevice("/dev", "random", random_device);
        FS.createDevice("/dev", "urandom", random_device);
        FS.mkdir("/dev/shm");
        FS.mkdir("/dev/shm/tmp");
      },
      createSpecialDirectories: () => {
        FS.mkdir("/proc");
        var proc_self = FS.mkdir("/proc/self");
        FS.mkdir("/proc/self/fd");
        FS.mount(
          {
            mount: () => {
              var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
              node.node_ops = {
                lookup: (parent, name) => {
                  var fd = +name;
                  var stream = FS.getStream(fd);
                  if (!stream) throw new FS.ErrnoError(8);
                  var ret = {
                    parent: null,
                    mount: {
                      mountpoint: "fake",
                    },
                    node_ops: {
                      readlink: () => stream.path,
                    },
                  };
                  ret.parent = ret;
                  return ret;
                },
              };
              return node;
            },
          },
          {},
          "/proc/self/fd",
        );
      },
      createStandardStreams: () => {
        if (Module["stdin"]) {
          FS.createDevice("/dev", "stdin", Module["stdin"]);
        } else {
          FS.symlink("/dev/tty", "/dev/stdin");
        }
        if (Module["stdout"]) {
          FS.createDevice("/dev", "stdout", null, Module["stdout"]);
        } else {
          FS.symlink("/dev/tty", "/dev/stdout");
        }
        if (Module["stderr"]) {
          FS.createDevice("/dev", "stderr", null, Module["stderr"]);
        } else {
          FS.symlink("/dev/tty1", "/dev/stderr");
        }
        var stdin = FS.open("/dev/stdin", 0);
        var stdout = FS.open("/dev/stdout", 1);
        var stderr = FS.open("/dev/stderr", 1);
      },
      ensureErrnoError: () => {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = function (errno) {
            this.errno = errno;
          };
          this.setErrno(errno);
          this.message = "FS error";
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = "<generic error, no stack>";
        });
      },
      staticInit: () => {
        FS.ensureErrnoError();
        FS.nameTable = new Array(4096);
        FS.mount(MEMFS, {}, "/");
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
        FS.filesystems = {
          MEMFS: MEMFS,
        };
      },
      init: (input, output, error) => {
        FS.init.initialized = true;
        FS.ensureErrnoError();
        Module["stdin"] = input || Module["stdin"];
        Module["stdout"] = output || Module["stdout"];
        Module["stderr"] = error || Module["stderr"];
        FS.createStandardStreams();
      },
      quit: () => {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
      getMode: (canRead, canWrite) => {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },
      findObject: (path, dontResolveLastLink) => {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
      analyzePath: (path, dontResolveLastLink) => {
        try {
          var lookup = FS.lookupPath(path, {
            follow: !dontResolveLastLink,
          });
          path = lookup.path;
        } catch (e) {}
        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null,
        };
        try {
          var lookup = FS.lookupPath(path, {
            parent: true,
          });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, {
            follow: !dontResolveLastLink,
          });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === "/";
        } catch (e) {
          ret.error = e.errno;
        }
        return ret;
      },
      createPath: (parent, path, canRead, canWrite) => {
        parent = typeof parent == "string" ? parent : FS.getPath(parent);
        var parts = path.split("/").reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {}
          parent = current;
        }
        return current;
      },
      createFile: (parent, name, properties, canRead, canWrite) => {
        var path = PATH.join2(
          typeof parent == "string" ? parent : FS.getPath(parent),
          name,
        );
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
      createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
        var path = name;
        if (parent) {
          parent = typeof parent == "string" ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == "string") {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i)
              arr[i] = data.charCodeAt(i);
            data = arr;
          }
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },
      createDevice: (parent, name, input, output) => {
        var path = PATH.join2(
          typeof parent == "string" ? parent : FS.getPath(parent),
          name,
        );
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        FS.registerDevice(dev, {
          open: (stream) => {
            stream.seekable = false;
          },
          close: (stream) => {
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: (stream, buffer, offset, length, pos) => {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset + i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: (stream, buffer, offset, length, pos) => {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset + i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          },
        });
        return FS.mkdev(path, mode, dev);
      },
      forceLoadFile: (obj) => {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
          return true;
        if (typeof XMLHttpRequest != "undefined") {
          throw new Error(
            "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.",
          );
        } else if (read_) {
          try {
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error("Cannot load without read() or XMLHttpRequest.");
        }
      },
      createLazyFile: (parent, name, url, canRead, canWrite) => {
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = [];
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length - 1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize) | 0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter =
          function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          };
        LazyUint8Array.prototype.cacheLength =
          function LazyUint8Array_cacheLength() {
            var xhr = new XMLHttpRequest();
            xhr.open("HEAD", url, false);
            xhr.send(null);
            if (
              !((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304)
            )
              throw new Error(
                "Couldn't load " + url + ". Status: " + xhr.status,
              );
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing =
              (header = xhr.getResponseHeader("Accept-Ranges")) &&
              header === "bytes";
            var usesGzip =
              (header = xhr.getResponseHeader("Content-Encoding")) &&
              header === "gzip";
            var chunkSize = 1024 * 1024;
            if (!hasByteServing) chunkSize = datalength;
            var doXHR = (from, to) => {
              if (from > to)
                throw new Error(
                  "invalid range (" +
                    from +
                    ", " +
                    to +
                    ") or no bytes requested!",
                );
              if (to > datalength - 1)
                throw new Error(
                  "only " + datalength + " bytes available! programmer error!",
                );
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              if (datalength !== chunkSize)
                xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
              xhr.responseType = "arraybuffer";
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
              }
              xhr.send(null);
              if (
                !((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304)
              )
                throw new Error(
                  "Couldn't load " + url + ". Status: " + xhr.status,
                );
              if (xhr.response !== undefined) {
                return new Uint8Array(xhr.response || []);
              }
              return intArrayFromString(xhr.responseText || "", true);
            };
            var lazyArray = this;
            lazyArray.setDataGetter((chunkNum) => {
              var start = chunkNum * chunkSize;
              var end = (chunkNum + 1) * chunkSize - 1;
              end = Math.min(end, datalength - 1);
              if (typeof lazyArray.chunks[chunkNum] == "undefined") {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof lazyArray.chunks[chunkNum] == "undefined")
                throw new Error("doXHR failed!");
              return lazyArray.chunks[chunkNum];
            });
            if (usesGzip || !datalength) {
              chunkSize = datalength = 1;
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out(
                "LazyFiles on gzip forces download of the whole file when length is accessed",
              );
            }
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          };
        if (typeof XMLHttpRequest != "undefined") {
          if (!ENVIRONMENT_IS_WORKER)
            throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: function () {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              },
            },
            chunkSize: {
              get: function () {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              },
            },
          });
          var properties = {
            isDevice: false,
            contents: lazyArray,
          };
        } else {
          var properties = {
            isDevice: false,
            url: url,
          };
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        Object.defineProperties(node, {
          usedBytes: {
            get: function () {
              return this.contents.length;
            },
          },
        });
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            FS.forceLoadFile(node);
            return fn.apply(null, arguments);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length) return 0;
          var size = Math.min(contents.length - position, length);
          if (contents.slice) {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position);
        };
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return {
            ptr: ptr,
            allocated: true,
          };
        };
        node.stream_ops = stream_ops;
        return node;
      },
      createPreloadedFile: (
        parent,
        name,
        url,
        canRead,
        canWrite,
        onload,
        onerror,
        dontCreateFile,
        canOwn,
        preFinish,
      ) => {
        var fullname = name
          ? PATH_FS.resolve(PATH.join2(parent, name))
          : parent;
        var dep = getUniqueRunDependency("cp " + fullname);
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(
                parent,
                name,
                byteArray,
                canRead,
                canWrite,
                canOwn,
              );
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          if (
            Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
              if (onerror) onerror();
              removeRunDependency(dep);
            })
          ) {
            return;
          }
          finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == "string") {
          asyncLoad(url, (byteArray) => processData(byteArray), onerror);
        } else {
          processData(url);
        }
      },
      indexedDB: () => {
        return (
          window.indexedDB ||
          window.mozIndexedDB ||
          window.webkitIndexedDB ||
          window.msIndexedDB
        );
      },
      DB_NAME: () => {
        return "EM_FS_" + window.location.pathname;
      },
      DB_VERSION: 20,
      DB_STORE_NAME: "FILE_DATA",
      saveFilesToDB: (paths, onload, onerror) => {
        onload = onload || (() => {});
        onerror = onerror || (() => {});
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = () => {
          out("creating db");
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = () => {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0,
            fail = 0,
            total = paths.length;
          function finish() {
            if (fail == 0) onload();
            else onerror();
          }
          paths.forEach((path) => {
            var putRequest = files.put(
              FS.analyzePath(path).object.contents,
              path,
            );
            putRequest.onsuccess = () => {
              ok++;
              if (ok + fail == total) finish();
            };
            putRequest.onerror = () => {
              fail++;
              if (ok + fail == total) finish();
            };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },
      loadFilesFromDB: (paths, onload, onerror) => {
        onload = onload || (() => {});
        onerror = onerror || (() => {});
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror;
        openRequest.onsuccess = () => {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
          } catch (e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0,
            fail = 0,
            total = paths.length;
          function finish() {
            if (fail == 0) onload();
            else onerror();
          }
          paths.forEach((path) => {
            var getRequest = files.get(path);
            getRequest.onsuccess = () => {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(
                PATH.dirname(path),
                PATH.basename(path),
                getRequest.result,
                true,
                true,
                true,
              );
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = () => {
              fail++;
              if (ok + fail == total) finish();
            };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },
    };
    var SYSCALLS = {
      DEFAULT_POLLMASK: 5,
      calculateAt: function (dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
      doStat: function (func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (
            e &&
            e.node &&
            PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))
          ) {
            return -54;
          }
          throw e;
        }
        HEAP32[buf >> 2] = stat.dev;
        HEAP32[(buf + 8) >> 2] = stat.ino;
        HEAP32[(buf + 12) >> 2] = stat.mode;
        HEAPU32[(buf + 16) >> 2] = stat.nlink;
        HEAP32[(buf + 20) >> 2] = stat.uid;
        HEAP32[(buf + 24) >> 2] = stat.gid;
        HEAP32[(buf + 28) >> 2] = stat.rdev;
        ((tempI64 = [
          stat.size >>> 0,
          ((tempDouble = stat.size),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296,
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(buf + 40) >> 2] = tempI64[0]),
          (HEAP32[(buf + 44) >> 2] = tempI64[1]));
        HEAP32[(buf + 48) >> 2] = 4096;
        HEAP32[(buf + 52) >> 2] = stat.blocks;
        ((tempI64 = [
          Math.floor(stat.atime.getTime() / 1e3) >>> 0,
          ((tempDouble = Math.floor(stat.atime.getTime() / 1e3)),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296,
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(buf + 56) >> 2] = tempI64[0]),
          (HEAP32[(buf + 60) >> 2] = tempI64[1]));
        HEAPU32[(buf + 64) >> 2] = 0;
        ((tempI64 = [
          Math.floor(stat.mtime.getTime() / 1e3) >>> 0,
          ((tempDouble = Math.floor(stat.mtime.getTime() / 1e3)),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296,
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(buf + 72) >> 2] = tempI64[0]),
          (HEAP32[(buf + 76) >> 2] = tempI64[1]));
        HEAPU32[(buf + 80) >> 2] = 0;
        ((tempI64 = [
          Math.floor(stat.ctime.getTime() / 1e3) >>> 0,
          ((tempDouble = Math.floor(stat.ctime.getTime() / 1e3)),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296,
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(buf + 88) >> 2] = tempI64[0]),
          (HEAP32[(buf + 92) >> 2] = tempI64[1]));
        HEAPU32[(buf + 96) >> 2] = 0;
        ((tempI64 = [
          stat.ino >>> 0,
          ((tempDouble = stat.ino),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296,
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(buf + 104) >> 2] = tempI64[0]),
          (HEAP32[(buf + 108) >> 2] = tempI64[1]));
        return 0;
      },
      doMsync: function (addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
      varargs: undefined,
      get: function () {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2];
        return ret;
      },
      getStr: function (ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
      getStreamFromFD: function (fd) {
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
        return stream;
      },
    };
    function ___syscall_fcntl64(fd, cmd, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (cmd) {
          case 0: {
            var arg = SYSCALLS.get();
            if (arg < 0) {
              return -28;
            }
            var newStream;
            newStream = FS.createStream(stream, arg);
            return newStream.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return stream.flags;
          case 4: {
            var arg = SYSCALLS.get();
            stream.flags |= arg;
            return 0;
          }
          case 5: {
            var arg = SYSCALLS.get();
            var offset = 0;
            HEAP16[(arg + offset) >> 1] = 2;
            return 0;
          }
          case 6:
          case 7:
            return 0;
          case 16:
          case 8:
            return -28;
          case 9:
            setErrNo(28);
            return -1;
          default: {
            return -28;
          }
        }
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return -e.errno;
      }
    }
    function ___syscall_fstat64(fd, buf) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        return SYSCALLS.doStat(FS.stat, stream.path, buf);
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return -e.errno;
      }
    }
    function ___syscall_ioctl(fd, op, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (op) {
          case 21509:
          case 21505: {
            if (!stream.tty) return -59;
            return 0;
          }
          case 21510:
          case 21511:
          case 21512:
          case 21506:
          case 21507:
          case 21508: {
            if (!stream.tty) return -59;
            return 0;
          }
          case 21519: {
            if (!stream.tty) return -59;
            var argp = SYSCALLS.get();
            HEAP32[argp >> 2] = 0;
            return 0;
          }
          case 21520: {
            if (!stream.tty) return -59;
            return -28;
          }
          case 21531: {
            var argp = SYSCALLS.get();
            return FS.ioctl(stream, op, argp);
          }
          case 21523: {
            if (!stream.tty) return -59;
            return 0;
          }
          case 21524: {
            if (!stream.tty) return -59;
            return 0;
          }
          default:
            return -28;
        }
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return -e.errno;
      }
    }
    function ___syscall_lstat64(path, buf) {
      try {
        path = SYSCALLS.getStr(path);
        return SYSCALLS.doStat(FS.lstat, path, buf);
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return -e.errno;
      }
    }
    function ___syscall_newfstatat(dirfd, path, buf, flags) {
      try {
        path = SYSCALLS.getStr(path);
        var nofollow = flags & 256;
        var allowEmpty = flags & 4096;
        flags = flags & ~4352;
        path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
        return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return -e.errno;
      }
    }
    function ___syscall_openat(dirfd, path, flags, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        var mode = varargs ? SYSCALLS.get() : 0;
        return FS.open(path, flags, mode).fd;
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return -e.errno;
      }
    }
    function ___syscall_stat64(path, buf) {
      try {
        path = SYSCALLS.getStr(path);
        return SYSCALLS.doStat(FS.stat, path, buf);
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return -e.errno;
      }
    }
    function __embind_register_bigint(
      primitiveType,
      name,
      size,
      minRange,
      maxRange,
    ) {}
    function getShiftFromSize(size) {
      switch (size) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError("Unknown type size: " + size);
      }
    }
    function embind_init_charCodes() {
      var codes = new Array(256);
      for (var i = 0; i < 256; ++i) {
        codes[i] = String.fromCharCode(i);
      }
      embind_charCodes = codes;
    }
    var embind_charCodes = undefined;
    function readLatin1String(ptr) {
      var ret = "";
      var c = ptr;
      while (HEAPU8[c]) {
        ret += embind_charCodes[HEAPU8[c++]];
      }
      return ret;
    }
    var awaitingDependencies = {};
    var registeredTypes = {};
    var typeDependencies = {};
    var char_0 = 48;
    var char_9 = 57;
    function makeLegalFunctionName(name) {
      if (undefined === name) {
        return "_unknown";
      }
      name = name.replace(/[^a-zA-Z0-9_]/g, "$");
      var f = name.charCodeAt(0);
      if (f >= char_0 && f <= char_9) {
        return "_" + name;
      }
      return name;
    }
    function createNamedFunction(name, body) {
      name = makeLegalFunctionName(name);
      return new Function(
        "body",
        "return function " +
          name +
          "() {\\n" +
          '    "use strict";' +
          "    return body.apply(this, arguments);\\n" +
          "};\\n",
      )(body);
    }
    function extendError(baseErrorType, errorName) {
      var errorClass = createNamedFunction(errorName, function (message) {
        this.name = errorName;
        this.message = message;
        var stack = new Error(message).stack;
        if (stack !== undefined) {
          this.stack =
            this.toString() + "\\n" + stack.replace(/^Error(:[^\\n]*)?\\n/, "");
        }
      });
      errorClass.prototype = Object.create(baseErrorType.prototype);
      errorClass.prototype.constructor = errorClass;
      errorClass.prototype.toString = function () {
        if (this.message === undefined) {
          return this.name;
        } else {
          return this.name + ": " + this.message;
        }
      };
      return errorClass;
    }
    var BindingError = undefined;
    function throwBindingError(message) {
      throw new BindingError(message);
    }
    var InternalError = undefined;
    function registerType(rawType, registeredInstance, options = {}) {
      if (!("argPackAdvance" in registeredInstance)) {
        throw new TypeError(
          "registerType registeredInstance requires argPackAdvance",
        );
      }
      var name = registeredInstance.name;
      if (!rawType) {
        throwBindingError(
          'type "' + name + '" must have a positive integer typeid pointer',
        );
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError("Cannot register type '" + name + "' twice");
        }
      }
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
      }
    }
    function __embind_register_bool(
      rawType,
      name,
      size,
      trueValue,
      falseValue,
    ) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        fromWireType: function (wt) {
          return !!wt;
        },
        toWireType: function (destructors, o) {
          return o ? trueValue : falseValue;
        },
        argPackAdvance: 8,
        readValueFromPointer: function (pointer) {
          var heap;
          if (size === 1) {
            heap = HEAP8;
          } else if (size === 2) {
            heap = HEAP16;
          } else if (size === 4) {
            heap = HEAP32;
          } else {
            throw new TypeError("Unknown boolean type size: " + name);
          }
          return this["fromWireType"](heap[pointer >> shift]);
        },
        destructorFunction: null,
      });
    }
    var emval_free_list = [];
    var emval_handle_array = [
      {},
      {
        value: undefined,
      },
      {
        value: null,
      },
      {
        value: true,
      },
      {
        value: false,
      },
    ];
    function __emval_decref(handle) {
      if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
        emval_handle_array[handle] = undefined;
        emval_free_list.push(handle);
      }
    }
    function count_emval_handles() {
      var count = 0;
      for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== undefined) {
          ++count;
        }
      }
      return count;
    }
    function get_first_emval() {
      for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== undefined) {
          return emval_handle_array[i];
        }
      }
      return null;
    }
    function init_emval() {
      Module["count_emval_handles"] = count_emval_handles;
      Module["get_first_emval"] = get_first_emval;
    }
    var Emval = {
      toValue: (handle) => {
        if (!handle) {
          throwBindingError("Cannot use deleted val. handle = " + handle);
        }
        return emval_handle_array[handle].value;
      },
      toHandle: (value) => {
        switch (value) {
          case undefined:
            return 1;
          case null:
            return 2;
          case true:
            return 3;
          case false:
            return 4;
          default: {
            var handle = emval_free_list.length
              ? emval_free_list.pop()
              : emval_handle_array.length;
            emval_handle_array[handle] = {
              refcount: 1,
              value: value,
            };
            return handle;
          }
        }
      },
    };
    function simpleReadValueFromPointer(pointer) {
      return this["fromWireType"](HEAP32[pointer >> 2]);
    }
    function __embind_register_emval(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        fromWireType: function (handle) {
          var rv = Emval.toValue(handle);
          __emval_decref(handle);
          return rv;
        },
        toWireType: function (destructors, value) {
          return Emval.toHandle(value);
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: null,
      });
    }
    function floatReadValueFromPointer(name, shift) {
      switch (shift) {
        case 2:
          return function (pointer) {
            return this["fromWireType"](HEAPF32[pointer >> 2]);
          };
        case 3:
          return function (pointer) {
            return this["fromWireType"](HEAPF64[pointer >> 3]);
          };
        default:
          throw new TypeError("Unknown float type: " + name);
      }
    }
    function __embind_register_float(rawType, name, size) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        fromWireType: function (value) {
          return value;
        },
        toWireType: function (destructors, value) {
          return value;
        },
        argPackAdvance: 8,
        readValueFromPointer: floatReadValueFromPointer(name, shift),
        destructorFunction: null,
      });
    }
    function integerReadValueFromPointer(name, shift, signed) {
      switch (shift) {
        case 0:
          return signed
            ? function readS8FromPointer(pointer) {
                return HEAP8[pointer];
              }
            : function readU8FromPointer(pointer) {
                return HEAPU8[pointer];
              };
        case 1:
          return signed
            ? function readS16FromPointer(pointer) {
                return HEAP16[pointer >> 1];
              }
            : function readU16FromPointer(pointer) {
                return HEAPU16[pointer >> 1];
              };
        case 2:
          return signed
            ? function readS32FromPointer(pointer) {
                return HEAP32[pointer >> 2];
              }
            : function readU32FromPointer(pointer) {
                return HEAPU32[pointer >> 2];
              };
        default:
          throw new TypeError("Unknown integer type: " + name);
      }
    }
    function __embind_register_integer(
      primitiveType,
      name,
      size,
      minRange,
      maxRange,
    ) {
      name = readLatin1String(name);
      if (maxRange === -1) {
        maxRange = 4294967295;
      }
      var shift = getShiftFromSize(size);
      var fromWireType = (value) => value;
      if (minRange === 0) {
        var bitshift = 32 - 8 * size;
        fromWireType = (value) => (value << bitshift) >>> bitshift;
      }
      var isUnsignedType = name.includes("unsigned");
      var checkAssertions = (value, toTypeName) => {};
      var toWireType;
      if (isUnsignedType) {
        toWireType = function (destructors, value) {
          checkAssertions(value, this.name);
          return value >>> 0;
        };
      } else {
        toWireType = function (destructors, value) {
          checkAssertions(value, this.name);
          return value;
        };
      }
      registerType(primitiveType, {
        name: name,
        fromWireType: fromWireType,
        toWireType: toWireType,
        argPackAdvance: 8,
        readValueFromPointer: integerReadValueFromPointer(
          name,
          shift,
          minRange !== 0,
        ),
        destructorFunction: null,
      });
    }
    function __embind_register_memory_view(rawType, dataTypeIndex, name) {
      var typeMapping = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
      ];
      var TA = typeMapping[dataTypeIndex];
      function decodeMemoryView(handle) {
        handle = handle >> 2;
        var heap = HEAPU32;
        var size = heap[handle];
        var data = heap[handle + 1];
        return new TA(buffer, data, size);
      }
      name = readLatin1String(name);
      registerType(
        rawType,
        {
          name: name,
          fromWireType: decodeMemoryView,
          argPackAdvance: 8,
          readValueFromPointer: decodeMemoryView,
        },
        {
          ignoreDuplicateRegistrations: true,
        },
      );
    }
    function __embind_register_std_string(rawType, name) {
      name = readLatin1String(name);
      var stdStringIsUTF8 = name === "std::string";
      registerType(rawType, {
        name: name,
        fromWireType: function (value) {
          var length = HEAPU32[value >> 2];
          var payload = value + 4;
          var str;
          if (stdStringIsUTF8) {
            var decodeStartPtr = payload;
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = payload + i;
              if (i == length || HEAPU8[currentBytePtr] == 0) {
                var maxRead = currentBytePtr - decodeStartPtr;
                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                if (str === undefined) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + 1;
              }
            }
          } else {
            var a = new Array(length);
            for (var i = 0; i < length; ++i) {
              a[i] = String.fromCharCode(HEAPU8[payload + i]);
            }
            str = a.join("");
          }
          _free(value);
          return str;
        },
        toWireType: function (destructors, value) {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value);
          }
          var length;
          var valueIsOfTypeString = typeof value == "string";
          if (
            !(
              valueIsOfTypeString ||
              value instanceof Uint8Array ||
              value instanceof Uint8ClampedArray ||
              value instanceof Int8Array
            )
          ) {
            throwBindingError("Cannot pass non-string to std::string");
          }
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            length = lengthBytesUTF8(value);
          } else {
            length = value.length;
          }
          var base = _malloc(4 + length + 1);
          var ptr = base + 4;
          HEAPU32[base >> 2] = length;
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr, length + 1);
          } else {
            if (valueIsOfTypeString) {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);
                if (charCode > 255) {
                  _free(ptr);
                  throwBindingError(
                    "String has UTF-16 code units that do not fit in 8 bits",
                  );
                }
                HEAPU8[ptr + i] = charCode;
              }
            } else {
              for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + i] = value[i];
              }
            }
          }
          if (destructors !== null) {
            destructors.push(_free, base);
          }
          return base;
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: function (ptr) {
          _free(ptr);
        },
      });
    }
    var UTF16Decoder =
      typeof TextDecoder != "undefined"
        ? new TextDecoder("utf-16le")
        : undefined;
    function UTF16ToString(ptr, maxBytesToRead) {
      var endPtr = ptr;
      var idx = endPtr >> 1;
      var maxIdx = idx + maxBytesToRead / 2;
      while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
      endPtr = idx << 1;
      if (endPtr - ptr > 32 && UTF16Decoder)
        return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
      var str = "";
      for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
        var codeUnit = HEAP16[(ptr + i * 2) >> 1];
        if (codeUnit == 0) break;
        str += String.fromCharCode(codeUnit);
      }
      return str;
    }
    function stringToUTF16(str, outPtr, maxBytesToWrite) {
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 2147483647;
      }
      if (maxBytesToWrite < 2) return 0;
      maxBytesToWrite -= 2;
      var startPtr = outPtr;
      var numCharsToWrite =
        maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
      for (var i = 0; i < numCharsToWrite; ++i) {
        var codeUnit = str.charCodeAt(i);
        HEAP16[outPtr >> 1] = codeUnit;
        outPtr += 2;
      }
      HEAP16[outPtr >> 1] = 0;
      return outPtr - startPtr;
    }
    function lengthBytesUTF16(str) {
      return str.length * 2;
    }
    function UTF32ToString(ptr, maxBytesToRead) {
      var i = 0;
      var str = "";
      while (!(i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[(ptr + i * 4) >> 2];
        if (utf32 == 0) break;
        ++i;
        if (utf32 >= 65536) {
          var ch = utf32 - 65536;
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
        } else {
          str += String.fromCharCode(utf32);
        }
      }
      return str;
    }
    function stringToUTF32(str, outPtr, maxBytesToWrite) {
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 2147483647;
      }
      if (maxBytesToWrite < 4) return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343) {
          var trailSurrogate = str.charCodeAt(++i);
          codeUnit =
            (65536 + ((codeUnit & 1023) << 10)) | (trailSurrogate & 1023);
        }
        HEAP32[outPtr >> 2] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break;
      }
      HEAP32[outPtr >> 2] = 0;
      return outPtr - startPtr;
    }
    function lengthBytesUTF32(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
        len += 4;
      }
      return len;
    }
    function __embind_register_std_wstring(rawType, charSize, name) {
      name = readLatin1String(name);
      var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
        getHeap = () => HEAPU16;
        shift = 1;
      } else if (charSize === 4) {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
        getHeap = () => HEAPU32;
        shift = 2;
      }
      registerType(rawType, {
        name: name,
        fromWireType: function (value) {
          var length = HEAPU32[value >> 2];
          var HEAP = getHeap();
          var str;
          var decodeStartPtr = value + 4;
          for (var i = 0; i <= length; ++i) {
            var currentBytePtr = value + 4 + i * charSize;
            if (i == length || HEAP[currentBytePtr >> shift] == 0) {
              var maxReadBytes = currentBytePtr - decodeStartPtr;
              var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
              if (str === undefined) {
                str = stringSegment;
              } else {
                str += String.fromCharCode(0);
                str += stringSegment;
              }
              decodeStartPtr = currentBytePtr + charSize;
            }
          }
          _free(value);
          return str;
        },
        toWireType: function (destructors, value) {
          if (!(typeof value == "string")) {
            throwBindingError(
              "Cannot pass non-string to C++ string type " + name,
            );
          }
          var length = lengthBytesUTF(value);
          var ptr = _malloc(4 + length + charSize);
          HEAPU32[ptr >> 2] = length >> shift;
          encodeString(value, ptr + 4, length + charSize);
          if (destructors !== null) {
            destructors.push(_free, ptr);
          }
          return ptr;
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: function (ptr) {
          _free(ptr);
        },
      });
    }
    function __embind_register_void(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
        isVoid: true,
        name: name,
        argPackAdvance: 0,
        fromWireType: function () {
          return undefined;
        },
        toWireType: function (destructors, o) {
          return undefined;
        },
      });
    }
    var nowIsMonotonic = true;
    function __emscripten_get_now_is_monotonic() {
      return nowIsMonotonic;
    }
    function readI53FromI64(ptr) {
      return HEAPU32[ptr >> 2] + HEAP32[(ptr + 4) >> 2] * 4294967296;
    }
    function __gmtime_js(time, tmPtr) {
      var date = new Date(readI53FromI64(time) * 1e3);
      HEAP32[tmPtr >> 2] = date.getUTCSeconds();
      HEAP32[(tmPtr + 4) >> 2] = date.getUTCMinutes();
      HEAP32[(tmPtr + 8) >> 2] = date.getUTCHours();
      HEAP32[(tmPtr + 12) >> 2] = date.getUTCDate();
      HEAP32[(tmPtr + 16) >> 2] = date.getUTCMonth();
      HEAP32[(tmPtr + 20) >> 2] = date.getUTCFullYear() - 1900;
      HEAP32[(tmPtr + 24) >> 2] = date.getUTCDay();
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
      HEAP32[(tmPtr + 28) >> 2] = yday;
    }
    function __localtime_js(time, tmPtr) {
      var date = new Date(readI53FromI64(time) * 1e3);
      HEAP32[tmPtr >> 2] = date.getSeconds();
      HEAP32[(tmPtr + 4) >> 2] = date.getMinutes();
      HEAP32[(tmPtr + 8) >> 2] = date.getHours();
      HEAP32[(tmPtr + 12) >> 2] = date.getDate();
      HEAP32[(tmPtr + 16) >> 2] = date.getMonth();
      HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900;
      HEAP32[(tmPtr + 24) >> 2] = date.getDay();
      var start = new Date(date.getFullYear(), 0, 1);
      var yday =
        ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0;
      HEAP32[(tmPtr + 28) >> 2] = yday;
      HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dst =
        (summerOffset != winterOffset &&
          date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
      HEAP32[(tmPtr + 32) >> 2] = dst;
    }
    function __mmap_js(len, prot, flags, fd, off, allocated, addr) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var res = FS.mmap(stream, len, off, prot, flags);
        var ptr = res.ptr;
        HEAP32[allocated >> 2] = res.allocated;
        HEAPU32[addr >> 2] = ptr;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return -e.errno;
      }
    }
    function __munmap_js(addr, len, prot, flags, fd, offset) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        if (prot & 2) {
          SYSCALLS.doMsync(addr, stream, len, flags, offset);
        }
        FS.munmap(stream);
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return -e.errno;
      }
    }
    function allocateUTF8(str) {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8Array(str, HEAP8, ret, size);
      return ret;
    }
    function _tzset_impl(timezone, daylight, tzname) {
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      HEAP32[timezone >> 2] = stdTimezoneOffset * 60;
      HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
      function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
        return match ? match[1] : "GMT";
      }
      var winterName = extractZone(winter);
      var summerName = extractZone(summer);
      var winterNamePtr = allocateUTF8(winterName);
      var summerNamePtr = allocateUTF8(summerName);
      if (summerOffset < winterOffset) {
        HEAPU32[tzname >> 2] = winterNamePtr;
        HEAPU32[(tzname + 4) >> 2] = summerNamePtr;
      } else {
        HEAPU32[tzname >> 2] = summerNamePtr;
        HEAPU32[(tzname + 4) >> 2] = winterNamePtr;
      }
    }
    function __tzset_js(timezone, daylight, tzname) {
      if (__tzset_js.called) return;
      __tzset_js.called = true;
      _tzset_impl(timezone, daylight, tzname);
    }
    function _abort() {
      abort("");
    }
    var readAsmConstArgsArray = [];
    function readAsmConstArgs(sigPtr, buf) {
      readAsmConstArgsArray.length = 0;
      var ch;
      buf >>= 2;
      while ((ch = HEAPU8[sigPtr++])) {
        buf += (ch != 105) & buf;
        readAsmConstArgsArray.push(
          ch == 105 ? HEAP32[buf] : HEAPF64[buf++ >> 1],
        );
        ++buf;
      }
      return readAsmConstArgsArray;
    }
    function _emscripten_asm_const_int(code, sigPtr, argbuf) {
      var args = readAsmConstArgs(sigPtr, argbuf);
      return ASM_CONSTS[code].apply(null, args);
    }
    function _emscripten_date_now() {
      return Date.now();
    }
    function getHeapMax() {
      return HEAPU8.length;
    }
    function _emscripten_get_heap_max() {
      return getHeapMax();
    }
    var _emscripten_get_now;
    if (ENVIRONMENT_IS_NODE) {
      _emscripten_get_now = () => {
        var t = process["hrtime"]();
        return t[0] * 1e3 + t[1] / 1e6;
      };
    } else _emscripten_get_now = () => performance.now();
    function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }
    function abortOnCannotGrowMemory(requestedSize) {
      abort("OOM");
    }
    function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      abortOnCannotGrowMemory(requestedSize);
    }
    var ENV = {};
    function getExecutableName() {
      return thisProgram || "./this.program";
    }
    function getEnvStrings() {
      if (!getEnvStrings.strings) {
        var lang =
          (
            (typeof navigator == "object" &&
              navigator.languages &&
              navigator.languages[0]) ||
            "C"
          ).replace("-", "_") + ".UTF-8";
        var env = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: lang,
          _: getExecutableName(),
        };
        for (var x in ENV) {
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(x + "=" + env[x]);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    }
    function writeAsciiToMemory(str, buffer, dontAddNull) {
      for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++ >> 0] = str.charCodeAt(i);
      }
      if (!dontAddNull) HEAP8[buffer >> 0] = 0;
    }
    function _environ_get(__environ, environ_buf) {
      var bufSize = 0;
      getEnvStrings().forEach(function (string, i) {
        var ptr = environ_buf + bufSize;
        HEAPU32[(__environ + i * 4) >> 2] = ptr;
        writeAsciiToMemory(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    }
    function _environ_sizes_get(penviron_count, penviron_buf_size) {
      var strings = getEnvStrings();
      HEAPU32[penviron_count >> 2] = strings.length;
      var bufSize = 0;
      strings.forEach(function (string) {
        bufSize += string.length + 1;
      });
      HEAPU32[penviron_buf_size >> 2] = bufSize;
      return 0;
    }
    function _proc_exit(code) {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        if (Module["onExit"]) Module["onExit"](code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    }
    function exitJS(status, implicit) {
      EXITSTATUS = status;
      _proc_exit(status);
    }
    var _exit = exitJS;
    function _fd_close(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.close(stream);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return e.errno;
      }
    }
    function _fd_fdstat_get(fd, pbuf) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var type = stream.tty
          ? 2
          : FS.isDir(stream.mode)
            ? 3
            : FS.isLink(stream.mode)
              ? 7
              : 4;
        HEAP8[pbuf >> 0] = type;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return e.errno;
      }
    }
    function doReadv(stream, iov, iovcnt, offset) {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[(iov + 4) >> 2];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break;
      }
      return ret;
    }
    function _fd_read(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doReadv(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return e.errno;
      }
    }
    function convertI32PairToI53Checked(lo, hi) {
      return (hi + 2097152) >>> 0 < 4194305 - !!lo
        ? (lo >>> 0) + hi * 4294967296
        : NaN;
    }
    function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
      try {
        var offset = convertI32PairToI53Checked(offset_low, offset_high);
        if (isNaN(offset)) return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.llseek(stream, offset, whence);
        ((tempI64 = [
          stream.position >>> 0,
          ((tempDouble = stream.position),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296,
                ) >>> 0
            : 0),
        ]),
          (HEAP32[newOffset >> 2] = tempI64[0]),
          (HEAP32[(newOffset + 4) >> 2] = tempI64[1]));
        if (stream.getdents && offset === 0 && whence === 0)
          stream.getdents = null;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return e.errno;
      }
    }
    function doWritev(stream, iov, iovcnt, offset) {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[(iov + 4) >> 2];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
      }
      return ret;
    }
    function _fd_write(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doWritev(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return e.errno;
      }
    }
    function _getentropy(buffer, size) {
      if (!_getentropy.randomDevice) {
        _getentropy.randomDevice = getRandomDevice();
      }
      for (var i = 0; i < size; i++) {
        HEAP8[(buffer + i) >> 0] = _getentropy.randomDevice();
      }
      return 0;
    }
    function __isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    function __arraySum(array, index) {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]) {}
      return sum;
    }
    var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function __addDays(date, days) {
      var newDate = new Date(date.getTime());
      while (days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (
          leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR
        )[currentMonth];
        if (days > daysInCurrentMonth - newDate.getDate()) {
          days -= daysInCurrentMonth - newDate.getDate() + 1;
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth + 1);
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear() + 1);
          }
        } else {
          newDate.setDate(newDate.getDate() + days);
          return newDate;
        }
      }
      return newDate;
    }
    function writeArrayToMemory(array, buffer) {
      HEAP8.set(array, buffer);
    }
    function _strftime(s, maxsize, format, tm) {
      var tm_zone = HEAP32[(tm + 40) >> 2];
      var date = {
        tm_sec: HEAP32[tm >> 2],
        tm_min: HEAP32[(tm + 4) >> 2],
        tm_hour: HEAP32[(tm + 8) >> 2],
        tm_mday: HEAP32[(tm + 12) >> 2],
        tm_mon: HEAP32[(tm + 16) >> 2],
        tm_year: HEAP32[(tm + 20) >> 2],
        tm_wday: HEAP32[(tm + 24) >> 2],
        tm_yday: HEAP32[(tm + 28) >> 2],
        tm_isdst: HEAP32[(tm + 32) >> 2],
        tm_gmtoff: HEAP32[(tm + 36) >> 2],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : "",
      };
      var pattern = UTF8ToString(format);
      var EXPANSION_RULES_1 = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y",
      };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(
          new RegExp(rule, "g"),
          EXPANSION_RULES_1[rule],
        );
      }
      var WEEKDAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      var MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      function leadingSomething(value, digits, character) {
        var str = typeof value == "number" ? value.toString() : value || "";
        while (str.length < digits) {
          str = character[0] + str;
        }
        return str;
      }
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, "0");
      }
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : value > 0 ? 1 : 0;
        }
        var compare;
        if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
            compare = sgn(date1.getDate() - date2.getDate());
          }
        }
        return compare;
      }
      function getFirstWeekStartDate(janFourth) {
        switch (janFourth.getDay()) {
          case 0:
            return new Date(janFourth.getFullYear() - 1, 11, 29);
          case 1:
            return janFourth;
          case 2:
            return new Date(janFourth.getFullYear(), 0, 3);
          case 3:
            return new Date(janFourth.getFullYear(), 0, 2);
          case 4:
            return new Date(janFourth.getFullYear(), 0, 1);
          case 5:
            return new Date(janFourth.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(janFourth.getFullYear() - 1, 11, 30);
        }
      }
      function getWeekBasedYear(date) {
        var thisDate = __addDays(
          new Date(date.tm_year + 1900, 0, 1),
          date.tm_yday,
        );
        var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
        var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
        if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
          if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
            return thisDate.getFullYear() + 1;
          }
          return thisDate.getFullYear();
        }
        return thisDate.getFullYear() - 1;
      }
      var EXPANSION_RULES_2 = {
        "%a": function (date) {
          return WEEKDAYS[date.tm_wday].substring(0, 3);
        },
        "%A": function (date) {
          return WEEKDAYS[date.tm_wday];
        },
        "%b": function (date) {
          return MONTHS[date.tm_mon].substring(0, 3);
        },
        "%B": function (date) {
          return MONTHS[date.tm_mon];
        },
        "%C": function (date) {
          var year = date.tm_year + 1900;
          return leadingNulls((year / 100) | 0, 2);
        },
        "%d": function (date) {
          return leadingNulls(date.tm_mday, 2);
        },
        "%e": function (date) {
          return leadingSomething(date.tm_mday, 2, " ");
        },
        "%g": function (date) {
          return getWeekBasedYear(date).toString().substring(2);
        },
        "%G": function (date) {
          return getWeekBasedYear(date);
        },
        "%H": function (date) {
          return leadingNulls(date.tm_hour, 2);
        },
        "%I": function (date) {
          var twelveHour = date.tm_hour;
          if (twelveHour == 0) twelveHour = 12;
          else if (twelveHour > 12) twelveHour -= 12;
          return leadingNulls(twelveHour, 2);
        },
        "%j": function (date) {
          return leadingNulls(
            date.tm_mday +
              __arraySum(
                __isLeapYear(date.tm_year + 1900)
                  ? __MONTH_DAYS_LEAP
                  : __MONTH_DAYS_REGULAR,
                date.tm_mon - 1,
              ),
            3,
          );
        },
        "%m": function (date) {
          return leadingNulls(date.tm_mon + 1, 2);
        },
        "%M": function (date) {
          return leadingNulls(date.tm_min, 2);
        },
        "%n": function () {
          return "\\n";
        },
        "%p": function (date) {
          if (date.tm_hour >= 0 && date.tm_hour < 12) {
            return "AM";
          }
          return "PM";
        },
        "%S": function (date) {
          return leadingNulls(date.tm_sec, 2);
        },
        "%t": function () {
          return "\t";
        },
        "%u": function (date) {
          return date.tm_wday || 7;
        },
        "%U": function (date) {
          var days = date.tm_yday + 7 - date.tm_wday;
          return leadingNulls(Math.floor(days / 7), 2);
        },
        "%V": function (date) {
          var val = Math.floor(
            (date.tm_yday + 7 - ((date.tm_wday + 6) % 7)) / 7,
          );
          if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
            val++;
          }
          if (!val) {
            val = 52;
            var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
            if (
              dec31 == 4 ||
              (dec31 == 5 && __isLeapYear((date.tm_year % 400) - 1))
            ) {
              val++;
            }
          } else if (val == 53) {
            var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
            if (jan1 != 4 && (jan1 != 3 || !__isLeapYear(date.tm_year)))
              val = 1;
          }
          return leadingNulls(val, 2);
        },
        "%w": function (date) {
          return date.tm_wday;
        },
        "%W": function (date) {
          var days = date.tm_yday + 7 - ((date.tm_wday + 6) % 7);
          return leadingNulls(Math.floor(days / 7), 2);
        },
        "%y": function (date) {
          return (date.tm_year + 1900).toString().substring(2);
        },
        "%Y": function (date) {
          return date.tm_year + 1900;
        },
        "%z": function (date) {
          var off = date.tm_gmtoff;
          var ahead = off >= 0;
          off = Math.abs(off) / 60;
          off = (off / 60) * 100 + (off % 60);
          return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
        },
        "%Z": function (date) {
          return date.tm_zone;
        },
        "%%": function () {
          return "%";
        },
      };
      pattern = pattern.replace(/%%/g, "\0\0");
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.includes(rule)) {
          pattern = pattern.replace(
            new RegExp(rule, "g"),
            EXPANSION_RULES_2[rule](date),
          );
        }
      }
      pattern = pattern.replace(/\0\0/g, "%");
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      }
      writeArrayToMemory(bytes, s);
      return bytes.length - 1;
    }
    function _strftime_l(s, maxsize, format, tm, loc) {
      return _strftime(s, maxsize, format, tm);
    }
    function getCFunc(ident) {
      var func = Module["_" + ident];
      return func;
    }
    function ccall(ident, returnType, argTypes, args, opts) {
      var toC = {
        string: (str) => {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) {
            var len = (str.length << 2) + 1;
            ret = stackAlloc(len);
            stringToUTF8(str, ret, len);
          }
          return ret;
        },
        array: (arr) => {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        },
      };
      function convertReturnValue(ret) {
        if (returnType === "string") {
          return UTF8ToString(ret);
        }
        if (returnType === "boolean") return Boolean(ret);
        return ret;
      }
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func.apply(null, cArgs);
      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
      ret = onDone(ret);
      return ret;
    }
    var FSNode = function (parent, name, mode, rdev) {
      if (!parent) {
        parent = this;
      }
      this.parent = parent;
      this.mount = parent.mount;
      this.mounted = null;
      this.id = FS.nextInode++;
      this.name = name;
      this.mode = mode;
      this.node_ops = {};
      this.stream_ops = {};
      this.rdev = rdev;
    };
    var readMode = 292 | 73;
    var writeMode = 146;
    Object.defineProperties(FSNode.prototype, {
      read: {
        get: function () {
          return (this.mode & readMode) === readMode;
        },
        set: function (val) {
          val ? (this.mode |= readMode) : (this.mode &= ~readMode);
        },
      },
      write: {
        get: function () {
          return (this.mode & writeMode) === writeMode;
        },
        set: function (val) {
          val ? (this.mode |= writeMode) : (this.mode &= ~writeMode);
        },
      },
      isFolder: {
        get: function () {
          return FS.isDir(this.mode);
        },
      },
      isDevice: {
        get: function () {
          return FS.isChrdev(this.mode);
        },
      },
    });
    FS.FSNode = FSNode;
    FS.staticInit();
    Module["FS"] = FS;
    embind_init_charCodes();
    BindingError = Module["BindingError"] = extendError(Error, "BindingError");
    InternalError = Module["InternalError"] = extendError(
      Error,
      "InternalError",
    );
    init_emval();
    var asmLibraryArg = {
      g: ___cxa_allocate_exception,
      k: ___cxa_begin_catch,
      X: ___cxa_call_unexpected,
      da: ___cxa_decrement_exception_refcount,
      o: ___cxa_end_catch,
      a: ___cxa_find_matching_catch_2,
      f: ___cxa_find_matching_catch_3,
      y: ___cxa_free_exception,
      ca: ___cxa_increment_exception_refcount,
      C: ___cxa_rethrow,
      ba: ___cxa_rethrow_primary_exception,
      h: ___cxa_throw,
      ea: ___cxa_uncaught_exceptions,
      c: ___resumeException,
      M: ___syscall_fcntl64,
      qa: ___syscall_fstat64,
      za: ___syscall_ioctl,
      na: ___syscall_lstat64,
      oa: ___syscall_newfstatat,
      K: ___syscall_openat,
      pa: ___syscall_stat64,
      W: __embind_register_bigint,
      P: __embind_register_bool,
      Aa: __embind_register_emval,
      O: __embind_register_float,
      v: __embind_register_integer,
      p: __embind_register_memory_view,
      N: __embind_register_std_string,
      G: __embind_register_std_wstring,
      R: __embind_register_void,
      sa: __emscripten_get_now_is_monotonic,
      ta: __gmtime_js,
      ua: __localtime_js,
      ia: __mmap_js,
      ja: __munmap_js,
      va: __tzset_js,
      r: _abort,
      D: _emscripten_asm_const_int,
      E: _emscripten_date_now,
      Y: _emscripten_get_heap_max,
      ra: _emscripten_get_now,
      wa: _emscripten_memcpy_big,
      ha: _emscripten_resize_heap,
      la: _environ_get,
      ma: _environ_sizes_get,
      t: _exit,
      F: _fd_close,
      ka: _fd_fdstat_get,
      ya: _fd_read,
      V: _fd_seek,
      L: _fd_write,
      _: _getentropy,
      H: invoke_diii,
      I: invoke_fiii,
      m: invoke_i,
      b: invoke_ii,
      e: invoke_iii,
      n: invoke_iiii,
      j: invoke_iiiii,
      aa: invoke_iiiiid,
      x: invoke_iiiiii,
      u: invoke_iiiiiii,
      J: invoke_iiiiiiii,
      A: invoke_iiiiiiiiiiii,
      S: invoke_iiiiij,
      U: invoke_j,
      T: invoke_ji,
      Q: invoke_jiiii,
      i: invoke_v,
      l: invoke_vi,
      d: invoke_vii,
      Z: invoke_viid,
      q: invoke_viii,
      B: invoke_viiii,
      s: invoke_viiiiiii,
      w: invoke_viiiiiiiiii,
      z: invoke_viiiiiiiiiiiiiii,
      xa: js_alloc,
      fa: js_free,
      ga: js_post_proto,
      $: _strftime_l,
    };
    var asm = createWasm();
    var ___wasm_call_ctors = (Module["___wasm_call_ctors"] = asm["Ca"]);
    var _CEE_InitWithOpts = (Module["_CEE_InitWithOpts"] = asm["Ea"]);
    var _CEE_Init = (Module["_CEE_Init"] = asm["Fa"]);
    var _CEE_Dispose = (Module["_CEE_Dispose"] = asm["Ga"]);
    var _CEE_DisposeGame = (Module["_CEE_DisposeGame"] = asm["Ha"]);
    var _CEE_DisposeAllGames = (Module["_CEE_DisposeAllGames"] = asm["Ia"]);
    var _CEE_Play = (Module["_CEE_Play"] = asm["Ja"]);
    var _CEE_GetLastMove = (Module["_CEE_GetLastMove"] = asm["Ka"]);
    var _CEE_NewFeature = (Module["_CEE_NewFeature"] = asm["La"]);
    var _CEE_DisposeFeature = (Module["_CEE_DisposeFeature"] = asm["Ma"]);
    var _CEE_Run = (Module["_CEE_Run"] = asm["Na"]);
    var _CEE_Stop = (Module["_CEE_Stop"] = asm["Oa"]);
    var _CEE_Join = (Module["_CEE_Join"] = asm["Pa"]);
    var _CEE_EnableNotifications = (Module["_CEE_EnableNotifications"] =
      asm["Qa"]);
    var _CEE_DisableNotifications = (Module["_CEE_DisableNotifications"] =
      asm["Ra"]);
    var _CEE_WaitForNotification = (Module["_CEE_WaitForNotification"] =
      asm["Sa"]);
    var _CEE_StopNotificationWaiting = (Module["_CEE_StopNotificationWaiting"] =
      asm["Ta"]);
    var _CEE_GetLastError = (Module["_CEE_GetLastError"] = asm["Ua"]);
    var _CEE_ClearLastError = (Module["_CEE_ClearLastError"] = asm["Va"]);
    var _CEE_EnableLog = (Module["_CEE_EnableLog"] = asm["Wa"]);
    var _CEE_DisableLog = (Module["_CEE_DisableLog"] = asm["Xa"]);
    var _CEE_IsValidGamePoint = (Module["_CEE_IsValidGamePoint"] = asm["Ya"]);
    var _free = (Module["_free"] = asm["Za"]);
    var _malloc = (Module["_malloc"] = asm["_a"]);
    var ___errno_location = (Module["___errno_location"] = asm["$a"]);
    var __ZN3TEP7ktprintENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE =
      (Module[
        "__ZN3TEP7ktprintENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE"
      ] = asm["ab"]);
    var __ZN3TEP2pbEy = (Module["__ZN3TEP2pbEy"] = asm["bb"]);
    var __ZN3TEP2pbEyNS_6SquareE = (Module["__ZN3TEP2pbEyNS_6SquareE"] =
      asm["cb"]);
    var __ZN3TEP2pbEyNS_6SquareES0_ = (Module["__ZN3TEP2pbEyNS_6SquareES0_"] =
      asm["db"]);
    var _uci_command = (Module["_uci_command"] = asm["eb"]);
    var _init = (Module["_init"] = asm["fb"]);
    var ___getTypeName = (Module["___getTypeName"] = asm["gb"]);
    var __embind_initialize_bindings = (Module["__embind_initialize_bindings"] =
      asm["hb"]);
    var _emscripten_builtin_memalign = (Module["_emscripten_builtin_memalign"] =
      asm["ib"]);
    var _setThrew = (Module["_setThrew"] = asm["jb"]);
    var setTempRet0 = (Module["setTempRet0"] = asm["kb"]);
    var stackSave = (Module["stackSave"] = asm["lb"]);
    var stackRestore = (Module["stackRestore"] = asm["mb"]);
    var stackAlloc = (Module["stackAlloc"] = asm["nb"]);
    var ___cxa_can_catch = (Module["___cxa_can_catch"] = asm["ob"]);
    var ___cxa_is_pointer_type = (Module["___cxa_is_pointer_type"] = asm["pb"]);
    var dynCall_ji = (Module["dynCall_ji"] = asm["qb"]);
    var dynCall_j = (Module["dynCall_j"] = asm["rb"]);
    var dynCall_iiiiij = (Module["dynCall_iiiiij"] = asm["sb"]);
    var dynCall_jiiii = (Module["dynCall_jiiii"] = asm["tb"]);
    var ___start_em_js = (Module["___start_em_js"] = 10647836);
    var ___stop_em_js = (Module["___stop_em_js"] = 10648120);
    function invoke_iiii(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_ii(index, a1) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_iii(index, a1, a2) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_vii(index, a1, a2) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_viiii(index, a1, a2, a3, a4) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_viii(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_v(index) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)();
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiii(index, a1, a2, a3, a4) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_vi(index, a1) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_i(index) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)();
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiid(index, a1, a2, a3, a4, a5) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_fiii(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_diii(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
    ) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
        );
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_viiiiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
    ) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_viiiiiiiiiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
    ) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
        );
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_viid(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_j(index) {
      var sp = stackSave();
      try {
        return dynCall_j(index);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_ji(index, a1) {
      var sp = stackSave();
      try {
        return dynCall_ji(index, a1);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiij(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave();
      try {
        return dynCall_iiiiij(index, a1, a2, a3, a4, a5, a6);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    function invoke_jiiii(index, a1, a2, a3, a4) {
      var sp = stackSave();
      try {
        return dynCall_jiiii(index, a1, a2, a3, a4);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0);
      }
    }
    Module["stackAlloc"] = stackAlloc;
    Module["stackSave"] = stackSave;
    Module["ccall"] = ccall;
    var calledRun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller;
    };
    function run(args) {
      args = args || arguments_;
      if (runDependencies > 0) {
        return;
      }
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun) return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function () {
          setTimeout(function () {
            Module["setStatus"]("");
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }
    run();
    return Module;
  }
  let api_call_map = (function () {
    function get_last_error(Module) {
      return Module.ccall("CEE_GetLastError", "string", [], []);
    }
    function js_buf_to_c_buf(Module, js_buf) {
      if (!js_buf) {
        return [0, 0];
      }
      let c_buf_size = js_buf.length * js_buf.BYTES_PER_ELEMENT;
      let c_buf = Module._malloc(c_buf_size);
      Module.HEAPU8.set(js_buf, c_buf);
      return [c_buf, c_buf_size];
    }
    return {
      CEE_DisposeGame: (Module, args) => {
        let game_point = args[0];
        Module.ccall("CEE_DisposeGame", "void", ["number"], [game_point]);
        postMessage({
          retval: 1,
        });
      },
      CEE_Play: (Module, args) => {
        let game_point = args[0];
        let uci_move = args[1];
        let new_game_point = Module.ccall(
          "CEE_Play",
          "number",
          ["number", "string"],
          [game_point, uci_move],
        );
        if (new_game_point < 0) {
          postMessage({
            error: get_last_error(Module),
          });
          return;
        }
        postMessage({
          retval: new_game_point,
        });
      },
      CEE_GetLastMove: (Module, args) => {
        let game_point = args[0];
        let uci_move = Module.ccall(
          "CEE_GetLastMove",
          "string",
          ["number"],
          [game_point],
        );
        if (!uci_move < 0) {
          postMessage({
            error: get_last_error(Module),
          });
          return;
        }
        postMessage({
          retval: uci_move,
        });
      },
      CEE_NewFeature: (Module, args) => {
        let game_point = args[0];
        let feature_id = args[1];
        let feature_proto = args[2];
        let c_buf = js_buf_to_c_buf(Module, feature_proto);
        let buf = c_buf[0];
        let size = c_buf[1];
        try {
          let feature_handle = Module.ccall(
            "CEE_NewFeature",
            "number",
            ["number", "number", "number", "number"],
            [game_point, feature_id, buf, size],
          );
          if (feature_handle < 0) {
            postMessage({
              error: get_last_error(Module),
            });
            return;
          }
          postMessage({
            retval: feature_handle,
          });
        } finally {
          if (buf !== 0) {
            Module._free(buf);
          }
        }
      },
      CEE_Run: (Module, args) => {
        let feature_handle = args[0];
        let ret = Module.ccall(
          "CEE_Run",
          "number",
          ["number", "number"],
          [feature_handle, 0],
        );
        if (ret <= 0) {
          postMessage({
            error: get_last_error(Module),
          });
          return;
        }
      },
      CEE_DisposeFeature: (Module, args) => {
        let game_point = args[0];
        Module.ccall("CEE_DisposeFeature", "void", ["number"], [game_point]);
        postMessage({
          retval: 1,
        });
      },
      CEE_EnableLog: (Module, args) => {
        Module.ccall("CEE_EnableLog", "void", [], []);
        postMessage({
          retval: 1,
        });
      },
      CEE_DisableLog: (Module, args) => {
        Module.ccall("CEE_DisableLog", "void", [], []);
        postMessage({
          retval: 1,
        });
      },
    };
  })();
  function api_call(Module, msg) {
    let call = api_call_map[msg.call];
    if (call === undefined) {
      postMessage({
        error: "Unknown API call: 'call' should contain a valid API call name",
      });
      return;
    }
    if (msg.args === undefined) {
      msg.args = [];
    }
    call(Module, msg.args);
  }
  return (function () {
    var Module = null,
      CREATE_KTEP_WORKER_API;
    CREATE_KTEP_WORKER_API = function (WasmPath, options) {
      var workerObj,
        kTepConsole,
        cmds = [],
        wait = typeof setImmediate === "function" ? setImmediate : setTimeout;
      function initWasmAndKomodoTep() {
        var onRuntimeInitialized, onKomodoTepInitialized;
        if (typeof options.onRuntimeInitialized === "function") {
          onRuntimeInitialized = options.onRuntimeInitialized;
        }
        if (typeof options.onKomodoTepInitialized === "function") {
          onKomodoTepInitialized = options.onKomodoTepInitialized;
        }

        function loadBook(callback) {
          function mountAndActivate(data) {
            var fileName = "book.bin";

            try {
              Module.FS.unlink("/" + fileName);
            } catch (e) {}

            try {
              Module.FS.createDataFile("/", fileName, data, true, true, true);
            //   console.log(fileName + " monté ✅");
            } catch (e) {
              console.warn("createDataFile:", e);
            }

            Module.ccall(
              "uci_command",
              "number",
              ["string"],
              ["setoption name Book File value " + fileName],
            );
            Module.ccall(
              "uci_command",
              "number",
              ["string"],
              ["setoption name OwnBook value true"],
            );

            // console.log("Book actif: " + fileName + " ✅");
            if (callback) callback();
          }

          // ✅ URL dynamique — fonctionne peu importe l'ID de l'extension
          var bookUrl = "${bookPath}";
          if (
            typeof chrome !== "undefined" &&
            chrome.runtime &&
            chrome.runtime.getURL
          ) {
            bookUrl = "${bookPath}"
          } else {
            // Fallback : construire depuis self.location (si worker)
            bookUrl =
              "${bookPath}";
          }

        //   console.log("Chargement book depuis:", bookUrl);

          fetch(bookUrl)
            .then(function (r) {
              if (!r.ok) throw new Error("HTTP " + r.status);
              return r.arrayBuffer();
            })
            .then(function (buf) {
              mountAndActivate(new Uint8Array(buf));
            })
            .catch(function (e) {
              console.warn("book.bin fetch échoué:", e);
            });
        }

        // ────────────────────────────────────────────────────────────────────────

        Module = {
          onRuntimeInitialized: function onWasmRuntimeInitialized() {
            RuntimeInitialized = true;
            if (onRuntimeInitialized) onRuntimeInitialized();
          },
        };

        loadKomodoTep(kTepConsole, WasmPath, Module);

        Module.ccall("init", "number", [], []);

        // Book désactivé par défaut
        Module.ccall(
          "uci_command",
          "number",
          ["string"],
          ["setoption name OwnBook value false"],
        );

        // ✅ Chargement automatique du book
        loadBook(function () {
        //   console.log("Book prêt au démarrage ✅");
        });

        if (onKomodoTepInitialized) onKomodoTepInitialized();

        self._loadBook = loadBook;
      }
      options = options || {};
      kTepConsole = {
        log: function log(line) {
          if (workerObj.onmessage) {
            workerObj.onmessage(line);
          } else {
            console.error("You must set onmessage");
            console.info(line);
          }
        },
        time: function time(s) {
          if (typeof console !== "undefined" && console.time) console.time(s);
        },
        timeEnd: function timeEnd(s) {
          if (typeof console !== "undefined" && console.timeEnd)
            console.timeEnd(s);
        },
      };
      kTepConsole.info = kTepConsole.warn = kTepConsole.log;
      workerObj = {
        postMessage: function sendMessage(args, sync) {
          function make_ccall(...ccall_args) {
            var res = null;
            function impl() {
              if (Module) {
                res = Module.ccall(...ccall_args);
              } else {
                setTimeout(impl, 100);
              }
            }
            impl();
            return res;
          }
          let uci_handler = () => {
            cmds.push(args);
            make_ccall("uci_command", "number", ["string"], [cmds.shift()]);
          };
          let bin_handler = () => {
            let cmd = args[0];
            let pb_request = args[1];
            let req_buf_size = pb_request.length * pb_request.BYTES_PER_ELEMENT;
            let req_buf = Module._malloc(req_buf_size);
            Module.HEAPU8.set(pb_request, req_buf);
            const resp_buf_size = 8192;
            let resp_buf = Module._malloc(resp_buf_size);
            let bytes_written = Module.ccall(
              cmd,
              "number",
              ["number", "number", "number", "number"],
              [req_buf, req_buf_size, resp_buf, resp_buf_size],
            );
            let pb_response = Module.HEAPU8.subarray(
              resp_buf,
              resp_buf + bytes_written,
            );
            Module._free(req_buf);
            let result_array = pb_response.slice();
            Module._free(resp_buf);
            if (sync) {
              return result_array;
            } else {
              postMessage([cmd, result_array]);
            }
          };
          let api_handler = () => {
            var res = null;
            function impl() {
              if (Module) {
                res = api_call(Module, args);
              } else {
                setTimeout(impl, 100);
              }
            }
            impl();
            return res;
          };
          let handler =
            typeof args === "string"
              ? uci_handler
              : Array.isArray(args)
                ? bin_handler
                : api_handler;
          if (sync) {
            return handler();
          } else {
            wait(handler.ccall, 1);
          }
        },
      };
      if (options.onmessage) {
        if (typeof options.onmessage === "function") {
          workerObj.onmessage = options.onmessage;
          initWasmAndKomodoTep();
        } else {
          throw new Error(
            "onmessage should be a function, got '" +
              typeof options.onmessage +
              "'.",
          );
        }
      } else {
        wait(initWasmAndKomodoTep, 1);
      }
      return workerObj;
    };
    CREATE_KTEP_WORKER_API.getModule = function () {
      return Module;
    };
    CREATE_KTEP_WORKER_API.isInitialized = function () {
      return RuntimeInitialized;
    };
    return CREATE_KTEP_WORKER_API;
  })();
})();
function komodoTepCLICompleter(line) {
  var completions = [
    "d",
    "eval",
    "exit",
    "flip",
    "go",
    "isready",
    "ponderhit",
    "position fen ",
    "position startpos",
    "position startpos moves",
    "quit",
    "setoption name Clear Hash value ",
    "setoption name Contempt value ",
    "setoption name Hash value ",
    "setoption name Minimum Thinking Time value ",
    "setoption name Move Overhead value ",
    "setoption name MultiPV value ",
    "setoption name Ponder value ",
    "setoption name Skill Level Maximum Error value ",
    "setoption name Skill Level Probability value ",
    "setoption name Skill Level value ",
    "setoption name Slow Mover value ",
    "setoption name Threads value ",
    "setoption name UCI_Chess960 value false",
    "setoption name UCI_Chess960 value true",
    "setoption name UCI_Variant value chess",
    "setoption name UCI_Variant value atomic",
    "setoption name UCI_Variant value crazyhouse",
    "setoption name UCI_Variant value giveaway",
    "setoption name UCI_Variant value horde",
    "setoption name UCI_Variant value kingofthehill",
    "setoption name UCI_Variant value racingkings",
    "setoption name UCI_Variant value relay",
    "setoption name UCI_Variant value threecheck",
    "setoption name nodestime value ",
    "stop",
    "uci",
    "ucinewgame",
  ];
  var completionsMid = [
    "binc ",
    "btime ",
    "confidence ",
    "depth ",
    "infinite ",
    "mate ",
    "maxdepth ",
    "maxtime ",
    "mindepth ",
    "mintime ",
    "moves ",
    "movestogo ",
    "movetime ",
    "ponder ",
    "searchmoves ",
    "shallow ",
    "winc ",
    "wtime ",
  ];
  function filter(c) {
    return c.indexOf(line) === 0;
  }
  var hits = completions.filter(filter);
  if (!hits.length) {
    line = line.replace(/^.*\s/, "");
    if (line) {
      hits = completionsMid.filter(filter);
    } else {
      hits = completionsMid;
    }
  }
  return [hits, line];
}
(function () {
  var isNode, komodoTep;
  isNode =
    typeof global !== "undefined" &&
    Object.prototype.toString.call(global.process) === "[object process]";
  if (isNode) {
    if (require.main === module) {
      komodoTep = KOMODO_TEP(
        require("path").join(__dirname, "explanation-engine.wasm"),
      );
      komodoTep.onmessage = function onlog(line) {
        console.log(line);
      };
      require("readline")
        .createInterface({
          input: process.stdin,
          output: process.stdout,
          completer: komodoTepCLICompleter,
          historySize: 100,
        })
        .on("line", function online(line) {
          if (line) {
            if (line === "quit" || line === "exit") {
              process.exit();
            }
            komodoTep.postMessage(line, true);
          }
        })
        .setPrompt("");
      process.stdin.on("end", function onend() {
        process.exit();
      });
    } else {
      module.exports = KOMODO_TEP;
    }
  } else if (
    typeof onmessage !== "undefined" &&
    (typeof window === "undefined" || typeof window.document === "undefined")
  ) {
    if (self && self.location && self.location.hash) {
      komodoTep = KOMODO_TEP(self.location.hash.substr(1));
    } else {
      komodoTep = KOMODO_TEP();
    }

    onmessage = function (event) {
      var data = event.data;
      komodoTep.postMessage(data, true);
    };

    komodoTep.onmessage = function onlog(line) {
      postMessage(line);
    };
  }
})();

  `;
const stockfishCode = `
  !(function () {
  var a, u, s, e, r, o, n;
  function t() {
    function e(e) {
      ((e = e || {}),
        ((l = l || (void 0 !== e ? e : {})).ready = new Promise(function (
          e,
          n,
        ) {
          ((T = e), (i = n));
        })),
        "undefined" != typeof global &&
          "[object process]" ===
            Object.prototype.toString.call(global.process) &&
          "undefined" != typeof fetch &&
          ("undefined" == typeof XMLHttpRequest &&
            (global.XMLHttpRequest = function () {
              var t,
                r = {
                  open: function (e, n) {
                    t = n;
                  },
                  send: function () {
                    require("fs").readFile(t, function (e, n) {
                      ((r.readyState = 4),
                        e
                          ? (console.error(e), (r.status = 404), r.onerror(e))
                          : ((r.status = 200),
                            (r.response = n),
                            r.onreadystatechange(),
                            r.onload()));
                    });
                  },
                };
              return r;
            }),
          (fetch = null)),
        (l.print = function (e) {
          l.listener ? l.listener(e) : console.log(e);
        }),
        (l.printErr = function (e) {
          l.listener ? l.listener(e) : console.error(e);
        }),
        (l.terminate = function () {
          "undefined" != typeof PThread && PThread.Z();
        }));
      var l,
        T,
        i,
        n,
        t,
        U,
        r,
        H,
        a,
        o = Object.assign({}, l),
        u = [],
        s = "./this.program",
        c = (e, n) => {
          throw n;
        },
        k = "object" == typeof window,
        f = "function" == typeof importScripts,
        L =
          "object" == typeof process &&
          "object" == typeof process.versions &&
          "string" == typeof process.versions.node,
        p = "",
        q =
          (L
            ? ((p = f ? require("path").dirname(p) + "/" : __dirname + "/"),
              (H = () => {
                r || ((U = require("fs")), (r = require("path")));
              }),
              (n = function (e, n) {
                return (
                  H(),
                  (e = r.normalize(e)),
                  U.readFileSync(e, n ? void 0 : "utf8")
                );
              }),
              (t = (e) => (e = (e = n(e, !0)).buffer ? e : new Uint8Array(e))),
              1 < process.argv.length &&
                (s = process.argv[1].replace(/\\\\/g, "/")),
              (u = process.argv.slice(2)),
              process.on("uncaughtException", function (e) {
                if (!(e instanceof j)) throw e;
              }),
              process.on("unhandledRejection", function (e) {
                throw e;
              }),
              (c = (e, n) => {
                if (d || 0 < _) throw ((process.exitCode = e), n);
                (n instanceof j || m("exiting due to exception: " + n),
                  process.exit(e));
              }),
              (l.inspect = function () {
                return "[Emscripten Module object]";
              }))
            : (k || f) &&
              (f
                ? (p = self.location.href)
                : "undefined" != typeof document &&
                  document.currentScript &&
                  (p = document.currentScript.src),
              (p =
                0 !== (p = Te ? Te : p).indexOf("blob:")
                  ? p.substr(0, p.replace(/[?#].*/, "").lastIndexOf("/") + 1)
                  : ""),
              (n = (e) => {
                var n = new XMLHttpRequest();
                return (n.open("GET", e, !1), n.send(null), n.responseText);
              }),
              f) &&
              (t = (e) => {
                var n = new XMLHttpRequest();
                return (
                  n.open("GET", e, !1),
                  (n.responseType = "arraybuffer"),
                  n.send(null),
                  new Uint8Array(n.response)
                );
              }),
          l.print || console.log.bind(console)),
        m = l.printErr || console.warn.bind(console),
        d =
          (Object.assign(l, o),
          l.arguments && (u = l.arguments),
          l.thisProgram && (s = l.thisProgram),
          l.quit && (c = l.quit),
          l.wasmBinary && (a = l.wasmBinary),
          l.noExitRuntime || !0);
      "object" != typeof WebAssembly && A("no native wasm support detected");
      var W,
        B,
        h,
        y,
        g,
        N,
        v = !1,
        K =
          "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
      function X(e, n, t) {
        var r = n + t;
        for (t = n; e[t] && !(r <= t); ) ++t;
        if (16 < t - n && e.subarray && K) return K.decode(e.subarray(n, t));
        for (r = ""; n < t; ) {
          var o,
            i,
            a = e[n++];
          128 & a
            ? ((o = 63 & e[n++]),
              192 == (224 & a)
                ? (r += String.fromCharCode(((31 & a) << 6) | o))
                : ((i = 63 & e[n++]),
                  (a =
                    224 == (240 & a)
                      ? ((15 & a) << 12) | (o << 6) | i
                      : ((7 & a) << 18) |
                        (o << 12) |
                        (i << 6) |
                        (63 & e[n++])) < 65536
                    ? (r += String.fromCharCode(a))
                    : ((a -= 65536),
                      (r += String.fromCharCode(
                        55296 | (a >> 10),
                        56320 | (1023 & a),
                      )))))
            : (r += String.fromCharCode(a));
        }
        return r;
      }
      function z(e) {
        return e ? X(y, e, void 0) : "";
      }
      function G(e, n, t, r) {
        if (0 < r) {
          r = t + r - 1;
          for (var o = 0; o < e.length; ++o) {
            var i = e.charCodeAt(o);
            if (
              (i =
                55296 <= i && i <= 57343
                  ? (65536 + ((1023 & i) << 10)) | (1023 & e.charCodeAt(++o))
                  : i) <= 127
            ) {
              if (r <= t) break;
              n[t++] = i;
            } else {
              if (i <= 2047) {
                if (r <= t + 1) break;
                n[t++] = 192 | (i >> 6);
              } else {
                if (i <= 65535) {
                  if (r <= t + 2) break;
                  n[t++] = 224 | (i >> 12);
                } else {
                  if (r <= t + 3) break;
                  ((n[t++] = 240 | (i >> 18)),
                    (n[t++] = 128 | ((i >> 12) & 63)));
                }
                n[t++] = 128 | ((i >> 6) & 63);
              }
              n[t++] = 128 | (63 & i);
            }
          }
          n[t] = 0;
        }
      }
      function V(e) {
        for (var n = 0, t = 0; t < e.length; ++t) {
          var r = e.charCodeAt(t);
          (r =
            55296 <= r && r <= 57343
              ? (65536 + ((1023 & r) << 10)) | (1023 & e.charCodeAt(++t))
              : r) <= 127
            ? ++n
            : (n = r <= 2047 ? n + 2 : r <= 65535 ? n + 3 : n + 4);
        }
        return n;
      }
      function J(e) {
        var n = V(e) + 1,
          t = Y(n);
        return (G(e, h, t, n), t);
      }
      function Z() {
        var e = W.buffer;
        ((B = e),
          (l.HEAP8 = h = new Int8Array(e)),
          (l.HEAP16 = new Int16Array(e)),
          (l.HEAP32 = g = new Int32Array(e)),
          (l.HEAPU8 = y = new Uint8Array(e)),
          (l.HEAPU16 = new Uint16Array(e)),
          (l.HEAPU32 = new Uint32Array(e)),
          (l.HEAPF32 = new Float32Array(e)),
          (l.HEAPF64 = N = new Float64Array(e)));
      }
      var w,
        $ = [],
        Q = [],
        ee = [],
        ne = [],
        te = !1,
        _ = 0,
        b = 0,
        re = null,
        S = null;
      function A(e) {
        throw (
          l.onAbort && l.onAbort(e),
          m((e = "Aborted(" + e + ")")),
          (v = !0),
          (e = new WebAssembly.RuntimeError(
            e + ". Build with -s ASSERTIONS=1 for more info.",
          )),
          i(e),
          e
        );
      }
      function oe() {
        return w.startsWith("data:application/octet-stream;base64,");
      }
      function ie() {
        var e = w;
        try {
          if (e == w && a) return new Uint8Array(a);
          if (t) return t(e);
          throw "both async and sync fetching of the wasm failed";
        } catch (e) {
          A(e);
        }
      }
      ((l.preloadedImages = {}),
        (l.preloadedAudios = {}),
        (w = "stockfish.wasm"),
        oe() || ((o = w), (w = l.locateFile ? l.locateFile(o, p) : p + o)));
      var ae = {
        6678104: function () {
          try {
            l.onDoneSearching();
          } catch (e) {}
        },
      };
      function D(e) {
        for (; 0 < e.length; ) {
          var n,
            t = e.shift();
          "function" == typeof t
            ? t(l)
            : "number" == typeof (n = t.S)
              ? void 0 === t.P
                ? Ie.call(null, n)
                : Ee.apply(null, [n, t.P])
              : n(void 0 === t.P ? null : t.P);
        }
      }
      function ue(e) {
        e instanceof j || "unwind" == e || c(1, e);
      }
      var se = [null, [], []],
        ce = {},
        fe = L
          ? () => {
              var e = process.hrtime();
              return 1e3 * e[0] + e[1] / 1e6;
            }
          : () => performance.now(),
        le = [];
      function pe(e) {
        if (!te && !v)
          try {
            e();
          } catch (e) {
            ue(e);
          }
      }
      var me,
        de = {};
      function he() {
        if (!me) {
          var e,
            n = {
              USER: "web_user",
              LOGNAME: "web_user",
              PATH: "/",
              PWD: "/",
              HOME: "/home/web_user",
              LANG:
                (
                  ("object" == typeof navigator &&
                    navigator.languages &&
                    navigator.languages[0]) ||
                  "C"
                ).replace("-", "_") + ".UTF-8",
              _: s || "./this.program",
            };
          for (e in de) void 0 === de[e] ? delete n[e] : (n[e] = de[e]);
          var t = [];
          for (e in n) t.push(e + "=" + n[e]);
          me = t;
        }
        return me;
      }
      function C(e) {
        return 0 == e % 4 && (0 != e % 100 || 0 == e % 400);
      }
      function ye(e, n) {
        for (var t = 0, r = 0; r <= n; t += e[r++]);
        return t;
      }
      var M = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        R = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function x(e, n) {
        for (e = new Date(e.getTime()); 0 < n; ) {
          var t = e.getMonth(),
            r = (C(e.getFullYear()) ? M : R)[t];
          if (!(n > r - e.getDate())) {
            e.setDate(e.getDate() + n);
            break;
          }
          ((n -= r - e.getDate() + 1),
            e.setDate(1),
            t < 11
              ? e.setMonth(t + 1)
              : (e.setMonth(0), e.setFullYear(e.getFullYear() + 1)));
        }
        return e;
      }
      function ge(e, n, t, r) {
        function o(e, n, t) {
          for (
            e = "number" == typeof e ? e.toString() : e || "";
            e.length < n;
          )
            e = t[0] + e;
          return e;
        }
        function i(e, n) {
          return o(e, n, "0");
        }
        function a(e, n) {
          function t(e) {
            return e < 0 ? -1 : 0 < e ? 1 : 0;
          }
          var r;
          return (r =
            0 === (r = t(e.getFullYear() - n.getFullYear())) &&
            0 === (r = t(e.getMonth() - n.getMonth()))
              ? t(e.getDate() - n.getDate())
              : r);
        }
        function u(e) {
          switch (e.getDay()) {
            case 0:
              return new Date(e.getFullYear() - 1, 11, 29);
            case 1:
              return e;
            case 2:
              return new Date(e.getFullYear(), 0, 3);
            case 3:
              return new Date(e.getFullYear(), 0, 2);
            case 4:
              return new Date(e.getFullYear(), 0, 1);
            case 5:
              return new Date(e.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(e.getFullYear() - 1, 11, 30);
          }
        }
        function s(e) {
          e = x(new Date(e.A + 1900, 0, 1), e.O);
          var n = new Date(e.getFullYear() + 1, 0, 4),
            t = u(new Date(e.getFullYear(), 0, 4)),
            n = u(n);
          return a(t, e) <= 0
            ? a(n, e) <= 0
              ? e.getFullYear() + 1
              : e.getFullYear()
            : e.getFullYear() - 1;
        }
        var c,
          f = g[(r + 40) >> 2];
        for (c in ((r = {
          V: g[r >> 2],
          U: g[(r + 4) >> 2],
          M: g[(r + 8) >> 2],
          L: g[(r + 12) >> 2],
          K: g[(r + 16) >> 2],
          A: g[(r + 20) >> 2],
          N: g[(r + 24) >> 2],
          O: g[(r + 28) >> 2],
          $: g[(r + 32) >> 2],
          T: g[(r + 36) >> 2],
          W: f ? z(f) : "",
        }),
        (t = z(t)),
        (f = {
          "%c": "%a %b %d %H:%M:%S %Y",
          "%D": "%m/%d/%y",
          "%F": "%Y-%m-%d",
          "%h": "%b",
          "%r": "%I:%M:%S %p",
          "%R": "%H:%M",
          "%T": "%H:%M:%S",
          "%x": "%m/%d/%y",
          "%X": "%H:%M:%S",
          "%Ec": "%c",
          "%EC": "%C",
          "%Ex": "%m/%d/%y",
          "%EX": "%H:%M:%S",
          "%Ey": "%y",
          "%EY": "%Y",
          "%Od": "%d",
          "%Oe": "%e",
          "%OH": "%H",
          "%OI": "%I",
          "%Om": "%m",
          "%OM": "%M",
          "%OS": "%S",
          "%Ou": "%u",
          "%OU": "%U",
          "%OV": "%V",
          "%Ow": "%w",
          "%OW": "%W",
          "%Oy": "%y",
        })))
          t = t.replace(new RegExp(c, "g"), f[c]);
        var l,
          p,
          m = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
            " ",
          ),
          d =
            "January February March April May June July August September October November December".split(
              " ",
            ),
          f = {
            "%a": function (e) {
              return m[e.N].substring(0, 3);
            },
            "%A": function (e) {
              return m[e.N];
            },
            "%b": function (e) {
              return d[e.K].substring(0, 3);
            },
            "%B": function (e) {
              return d[e.K];
            },
            "%C": function (e) {
              return i(((e.A + 1900) / 100) | 0, 2);
            },
            "%d": function (e) {
              return i(e.L, 2);
            },
            "%e": function (e) {
              return o(e.L, 2, " ");
            },
            "%g": function (e) {
              return s(e).toString().substring(2);
            },
            "%G": s,
            "%H": function (e) {
              return i(e.M, 2);
            },
            "%I": function (e) {
              return (0 == (e = e.M) ? (e = 12) : 12 < e && (e -= 12), i(e, 2));
            },
            "%j": function (e) {
              return i(e.L + ye(C(e.A + 1900) ? M : R, e.K - 1), 3);
            },
            "%m": function (e) {
              return i(e.K + 1, 2);
            },
            "%M": function (e) {
              return i(e.U, 2);
            },
            "%n": function () {
              return "\\n";
            },
            "%p": function (e) {
              return 0 <= e.M && e.M < 12 ? "AM" : "PM";
            },
            "%S": function (e) {
              return i(e.V, 2);
            },
            "%t": function () {
              return "\t";
            },
            "%u": function (e) {
              return e.N || 7;
            },
            "%U": function (e) {
              var n = new Date(e.A + 1900, 0, 1),
                t = 0 === n.getDay() ? n : x(n, 7 - n.getDay());
              return a(t, (e = new Date(e.A + 1900, e.K, e.L))) < 0
                ? i(
                    Math.ceil(
                      (31 -
                        t.getDate() +
                        (ye(C(e.getFullYear()) ? M : R, e.getMonth() - 1) -
                          31) +
                        e.getDate()) /
                        7,
                    ),
                    2,
                  )
                : 0 === a(t, n)
                  ? "01"
                  : "00";
            },
            "%V": function (e) {
              var n = new Date(e.A + 1901, 0, 4),
                t = u(new Date(e.A + 1900, 0, 4)),
                n = u(n),
                r = x(new Date(e.A + 1900, 0, 1), e.O);
              return a(r, t) < 0
                ? "53"
                : a(n, r) <= 0
                  ? "01"
                  : i(
                      Math.ceil(
                        (t.getFullYear() < e.A + 1900
                          ? e.O + 32 - t.getDate()
                          : e.O + 1 - t.getDate()) / 7,
                      ),
                      2,
                    );
            },
            "%w": function (e) {
              return e.N;
            },
            "%W": function (e) {
              var n = new Date(e.A, 0, 1),
                t =
                  1 === n.getDay()
                    ? n
                    : x(n, 0 === n.getDay() ? 1 : 7 - n.getDay() + 1);
              return a(t, (e = new Date(e.A + 1900, e.K, e.L))) < 0
                ? i(
                    Math.ceil(
                      (31 -
                        t.getDate() +
                        (ye(C(e.getFullYear()) ? M : R, e.getMonth() - 1) -
                          31) +
                        e.getDate()) /
                        7,
                    ),
                    2,
                  )
                : 0 === a(t, n)
                  ? "01"
                  : "00";
            },
            "%y": function (e) {
              return (e.A + 1900).toString().substring(2);
            },
            "%Y": function (e) {
              return e.A + 1900;
            },
            "%z": function (e) {
              var n = 0 <= (e = e.T);
              return (
                (e = Math.abs(e) / 60),
                (n ? "+" : "-") +
                  String("0000" + ((e / 60) * 100 + (e % 60))).slice(-4)
              );
            },
            "%Z": function (e) {
              return e.W;
            },
            "%%": function () {
              return "%";
            },
          };
        for (c in ((t = t.replace(/%%/g, "\0\0")), f))
          t.includes(c) && (t = t.replace(new RegExp(c, "g"), f[c](r)));
        return (
          (t = t.replace(/\0\0/g, "%")),
          (l = t),
          (p = Array(V(l) + 1)),
          G(l, p, 0, p.length),
          (c = p).length > n ? 0 : (h.set(c, e), c.length - 1)
        );
      }
      function F(e) {
        try {
          e();
        } catch (e) {
          A(e);
        }
      }
      var O = 0,
        E = null,
        I = [],
        ve = {},
        we = {},
        _e = 0,
        be = null,
        Se = [];
      function Ae(t) {
        var e,
          r = {};
        for (e in t)
          !(function (e) {
            var n = t[e];
            r[e] =
              "function" == typeof n
                ? function () {
                    I.push(e);
                    try {
                      return n.apply(null, arguments);
                    } finally {
                      v ||
                        (I.pop() !== e && A(void 0),
                        E &&
                          1 === O &&
                          0 === I.length &&
                          ((O = 0),
                          F(l._asyncify_stop_unwind),
                          "undefined" != typeof Fibers) &&
                          Fibers.aa());
                    }
                  }
                : n;
          })(e);
        return r;
      }
      function De(e) {
        var o, i, n, t;
        v ||
          (0 === O
            ? ((i = o = !1),
              e(() => {
                if (!v && ((o = !0), i)) {
                  ((O = 2),
                    F(() => l._asyncify_start_rewind(E)),
                    "undefined" != typeof Browser &&
                      Browser.R.S &&
                      Browser.R.resume());
                  var n = !1;
                  try {
                    var t = (0, l.asm[we[g[(E + 8) >> 2]]])();
                  } catch (e) {
                    ((t = e), (n = !0));
                  }
                  var e,
                    r = !1;
                  if (
                    (E ||
                      ((e = be) &&
                        ((be = null), (n ? e.reject : e.resolve)(t), (r = !0))),
                    n && !r)
                  )
                    throw t;
                }
              }),
              (i = !0),
              o ||
                ((O = 1),
                (e = xe(10485772)),
                (n = e + 12),
                (g[e >> 2] = n),
                (g[(e + 4) >> 2] = n + 10485760),
                (n = I[0]),
                void 0 === (t = ve[n]) &&
                  ((t = _e++), (ve[n] = t), (we[t] = n)),
                (g[(e + 8) >> 2] = t),
                (E = e),
                F(() => l._asyncify_start_unwind(E)),
                "undefined" != typeof Browser &&
                  Browser.R.S &&
                  Browser.R.pause()))
            : 2 === O
              ? ((O = 0),
                F(l._asyncify_stop_rewind),
                Me(E),
                (E = null),
                Se.forEach((e) => pe(e)))
              : A("invalid state: " + O));
      }
      var P,
        Ce = {
          d: function () {
            return 0;
          },
          i: function () {},
          r: function () {
            return 0;
          },
          f: function () {},
          a: function () {
            A("");
          },
          g: function (e, n) {
            if (0 === e) e = Date.now();
            else {
              if (1 !== e && 4 !== e) return ((g[Re() >> 2] = 28), -1);
              e = fe();
            }
            return (
              (g[n >> 2] = (e / 1e3) | 0),
              (g[(n + 4) >> 2] = ((e % 1e3) * 1e6) | 0),
              0
            );
          },
          j: function (e, n, t) {
            var r;
            for (le.length = 0, t >>= 2; (r = y[n++]); )
              ((r = r < 105) && 1 & t && t++,
                le.push(r ? N[t++ >> 1] : g[t]),
                ++t);
            return ae[e].apply(null, le);
          },
          h: function (e, n, t) {
            y.copyWithin(e, n, n + t);
          },
          c: function (e) {
            var n = y.length;
            if (!(2147483648 < (e >>>= 0)))
              for (var t = 1; t <= 4; t *= 2) {
                var r = n * (1 + 0.2 / t),
                  r = Math.min(r, e + 100663296),
                  o = Math;
                ((r = Math.max(e, r)),
                  (o = o.min.call(
                    o,
                    2147483648,
                    r + ((65536 - (r % 65536)) % 65536),
                  )));
                e: {
                  try {
                    (W.grow((o - B.byteLength + 65535) >>> 16), Z());
                    var i = 1;
                    break e;
                  } catch (e) {}
                  i = void 0;
                }
                if (i) return !0;
              }
            return !1;
          },
          k: function (t) {
            De((e) => {
              return (
                (n = e),
                setTimeout(function () {
                  pe(n);
                }, t)
              );
              var n;
            });
          },
          n: function (r, o) {
            var i = 0;
            return (
              he().forEach(function (e, n) {
                var t = o + i;
                for (n = g[(r + 4 * n) >> 2] = t, t = 0; t < e.length; ++t)
                  h[n++ >> 0] = e.charCodeAt(t);
                ((h[n >> 0] = 0), (i += e.length + 1));
              }),
              0
            );
          },
          o: function (e, n) {
            var t = he(),
              r = ((g[e >> 2] = t.length), 0);
            return (
              t.forEach(function (e) {
                r += e.length + 1;
              }),
              (g[n >> 2] = r),
              0
            );
          },
          b: function (e) {
            Ye(e);
          },
          e: function () {
            return 0;
          },
          q: function (e, n, t, r) {
            return ((e = ce.Y(e)), (n = ce.X(e, n, t)), (g[r >> 2] = n), 0);
          },
          l: function () {},
          p: function (e, n, t, r) {
            for (var o = 0, i = 0; i < t; i++) {
              var a = g[n >> 2],
                u = g[(n + 4) >> 2];
              n += 8;
              for (var s = 0; s < u; s++) {
                var c = y[a + s],
                  f = se[e];
                0 === c || 10 === c
                  ? ((1 === e ? q : m)(X(f, 0)), (f.length = 0))
                  : f.push(c);
              }
              o += u;
            }
            return ((g[r >> 2] = o), 0);
          },
          m: ge,
        },
        Me =
          (!(function () {
            function n(e) {
              ((e = Ae((e = e.exports))),
                (l.asm = e),
                (W = l.asm.s),
                Z(),
                Q.unshift(l.asm.t),
                b--,
                l.monitorRunDependencies && l.monitorRunDependencies(b),
                0 == b &&
                  (null !== re && (clearInterval(re), (re = null)), S) &&
                  ((e = S), (S = null), e()));
            }
            function t(e) {
              n(e.instance);
            }
            function r(e) {
              return (
                a || (!k && !f) || "function" != typeof fetch
                  ? Promise.resolve().then(ie)
                  : fetch("${wasmStockfishPath}", { credentials: "same-origin" })
                      .then(function (e) {
                        if (e.ok) return e.arrayBuffer();
                        throw "failed to load wasm binary file at '" + w + "'";
                      })
                      .catch(ie)
              )
                .then(function (e) {
                  return WebAssembly.instantiate(e, o);
                })
                .then(function (e) {
                  return e;
                })
                .then(e, function (e) {
                  (m("failed to asynchronously prepare wasm: " + e), A(e));
                });
            }
            var o = { a: Ce };
            if (
              (b++,
              l.monitorRunDependencies && l.monitorRunDependencies(b),
              l.instantiateWasm)
            )
              try {
                var e = l.instantiateWasm(o, n);
                return Ae(e);
              } catch (e) {
                return m(
                  "Module.instantiateWasm callback failed with error: " + e,
                );
              }
            (a ||
            "function" != typeof WebAssembly.instantiateStreaming ||
            oe() ||
            "function" != typeof fetch
              ? r(t)
              : fetch("${wasmStockfishPath}", { credentials: "same-origin" }).then(function (e) {
                  return WebAssembly.instantiateStreaming(e, o).then(
                    t,
                    function (e) {
                      return (
                        m("wasm streaming compile failed: " + e),
                        m("falling back to ArrayBuffer instantiation"),
                        r(t)
                      );
                    },
                  );
                })
            ).catch(i);
          })(),
          (l.___wasm_call_ctors = function () {
            return (l.___wasm_call_ctors = l.asm.t).apply(null, arguments);
          }),
          (l._main = function () {
            return (l._main = l.asm.u).apply(null, arguments);
          }),
          (l._command = function () {
            return (l._command = l.asm.v).apply(null, arguments);
          }),
          (l._isSearching = function () {
            return (l._isSearching = l.asm.w).apply(null, arguments);
          }),
          (l._free = function () {
            return (Me = l._free = l.asm.x).apply(null, arguments);
          })),
        Re = (l.___errno_location = function () {
          return (Re = l.___errno_location = l.asm.y).apply(null, arguments);
        }),
        xe = (l._malloc = function () {
          return (xe = l._malloc = l.asm.z).apply(null, arguments);
        }),
        Fe = (l.stackSave = function () {
          return (Fe = l.stackSave = l.asm.B).apply(null, arguments);
        }),
        Oe = (l.stackRestore = function () {
          return (Oe = l.stackRestore = l.asm.C).apply(null, arguments);
        }),
        Y = (l.stackAlloc = function () {
          return (Y = l.stackAlloc = l.asm.D).apply(null, arguments);
        }),
        Ee = (l.dynCall_vi = function () {
          return (Ee = l.dynCall_vi = l.asm.E).apply(null, arguments);
        }),
        Ie = (l.dynCall_v = function () {
          return (Ie = l.dynCall_v = l.asm.F).apply(null, arguments);
        });
      function j(e) {
        ((this.name = "ExitStatus"),
          (this.message = "Program terminated with exit(" + e + ")"),
          (this.status = e));
      }
      function Pe(i) {
        function e() {
          if (!P && ((P = !0), (l.calledRun = !0), !v)) {
            if (
              (D(Q),
              D(ee),
              T(l),
              l.onRuntimeInitialized && l.onRuntimeInitialized(),
              je)
            ) {
              var e = i,
                n = l._main,
                t = (e = e || []).length + 1,
                r = Y(4 * (t + 1));
              g[r >> 2] = J(s);
              for (var o = 1; o < t; o++) g[(r >> 2) + o] = J(e[o - 1]);
              g[(r >> 2) + t] = 0;
              try {
                Ye(n(t, r));
              } catch (e) {
                ue(e);
              }
            }
            if (l.postRun)
              for (
                "function" == typeof l.postRun && (l.postRun = [l.postRun]);
                l.postRun.length;
              )
                ((e = l.postRun.shift()), ne.unshift(e));
            D(ne);
          }
        }
        if (((i = i || u), !(0 < b))) {
          if (l.preRun)
            for (
              "function" == typeof l.preRun && (l.preRun = [l.preRun]);
              l.preRun.length;
            )
              ((n = void 0), (n = l.preRun.shift()), $.unshift(n));
          (D($),
            0 < b ||
              (l.setStatus
                ? (l.setStatus("Running..."),
                  setTimeout(function () {
                    (setTimeout(function () {
                      l.setStatus("");
                    }, 1),
                      e());
                  }, 1))
                : e()));
        }
        var n;
      }
      function Ye(e) {
        (d || 0 < _ || (te = !0),
          d || 0 < _ || (l.onExit && l.onExit(e), (v = !0)),
          c(e, new j(e)));
      }
      if (
        ((l._asyncify_start_unwind = function () {
          return (l._asyncify_start_unwind = l.asm.G).apply(null, arguments);
        }),
        (l._asyncify_stop_unwind = function () {
          return (l._asyncify_stop_unwind = l.asm.H).apply(null, arguments);
        }),
        (l._asyncify_start_rewind = function () {
          return (l._asyncify_start_rewind = l.asm.I).apply(null, arguments);
        }),
        (l._asyncify_stop_rewind = function () {
          return (l._asyncify_stop_rewind = l.asm.J).apply(null, arguments);
        }),
        (l.ccall = function (e, n, t, r, o) {
          function i(e) {
            return (
              --_,
              0 !== s && Oe(s),
              "string" === n ? z(e) : "boolean" === n ? !!e : e
            );
          }
          var a = {
              string: function (e) {
                var n,
                  t = 0;
                return (
                  null != e &&
                    0 !== e &&
                    ((n = 1 + (e.length << 2)), (t = Y(n)), G(e, y, t, n)),
                  t
                );
              },
              array: function (e) {
                var n = Y(e.length);
                return (h.set(e, n), n);
              },
            },
            u = ((e = l["_" + e]), []),
            s = 0;
          if (r)
            for (var c = 0; c < r.length; c++) {
              var f = a[t[c]];
              f ? (0 === s && (s = Fe()), (u[c] = f(r[c]))) : (u[c] = r[c]);
            }
          return (
            (t = E),
            (r = e.apply(null, u)),
            (_ += 1),
            (o = o && o.async),
            E != t
              ? new Promise((e, n) => {
                  be = { resolve: e, reject: n };
                }).then(i)
              : ((r = i(r)), o ? Promise.resolve(r) : r)
          );
        }),
        (S = function e() {
          (P || Pe(), P || (S = e));
        }),
        (l.run = Pe),
        l.preInit)
      )
        for (
          "function" == typeof l.preInit && (l.preInit = [l.preInit]);
          0 < l.preInit.length;
        )
          l.preInit.pop()();
      var je = !0;
      return (l.noInitialRun && (je = !1), Pe(), e.ready);
    }
    var Te;
    ((Te =
      "undefined" != typeof document && document.currentScript
        ? document.currentScript.src
        : void 0),
      "undefined" != typeof __filename && (Te = Te || __filename));
    return (
      "object" == typeof exports && "object" == typeof module
        ? (module.exports = e)
        : "function" == typeof define && define.amd
          ? define([], function () {
              return e;
            })
          : "object" == typeof exports && (exports.Stockfish = e),
      e
    );
  }
  function i(e) {
    if (
      (r.ccall("command", null, ["string"], [e], {
        async: "undefined" != typeof IS_ASYNCIFY && /^go\b/.test(e),
      }),
      "quit" === e)
    ) {
      try {
        r.terminate();
      } catch (e) {}
      try {
        self.close();
      } catch (e) {}
      try {
        process.exit();
      } catch (e) {}
    }
  }
  function c() {
    for (; n.length && (!r._isSearching || !r._isSearching()); ) i(n.shift());
  }
  function f(e) {
    ("go" === (e = e.trim()).substring(0, 2) ||
    "setoption" === e.substring(0, 9)
      ? n.push(e)
      : i(e),
      c());
  }
  function l() {
    if (r._isReady && !r._isReady()) return setTimeout(l, 10);
    var t;
    ("undefined" == typeof IS_ASYNCIFY
      ? (r.onDoneSearching = c)
      : (r.onDoneSearching = function () {
          setTimeout(c, 1);
        }),
      (r.processCommand = f),
      o.length &&
        ((t = 0),
        (function e() {
          for (var n; t < o.length; ) {
            if ((n = o[t++]).startsWith("sleep "))
              return setTimeout(e, n.slice(6));
            f(n);
          }
        })()));
  }
  function p(t) {
    var e,
      r = 0,
      o = [],
      n = a.slice(1 + ((a.lastIndexOf(".") - 1) >>> 0)),
      i = a.slice(0, -n.length);
    for (e = 0; e < t; ++e)
      !(function (e, n) {
        fetch(new Request(e))
          .then(function (e) {
            return e.blob();
          })
          .then(function (e) {
            n(e);
          });
      })(
        i + "-part-" + e + n,
        (function (n) {
          return function (e) {
            (++r,
              (o[n] = e),
              r === t &&
                ((e = URL.createObjectURL(
                  new Blob(o, { type: "application/wasm" }),
                )),
                u(e)));
          };
        })(e),
      );
  }
  ("undefined" != typeof self &&
    "worker" === self.location.hash.split(",")[1]) ||
    ("undefined" != typeof global &&
      "[object process]" === Object.prototype.toString.call(global.process) &&
      !require("worker_threads").isMainThread) ||
    (("undefined" != typeof onmessage &&
      ("undefined" == typeof window || void 0 === window.document)) ||
    ("undefined" != typeof global &&
      "[object process]" === Object.prototype.toString.call(global.process))
      ? ((e =
          "undefined" != typeof global &&
          "[object process]" ===
            Object.prototype.toString.call(global.process)),
        (r = {}),
        (o = []),
        (n = []),
        e
          ? require.main === module
            ? ((s = require("path")),
              (a = s.join(
                __dirname,
                s.basename(__filename, s.extname(__filename)) + ".wasm",
              )),
              (r = {
                locateFile: function (e) {
                  return -1 < e.indexOf(".wasm")
                    ? -1 < e.indexOf(".wasm.map")
                      ? a + ".map"
                      : a
                    : __filename;
                },
                listener: function (e) {
                  process.stdout.write(e + "\\n");
                },
              }),
              "number" == typeof enginePartsCount &&
                (r.wasmBinary = (function (e) {
                  for (
                    var n = require("fs"),
                      t = s.extname(a),
                      r = a.slice(0, -t.length),
                      o = [],
                      i = 0;
                    i < e;
                    ++i
                  )
                    o.push(n.readFileSync(r + "-part-" + i + ".wasm"));
                  return Buffer.concat(o);
                })(enginePartsCount)),
              (o = process.argv.slice(2)),
              t()(r).then(l),
              require("readline")
                .createInterface({
                  input: process.stdin,
                  output: process.stdout,
                  completer: function (n) {
                    var e = [
                      "binc ",
                      "btime ",
                      "confidence ",
                      "depth ",
                      "infinite ",
                      "mate ",
                      "maxdepth ",
                      "maxtime ",
                      "mindepth ",
                      "mintime ",
                      "moves ",
                      "movestogo ",
                      "movetime ",
                      "ponder ",
                      "searchmoves ",
                      "shallow ",
                      "winc ",
                      "wtime ",
                    ];
                    function t(e) {
                      return 0 === e.toLowerCase().indexOf(n.toLowerCase());
                    }
                    var r = [
                      "compiler",
                      "d",
                      "eval",
                      "flip",
                      "go ",
                      "isready",
                      "ponderhit",
                      "position fen ",
                      "position startpos",
                      "position startpos moves ",
                      "quit",
                      "setoption name Clear Hash value true",
                      "setoption name Hash value ",
                      "setoption name Minimum Thinking Time value ",
                      "setoption name Move Overhead value ",
                      "setoption name MultiPV value ",
                      "setoption name Ponder value ",
                      "setoption name Skill Level value ",
                      "setoption name Slow Mover value ",
                      "setoption name Threads value ",
                      "setoption name UCI_Chess960 value false",
                      "setoption name UCI_Chess960 value true",
                      "setoption name UCI_LimitStrength value true",
                      "setoption name UCI_LimitStrength value false",
                      "setoption name UCI_Elo value ",
                      "setoption name UCI_ShowWDL value true",
                      "setoption name UCI_ShowWDL value false",
                      "setoption name nodestime value ",
                      "stop",
                      "uci",
                      "ucinewgame",
                    ].filter(t);
                    return [
                      (r = r.length
                        ? r
                        : (n = n.replace(/^.*\s/, ""))
                          ? e.filter(t)
                          : e),
                      n,
                    ];
                  },
                  historySize: 100,
                })
                .on("line", function (e) {
                  e &&
                    (r.processCommand ? r.processCommand(e) : o.push(e),
                    "quit" === e) &&
                    process.exit();
                })
                .on("close", function () {
                  process.exit();
                })
                .setPrompt(""))
            : (module.exports = t)
          : ((e = self.location.hash.substr(1).split(",")),
            (a = decodeURIComponent(
              e[0] ||
                location.origin + location.pathname.replace(/\.js$/i, ".wasm"),
            )),
            (u = function (n) {
              ((r = {
                locateFile: function (e) {
                  return -1 < e.indexOf(".wasm")
                    ? -1 < e.indexOf(".wasm.map")
                      ? a + ".map"
                      : n || a
                    : self.location.origin +
                        self.location.pathname +
                        "#" +
                        a +
                        ",worker";
                },
                listener: function (e) {
                  postMessage(e);
                },
              }),
                t()(r)
                  .then(l)
                  .catch(function (e) {
                    setTimeout(function () {
                      throw e;
                    }, 1);
                  }));
            }),
            "number" == typeof enginePartsCount ? p(enginePartsCount) : u(),
            (onmessage =
              onmessage ||
              function (e) {
                if (
                  (r.processCommand ? r.processCommand(e.data) : o.push(e.data),
                  "quit" === e.data)
                )
                  try {
                    self.close();
                  } catch (e) {}
              })))
      : "object" == typeof document && document.currentScript
        ? (document.currentScript._exports = t())
        : t());
})();

  `;

function classifySafety(avgAccuracy, win, lost, draw) {
  const total = win + lost + draw;
  const winRate = total > 0 ? (win / total) * 100 : 0;

  if (avgAccuracy > 92 && winRate > 88) return "cheater";
  if (avgAccuracy >= 85 && winRate >= 75) return "sus";
  return "legit";
}

// ─── FETCH 10 DERNIÈRES PARTIES ──────────────────────────────────────────

async function getLast10PGN(username) {
  if (window.location.host === "www.chess.com") {
    const archivesRes = await fetch(
      `https://api.chess.com/pub/player/${username}/games/archives`,
    );
    const { archives } = await archivesRes.json();

    const recentArchives = [...archives].reverse();
    let allGames = [];

    for (const url of recentArchives) {
      const res = await fetch(url);
      const data = await res.json();
      allGames = allGames.concat(data.games);
      if (allGames.length >= 10) break;
    }

    allGames.sort((a, b) => b.end_time - a.end_time);

    return allGames.slice(0, 10).map((game) => ({
      pgn: game.pgn,
      white: game.white.username,
      black: game.black.username,
      whiteResult: game.white.result,
      blackResult: game.black.result,
      whiteElo: game.white.rating,
      blackElo: game.black.rating,
    }));
  }

  if (window.location.host === "lichess.org") {
    const url = `https://lichess.org/api/games/user/${username}?max=10&moves=true&pgnInJson=true&sort=dateDesc`;

    const res = await fetch(url, {
      headers: { Accept: "application/x-ndjson" },
    });

    const text = await res.text();

    return text
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .slice(0, 10)
      .map((game) => {
        const pgn = game.pgn;

        const getTag = (tag) => {
          const m = pgn.match(new RegExp(`\\[${tag} "([^"]+)"\\]`));
          return m ? m[1] : null;
        };

        const result = getTag("Result");

        return {
          pgn,
          white: getTag("White"),
          black: getTag("Black"),
          whiteResult:
            result === "1-0"
              ? "win"
              : result === "0-1"
                ? "loss"
                : result === "1/2-1/2"
                  ? "draw"
                  : null,
          blackResult:
            result === "0-1"
              ? "win"
              : result === "1-0"
                ? "loss"
                : result === "1/2-1/2"
                  ? "draw"
                  : null,
          whiteElo: parseInt(getTag("WhiteElo")),
          blackElo: parseInt(getTag("BlackElo")),
        };
      });
  }
}

// ─── PGN → FEN HISTORY ───────────────────────────────────────────────────

function pgnToFenHistory(pgn) {
  try {
    const chess = new Chess();
    chess.load_pgn(pgn);
    const history = chess.history({ verbose: true });

    const fens = [];
    const chess2 = new Chess();
    fens.push(chess2.fen());

    for (const move of history) {
      chess2.move(move);
      fens.push(chess2.fen());
    }

    return fens;
  } catch (e) {
    console.warn("PGN parse error:", e);
    return [];
  }
}

// ─── EXTRACT WIN/LOST/DRAW FOR USERNAME ─────────────────────────────────

function extractResult(gameInfo, username) {
  const uLower = username.toLowerCase();
  const isWhite = gameInfo.white.toLowerCase() === uLower;
  const result = isWhite ? gameInfo.whiteResult : gameInfo.blackResult;

  if (result === "win") return "win";
  if (
    ["checkmated", "timeout", "resigned", "abandoned", "lose", "loss"].includes(
      result,
    )
  )
    return "lost";
  return "draw";
}

async function showChessHv3Prompt(username) {
  const isChessCom = window.location.host === "www.chess.com";
  const isLichess = window.location.host === "lichess.org";
  const isWorldChess = window.location.host === "worldchess.com";

  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  }

  // ── Loading popup ──────────────────────────────────────────────
  Swal.fire({
    customClass: { popup: "swal-rederic" },
    title: "ChessHv3 Check",
    showCloseButton: true,
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick: false,
    html: `
      ${swalThemeCSS}
      <div style="text-align:center; margin:8px 0 4px;">
        <div style="
          width:52px;height:52px;border-radius:50%;
          background:rgba(74,124,31,0.10);
          border:1px solid rgba(74,124,31,0.30);
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 14px;
          font-family:'Space Mono',monospace;
          font-size:22px;font-weight:700;color:#4a7c1f;
        ">♟</div>
        <div class="chv3-loading-wrap">
          <div class="chv3-loading-label">
            <span>Fetching stats…</span>
            <span id="chv3-pct">0%</span>
          </div>
          <div class="chv3-bar-track">
            <div class="chv3-bar-fill" id="chv3-bar"></div>
          </div>
          <div class="chv3-game-label" id="chv3-game-label">Connecting to API…</div>
        </div>
      </div>
    `,
  });

  function setBar(pct, label) {
    const bar = document.getElementById("chv3-bar");
    const pctEl = document.getElementById("chv3-pct");
    const lbl = document.getElementById("chv3-game-label");
    if (bar) bar.style.width = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";
    if (lbl) lbl.textContent = label;
  }

  let stats = null;

  try {
    setBar(20, "Requesting player data…");

    // ── Chess.com ────────────────────────────────────────────────
    if (isChessCom) {
      const statsRes = await fetch(
        `https://api.chess.com/pub/player/${username}/stats`,
      );
      setBar(60, "Parsing records…");
      const data = await statsRes.json();

      function fmt(record) {
        const win = record?.win || 0,
          draw = record?.draw || 0,
          loss = record?.loss || 0;
        const total = win + draw + loss;
        return {
          total,
          win,
          draw,
          loss,
          winRate: total ? ((win / total) * 100).toFixed(1) : "0.0",
          drawRate: total ? ((draw / total) * 100).toFixed(1) : "0.0",
          loseRate: total ? ((loss / total) * 100).toFixed(1) : "0.0",
        };
      }

      const rapid = fmt(data.chess_rapid?.record);
      const blitz = fmt(data.chess_blitz?.record);
      const bullet = fmt(data.chess_bullet?.record);

      const totalWin = rapid.win + blitz.win + bullet.win;
      const totalDraw = rapid.draw + blitz.draw + bullet.draw;
      const totalLoss = rapid.loss + blitz.loss + bullet.loss;
      const totalAll = totalWin + totalDraw + totalLoss;

      stats = {
        platform: "chess.com",
        total: {
          total: totalAll,
          win: totalWin,
          draw: totalDraw,
          loss: totalLoss,
          winRate: totalAll ? ((totalWin / totalAll) * 100).toFixed(1) : "0.0",
          drawRate: totalAll
            ? ((totalDraw / totalAll) * 100).toFixed(1)
            : "0.0",
          loseRate: totalAll
            ? ((totalLoss / totalAll) * 100).toFixed(1)
            : "0.0",
        },
      };
    }

    // ── Lichess ─────────────────────────────────────────────────
    else if (isLichess) {
      const res = await fetch(`https://lichess.org/api/user/${username}`);
      setBar(60, "Parsing records…");
      const data = await res.json();

      const win = data.count?.win || 0;
      const draw = data.count?.draw || 0;
      const loss = data.count?.loss || 0;
      const total = data.count?.all || win + draw + loss;

      stats = {
        platform: "lichess",
        total: {
          total,
          win,
          draw,
          loss,
          winRate: total ? ((win / total) * 100).toFixed(1) : "0.0",
          drawRate: total ? ((draw / total) * 100).toFixed(1) : "0.0",
          loseRate: total ? ((loss / total) * 100).toFixed(1) : "0.0",
        },
      };
    }

    // ── WorldChess ──────────────────────────────────────────────
    else if (isWorldChess) {
      const jwt = getCookie("jwt_master");
      if (!jwt) throw new Error("JWT not found in cookies");

      setBar(40, "Resolving player id…");

      const meRes = await fetch(`https://api.worldchess.com/api/me/`, {
        headers: { Authorization: `JWT ${jwt}` },
      });

      const meData = await meRes.json();
      const playerId = meData?.player?.player_id;
      if (!playerId) throw new Error("Player ID not found");

      setBar(70, "Parsing records…");

      const statsRes = await fetch(
        `https://api.worldchess.com/api/gaming/players/${playerId}/stats/games-by-board-type`,
        {
          headers: { Authorization: `JWT ${jwt}` },
        },
      );

      const data = await statsRes.json();

      let totalWin = 0,
        totalDraw = 0,
        totalLoss = 0;

      data.forEach((mode) => {
        totalWin += mode.wins || 0;
        totalLoss += mode.losses || 0;
        totalDraw += mode.draws || 0;
      });

      const totalAll = totalWin + totalDraw + totalLoss;

      stats = {
        platform: "worldchess",
        total: {
          total: totalAll,
          win: totalWin,
          draw: totalDraw,
          loss: totalLoss,
          winRate: totalAll ? ((totalWin / totalAll) * 100).toFixed(1) : "0.0",
          drawRate: totalAll
            ? ((totalDraw / totalAll) * 100).toFixed(1)
            : "0.0",
          loseRate: totalAll
            ? ((totalLoss / totalAll) * 100).toFixed(1)
            : "0.0",
        },
      };
    }

    setBar(90, "Building summary…");
    await new Promise((r) => setTimeout(r, 300));
    setBar(100, "Done.");
    await new Promise((r) => setTimeout(r, 200));
  } catch (e) {
    Swal.fire({
      customClass: { popup: "swal-rederic" },
      title: "ChessHv3 Check",
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "Close",
      html: `${swalThemeCSS}
        <p style="color:#b84040;font-family:'Space Mono',monospace;font-size:12px;">
          Failed to fetch stats.<br>${e.message}
        </p>`,
    });
    return;
  }

  // ── UI stats block (design conservé) ──────────────────────────
  function statBlock(label, s) {
    const wr = parseFloat(s.winRate);
    const wrColor =
      wr >= 50 && wr <= 60 ? "#3a7d1e" : wr > 60 ? "#b84040" : "#8a7040";

    return `
      <div style="margin-bottom:10px;">
        <div style="
          font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;
          text-transform:uppercase;color:#b0a898;text-align:left;margin-bottom:7px;
        ">${label}</div>

        <div class="stats-grid">
          <div class="stat-card s-win">
            <span class="s-label">Won</span>
            <span class="s-value">${s.win}</span>
          </div>
          <div class="stat-card s-lost">
            <span class="s-label">Lost</span>
            <span class="s-value">${s.loss}</span>
          </div>
          <div class="stat-card s-draw">
            <span class="s-label">Draw</span>
            <span class="s-value">${s.draw}</span>
          </div>
          <div class="stat-card">
            <span class="s-label">Total</span>
            <span class="s-value">${s.total}</span>
          </div>
        </div>

        <div style="display:flex;height:5px;border-radius:99px;overflow:hidden;margin-bottom:6px;gap:2px;">
          <div style="flex:${s.winRate};background:#3a7d1e;"></div>
          <div style="flex:${s.drawRate};background:#8a7040;"></div>
          <div style="flex:${s.loseRate};background:#b84040;"></div>
        </div>

        <div style="
          font-family:'Space Mono',monospace;font-size:10px;
          color:${wrColor};
          background:${wrColor}18;
          border:1px solid ${wrColor}40;
          border-radius:6px;
          padding:5px 10px;
          text-align:center;
        ">
          win rate recommended: 50–60% · yours: <strong>${s.winRate}%</strong>
        </div>
      </div>
    `;
  }

  const platformLabel =
    stats.platform === "chess.com"
      ? "Σ Total (Chess.com)"
      : stats.platform === "lichess"
        ? "Σ Total (Lichess)"
        : "Σ Total (WorldChess)";

  const statsHTML = statBlock(platformLabel, stats.total);

  // ── Final popup ───────────────────────────────────────────────
  Swal.fire({
    customClass: { popup: "swal-rederic" },
    title: "ChessHv3 Check",
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    html: `
      ${swalThemeCSS}
      <div style="text-align:left;">
        ${statsHTML}
        <div style="
          font-family:'Space Mono',monospace;font-size:11px;color:#b0a898;
          text-align:center;margin-top:4px;
        ">
          Do you want to run the full analysis of your last 10 games?
        </div>
      </div>
    `,
  }).then((result) => {
    if (result.isConfirmed) {
      runAnalysis(username);
    }
  });
}

function showLoadingDialog() {
  Swal.fire({
    customClass: { popup: "swal-rederic" },
    title: "ChessHv3 Check",
    showConfirmButton: false,
    showCloseButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    focusConfirm: false,
    html: `
      ${swalThemeCSS}
      <div style="text-align:center; margin-bottom:6px;">
        <p style="font-size:13px; color:#7a7060; margin:0 0 4px;">
          Analyzing your last 10 games...
        </p>
      </div>
      <div class="chv3-loading-wrap">
        <div class="chv3-loading-label">
          <span id="chv3-step">Fetching games</span>
          <span id="chv3-pct">0%</span>
        </div>
        <div class="chv3-bar-track">
          <div class="chv3-bar-fill" id="chv3-bar"></div>
        </div>
        <div class="chv3-game-label" id="chv3-game-label">—</div>
      </div>
      <span class="swal-author" style="margin-top:10px;">red-Eric</span>
    `,
  });
}

function updateLoadingBar(percent, stepLabel, gameLabel) {
  const bar = document.getElementById("chv3-bar");
  const pct = document.getElementById("chv3-pct");
  const step = document.getElementById("chv3-step");
  const glbl = document.getElementById("chv3-game-label");
  if (bar) bar.style.width = percent + "%";
  if (pct) pct.textContent = Math.round(percent) + "%";
  if (step && stepLabel) step.textContent = stepLabel;
  if (glbl && gameLabel) glbl.textContent = gameLabel;
}

function showStatsDialog({ accuracy, win, lost, draw, safety }) {
  const badgeMap = {
    legit: `<span class="safety-badge badge-legit"><span class="dot dot-legit"></span>Legit</span>`,
    sus: `<span class="safety-badge badge-sus"><span class="dot dot-sus"></span>Sus</span>`,
    cheater: `<span class="safety-badge badge-cheater"><span class="dot dot-cheater"></span>Cheater</span>`,
  };

  Swal.fire({
    customClass: { popup: "swal-rederic" },
    title: "ChessHv3 Check",
    showCloseButton: true,
    confirmButtonText: "Done",
    focusConfirm: false,
    html: `
      ${swalThemeCSS}

      <div class="stats-grid">
        <div class="stat-card s-acc">
          <span class="s-label">Avg. Accuracy</span>
          <span class="s-value">${accuracy.toFixed(1)}%</span>
        </div>
        <div class="stat-card s-win">
          <span class="s-label">Win</span>
          <span class="s-value">${win}</span>
        </div>
        <div class="stat-card s-lost">
          <span class="s-label">Lost</span>
          <span class="s-value">${lost}</span>
        </div>
        <div class="stat-card s-draw">
          <span class="s-label">Draw</span>
          <span class="s-value">${draw}</span>
        </div>
      </div>

      <div class="safety-row">
        <div>
          <span class="s-label">Safety rating</span>
          <span style="font-family:'Space Mono',monospace;font-size:13px;font-weight:700;color:#7a7060;">
            Account status
          </span>
        </div>
        ${badgeMap[safety] ?? badgeMap.legit}
      </div>

      <div class="swal-footer-note">
        Legit = clean player &nbsp;·&nbsp; Sus = suspicious activity &nbsp;·&nbsp; Cheater = engine use detected.
      </div>
      <span class="swal-author">red-Eric</span>
    `,
  });
}

async function runAnalysis(username) {
  // Ouvre le dialog de chargement
  showLoadingDialog();

  try {
    // ── Étape 1 : Fetch PGN ──────────────────────────────────────────
    updateLoadingBar(5, "Fetching games...", "Connecting to API...");
    const games = await getLast10PGN(username);
    updateLoadingBar(15, "Games fetched", `${games.length} games found`);

    // ── Étape 2 : Init engine ─────────────────────────────────────────
    updateLoadingBar(18, "Starting engine", "Initializing Stockfish...");
    const engine = new AnalyzeEngine({ depth: config.depth });
    await engine.init();
    updateLoadingBar(22, "Engine ready", "Stockfish is running");

    // ── Étape 3 : Analyser chaque partie ─────────────────────────────
    let totalWhiteAcc = 0;
    let totalBlackAcc = 0;
    let win = 0,
      lost = 0,
      draw = 0;
    let accCount = 0;

    const uLower = username.toLowerCase();

    for (let i = 0; i < games.length; i++) {
      const gameInfo = games[i];
      const pct = 22 + (i / games.length) * 68;
      updateLoadingBar(
        pct,
        `Analyzing game ${i + 1} / ${games.length}`,
        `vs ${gameInfo.white.toLowerCase() === uLower ? gameInfo.black : gameInfo.white}`,
      );

      // Résultat W/L/D
      const res = extractResult(gameInfo, username);
      if (res === "win") win++;
      else if (res === "lost") lost++;
      else draw++;

      // FEN history depuis PGN
      const fenHistory = pgnToFenHistory(gameInfo.pgn);
      if (fenHistory.length < 2) continue;

      const isWhite = gameInfo.white.toLowerCase() === uLower;

      try {
        const result = await engine.update(fenHistory, {
          whiteElo: gameInfo.whiteElo,
          blackElo: gameInfo.blackElo,
        });

        if (result) {
          const acc = isWhite ? result.white.accuracy : result.black.accuracy;
          if (acc !== null && !isNaN(acc)) {
            totalWhiteAcc += acc;
            accCount++;
          }
        }
      } catch (e) {
        console.warn(`Game ${i + 1} analysis error:`, e);
      }
    }

    updateLoadingBar(92, "Finishing up", "Computing final stats...");
    engine.terminate();

    // ── Étape 4 : Calculer les stats finales ─────────────────────────
    const avgAccuracy = accCount > 0 ? totalWhiteAcc / accCount : 0;
    const safety = classifySafety(avgAccuracy, win, lost, draw);

    updateLoadingBar(100, "Done!", "Analysis complete");

    // Petit délai pour que la barre atteigne 100% visuellement
    await new Promise((r) => setTimeout(r, 600));

    // ── Étape 5 : Afficher les résultats ─────────────────────────────
    showStatsDialog({ accuracy: avgAccuracy, win, lost, draw, safety });
  } catch (err) {
    console.error("ChessHv3 analysis error:", err);
    Swal.fire({
      customClass: { popup: "swal-rederic" },
      title: "ChessHv3 Check",
      showCloseButton: true,
      confirmButtonText: "Close",
      html: `
        ${swalThemeCSS}
        <p style="font-family:'Space Mono',monospace;font-size:12px;color:#b84040;text-align:center;margin:10px 0;">
          ⚠ Analysis failed.<br>
          <span style="color:#b0a898;font-size:10px;">${err.message}</span>
        </p>
      `,
    });
  }
}

class AnalyzeEngine {
  constructor({ depth = config.depth } = {}) {
    this.depth = depth;
    this.engine = null;
    this._resolveEval = null;
    this._currentLines = [];
    this._cache = new Map();
    this._queue = [];
    this._running = false;
  }

  async init() {
    this.engine = await this._createWorker();
    await this._waitReady();
  }

  _createWorker() {
    return new Promise((resolve, reject) => {
      try {
        const blob = new Blob([stockfishCode], {
          type: "application/javascript",
        });
        const blobUrl = URL.createObjectURL(blob);
        const worker = new Worker(blobUrl);
        URL.revokeObjectURL(blobUrl);
        resolve(worker);
      } catch (e) {
        reject(new Error("Failed to create Stockfish worker: " + e.message));
      }
    });
  }

  _waitReady() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Stockfish readyok timeout")),
        10000,
      );
      const originalOnMessage = this.engine.onmessage;
      this.engine.onmessage = (e) => {
        if (e.data === "readyok") {
          clearTimeout(timeout);
          this.engine.onmessage = (ev) => this._handleMessage(ev.data);
          resolve();
          return;
        }
        originalOnMessage?.(e);
      };
      this.engine.postMessage("uci");
      this.engine.postMessage("ucinewgame");
      this.engine.postMessage("isready");
    });
  }

  terminate() {
    this.engine?.terminate();
    this.engine = null;
  }

  reset() {
    this._cache.clear();
    this._queue = [];
    this._running = false;
  }

  async update(fenHistory, { whiteElo, blackElo, onProgress } = {}) {
    if (fenHistory.length < 2) return;
    const newFens = fenHistory.filter((fen) => !this._cache.has(fen));
    if (newFens.length > 0) {
      await this._enqueueAndWait(newFens, () => {
        onProgress?.(this._cache.size / fenHistory.length);
      });
    }
    const positions = fenHistory.map((fen) => this._cache.get(fen));
    const withPlayed = this._attachPlayedMoves(positions, fenHistory);
    const classified = this._classifyMoves(withPlayed);
    const {
      white: whiteAcc,
      black: blackAcc,
      movesAccuracy,
    } = this._computeAccuracy(classified);
    const eloEst = this._computeEstimatedElo(classified, whiteElo, blackElo);
    const moves = classified.slice(1).map((pos, i) => ({
      moveIndex: i + 1,
      isWhite: i % 2 === 0,
      moveNumber: Math.ceil((i + 1) / 2),
      // classification: pos.moveClassification,
      accuracy: movesAccuracy[i] ?? null,
      winPercent: this._getPositionWinPercentage(pos),
      cp: pos.lines[0]?.cp ?? null,
      mate: pos.lines[0]?.mate ?? null,
    }));
    return {
      white: {
        accuracy: parseFloat(whiteAcc.toFixed(1)),
        elo: eloEst?.white ?? null,
        acpl: eloEst?.whiteCpl ?? null,
      },
      black: {
        accuracy: parseFloat(blackAcc.toFixed(1)),
        elo: eloEst?.black ?? null,
        acpl: eloEst?.blackCpl ?? null,
      },
      moves,
      cached: fenHistory.length - newFens.length,
      computed: newFens.length,
    };
  }

  _enqueueAndWait(fens, onEach) {
    for (const fen of fens) {
      if (!this._cache.has(fen) && !this._queue.includes(fen)) {
        this._queue.push(fen);
      }
    }
    if (this._running) return this._waitUntilCached(fens);
    return this._drainQueue(onEach);
  }

  async _drainQueue(onEach) {
    this._running = true;
    while (this._queue.length > 0) {
      const fen = this._queue.shift();
      if (this._cache.has(fen)) continue;
      const result = await this._evalPosition(fen);
      this._cache.set(fen, result);
      onEach?.(fen);
    }
    this._running = false;
  }

  _waitUntilCached(fens) {
    return new Promise((resolve) => {
      const check = () => {
        if (fens.every((f) => this._cache.has(f))) resolve();
        else setTimeout(check, 50);
      };
      check();
    });
  }

  _handleMessage(msg) {
    if (msg.startsWith("info") && msg.includes(" pv ")) {
      const depthMatch = msg.match(/\bdepth (\d+)/);
      const multiPvMatch = msg.match(/\bmultipv (\d+)/);
      const cpMatch = msg.match(/\bscore cp (-?\d+)/);
      const mateMatch = msg.match(/\bscore mate (-?\d+)/);
      const pvMatch = msg.match(/ pv (.+)/);
      if (!depthMatch || !multiPvMatch || !pvMatch) return;
      const multiPv = parseInt(multiPvMatch[1]);
      const pv = pvMatch[1].trim().split(" ");
      const line = { pv, depth: parseInt(depthMatch[1]), multiPv };
      if (cpMatch) line.cp = parseInt(cpMatch[1]);
      if (mateMatch) line.mate = parseInt(mateMatch[1]);
      this._currentLines[multiPv - 1] = line;
    }
    if (msg.startsWith("bestmove")) {
      const bestMove = msg.split(" ")[1];
      if (this._resolveEval) {
        this._resolveEval({
          lines: this._currentLines.filter(Boolean),
          bestMove,
        });
        this._resolveEval = null;
      }
    }
  }

  _evalPosition(fen) {
    return new Promise((resolve) => {
      this._currentLines = [];
      const whiteToPlay = fen.split(" ")[1] === "w";
      this._resolveEval = (result) => {
        if (!whiteToPlay) {
          result.lines = result.lines.map((line) => ({
            ...line,
            cp: line.cp !== undefined ? -line.cp : line.cp,
            mate: line.mate !== undefined ? -line.mate : line.mate,
          }));
        }
        resolve(result);
      };
      this.engine.postMessage(`position fen ${fen}`);
      this.engine.postMessage(`setoption name MultiPV value 2`);
      this.engine.postMessage(`go depth ${this.depth}`);
    });
  }

  _attachPlayedMoves(positions, fenHistory) {
    const hasChessJs = typeof Chess !== "undefined";
    return positions.map((pos, i) => {
      if (i === 0) return { ...pos, playedWasBest: false };
      const fenBase = fenHistory[i].split(" ")[0];
      const isBook = typeof BOOKS !== "undefined" && BOOKS.includes(fenBase);
      if (isBook) return { ...pos, playedWasBest: false, isBook: true };
      const prevBestMove = positions[i - 1]?.bestMove;
      if (!hasChessJs || !prevBestMove) return { ...pos, playedWasBest: false };
      try {
        const chess = new Chess(fenHistory[i - 1]);
        chess.move({
          from: prevBestMove.slice(0, 2),
          to: prevBestMove.slice(2, 4),
          promotion: prevBestMove[4] || undefined,
        });
        const fenAfterBest = chess.fen().split(" ").slice(0, 4).join(" ");
        const actualFen = fenHistory[i].split(" ").slice(0, 4).join(" ");
        return { ...pos, playedWasBest: fenAfterBest === actualFen };
      } catch {
        return { ...pos, playedWasBest: false };
      }
    });
  }

  _classifyMoves(positions) {
    const positionsWP = positions.map((p) => this._getPositionWinPercentage(p));
    return positions.map((pos, index) => {
      if (index === 0) return { ...pos, moveClassification: null };
      if (pos.isBook)
        return { ...pos, moveClassification: MoveClassification.Book };
      const prevPos = positions[index - 1];
      const isWhite = index % 2 === 1;
      const lastWP = positionsWP[index - 1];
      const wp = positionsWP[index];
      const isBestMove = pos.playedWasBest;
      const wpLoss = (lastWP - wp) * (isWhite ? 1 : -1);
      const altLine = prevPos.lines[1];
      const altWP = altLine ? this._getLineWinPercentage(altLine) : undefined;
      if (prevPos.lines.length === 1)
        return { ...pos, moveClassification: MoveClassification.Forced };
      if (isBestMove) {
        if (altWP !== undefined) {
          const gap = (wp - altWP) * (isWhite ? 1 : -1);
          if (gap >= 10)
            return { ...pos, moveClassification: MoveClassification.Brilliant };
          if (gap >= 5)
            return { ...pos, moveClassification: MoveClassification.Great };
        }
        return { ...pos, moveClassification: MoveClassification.Best };
      }
      if (wpLoss > 20)
        return { ...pos, moveClassification: MoveClassification.Blunder };
      if (wpLoss > 10) {
        const isMiss =
          altWP !== undefined ? (altWP - wp) * (isWhite ? 1 : -1) > 20 : false;
        return {
          ...pos,
          moveClassification: isMiss
            ? MoveClassification.Miss
            : MoveClassification.Mistake,
        };
      }
      if (wpLoss > 5)
        return { ...pos, moveClassification: MoveClassification.Inaccuracy };
      if (wpLoss <= 2)
        return { ...pos, moveClassification: MoveClassification.Excellent };
      return { ...pos, moveClassification: MoveClassification.Good };
    });
  }

  _computeAccuracy(positions) {
    const wp = positions.map((p) => this._getPositionWinPercentage(p));
    const weights = this._getAccuracyWeights(wp);
    const movesAccuracy = this._getMovesAccuracy(wp);
    return {
      white: this._getPlayerAccuracy(movesAccuracy, weights, "white"),
      black: this._getPlayerAccuracy(movesAccuracy, weights, "black"),
      movesAccuracy,
    };
  }

  _getPlayerAccuracy(movesAccuracy, weights, player) {
    const rem = player === "white" ? 0 : 1;
    const accs = movesAccuracy.filter((_, i) => i % 2 === rem);
    const wts = weights.filter((_, i) => i % 2 === rem);
    if (accs.length === 0) return 100;
    const wm = this._weightedMean(accs, wts);
    const hm = this._harmonicMean(accs.map((a) => Math.max(a, 10)));
    return (wm + hm) / 2;
  }

  _getAccuracyWeights(movesWP) {
    const windowSize = this._clamp(Math.ceil(movesWP.length / 10), 2, 8);
    const half = Math.round(windowSize / 2);
    const windows = [];
    for (let i = 1; i < movesWP.length; i++) {
      const s = i - half,
        e = i + half;
      if (s < 0) windows.push(movesWP.slice(0, windowSize));
      else if (e > movesWP.length) windows.push(movesWP.slice(-windowSize));
      else windows.push(movesWP.slice(s, e));
    }
    return windows.map((w) => this._clamp(this._stdDev(w), 0.5, 12));
  }

  _getMovesAccuracy(movesWP) {
    return movesWP.slice(1).map((wp, idx) => {
      const last = movesWP[idx];
      const isWhite = idx % 2 === 0;
      const diff = isWhite ? Math.max(0, last - wp) : Math.max(0, wp - last);
      const raw =
        103.1668100711649 * Math.exp(-0.04354415386753951 * diff) -
        3.166924740191411;
      return Math.min(100, Math.max(0, raw + 1));
    });
  }

  _computeEstimatedElo(positions, whiteElo, blackElo) {
    if (positions.length < 2) return null;
    let prevCp = this._getPositionCp(positions[0]);
    let wLoss = 0,
      bLoss = 0;
    positions.slice(1).forEach((pos, i) => {
      const cp = this._getPositionCp(pos);
      if (i % 2 === 0) wLoss += cp > prevCp ? 0 : Math.min(prevCp - cp, 1000);
      else bLoss += cp < prevCp ? 0 : Math.min(cp - prevCp, 1000);
      prevCp = cp;
    });
    const n = positions.length - 1;
    const whiteCpl = wLoss / Math.ceil(n / 2);
    const blackCpl = bLoss / Math.floor(n / 2);
    return {
      white: Math.round(
        this._eloFromRatingAndCpl(whiteCpl, whiteElo ?? blackElo),
      ),
      black: Math.round(
        this._eloFromRatingAndCpl(blackCpl, blackElo ?? whiteElo),
      ),
      whiteCpl: Math.round(whiteCpl),
      blackCpl: Math.round(blackCpl),
    };
  }

  _eloFromAcpl(acpl) {
    return 3100 * Math.exp(-0.01 * acpl);
  }
  _acplFromElo(elo) {
    return -100 * Math.log(Math.min(elo, 3100) / 3100);
  }
  _eloFromRatingAndCpl(cpl, rating) {
    const base = this._eloFromAcpl(cpl);
    if (!rating) return base;
    const diff = cpl - this._acplFromElo(rating);
    if (diff === 0) return base;
    return diff > 0
      ? rating * Math.exp(-0.005 * diff)
      : rating / Math.exp(0.005 * diff);
  }

  _getWinPercentageFromCp(cp) {
    const c = this._clamp(cp, -1000, 1000);
    return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * c)) - 1);
  }
  _getLineWinPercentage(line) {
    if (line.cp !== undefined) return this._getWinPercentageFromCp(line.cp);
    if (line.mate !== undefined) return line.mate > 0 ? 100 : 0;
    throw new Error("No cp or mate in line");
  }
  _getPositionWinPercentage(pos) {
    return this._getLineWinPercentage(pos.lines[0]);
  }
  _getPositionCp(pos) {
    const l = pos.lines[0];
    if (l.cp !== undefined) return this._clamp(l.cp, -1000, 1000);
    if (l.mate !== undefined) return l.mate > 0 ? 1000 : -1000;
    throw new Error("No cp or mate");
  }

  _clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }
  _harmonicMean(arr) {
    return arr.length / arr.reduce((s, v) => s + 1 / v, 0);
  }
  _weightedMean(arr, w) {
    return (
      arr.reduce((s, v, i) => s + v * w[i], 0) /
      w.slice(0, arr.length).reduce((a, b) => a + b, 0)
    );
  }
  _stdDev(arr) {
    const m = arr.reduce((a, b) => a + b) / arr.length;
    return Math.sqrt(
      arr.map((x) => (x - m) ** 2).reduce((a, b) => a + b) / arr.length,
    );
  }
}

let debugEngine = false;

function randomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    result += chars[index];
  }

  return result;
}

let url = window.location.href;
const classMoveClassification = "keokodd";
const BrillantSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="Brilliant">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#26c2a3" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M12.57,14.6a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0L10,14.84A.41.41,0,0,1,10,14.6V12.7a.32.32,0,0,1,.09-.23.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H10.35a.31.31,0,0,1-.34-.31L9.86,3.9A.36.36,0,0,1,10,3.66a.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H12.3a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
      <path d="M8.07,14.6a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.7a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13ZM8,10.67a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H5.85a.31.31,0,0,1-.34-.31L5.36,3.9a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H7.8a.35.35,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M12.57,14.1a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0L10,14.34A.41.41,0,0,1,10,14.1V12.2A.32.32,0,0,1,10,12a.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H10.35a.31.31,0,0,1-.34-.31L9.86,3.4A.36.36,0,0,1,10,3.16a.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H12.3a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
      <path class="icon-component" fill="#fff" d="M8.07,14.1a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.2a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2A.31.31,0,0,1,8,12a.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13ZM8,10.17a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H5.85a.31.31,0,0,1-.34-.31L5.36,3.4a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H7.8a.35.35,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
    </g>
  </g>
    </svg>`;

const forcedSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="forced">
    <g id="fast_win">
      <g>
        <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
        <path class="icon-background" fill="#96af8b" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
      </g>
    </g>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M14.39,9.07,9,4.31a.31.31,0,0,0-.3,0,.32.32,0,0,0-.13.1.29.29,0,0,0,0,.16V7.42H3.9a.58.58,0,0,0-.19,0,.5.5,0,0,0-.17.11.91.91,0,0,0-.11.16.63.63,0,0,0,0,.19v3.41a.58.58,0,0,0,0,.19.64.64,0,0,0,.11.16.39.39,0,0,0,.17.11.41.41,0,0,0,.19,0H8.5v2.74a.26.26,0,0,0,.16.26.3.3,0,0,0,.16,0A.34.34,0,0,0,9,14.79L14.39,10a.69.69,0,0,0,.16-.22.7.7,0,0,0,0-.52A.69.69,0,0,0,14.39,9.07Z"></path>
    </g>
    <path class="icon-component" fill="#fff" d="M14.39,8.57,9,3.81a.31.31,0,0,0-.3,0,.32.32,0,0,0-.13.1A.29.29,0,0,0,8.5,4V6.92H3.9a.58.58,0,0,0-.19,0,.5.5,0,0,0-.17.11.91.91,0,0,0-.11.16.63.63,0,0,0,0,.19v3.41a.58.58,0,0,0,0,.19.64.64,0,0,0,.11.16.39.39,0,0,0,.17.11.41.41,0,0,0,.19,0H8.5v2.74a.26.26,0,0,0,.16.26.3.3,0,0,0,.16,0A.34.34,0,0,0,9,14.29l5.42-4.76a.69.69,0,0,0,.16-.22.7.7,0,0,0,0-.52A.69.69,0,0,0,14.39,8.57Z"></path>
  </g>
    </svg>`;

const greatMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="great_find">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#749BBF" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g>
      <g class="icon-component-shadow" opacity="0.2">
        <path d="M10.32,14.6a.27.27,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0H8l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.7a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H8.1a.31.31,0,0,1-.34-.31L7.61,3.9a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0h2.11a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
      </g>
      <path class="icon-component" fill="#fff" d="M10.32,14.1a.27.27,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0H8l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.2a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H8.1a.31.31,0,0,1-.34-.31L7.61,3.4a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0h2.11a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
    </g>
  </g>
    </svg>`;

const bookSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="book">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#D5A47D" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g>
      <path class="icon-component-shadow" opacity="0.3" isolation="isolate" d="M8.45,5.9c-1-.75-2.51-1.09-4.83-1.09H2.54v8.71H3.62a8.16,8.16,0,0,1,4.83,1.17Z"></path>
      <path class="icon-component-shadow" opacity="0.3" isolation="isolate" d="M9.54,14.69a8.14,8.14,0,0,1,4.84-1.17h1.08V4.81H14.38c-2.31,0-3.81.34-4.84,1.09Z"></path>
      <path class="icon-component" fill="#fff" d="M8.45,5.4c-1-.75-2.51-1.09-4.83-1.09H3V13h.58a8.09,8.09,0,0,1,4.83,1.17Z"></path>
      <path class="icon-component" fill="#fff" d="M9.54,14.19A8.14,8.14,0,0,1,14.38,13H15V4.31h-.58c-2.31,0-3.81.34-4.84,1.09Z"></path>
    </g>
  </g>
    </svg>`;

const bestMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="best">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#81B64C" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <path class="icon-component-shadow" opacity="0.2" d="M9,3.43a.5.5,0,0,0-.27.08.46.46,0,0,0-.17.22L7.24,7.17l-3.68.19a.52.52,0,0,0-.26.1.53.53,0,0,0-.16.23.45.45,0,0,0,0,.28.44.44,0,0,0,.15.23l2.86,2.32-1,3.56a.45.45,0,0,0,0,.28.46.46,0,0,0,.17.22.41.41,0,0,0,.26.09.43.43,0,0,0,.27-.08l3.09-2,3.09,2a.46.46,0,0,0,.53,0,.46.46,0,0,0,.17-.22.53.53,0,0,0,0-.28l-1-3.56L14.71,8.2A.44.44,0,0,0,14.86,8a.45.45,0,0,0,0-.28.53.53,0,0,0-.16-.23.52.52,0,0,0-.26-.1l-3.68-.2L9.44,3.73a.46.46,0,0,0-.17-.22A.5.5,0,0,0,9,3.43Z"></path>
    <path class="icon-component" fill="#fff" d="M9,2.93A.5.5,0,0,0,8.73,3a.46.46,0,0,0-.17.22L7.24,6.67l-3.68.19A.52.52,0,0,0,3.3,7a.53.53,0,0,0-.16.23.45.45,0,0,0,0,.28.44.44,0,0,0,.15.23L6.15,10l-1,3.56a.45.45,0,0,0,0,.28.46.46,0,0,0,.17.22.41.41,0,0,0,.26.09.43.43,0,0,0,.27-.08l3.09-2,3.09,2a.46.46,0,0,0,.53,0,.46.46,0,0,0,.17-.22.53.53,0,0,0,0-.28l-1-3.56L14.71,7.7a.44.44,0,0,0,.15-.23.45.45,0,0,0,0-.28A.53.53,0,0,0,14.7,7a.52.52,0,0,0-.26-.1l-3.68-.2L9.44,3.23A.46.46,0,0,0,9.27,3,.5.5,0,0,0,9,2.93Z"></path>
  </g>
    </svg>`;

const excellentMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="excellent">
    <g>
      <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
      <path class="icon-background" fill="#81B64C" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    </g>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M13.79,11.34c0-.2.4-.53.4-.94S14,9.72,14,9.58a2.06,2.06,0,0,0,.18-.83,1,1,0,0,0-.3-.69,1.13,1.13,0,0,0-.55-.2,10.29,10.29,0,0,1-2.07,0c-.37-.23,0-1.18.18-1.7S11.9,4,10.62,3.7c-.69-.17-.66.37-.78.9-.05.21-.09.43-.13.57A5,5,0,0,1,7.05,8.23a1.57,1.57,0,0,1-.42.18v4.94A7.23,7.23,0,0,1,8,13.53c.52.12.91.25,1.44.33A11.11,11.11,0,0,0,11,14a6.65,6.65,0,0,0,1.18,0,1.09,1.09,0,0,0,1-.59.66.66,0,0,0,.06-.2,1.63,1.63,0,0,1,.07-.3c.13-.28.37-.3.5-.68S13.74,11.53,13.79,11.34Z"></path>
      <path d="M5.49,8.09H4.31a.5.5,0,0,0-.5.5v4.56a.5.5,0,0,0,.5.5H5.49a.5.5,0,0,0,.5-.5V8.59A.5.5,0,0,0,5.49,8.09Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M13.79,10.84c0-.2.4-.53.4-.94S14,9.22,14,9.08a2.06,2.06,0,0,0,.18-.83,1,1,0,0,0-.3-.69,1.13,1.13,0,0,0-.55-.2,10.29,10.29,0,0,1-2.07,0c-.37-.23,0-1.18.18-1.7s.51-2.12-.77-2.43c-.69-.17-.66.37-.78.9-.05.21-.09.43-.13.57A5,5,0,0,1,7.05,7.73a1.57,1.57,0,0,1-.42.18v4.94A7.23,7.23,0,0,1,8,13c.52.12.91.25,1.44.33a11.11,11.11,0,0,0,1.62.16,6.65,6.65,0,0,0,1.18,0,1.09,1.09,0,0,0,1-.59.66.66,0,0,0,.06-.2,1.63,1.63,0,0,1,.07-.3c.13-.28.37-.3.5-.68S13.74,11,13.79,10.84Z"></path>
      <path class="icon-component" fill="#fff" d="M5.49,7.59H4.31a.5.5,0,0,0-.5.5v4.56a.5.5,0,0,0,.5.5H5.49a.5.5,0,0,0,.5-.5V8.09A.5.5,0,0,0,5.49,7.59Z"></path>
    </g>
  </g>
    </svg>`;

const goodMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="good">
    <g>
      <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
      <path class="icon-background" fill="#95b776" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    </g>
    <g>
      <path class="icon-component-shadow" opacity="0.2" d="M15.11,6.81,9.45,12.47,7.79,14.13a.39.39,0,0,1-.28.11.39.39,0,0,1-.27-.11L2.89,9.78a.39.39,0,0,1-.11-.28.39.39,0,0,1,.11-.27L4.28,7.85a.34.34,0,0,1,.12-.09l.15,0a.37.37,0,0,1,.15,0,.38.38,0,0,1,.13.09l2.69,2.68,5.65-5.65a.38.38,0,0,1,.13-.09.37.37,0,0,1,.15,0,.4.4,0,0,1,.15,0,.34.34,0,0,1,.12.09l1.39,1.38a.41.41,0,0,1,.08.13.33.33,0,0,1,0,.15.4.4,0,0,1,0,.15A.5.5,0,0,1,15.11,6.81Z"></path>
      <path class="icon-component" fill="#fff" d="M15.11,6.31,9.45,12,7.79,13.63a.39.39,0,0,1-.28.11.39.39,0,0,1-.27-.11L2.89,9.28A.39.39,0,0,1,2.78,9a.39.39,0,0,1,.11-.27L4.28,7.35a.34.34,0,0,1,.12-.09l.15,0a.37.37,0,0,1,.15,0,.38.38,0,0,1,.13.09L7.52,10l5.65-5.65a.38.38,0,0,1,.13-.09.37.37,0,0,1,.15,0,.4.4,0,0,1,.15,0,.34.34,0,0,1,.12.09l1.39,1.38a.41.41,0,0,1,.08.13.33.33,0,0,1,0,.15.4.4,0,0,1,0,.15A.5.5,0,0,1,15.11,6.31Z"></path>
    </g>
  </g>
    </svg>`;

const inaccuracyMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="inaccuracy">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#F7C631" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M13.66,14.8a.28.28,0,0,1,0,.13.23.23,0,0,1-.08.11.28.28,0,0,1-.11.08l-.12,0h-2l-.13,0a.27.27,0,0,1-.1-.08A.36.36,0,0,1,11,14.8V12.9a.59.59,0,0,1,0-.13.36.36,0,0,1,.07-.1l.1-.08.13,0h2a.33.33,0,0,1,.23.1.39.39,0,0,1,.08.1.28.28,0,0,1,0,.13Zm-.12-3.93a.31.31,0,0,1,0,.13.3.3,0,0,1-.07.1.3.3,0,0,1-.23.08H11.43a.31.31,0,0,1-.34-.31L10.94,4.1A.5.5,0,0,1,11,3.86l.11-.08.13,0h2.11a.35.35,0,0,1,.26.1.41.41,0,0,1,.08.24Z"></path>
      <path d="M7.65,14.82a.27.27,0,0,1,0,.12.26.26,0,0,1-.07.11l-.1.07-.13,0H5.43a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V13a.36.36,0,0,1,.09-.23l.1-.07.12,0H7.32a.32.32,0,0,1,.23.09.3.3,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73A5.58,5.58,0,0,1,9,9a4.85,4.85,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7V11a.21.21,0,0,1,0,.12.17.17,0,0,1-.06.1.23.23,0,0,1-.1.07l-.12,0H5.53a.21.21,0,0,1-.12,0,.18.18,0,0,1-.1-.07.2.2,0,0,1-.08-.1.37.37,0,0,1,0-.12v-.35a2.68,2.68,0,0,1,.13-.84,2.91,2.91,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.84,7.84,0,0,0,.65-.64,1,1,0,0,0,.25-.67.77.77,0,0,0-.07-.34.67.67,0,0,0-.23-.27A1.16,1.16,0,0,0,6.49,6,1.61,1.61,0,0,0,6,6.11a3,3,0,0,0-.41.18,1.75,1.75,0,0,0-.29.18l-.11.09A.5.5,0,0,1,5,6.62a.31.31,0,0,1-.21-.13l-1-1.21a.3.3,0,0,1,0-.4A1.36,1.36,0,0,1,4,4.68a3.07,3.07,0,0,1,.56-.38,5.49,5.49,0,0,1,.9-.37,3.69,3.69,0,0,1,1.19-.17,3.92,3.92,0,0,1,2.3.75,2.85,2.85,0,0,1,.77.92A2.82,2.82,0,0,1,10,6.71,3,3,0,0,1,9.85,7.65Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M13.66,14.3a.28.28,0,0,1,0,.13.23.23,0,0,1-.08.11.28.28,0,0,1-.11.08l-.12,0h-2l-.13,0a.27.27,0,0,1-.1-.08A.36.36,0,0,1,11,14.3V12.4a.59.59,0,0,1,0-.13.36.36,0,0,1,.07-.1l.1-.08.13,0h2a.33.33,0,0,1,.23.1.39.39,0,0,1,.08.1.28.28,0,0,1,0,.13Zm-.12-3.93a.31.31,0,0,1,0,.13.3.3,0,0,1-.07.1.3.3,0,0,1-.23.08H11.43a.31.31,0,0,1-.34-.31L10.94,3.6A.5.5,0,0,1,11,3.36l.11-.08.13,0h2.11a.35.35,0,0,1,.26.1.41.41,0,0,1,.08.24Z"></path>
      <path class="icon-component" fill="#fff" d="M7.65,14.32a.27.27,0,0,1,0,.12.26.26,0,0,1-.07.11l-.1.07-.13,0H5.43a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V12.49a.36.36,0,0,1,.09-.23l.1-.07.12,0H7.32a.32.32,0,0,1,.23.09.3.3,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6A4.85,4.85,0,0,1,8.48,9a8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.21.21,0,0,1,0,.12.17.17,0,0,1-.06.1.23.23,0,0,1-.1.07l-.12,0H5.53a.21.21,0,0,1-.12,0,.18.18,0,0,1-.1-.07.2.2,0,0,1-.08-.1.37.37,0,0,1,0-.12v-.35a2.68,2.68,0,0,1,.13-.84,2.91,2.91,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.84,7.84,0,0,0,.65-.64,1,1,0,0,0,.25-.67.77.77,0,0,0-.07-.34.67.67,0,0,0-.23-.27,1.16,1.16,0,0,0-.72-.24A1.61,1.61,0,0,0,6,5.61a3,3,0,0,0-.41.18A1.75,1.75,0,0,0,5.3,6l-.11.09A.5.5,0,0,1,5,6.12.31.31,0,0,1,4.74,6l-1-1.21a.3.3,0,0,1,0-.4A1.36,1.36,0,0,1,4,4.18a3.07,3.07,0,0,1,.56-.38,5.49,5.49,0,0,1,.9-.37,3.69,3.69,0,0,1,1.19-.17A3.92,3.92,0,0,1,8.93,4a2.85,2.85,0,0,1,.77.92A2.82,2.82,0,0,1,10,6.21,3,3,0,0,1,9.85,7.15Z"></path>
    </g>
  </g>
    </svg>`;

const mistakeSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="mistake">
    <g>
      <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
      <path class="icon-background" fill="#FFA459" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    </g>
    <g>
      <g class="icon-component-shadow" opacity="0.2">
        <path d="M9.92,15a.27.27,0,0,1,0,.12.41.41,0,0,1-.07.11.32.32,0,0,1-.23.09H7.7a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08A.31.31,0,0,1,7.39,15V13.19A.32.32,0,0,1,7.48,13l.1-.07.12,0H9.59a.32.32,0,0,1,.23.09.61.61,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6,6,6,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.24.24,0,0,1,0,.12.17.17,0,0,1-.06.1.3.3,0,0,1-.1.07l-.12,0H7.79l-.12,0a.3.3,0,0,1-.1-.07.26.26,0,0,1-.07-.1.37.37,0,0,1,0-.12v-.35A2.42,2.42,0,0,1,7.61,10a2.55,2.55,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.73,7.73,0,0,0,.64-.64,1,1,0,0,0,.26-.67.77.77,0,0,0-.07-.34.75.75,0,0,0-.23-.27,1.16,1.16,0,0,0-.72-.24,1.61,1.61,0,0,0-.49.07,3,3,0,0,0-.41.18,1.41,1.41,0,0,0-.29.18l-.11.09a.5.5,0,0,1-.24.06A.31.31,0,0,1,7,6.69L6,5.48a.29.29,0,0,1,0-.4,1.36,1.36,0,0,1,.21-.2,3.07,3.07,0,0,1,.56-.38,5.38,5.38,0,0,1,.89-.37A3.75,3.75,0,0,1,8.9,4a4.07,4.07,0,0,1,1.2.19,4,4,0,0,1,1.09.56,2.76,2.76,0,0,1,.78.92,2.82,2.82,0,0,1,.28,1.28A3,3,0,0,1,12.12,7.85Z"></path>
      </g>
      <path class="icon-component" fill="#fff" d="M9.92,14.52a.27.27,0,0,1,0,.12.41.41,0,0,1-.07.11.32.32,0,0,1-.23.09H7.7a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V12.69a.32.32,0,0,1,.09-.23l.1-.07.12,0H9.59a.32.32,0,0,1,.23.09.61.61,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6,6,6,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.24.24,0,0,1,0,.12.17.17,0,0,1-.06.1.3.3,0,0,1-.1.07l-.12,0H7.79l-.12,0a.3.3,0,0,1-.1-.07.26.26,0,0,1-.07-.1.37.37,0,0,1,0-.12v-.35a2.42,2.42,0,0,1,.13-.84,2.55,2.55,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.73,7.73,0,0,0,.64-.64,1,1,0,0,0,.26-.67.77.77,0,0,0-.07-.34A.75.75,0,0,0,9.48,6a1.16,1.16,0,0,0-.72-.24,1.61,1.61,0,0,0-.49.07A3,3,0,0,0,7.86,6a1.41,1.41,0,0,0-.29.18l-.11.09a.5.5,0,0,1-.24.06A.31.31,0,0,1,7,6.19L6,5a.29.29,0,0,1,0-.4,1.36,1.36,0,0,1,.21-.2A3.07,3.07,0,0,1,6.81,4a5.38,5.38,0,0,1,.89-.37,3.75,3.75,0,0,1,1.2-.17,4.07,4.07,0,0,1,1.2.19,4,4,0,0,1,1.09.56,2.76,2.76,0,0,1,.78.92,2.82,2.82,0,0,1,.28,1.28A3,3,0,0,1,12.12,7.35Z"></path>
    </g>
  </g>
    </svg>`;

const missSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <defs><style>.cls-1{fill:#f1f2f2;}.cls-2{fill:#FF7769;}.cls-3{opacity:.2;}.cls-4{opacity:.3;}</style></defs><g id="incorrect"><path class="cls-4" d="M9,.5C4.03,.5,0,4.53,0,9.5s4.03,9,9,9,9-4.03,9-9S13.97,.5,9,.5Z"></path><path class="cls-2" d="M9,0C4.03,0,0,4.03,0,9s4.03,9,9,9,9-4.03,9-9S13.97,0,9,0Z"></path><g class="cls-3"><path d="M13.99,12.51s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-1.37,1.37s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-3.06-3.06-3.06,3.06s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-1.37-1.37c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l3.06-3.06-3.06-3.06c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l1.37-1.37c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l3.06,3.06,3.06-3.06c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l1.37,1.37s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-3.06,3.06,3.06,3.06Z"></path></g><path class="cls-1" d="M13.99,12.01s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-1.37,1.37s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-3.06-3.06-3.06,3.06s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-1.37-1.37c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l3.06-3.06-3.06-3.06c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l1.37-1.37c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l3.06,3.06,3.06-3.06c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l1.37,1.37s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-3.06,3.06,3.06,3.06Z"></path></g>
    </svg>`;

const blunderSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="blunder">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#FA412D" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M14.74,5.45A2.58,2.58,0,0,0,14,4.54,3.76,3.76,0,0,0,12.89,4a4.07,4.07,0,0,0-1.2-.19A3.92,3.92,0,0,0,10.51,4a5.87,5.87,0,0,0-.9.37,3,3,0,0,0-.32.2,3.46,3.46,0,0,1,.42.63,3.29,3.29,0,0,1,.36,1.47.31.31,0,0,0,.19-.06l.11-.08a2.9,2.9,0,0,1,.29-.19,3.89,3.89,0,0,1,.41-.17,1.55,1.55,0,0,1,.48-.07,1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26.8.8,0,0,1,.07.34,1,1,0,0,1-.25.67,7.71,7.71,0,0,1-.65.63,6.2,6.2,0,0,0-.48.43,2.93,2.93,0,0,0-.45.54,2.55,2.55,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83V11a.24.24,0,0,0,0,.12.35.35,0,0,0,.17.17l.12,0h1.71l.12,0a.23.23,0,0,0,.1-.07.21.21,0,0,0,.06-.1.27.27,0,0,0,0-.12V10.8a1,1,0,0,1,.26-.7q.27-.28.66-.63A5.79,5.79,0,0,0,14.05,9a4.51,4.51,0,0,0,.48-.6,2.56,2.56,0,0,0,.36-.72,2.81,2.81,0,0,0,.14-1A2.66,2.66,0,0,0,14.74,5.45Z"></path>
      <path d="M12.38,12.65H10.5l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0h1.88a.24.24,0,0,0,.12,0,.26.26,0,0,0,.11-.07.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V13a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,12.38,12.65Z"></path>
      <path d="M6.79,12.65H4.91l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0H6.79a.24.24,0,0,0,.12,0A.26.26,0,0,0,7,15a.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V13a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,6.79,12.65Z"></path>
      <path d="M8.39,4.54A3.76,3.76,0,0,0,7.3,4a4.07,4.07,0,0,0-1.2-.19A3.92,3.92,0,0,0,4.92,4a5.87,5.87,0,0,0-.9.37,3.37,3.37,0,0,0-.55.38l-.21.19a.32.32,0,0,0,0,.41l1,1.2a.26.26,0,0,0,.2.12.48.48,0,0,0,.24-.06l.11-.08a2.9,2.9,0,0,1,.29-.19l.4-.17A1.66,1.66,0,0,1,6,6.06a1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26A.77.77,0,0,1,7,6.9a1,1,0,0,1-.26.67,7.6,7.6,0,0,1-.64.63,6.28,6.28,0,0,0-.49.43,2.93,2.93,0,0,0-.45.54,2.72,2.72,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83V11a.43.43,0,0,0,0,.12.39.39,0,0,0,.08.1.18.18,0,0,0,.1.07.21.21,0,0,0,.12,0H6.72l.12,0a.23.23,0,0,0,.1-.07.36.36,0,0,0,.07-.1A.5.5,0,0,0,7,11V10.8a1,1,0,0,1,.27-.7A8,8,0,0,1,8,9.47c.18-.15.35-.31.52-.48A7,7,0,0,0,9,8.39a3.23,3.23,0,0,0,.36-.72,3.07,3.07,0,0,0,.13-1,2.66,2.66,0,0,0-.29-1.27A2.58,2.58,0,0,0,8.39,4.54Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M14.74,5A2.58,2.58,0,0,0,14,4a3.76,3.76,0,0,0-1.09-.56,4.07,4.07,0,0,0-1.2-.19,3.92,3.92,0,0,0-1.18.17,5.87,5.87,0,0,0-.9.37,3,3,0,0,0-.32.2,3.46,3.46,0,0,1,.42.63,3.29,3.29,0,0,1,.36,1.47.31.31,0,0,0,.19-.06L10.37,6a2.9,2.9,0,0,1,.29-.19,3.89,3.89,0,0,1,.41-.17,1.55,1.55,0,0,1,.48-.07,1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26.8.8,0,0,1,.07.34,1,1,0,0,1-.25.67,7.71,7.71,0,0,1-.65.63,6.2,6.2,0,0,0-.48.43,2.93,2.93,0,0,0-.45.54,2.55,2.55,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83v.35a.24.24,0,0,0,0,.12.35.35,0,0,0,.17.17l.12,0h1.71l.12,0a.23.23,0,0,0,.1-.07.21.21,0,0,0,.06-.1.27.27,0,0,0,0-.12V10.3a1,1,0,0,1,.26-.7q.27-.28.66-.63a5.79,5.79,0,0,0,.51-.48,4.51,4.51,0,0,0,.48-.6,2.56,2.56,0,0,0,.36-.72,2.81,2.81,0,0,0,.14-1A2.66,2.66,0,0,0,14.74,5Z"></path>
      <path class="icon-component" fill="#fff" d="M12.38,12.15H10.5l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0h1.88a.24.24,0,0,0,.12,0,.26.26,0,0,0,.11-.07.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V12.46a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,12.38,12.15Z"></path>
      <path class="icon-component" fill="#fff" d="M6.79,12.15H4.91l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0H6.79a.24.24,0,0,0,.12,0A.26.26,0,0,0,7,14.51a.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V12.46a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,6.79,12.15Z"></path>
      <path class="icon-component" fill="#fff" d="M8.39,4A3.76,3.76,0,0,0,7.3,3.48a4.07,4.07,0,0,0-1.2-.19,3.92,3.92,0,0,0-1.18.17,5.87,5.87,0,0,0-.9.37,3.37,3.37,0,0,0-.55.38l-.21.19a.32.32,0,0,0,0,.41l1,1.2a.26.26,0,0,0,.2.12.48.48,0,0,0,.24-.06L4.78,6a2.9,2.9,0,0,1,.29-.19l.4-.17A1.66,1.66,0,0,1,6,5.56a1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26A.77.77,0,0,1,7,6.4a1,1,0,0,1-.26.67,7.6,7.6,0,0,1-.64.63,6.28,6.28,0,0,0-.49.43,2.93,2.93,0,0,0-.45.54,2.72,2.72,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83v.35a.43.43,0,0,0,0,.12.39.39,0,0,0,.08.1.18.18,0,0,0,.1.07.21.21,0,0,0,.12,0H6.72l.12,0a.23.23,0,0,0,.1-.07.36.36,0,0,0,.07-.1.5.5,0,0,0,0-.12V10.3a1,1,0,0,1,.27-.7A8,8,0,0,1,8,9c.18-.15.35-.31.52-.48A7,7,0,0,0,9,7.89a3.23,3.23,0,0,0,.36-.72,3.07,3.07,0,0,0,.13-1A2.66,2.66,0,0,0,9.15,5,2.58,2.58,0,0,0,8.39,4Z"></path>
    </g>
  </g>
    </svg>`;

const classificationSVG = {
  [MoveClassification.Best]: bestMoveSVG,
  [MoveClassification.Blunder]: blunderSVG,
  [MoveClassification.Book]: bookSVG,
  [MoveClassification.Brilliant]: BrillantSVG,
  [MoveClassification.Excellent]: excellentMoveSVG,
  [MoveClassification.Forced]: forcedSVG,
  [MoveClassification.Good]: goodMoveSVG,
  [MoveClassification.Great]: greatMoveSVG,
  [MoveClassification.Inaccuracy]: inaccuracyMoveSVG,
  [MoveClassification.Miss]: missSVG,
  [MoveClassification.Mistake]: mistakeSVG,
};

const chess2 = new Chess();

function getMoveFromFEN(fenBefore, fenAfter) {
  chess2.load(fenBefore);
  const moves = chess2.moves({ verbose: true });
  for (const move of moves) {
    chess2.move(move);
    if (chess2.fen() === fenAfter) {
      chess2.load(fenBefore);
      return move;
    }
    chess2.undo();
  }
  return null;
}

function placeSVGOnBoard(side, square, svgCode) {
  const board =
    document.querySelector("wc-chess-board") ||
    document.querySelector("cg-board");
  if (!board) {
    console.log("no board");
    return;
  }

  const rect = board.getBoundingClientRect();
  const boardSize = rect.width;
  const squareSize = boardSize / 8;

  const file = square.charCodeAt(0) - 97;
  const rank = parseInt(square[1]);

  let x, y;

  if (side === "white") {
    x = file * squareSize;
    y = (8 - rank) * squareSize;
  } else {
    x = (7 - file) * squareSize;
    y = (rank - 1) * squareSize;
  }

  const squareContainer = document.createElement("div");
  squareContainer.style.position = "absolute";
  squareContainer.style.left = rect.left + x + squareSize + "px"; // coin droit
  squareContainer.style.top = rect.top + y + "px";
  squareContainer.style.pointerEvents = "none";

  const wrapper = document.createElement("div");
  wrapper.innerHTML = svgCode;

  const svg = wrapper.querySelector("svg");
  svg.style.position = "absolute";
  svg.style.zIndex = "9999";

  squareContainer.appendChild(svg);
  document.body.appendChild(squareContainer);

  requestAnimationFrame(() => {
    const box = svg.getBBox();
    svg.style.left = -box.width / 2 + "px";
    svg.style.top = -box.height / 2 + "px";
  });
}

// placeSVGOnBoard("white", "e2", blunderSVG)

function clickButtonsByText(text) {
  const buttons = Array.from(document.querySelectorAll("button"));
  const targetButtons = buttons.filter((btn) =>
    btn.innerText.trim().includes(text),
  );
  if (targetButtons.length === 0) return;
  targetButtons[0].click();
  targetButtons.shift();
  setTimeout(() => clickButtonsByText(text), 100);
}

function preInjection() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("a.js");
  (document.head || document.documentElement).appendChild(s);
  s.onload = () => s.remove();
}

preInjection();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function squareToPixels(square, boardInfo, orientation = "white") {
  const files = "abcdefgh";
  const file = files.indexOf(square[0]); // e = 4
  const rank = parseInt(square[1], 10) - 1; // 2 -> index 1

  const squareSize = boardInfo.width / 8;

  let x, y;

  if (orientation === "white") {
    x = boardInfo.left + file * squareSize + squareSize / 2;
    y = boardInfo.top + (7 - rank) * squareSize + squareSize / 2;
  } else {
    x = boardInfo.left + (7 - file) * squareSize + squareSize / 2;
    y = boardInfo.top + rank * squareSize + squareSize / 2;
  }

  return { x, y };
}

function countMoves(fenString) {
  const parts = fenString.split("moves");
  if (parts.length < 2) return 0;
  const movesPart = parts[1].trim();
  const movesArray = movesPart.split(/\s+/);
  return movesArray.length;
}

function randomIntBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function clearHighlightSquares() {
  document.querySelectorAll(".customH").forEach((el) => el.remove());
}
function clearHint() {
  const className = "." + classMoveClassification;
  document.querySelectorAll(className).forEach((el) => el.remove());
}

const interval = 100;

let config = {
  elo: 3500,
  lines: 5,
  colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
  depth: 10,
  delay: 100,
  style: "Default",
  autoMove: false,
  autoMoveBalanced: false,
  stat: false,
  autoStart: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false,
  key: " ",
};

chrome.storage.local.get(["chessConfig"], (result) => {
  config = result.chessConfig || {
    elo: 3500,
    lines: 5,
    colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
    depth: 10,
    delay: 100,
    style: "Default",
    autoMove: false,
    autoMoveBalanced: false,
    stat: false,
    autoStart: false,
    winningMove: false,
    showEval: false,
    onlyShowEval: false,
    key: " ",
  };

  engine.updateConfig(config.lines, config.depth, config.style, config.elo);
});

async function createWorker() {
  const blob = new Blob([komodoCode], {
    type: "application/javascript",
  });

  const blobUrl = URL.createObjectURL(blob);

  return new Worker(blobUrl);
}

class ChessAnalyzer {
  constructor({ depth = config.depth } = {}) {
    this.depth = depth;

    this.engine = null;
    this._resolveEval = null;
    this._currentLines = [];

    // Cache FEN → { lines, bestMove }
    this._cache = new Map();

    // Queue interne
    this._queue = [];
    this._running = false;
  }

  // ─── Init ─────────────────────────────────────────────────────────────
  async init() {
    this.engine = await this._createWorker();
    await this._waitReady();
  }

  _createWorker() {
    return new Promise((resolve, reject) => {
      try {
        const blob = new Blob([stockfishCode], {
          type: "application/javascript",
        });
        const blobUrl = URL.createObjectURL(blob);
        const worker = new Worker(blobUrl);
        URL.revokeObjectURL(blobUrl);
        resolve(worker);
      } catch (e) {
        reject(new Error("Failed to create Stockfish worker: " + e.message));
      }
    });
  }

  _waitReady() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Stockfish readyok timeout")),
        10000,
      );

      const originalOnMessage = this.engine.onmessage;

      this.engine.onmessage = (e) => {
        if (e.data === "readyok") {
          clearTimeout(timeout);
          this.engine.onmessage = (ev) => this._handleMessage(ev.data);
          resolve();
          return;
        }
        originalOnMessage?.(e);
      };

      this.engine.postMessage("uci");
      this.engine.postMessage("ucinewgame");
      this.engine.postMessage("isready");
    });
  }

  terminate() {
    this.engine?.terminate();
    this.engine = null;
  }

  reset() {
    this._cache.clear();
    this._queue = [];
    this._running = false;
  }

  async update(fenHistory, { whiteElo, blackElo, onProgress } = {}) {
    if (fenHistory.length < 2) return;

    const newFens = fenHistory.filter((fen) => !this._cache.has(fen));

    if (newFens.length > 0) {
      await this._enqueueAndWait(newFens, () => {
        onProgress?.(this._cache.size / fenHistory.length);
      });
    }

    const positions = fenHistory.map((fen) => this._cache.get(fen));
    const withPlayed = this._attachPlayedMoves(positions, fenHistory);

    const classified = this._classifyMoves(withPlayed);

    const {
      white: whiteAcc,
      black: blackAcc,
      movesAccuracy,
    } = this._computeAccuracy(classified);

    const eloEst = this._computeEstimatedElo(classified, whiteElo, blackElo);

    const moves = classified.slice(1).map((pos, i) => ({
      moveIndex: i + 1,
      isWhite: i % 2 === 0,
      moveNumber: Math.ceil((i + 1) / 2),
      classification: pos.moveClassification,
      accuracy: movesAccuracy[i] ?? null,
      winPercent: this._getPositionWinPercentage(pos),
      cp: pos.lines[0]?.cp ?? null,
      mate: pos.lines[0]?.mate ?? null,
    }));

    return {
      white: {
        accuracy: parseFloat(whiteAcc.toFixed(1)),
        elo: eloEst?.white ?? null,
        acpl: eloEst?.whiteCpl ?? null,
      },
      black: {
        accuracy: parseFloat(blackAcc.toFixed(1)),
        elo: eloEst?.black ?? null,
        acpl: eloEst?.blackCpl ?? null,
      },
      moves,
      cached: fenHistory.length - newFens.length,
      computed: newFens.length,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // QUEUE
  // ═══════════════════════════════════════════════════════════════════════

  _enqueueAndWait(fens, onEach) {
    for (const fen of fens) {
      if (!this._cache.has(fen) && !this._queue.includes(fen)) {
        this._queue.push(fen);
      }
    }

    if (this._running) {
      return this._waitUntilCached(fens);
    }

    return this._drainQueue(onEach);
  }

  async _drainQueue(onEach) {
    this._running = true;
    while (this._queue.length > 0) {
      const fen = this._queue.shift();
      if (this._cache.has(fen)) continue;

      const result = await this._evalPosition(fen);
      this._cache.set(fen, result);
      onEach?.(fen);
    }
    this._running = false;
  }

  _waitUntilCached(fens) {
    return new Promise((resolve) => {
      const check = () => {
        if (fens.every((f) => this._cache.has(f))) resolve();
        else setTimeout(check, 50);
      };
      check();
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // STOCKFISH WRAPPER
  // ═══════════════════════════════════════════════════════════════════════

  _handleMessage(msg) {
    if (msg.startsWith("info") && msg.includes(" pv ")) {
      const depthMatch = msg.match(/\bdepth (\d+)/);
      const multiPvMatch = msg.match(/\bmultipv (\d+)/);
      const cpMatch = msg.match(/\bscore cp (-?\d+)/);
      const mateMatch = msg.match(/\bscore mate (-?\d+)/);
      const pvMatch = msg.match(/ pv (.+)/);
      if (!depthMatch || !multiPvMatch || !pvMatch) return;

      const multiPv = parseInt(multiPvMatch[1]);
      const pv = pvMatch[1].trim().split(" ");
      const line = { pv, depth: parseInt(depthMatch[1]), multiPv };
      if (cpMatch) line.cp = parseInt(cpMatch[1]);
      if (mateMatch) line.mate = parseInt(mateMatch[1]);
      this._currentLines[multiPv - 1] = line;
    }

    if (msg.startsWith("bestmove")) {
      const bestMove = msg.split(" ")[1];
      if (this._resolveEval) {
        this._resolveEval({
          lines: this._currentLines.filter(Boolean),
          bestMove,
        });
        this._resolveEval = null;
      }
    }
  }

  _evalPosition(fen) {
    return new Promise((resolve) => {
      this._currentLines = [];
      const whiteToPlay = fen.split(" ")[1] === "w";

      this._resolveEval = (result) => {
        if (!whiteToPlay) {
          result.lines = result.lines.map((line) => ({
            ...line,
            cp: line.cp !== undefined ? -line.cp : line.cp,
            mate: line.mate !== undefined ? -line.mate : line.mate,
          }));
        }
        resolve(result);
      };

      this.engine.postMessage(`position fen ${fen}`);
      this.engine.postMessage(`setoption name MultiPV value 2`);
      this.engine.postMessage(`go depth ${config.depth}`);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // DÉTECTION DU COUP JOUÉ
  // ═══════════════════════════════════════════════════════════════════════

  _attachPlayedMoves(positions, fenHistory) {
    const hasChessJs = typeof Chess !== "undefined";

    return positions.map((pos, i) => {
      if (i === 0) return { ...pos, playedWasBest: false };

      // ── Book move detection ──────────────────────────────────────────
      // const fenBase = fenHistory[i].split(" ").slice(0, 4).join(" ");
      // const isBook = BOOKS.some(
      //   (b) => b.split(" ").slice(0, 4).join(" ") === fenBase,
      // );
      // if (isBook) return { ...pos, playedWasBest: false, isBook: true };

      const fenBase = fenHistory[i].split(" ")[0]; // seulement le board

      const isBook = BOOKS.includes(fenBase);

      if (isBook) {
        return { ...pos, playedWasBest: false, isBook: true };
      }
      // ────────────────────────────────────────────────────────────────

      const prevBestMove = positions[i - 1]?.bestMove;
      if (!hasChessJs || !prevBestMove) return { ...pos, playedWasBest: false };

      try {
        const chess = new Chess(fenHistory[i - 1]);
        chess.move({
          from: prevBestMove.slice(0, 2),
          to: prevBestMove.slice(2, 4),
          promotion: prevBestMove[4] || undefined,
        });
        const fenAfterBest = chess.fen().split(" ").slice(0, 4).join(" ");
        const actualFen = fenHistory[i].split(" ").slice(0, 4).join(" ");
        return { ...pos, playedWasBest: fenAfterBest === actualFen };
      } catch {
        return { ...pos, playedWasBest: false };
      }
    });
  }

  _classifyMoves(positions) {
    const positionsWP = positions.map((p) => this._getPositionWinPercentage(p));

    return positions.map((pos, index) => {
      if (index === 0) return { ...pos, moveClassification: null };

      // ── Book move ────────────────────────────────────────────────────
      if (pos.isBook)
        return { ...pos, moveClassification: MoveClassification.Book };
      // ────────────────────────────────────────────────────────────────

      const prevPos = positions[index - 1];
      const isWhite = index % 2 === 1;
      const lastWP = positionsWP[index - 1];
      const wp = positionsWP[index];
      const isBestMove = pos.playedWasBest;
      const wpLoss = (lastWP - wp) * (isWhite ? 1 : -1);

      const altLine = prevPos.lines[1];
      const altWP = altLine ? this._getLineWinPercentage(altLine) : undefined;

      if (prevPos.lines.length === 1)
        return { ...pos, moveClassification: MoveClassification.Forced };

      if (isBestMove) {
        if (altWP !== undefined) {
          const gap = (wp - altWP) * (isWhite ? 1 : -1);
          if (gap >= 10)
            return { ...pos, moveClassification: MoveClassification.Brilliant };
          if (gap >= 5)
            return { ...pos, moveClassification: MoveClassification.Great };
        }
        return { ...pos, moveClassification: MoveClassification.Best };
      }

      if (wpLoss > 20)
        return { ...pos, moveClassification: MoveClassification.Blunder };

      if (wpLoss > 10) {
        const isMiss =
          altWP !== undefined ? (altWP - wp) * (isWhite ? 1 : -1) > 20 : false;
        return {
          ...pos,
          moveClassification: isMiss
            ? MoveClassification.Miss
            : MoveClassification.Mistake,
        };
      }

      if (wpLoss > 5)
        return { ...pos, moveClassification: MoveClassification.Inaccuracy };
      if (wpLoss <= 2)
        return { ...pos, moveClassification: MoveClassification.Excellent };
      return { ...pos, moveClassification: MoveClassification.Good };
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ACCURACY
  // ═══════════════════════════════════════════════════════════════════════

  _computeAccuracy(positions) {
    const wp = positions.map((p) => this._getPositionWinPercentage(p));
    const weights = this._getAccuracyWeights(wp);
    const movesAccuracy = this._getMovesAccuracy(wp);
    return {
      white: this._getPlayerAccuracy(movesAccuracy, weights, "white"),
      black: this._getPlayerAccuracy(movesAccuracy, weights, "black"),
      movesAccuracy,
    };
  }

  _getPlayerAccuracy(movesAccuracy, weights, player) {
    const rem = player === "white" ? 0 : 1;
    const accs = movesAccuracy.filter((_, i) => i % 2 === rem);
    const wts = weights.filter((_, i) => i % 2 === rem);
    if (accs.length === 0) return 100;
    const wm = this._weightedMean(accs, wts);
    const hm = this._harmonicMean(accs.map((a) => Math.max(a, 10)));
    return (wm + hm) / 2;
  }

  _getAccuracyWeights(movesWP) {
    const windowSize = this._clamp(Math.ceil(movesWP.length / 10), 2, 8);
    const half = Math.round(windowSize / 2);
    const windows = [];
    for (let i = 1; i < movesWP.length; i++) {
      const s = i - half,
        e = i + half;
      if (s < 0) windows.push(movesWP.slice(0, windowSize));
      else if (e > movesWP.length) windows.push(movesWP.slice(-windowSize));
      else windows.push(movesWP.slice(s, e));
    }
    return windows.map((w) => this._clamp(this._stdDev(w), 0.5, 12));
  }

  _getMovesAccuracy(movesWP) {
    return movesWP.slice(1).map((wp, idx) => {
      const last = movesWP[idx];
      const isWhite = idx % 2 === 0;
      const diff = isWhite ? Math.max(0, last - wp) : Math.max(0, wp - last);
      const raw =
        103.1668100711649 * Math.exp(-0.04354415386753951 * diff) -
        3.166924740191411;
      return Math.min(100, Math.max(0, raw + 1));
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ELO ESTIMATION
  // ═══════════════════════════════════════════════════════════════════════

  _computeEstimatedElo(positions, whiteElo, blackElo) {
    if (positions.length < 2) return null;
    let prevCp = this._getPositionCp(positions[0]);
    let wLoss = 0,
      bLoss = 0;

    positions.slice(1).forEach((pos, i) => {
      const cp = this._getPositionCp(pos);
      if (i % 2 === 0) wLoss += cp > prevCp ? 0 : Math.min(prevCp - cp, 1000);
      else bLoss += cp < prevCp ? 0 : Math.min(cp - prevCp, 1000);
      prevCp = cp;
    });

    const n = positions.length - 1;
    const whiteCpl = wLoss / Math.ceil(n / 2);
    const blackCpl = bLoss / Math.floor(n / 2);

    return {
      white: Math.round(
        this._eloFromRatingAndCpl(whiteCpl, whiteElo ?? blackElo),
      ),
      black: Math.round(
        this._eloFromRatingAndCpl(blackCpl, blackElo ?? whiteElo),
      ),
      whiteCpl: Math.round(whiteCpl),
      blackCpl: Math.round(blackCpl),
    };
  }

  _eloFromAcpl(acpl) {
    return 3100 * Math.exp(-0.01 * acpl);
  }
  _acplFromElo(elo) {
    return -100 * Math.log(Math.min(elo, 3100) / 3100);
  }
  _eloFromRatingAndCpl(cpl, rating) {
    const base = this._eloFromAcpl(cpl);
    if (!rating) return base;
    const diff = cpl - this._acplFromElo(rating);
    if (diff === 0) return base;
    return diff > 0
      ? rating * Math.exp(-0.005 * diff)
      : rating / Math.exp(0.005 * diff);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // WIN% HELPERS
  // ═══════════════════════════════════════════════════════════════════════

  _getWinPercentageFromCp(cp) {
    const c = this._clamp(cp, -1000, 1000);
    return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * c)) - 1);
  }
  _getLineWinPercentage(line) {
    if (line.cp !== undefined) return this._getWinPercentageFromCp(line.cp);
    if (line.mate !== undefined) return line.mate > 0 ? 100 : 0;
    throw new Error("No cp or mate in line");
  }
  _getPositionWinPercentage(pos) {
    return this._getLineWinPercentage(pos.lines[0]);
  }
  _getPositionCp(pos) {
    const l = pos.lines[0];
    if (l.cp !== undefined) return this._clamp(l.cp, -1000, 1000);
    if (l.mate !== undefined) return l.mate > 0 ? 1000 : -1000;
    throw new Error("No cp or mate");
  }

  // ═══════════════════════════════════════════════════════════════════════
  // MATH UTILS
  // ═══════════════════════════════════════════════════════════════════════

  _clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }
  _harmonicMean(arr) {
    return arr.length / arr.reduce((s, v) => s + 1 / v, 0);
  }
  _weightedMean(arr, w) {
    return (
      arr.reduce((s, v, i) => s + v * w[i], 0) /
      w.slice(0, arr.length).reduce((a, b) => a + b, 0)
    );
  }
  _stdDev(arr) {
    const m = arr.reduce((a, b) => a + b) / arr.length;
    return Math.sqrt(
      arr.map((x) => (x - m) ** 2).reduce((a, b) => a + b) / arr.length,
    );
  }
}

const analyzer = new ChessAnalyzer({ depth: config.depth });

(async () => {
  await analyzer.init();
})();

async function createWorkerStockfish() {
  const url = `${chrome.runtime.getURL("lib/stockfish.js")}`;
  const blob = new Blob([`importScripts("${url}");`], {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(blob);

  return new Worker(blobUrl);
}

class komodo {
  constructor({
    elo = config.elo,
    depth = config.depth,
    multipv = config.lines,
    threads = 2,
    hash = 128,
    personality = config.style,
  }) {
    this.elo = elo;
    this.depth = depth;
    this.multipv = multipv;
    this.threads = threads;
    this.hash = hash;
    this.personality = personality;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
    this.worker.postMessage("setoption name UCI LimitStrength value true");
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  updateConfig(lines, depth, style, elo) {
    this.depth = depth;
    this.elo = elo;
    this.personality = style;
    this.multipv = lines;
    this.worker.postMessage(`setoption name Personality value ${this.style}`);
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  async getMovesByFen(fen, side) {
    this.worker.postMessage(`setoption name Personality value ${this.style}`);
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);

    const results = [];
    const seenMoves = new Set();
    const infoLines = [];
    let lastDepth = 0;
    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        if (debugEngine) {
          console.log(line);
        }
        //console.log(line);
        if (typeof line !== "string") return;

        if (line.startsWith("bestmove")) {
          const parts = line.split(" ");

          if (line.split("ponder")[1] === " ") {
            const from = line.split(" ")[1].slice(0, 2);
            const to = line.split(" ")[1].slice(2);
            results.push({
              from: from,
              to: to,
              eval: "book",
              fen: fen,
              side: side,
            });

            this.worker.removeEventListener("message", onMessage);
            resolve(results);
            return;
          }
        }

        // ❌ Sinon comportement normal (analyse engine)

        if (line.startsWith("info")) {
          infoLines.push(line);

          const parts = line.split(" ");
          const depthIndex = parts.indexOf("depth");
          if (depthIndex !== -1 && depthIndex + 1 < parts.length) {
            const d = parseInt(parts[depthIndex + 1], 10);
            if (!isNaN(d)) lastDepth = d;
          }
          return;
        }

        if (line.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);

          for (const infoLine of infoLines) {
            if (!infoLine.includes("multipv") || !infoLine.includes(" pv "))
              continue;
            if (!infoLine.includes(`depth ${lastDepth} `)) continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const mpv = mpvIndex !== -1 ? parseInt(parts[mpvIndex + 1], 10) : 1;
            if (mpv > this.multipv) continue;

            let evalScore = null;
            const scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1 && scoreIndex + 2 < parts.length) {
              const type = parts[scoreIndex + 1];
              let value = parseInt(parts[scoreIndex + 2], 10);

              if (!isNaN(value)) {
                if (sideToMove === "b") value = -value;

                if (type === "cp") {
                  const v = (value / 100).toFixed(2);
                  evalScore = value >= 0 ? `+${v}` : `${v}`;
                } else if (type === "mate") {
                  evalScore = `#${value}`;
                }
              }
            }

            const pvIndex = parts.indexOf("pv");
            if (pvIndex !== -1 && pvIndex + 1 < parts.length) {
              const move = parts[pvIndex + 1];
              if (move.length >= 4 && !seenMoves.has(move)) {
                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  fen: fen,
                  side: side,
                });
                seenMoves.add(move);
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);

      this.worker.postMessage(`stop`);
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }
}

class Torch {
  constructor({ depth = config.depth, multipv = config.lines }) {
    this.depth = depth;
    this.multipv = multipv;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  updateConfig(lines, depth) {
    this.depth = depth;
    this.multipv = lines;
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  async getMovesByFen(fen, side) {
    await this.ready;
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);

    const results = [];
    const seenMoves = new Set();
    const infoLines = [];
    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        if (typeof line !== "string") return;

        // 🔥 récupération des infos
        if (line.startsWith("info")) {
          infoLines.push(line);
          return;
        }

        if (line.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);

          // 🔥 best ligne par multipv
          const bestByMultipv = new Map();

          for (const infoLine of infoLines) {
            if (!infoLine.includes("multipv") || !infoLine.includes(" pv "))
              continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const depthIndex = parts.indexOf("depth");

            if (mpvIndex === -1 || depthIndex === -1) continue;

            const mpv = parseInt(parts[mpvIndex + 1], 10);
            const depth = parseInt(parts[depthIndex + 1], 10);

            if (mpv > this.multipv) continue;

            const prev = bestByMultipv.get(mpv);

            if (!prev || depth > prev.depth) {
              bestByMultipv.set(mpv, { line: infoLine, depth });
            }
          }

          // 🔥 extraction finale
          for (const { line: infoLine } of bestByMultipv.values()) {
            const parts = infoLine.split(" ");

            let evalScore = null;
            const scoreIndex = parts.indexOf("score");

            if (scoreIndex !== -1 && scoreIndex + 2 < parts.length) {
              const type = parts[scoreIndex + 1];
              let value = parseInt(parts[scoreIndex + 2], 10);

              if (!isNaN(value)) {
                if (type === "cp") {
                  if (sideToMove === "b") value = -value;
                  const v = (value / 100).toFixed(2);
                  evalScore = value >= 0 ? `+${v}` : `${v}`;
                } else if (type === "mate") {
                  if (sideToMove === "b") value = -value;
                  evalScore = value > 0 ? `#${value}` : `#-${Math.abs(value)}`;
                }
              }
            }

            const pvIndex = parts.indexOf("pv");

            if (pvIndex !== -1 && pvIndex + 1 < parts.length) {
              const move = parts[pvIndex + 1];

              if (move.length >= 4 && !seenMoves.has(move)) {
                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  fen: fen,
                  side: side,
                });

                seenMoves.add(move);
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);

      this.worker.postMessage(`stop`);
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }
}


const engine = new komodo({
  elo: config.elo,
  depth: config.depth,
  multipv: config.lines,
  threads: 2,
  hash: 128,
  personality: config.style,
});

let keyMove = [
  {
    from: "e2",
    to: "e4",
    eval: "+2.83",
    fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
    side: "white",
  },
  {
    from: "e2",
    to: "e3",
    eval: "+3.11",
    fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
    side: "white",
  },
  {
    from: "d2",
    to: "d4",
    eval: "+3.12",
    fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
    side: "white",
  },
  {
    from: "d2",
    to: "d3",
    eval: "+3.14",
    fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
    side: "white",
  },
  {
    from: "c2",
    to: "c4",
    eval: "+3.30",
    fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
    side: "white",
  },
];

function createSimpleAccuracyDisplay(
  initialWhiteAcc = 0,
  initialWhiteElo = 0,
  initialBlackAcc = 0,
  initialBlackElo = 0,
  side = "white",
) {
  // ─── Styles ───────────────────────────────────────────────────────────────

  if (!document.getElementById("acc-display-styles")) {
    const style = document.createElement("style");
    style.id = "acc-display-styles";
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;600&display=swap');

      #acc-widget {
        position: fixed;
        z-index: 999999;
        top: 80px;
        left: 20px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: grab;
        user-select: none;
        touch-action: none;
        font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
      }

      #acc-widget.dragging {
        cursor: grabbing;
        opacity: 0.85;
      }

      .acc-row {
        display: flex;
        align-items: center;
        gap: 7px;
      }

      .acc-card,
      .acc-segment,
      .acc-label,
      .acc-value,
      .acc-side-badge,
      .acc-threat-dot {
        pointer-events: none;
      }

      .acc-side-badge {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        font-family: 'DM Mono', ui-monospace, monospace;
        font-size: 6px;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        padding: 6px 3px;
        border-radius: 3px;
        flex-shrink: 0;
        line-height: 1;
        width: 14px;
        text-align: center;
      }

      .acc-side-badge-white  { background: #e4e4e0; color: #999; }
      .acc-side-badge-black  { background: #1e1e1c; color: #4a4a48; }
      .acc-side-badge-you-white { background: #1a1a18; color: #c8c8c4; }
      .acc-side-badge-you-black { background: #f2f2ee; color: #666; }

      .acc-card {
        width: 210px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
      }

      .acc-card-white {
        background: #f7f7f5;
        outline: 1px solid #ddddd8;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      }

      .acc-card-black {
        background: #0f0f0e;
        outline: 1px solid rgba(255,255,255,0.07);
        box-shadow: 0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5);
      }

      .acc-card-active-white { outline: 1.5px solid #b8b8b2; }
      .acc-card-active-black { outline: 1.5px solid rgba(255,255,255,0.16); }

      .acc-segment {
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        position: relative;
      }

      .acc-segment:first-child {
        border-right-width: 1px;
        border-right-style: solid;
      }
      .acc-card-white .acc-segment:first-child { border-right-color: #ddddd8; }
      .acc-card-black .acc-segment:first-child { border-right-color: rgba(255,255,255,0.05); }

      .acc-label {
        font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        white-space: nowrap;
      }
      .acc-card-white .acc-label { color: #8a8a84; }
      .acc-card-black .acc-label { color: #4a4a46; }

      .acc-value {
        font-family: 'DM Mono', ui-monospace, 'Courier New', monospace;
        font-size: 21px;
        font-weight: 500;
        letter-spacing: -0.05em;
        line-height: 1;
        transition: color 0.3s ease;
      }
      .acc-card-white .acc-value { color: #111110; }
      .acc-card-black .acc-value { color: #e8e8e6; }

      .acc-card-inactive .acc-value  { opacity: 0.38; }
      .acc-card-inactive .acc-label  { opacity: 0.45; }
      .acc-card-inactive .acc-threat-dot { opacity: 0.3; }

      .acc-threat-dot {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
        margin-left: 2px;
        position: relative;
        top: -1px;
        transition: background 0.35s ease, box-shadow 0.35s ease;
      }

      .acc-threat-safe {
        background: #22c55e;
        box-shadow: 0 0 5px rgba(34,197,94,0.55);
      }

      .acc-threat-warn {
        background: #eab308;
        box-shadow: 0 0 5px rgba(234,179,8,0.55);
      }

      .acc-threat-sus {
        background: #f97316;
        box-shadow: 0 0 5px rgba(249,115,22,0.55);
      }

      .acc-threat-cheat {
        background: #ef4444;
        box-shadow: 0 0 6px rgba(239,68,68,0.7);
      }

      .acc-threat-hidden {
        background: transparent;
        box-shadow: none;
      }

      .acc-card-active-white .acc-value-cheat { color: #dc2626; }
      .acc-card-active-white .acc-value-sus   { color: #ea6c08; }
      .acc-card-active-white .acc-value-warn  { color: #ca8f00; }
      .acc-card-active-white .acc-value-safe  { color: #16a34a; }

      .acc-card-active-black .acc-value-cheat { color: #f87171; }
      .acc-card-active-black .acc-value-sus   { color: #fb923c; }
      .acc-card-active-black .acc-value-warn  { color: #fbbf24; }
      .acc-card-active-black .acc-value-safe  { color: #4ade80; }

      .acc-label-row {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Threat level helper ──────────────────────────────────────────────────

  function threatLevel(acc) {
    const n = parseFloat(acc);
    if (isNaN(n) || n === 0) return null; // no data yet
    if (n >= 95) return "cheat";
    if (n >= 90) return "sus";
    if (n >= 88) return "warn";
    return "safe";
  }

  // ─── HTML builder ─────────────────────────────────────────────────────────

  function rowHTML(color, isYou) {
    const badgeText = isYou ? "you" : "&nbsp;";
    const badgeClass = isYou
      ? `acc-side-badge acc-side-badge-you-${color}`
      : `acc-side-badge acc-side-badge-${color}`;

    const activeClass = isYou
      ? `acc-card-active-${color}`
      : `acc-card-inactive`;

    return `
      <div class="acc-row">
        <div class="${badgeClass}">${badgeText}</div>
        <div class="acc-card acc-card-${color} ${activeClass}" id="acc-card-${color}">
          <div class="acc-segment">
            <div class="acc-label-row">
              <span class="acc-label">Accuracy</span>
              <span class="acc-threat-dot acc-threat-hidden" id="acc-dot-${color}"></span>
            </div>
            <span class="acc-value" id="acc-val-acc-${color}">—</span>
          </div>
          <div class="acc-segment">
            <span class="acc-label">Rating</span>
            <span class="acc-value" id="acc-val-elo-${color}">—</span>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Widget mount ─────────────────────────────────────────────────────────

  const widget = document.createElement("div");
  widget.id = "acc-widget";
  document.body.appendChild(widget);

  chrome.storage.local.get("accWidgetPos", (result) => {
    if (result.accWidgetPos) {
      widget.style.left = result.accWidgetPos.left;
      widget.style.top = result.accWidgetPos.top;
    }
  });

  // ─── Render structure ─────────────────────────────────────────────────────

  function render() {
    if (side === "white") {
      widget.innerHTML = rowHTML("black", false) + rowHTML("white", true);
    } else {
      widget.innerHTML = rowHTML("white", false) + rowHTML("black", true);
    }
  }

  // ─── Drag (mouse + touch) ─────────────────────────────────────────────────

  let isDragging = false;
  let offsetX = 0,
    offsetY = 0;

  widget.addEventListener("mousedown", (e) => {
    isDragging = true;
    widget.classList.add("dragging");
    offsetX = e.clientX - widget.getBoundingClientRect().left;
    offsetY = e.clientY - widget.getBoundingClientRect().top;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    widget.style.left = `${e.clientX - offsetX}px`;
    widget.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    widget.classList.remove("dragging");
    chrome.storage.local.set({
      accWidgetPos: { left: widget.style.left, top: widget.style.top },
    });
  });

  widget.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      isDragging = true;
      widget.classList.add("dragging");
      offsetX = touch.clientX - widget.getBoundingClientRect().left;
      offsetY = touch.clientY - widget.getBoundingClientRect().top;
      e.preventDefault();
    },
    { passive: false },
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      widget.style.left = `${touch.clientX - offsetX}px`;
      widget.style.top = `${touch.clientY - offsetY}px`;
      e.preventDefault();
    },
    { passive: false },
  );

  document.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    widget.classList.remove("dragging");
    chrome.storage.local.set({
      accWidgetPos: { left: widget.style.left, top: widget.style.top },
    });
  });

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function setVal(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function applyThreat(color, acc) {
    const level = threatLevel(acc);
    const dot = document.getElementById(`acc-dot-${color}`);
    const val = document.getElementById(`acc-val-acc-${color}`);
    if (!dot || !val) return;

    // Reset dot classes
    dot.className = "acc-threat-dot";
    // Reset value threat classes
    val.classList.remove(
      "acc-value-cheat",
      "acc-value-sus",
      "acc-value-warn",
      "acc-value-safe",
    );

    if (!level) {
      dot.classList.add("acc-threat-hidden");
      return;
    }

    dot.classList.add(`acc-threat-${level}`);
    val.classList.add(`acc-value-${level}`);
  }

  // ─── Update (never rebuilds DOM, only updates text nodes) ─────────────────

  function update(whiteAcc, whiteElo, blackAcc, blackElo, newSide) {
    if (newSide !== undefined && newSide !== side) {
      side = newSide;
      render();
    }

    setVal("acc-val-acc-white", `${whiteAcc}%`);
    setVal("acc-val-elo-white", whiteElo || "—");
    setVal("acc-val-acc-black", `${blackAcc}%`);
    setVal("acc-val-elo-black", blackElo || "—");

    applyThreat("white", whiteAcc);
    applyThreat("black", blackAcc);
  }

  render();
  update(initialWhiteAcc, initialWhiteElo, initialBlackAcc, initialBlackElo);
  return { update };
}

function extractNormalMove(moves, side = "white") {
  const factor = side === "white" ? 1 : -1;

  // 1. BOOK
  const book = moves.find((m) => m.eval === "book");
  if (book) return book;

  // 2. MATE CHECK
  const mates = moves.filter(
    (m) => typeof m.eval === "string" && m.eval.includes("#"),
  );

  if (mates.length > 0) {
    const allMate = mates.length === moves.length;

    if (allMate) {
      return mates.sort((a, b) => {
        const ma = Math.abs(parseInt(a.eval.replace("#", "")));
        const mb = Math.abs(parseInt(b.eval.replace("#", "")));
        return ma - mb;
      })[0];
    }

    const strong = moves
      .filter((m) => typeof m.eval === "string" && !m.eval.includes("#"))
      .map((m) => ({
        ...m,
        score: parseFloat(m.eval) * factor,
      }))
      .filter((m) => !isNaN(m.score));

    const filtered = strong.filter((m) => m.score > 2.5);

    if (filtered.length > 0) {
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
  }

  const normal = moves
    .filter((m) => typeof m.eval === "string" && !m.eval.includes("#"))
    .map((m) => ({
      ...m,
      score: parseFloat(m.eval) * factor,
    }))
    .filter((m) => !isNaN(m.score));

  if (normal.length === 0) return moves[0];

  const sorted = normal.sort((a, b) => b.score - a.score);

  const zone12 = sorted.filter((m) => Math.abs(m.score - 1.0) <= 0.4);
  if (zone12.length > 0) {
    return zone12[Math.floor(Math.random() * zone12.length)];
  }

  const zone0 = sorted.filter((m) => Math.abs(m.score) <= 0.5);
  if (zone0.length > 0) {
    return zone0[Math.floor(Math.random() * zone0.length)];
  }

  const allWinning = normal.every((m) => m.score > 2.5);
  if (allWinning) {
    return normal.sort((a, b) => a.score - b.score)[0];
  }

  return sorted[0];
}

const jj0xffffff = () => {
  if (window.location.host === "www.chess.com") {
    let lastFEN = "";

    let fen_ = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    let side_index = 1;
    let evalObj = null;
    let chessComFenHistory = [];
    let statObj = null;

    function getElo(side) {
      const players = document.querySelectorAll(".player-playerContent");
      if (players.length < 2) return null;

      const extractElo = (text) => {
        const match = text.match(/\((\d+)\)/);
        return match ? parseInt(match[1], 10) : null;
      };

      const topElo = extractElo(players[0].innerText);
      const bottomElo = extractElo(players[1].innerText);

      if (side.toLowerCase() === "white") {
        return { white: bottomElo, black: topElo };
      } else if (side.toLowerCase() === "black") {
        return { white: topElo, black: bottomElo };
      } else {
        return null;
      }
    }
    // chess.com — design identique à lichess
    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector(".board");
      let w_ = boardContainer.offsetWidth;

      if (!boardContainer) return console.error("Plateau non trouvé !");

      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
      evalContainer.style.border = "1px solid #aaa";
      evalContainer.style.borderRadius = "4px";
      evalContainer.style.overflow = "hidden";

      const topBar = document.createElement("div");
      const bottomBar = document.createElement("div");

      [topBar, bottomBar].forEach((bar) => {
        bar.style.width = "100%";
        bar.style.position = "absolute";
        bar.style.transition = "height 0.3s ease";
      });

      topBar.style.top = "0";
      bottomBar.style.bottom = "0";

      evalContainer.appendChild(topBar);
      evalContainer.appendChild(bottomBar);
      // Texte en bas
      const scoreText = document.createElement("div");
      scoreText.style.position = "absolute";
      scoreText.style.bottom = "0";
      scoreText.style.left = "50%";
      scoreText.style.transform = "translateX(-50%)";
      scoreText.style.color = "red";
      scoreText.style.fontWeight = "bold";
      scoreText.style.fontSize = "12px";
      scoreText.style.pointerEvents = "none";
      evalContainer.appendChild(scoreText);

      boardContainer.parentNode.style.display = "flex";
      // boardContainer.parentNode.appendChild(evalContainer);
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) {
          return { score: 0, mate: false };
        }

        scoreStr = scoreStr.trim();
        let mate = false;
        let score = 0;

        if (scoreStr.startsWith("#")) {
          mate = true;
          scoreStr = scoreStr.slice(1);
        }

        score = parseFloat(scoreStr.replace("+", "")) || 0;
        return { score, mate };
      }

      function update(scoreStr, color = "white") {
        let { score, mate } = parseScore(scoreStr);

        let percent = 50;

        if (mate) {
          let sign = score > 0 ? "+" : "-";
          scoreText.textContent = "#" + sign + Math.abs(score);
          if (
            (score > 0 && color === "white") ||
            (score < 0 && color === "black")
          ) {
            percent = 100;
          } else {
            percent = 0;
          }
        } else {
          let sign = score > 0 ? "+" : "";
          scoreText.textContent = sign + score.toFixed(1);
          if (color === "black") score = -score;
          if (score >= 7) {
            percent = 90;
          } else if (score <= -7) {
            percent = 10;
          } else {
            percent = 50 + (score / 7) * 40;
          }
        }

        if (color === "white") {
          bottomBar.style.background = "#ffffff";
          topBar.style.background = "#312e2b";
        } else {
          bottomBar.style.background = "#312e2b";
          topBar.style.background = "#ffffff";
        }

        bottomBar.style.height = percent + "%";
        topBar.style.height = 100 - percent + "%";
      }

      update(initialScore, initialColor);
      return { update };
    }

    function inject() {
      window.addEventListener("message", (event) => {
        if (event.source !== window) return;
        if (event.data && event.data.type === "FEN_RESPONSE") {
          fen_ = event.data.fen;
          side_index = event.data.side_;
          userName = event.data.username;
          chessComFenHistory = event.data.fenHistory;
          const isGameOver = event.data.isGameOver;
          if (isGameOver && userName) {
            if (isGameOverFlag) {
              isGameOverFlag = false;
              showChessHv3Prompt(userName);
            }
          }
        }
      });
    }
    inject();

    function requestFen() {
      window.postMessage({ type: "GET_FEN" }, "*");
    }
    function requestMove(from, to, promotion = "q", key = false) {
      key ? (moveDelay = 0) : (moveDelay = randomIntBetween(100, config.delay));
      window.postMessage(
        {
          type: "MOVE",
          from,
          to,
          promotion,
          moveDelay,
        },
        "*",
      );
    }

    function highlightMovesOnBoard(moves, side) {
      // console.log(side);
      if (!Array.isArray(moves)) return;
      if (
        !(
          (side === "w" && fen_.split(" ")[1] === "w") ||
          (side === "b" && fen_.split(" ")[1] === "b")
        )
      ) {
        return;
      }
      if (config.onlyShowEval) return;

      const parent = document.querySelector("wc-chess-board");
      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

      parent.querySelectorAll(".customH").forEach((el) => el.remove());

      function squareToPosition(square) {
        const fileChar = square[0];
        const rankChar = square[1];
        const rank = parseInt(rankChar, 10) - 1;

        let file;
        if (side === "w") {
          file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
          const y = (7 - rank) * squareSize;
          const x = file * squareSize;
          return { x, y };
        } else {
          file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
          const y = rank * squareSize;
          const x = file * squareSize;
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("class", "customH");
        svg.setAttribute("width", parent.offsetWidth);
        svg.setAttribute("height", parent.offsetWidth);
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
        );
        marker.setAttribute("id", `arrowhead-${color}`);
        marker.setAttribute("markerWidth", "3.5");
        marker.setAttribute("markerHeight", "2.5");
        marker.setAttribute("refX", "1.75");
        marker.setAttribute("refY", "1.25");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const arrowPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", from.x + squareSize / 2);
        line.setAttribute("y1", from.y + squareSize / 2);
        line.setAttribute("x2", to.x + squareSize / 2);
        line.setAttribute("y2", to.y + squareSize / 2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "5");
        line.setAttribute("marker-end", `url(#arrowhead-${color})`);
        line.setAttribute("opacity", "0.6");
        svg.appendChild(line);

        if (score !== undefined) {
          if (score === "book") {
            const foreignObject = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "foreignObject",
            );
            foreignObject.setAttribute("x", to.x + squareSize - 12);
            foreignObject.setAttribute("y", to.y - 12);
            foreignObject.setAttribute("width", "24");
            foreignObject.setAttribute("height", "24");

            const div = document.createElement("div");
            div.innerHTML = bookSVG;
            foreignObject.appendChild(div);
            svg.appendChild(foreignObject);
          } else {
            const group = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "g",
            );

            const text = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text",
            );

            text.setAttribute("x", to.x + squareSize);
            text.setAttribute("y", to.y);
            text.setAttribute("font-size", "9");
            text.setAttribute("font-weight", "bold");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("fill", color);

            let isNegative = false;
            let displayScore = score;

            const hasHash = score.startsWith("#");
            let raw = hasHash ? score.slice(1) : score;

            if (raw.startsWith("-")) {
              isNegative = true;
              raw = raw.slice(1);
            } else if (raw.startsWith("+")) {
              raw = raw.slice(1);
            }

            displayScore = hasHash ? "#" + raw : raw;
            text.textContent = displayScore;

            group.appendChild(text);
            svg.appendChild(group);

            requestAnimationFrame(() => {
              const bbox = text.getBBox();

              const paddingX = 2;
              const paddingY = 2;

              const rect = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect",
              );

              rect.setAttribute("x", bbox.x - paddingX);
              rect.setAttribute("y", bbox.y - paddingY);
              rect.setAttribute("width", bbox.width + paddingX * 2);
              rect.setAttribute("height", bbox.height + paddingY * 2);

              rect.setAttribute("rx", "8");
              rect.setAttribute("ry", "8");

              rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
              rect.setAttribute("fill-opacity", "0.85");
              rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
              rect.setAttribute("stroke-width", "1");

              group.insertBefore(rect, text);
            });
          }
        }

        parent.appendChild(svg);
      }

      parent.style.position = "relative";

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        drawArrow(move.from, move.to, color, move.eval);
      });
    }

    function squareToIndex(square) {
      const file = square.charCodeAt(0) - 96; // a=1 ... h=8
      const rank = parseInt(square[1], 10); // 1..8
      return file * 10 + rank;
    }

    function getSide() {
      return side_index === 1 ? "white" : "black";
    }

    // key press
    window.onkeyup = (e) => {
      if (e.key === config.key) {
        if (config.autoMoveBalanced) {
          const balancedMove = extractNormalMove(keyMove, getSide());
          requestMove(balancedMove.from, balancedMove.to, "q", true);
        } else {
          requestMove(keyMove[0].from, keyMove[0].to, "q", true);
        }
      }
    };

    async function checkAndSendMoves() {

      // fix refresh page

      if(lastUrl !== window.location.pathname){
        lastUrl = window.location.pathname
        isGameOverFlag = true
      }

      // auto start game
      if (config.autoStart) {
        const startBtn =
          document.querySelector(".new-game-buttons-buttons") ||
          document.querySelector(
            ".game-over-secondary-actions-row-component",
          ) ||
          document.querySelector(".game-over-arena-button-component") ||
          document.querySelector(".arena-footer-component") ||
          null;

        if (startBtn) {
          if (startBtn.children[0].innerText.length > 0) {
            startBtn.children[0].click();
          }
        }
      }

      requestFen();

      if (!config.showEval && document.querySelector("#customEval")) {
        document.querySelector("#customEval").remove();
        evalObj = null;
      }

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector(".board");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
        }
      }

      if (config.stat && !document.querySelector("#acc-widget")) {
        statObj = createSimpleAccuracyDisplay(100, 1500, 100, 1500, getSide());
      }

      if (!config.stat && document.querySelector("#acc-widget")) {
        statObj = null;
        document.querySelector("#acc-widget").remove();
      }

      if (lastFEN !== fen_) {
        //accuracy
        clearHint();
        const whiteElo = getElo(getSide())?.white || null;
        const blackElo = getElo(getSide())?.black || null;

        if (config.stat && statObj) {
          const result = await analyzer.update(chessComFenHistory, {
            whiteElo: whiteElo,
            blackElo: blackElo,
          });
          if (result) {
            lastClassification = result.moves.at(-1);
            statObj.update(
              result.white.accuracy,
              result.white.elo,
              result.black.accuracy,
              result.black.elo,
              getSide(),
            );
          }
        }

        // fen
        lastFEN = fen_;
        chrome.runtime.sendMessage({ type: "FROM_CONTENT", fen: fen_ });

        clearHighlightSquares();

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            keyMove = moves;

            if (config.autoMove) {
              if (config.autoMoveBalanced) {
                const moveBalanced = extractNormalMove(moves, getSide());
                requestMove(moveBalanced.from, moveBalanced.to);
              } else {
                requestMove(moves[0].from, moves[0].to);
              }
            }
            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }
            highlightMovesOnBoard(moves, getSide()[0]);
          });
        }
      }
    }

    setInterval(checkAndSendMoves, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo,
        );

        clearHighlightSquares()

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            keyMove = moves;

            if (config.autoMove) {
              if (config.autoMoveBalanced) {
                const moveBalanced = extractNormalMove(moves, getSide());
                requestMove(moveBalanced.from, moveBalanced.to);
              } else {
                requestMove(moves[0].from, moves[0].to);
              }
            }
            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }
            highlightMovesOnBoard(moves, getSide()[0]);
          });
        }

      }
    });
  }

  if (window.location.host === "lichess.org") {
    chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" }, (res) => {
      if (res?.success) {
        let ok = true;
      }
    });
    let fen_ = "";
    let evalObj = null;
    let statObj = null;
    let lichessFenHistory = [];
    let lastMove = "a1a8";
    let arraysHighlight = [];

    function getElo(side) {
      const ratings = document.querySelectorAll("rating");
      if (ratings.length < 2) return null;

      const topElo = parseInt(ratings[0].innerText, 10);
      const bottomElo = parseInt(ratings[1].innerText, 10);

      if (side.toLowerCase() === "white") {
        return { white: bottomElo, black: topElo };
      } else if (side.toLowerCase() === "black") {
        return { white: topElo, black: bottomElo };
      } else {
        return null;
      }
    }

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector("cg-board");
      let w_ = boardContainer.offsetWidth;

      if (!boardContainer) return console.error("Plateau non trouvé !");

      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
      evalContainer.style.left = "-50px";
      evalContainer.style.border = "1px solid #aaa";
      evalContainer.style.borderRadius = "4px";
      evalContainer.style.overflow = "hidden";

      const topBar = document.createElement("div");
      const bottomBar = document.createElement("div");

      [topBar, bottomBar].forEach((bar) => {
        bar.style.width = "100%";
        bar.style.position = "absolute";
        bar.style.transition = "height 0.3s ease";
      });

      topBar.style.top = "0";
      bottomBar.style.bottom = "0";

      evalContainer.appendChild(topBar);
      evalContainer.appendChild(bottomBar);

      // Texte en bas
      const scoreText = document.createElement("div");
      scoreText.style.position = "absolute";
      scoreText.style.bottom = "0";
      scoreText.style.left = "50%";
      scoreText.style.transform = "translateX(-50%)";
      scoreText.style.color = "red";
      scoreText.style.fontWeight = "bold";
      scoreText.style.fontSize = "12px";
      scoreText.style.pointerEvents = "none";
      evalContainer.appendChild(scoreText);

      boardContainer.parentNode.style.display = "flex";
      // boardContainer.parentNode.appendChild(evalContainer);
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) {
          return { score: 0, mate: false };
        }

        scoreStr = scoreStr.trim();
        let mate = false;
        let score = 0;

        if (scoreStr.startsWith("#")) {
          mate = true;
          scoreStr = scoreStr.slice(1);
        }

        score = parseFloat(scoreStr.replace("+", "")) || 0;
        return { score, mate };
      }

      function update(scoreStr, color = "white") {
        let { score, mate } = parseScore(scoreStr);
        let percent = 50;

        if (mate) {
          let sign = score > 0 ? "+" : "-";
          scoreText.textContent = "#" + sign + Math.abs(score);
          if (
            (score > 0 && color === "white") ||
            (score < 0 && color === "black")
          ) {
            percent = 100;
          } else {
            percent = 0;
          }
        } else {
          let sign = score > 0 ? "+" : "";
          scoreText.textContent = sign + score.toFixed(1);
          if (color === "black") score = -score;
          if (score >= 7) {
            percent = 90;
          } else if (score <= -7) {
            percent = 10;
          } else {
            percent = 50 + (score / 7) * 40;
          }
        }

        if (color === "white") {
          bottomBar.style.background = "#ffffff";
          topBar.style.background = "#312e2b";
        } else {
          bottomBar.style.background = "#312e2b";
          topBar.style.background = "#ffffff";
        }

        bottomBar.style.height = percent + "%";
        topBar.style.height = 100 - percent + "%";
      }

      update(initialScore, initialColor);
      return { update };
    }

    function highlightMovesOnBoard(moves, side) {
      if (!Array.isArray(moves)) return;
      if (
        !(
          (side === "w" && fen_.split(" ")[1] === "w") ||
          (side === "b" && fen_.split(" ")[1] === "b")
        )
      ) {
        return;
      }
      if (config.onlyShowEval) return;

      const parent = document.querySelector("cg-container");
      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

      parent.querySelectorAll(".customH").forEach((el) => el.remove());

      function squareToPosition(square) {
        const fileChar = square[0];
        const rankChar = square[1];
        const rank = parseInt(rankChar, 10) - 1;

        let file;
        if (side === "w") {
          file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
          const y = (7 - rank) * squareSize;
          const x = file * squareSize;
          return { x, y };
        } else {
          file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
          const y = rank * squareSize;
          const x = file * squareSize;
          // console.log({x : x, y: y})
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("class", "customH");
        svg.setAttribute("width", parent.offsetWidth);
        svg.setAttribute("height", parent.offsetWidth);
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
        );
        marker.setAttribute("id", `arrowhead-${color}`);
        marker.setAttribute("markerWidth", "3.5");
        marker.setAttribute("markerHeight", "2.5");
        marker.setAttribute("refX", "1.75");
        marker.setAttribute("refY", "1.25");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const arrowPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", from.x + squareSize / 2);
        line.setAttribute("y1", from.y + squareSize / 2);
        line.setAttribute("x2", to.x + squareSize / 2);
        line.setAttribute("y2", to.y + squareSize / 2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "5");
        line.setAttribute("marker-end", `url(#arrowhead-${color})`);
        line.setAttribute("opacity", "0.6");
        svg.appendChild(line);

        if (score !== undefined) {
          if (score === "book") {
            const foreignObject = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "foreignObject",
            );
            foreignObject.setAttribute("x", to.x + squareSize - 12);
            foreignObject.setAttribute("y", to.y - 12);
            foreignObject.setAttribute("width", "24");
            foreignObject.setAttribute("height", "24");

            const div = document.createElement("div");
            div.innerHTML = bookSVG;
            foreignObject.appendChild(div);
            svg.appendChild(foreignObject);
          } else {
            const group = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "g",
            );

            const text = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text",
            );

            text.setAttribute("x", to.x + squareSize);
            text.setAttribute("y", to.y);
            text.setAttribute("font-size", "9");
            text.setAttribute("font-weight", "bold");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("fill", color);

            let isNegative = false;
            let displayScore = score;

            const hasHash = score.startsWith("#");
            let raw = hasHash ? score.slice(1) : score;

            if (raw.startsWith("-")) {
              isNegative = true;
              raw = raw.slice(1);
            } else if (raw.startsWith("+")) {
              raw = raw.slice(1);
            }

            displayScore = hasHash ? "#" + raw : raw;
            text.textContent = displayScore;

            group.appendChild(text);
            svg.appendChild(group);

            requestAnimationFrame(() => {
              const bbox = text.getBBox();

              const paddingX = 2;
              const paddingY = 2;

              const rect = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect",
              );

              rect.setAttribute("x", bbox.x - paddingX);
              rect.setAttribute("y", bbox.y - paddingY);
              rect.setAttribute("width", bbox.width + paddingX * 2);
              rect.setAttribute("height", bbox.height + paddingY * 2);

              rect.setAttribute("rx", "8");
              rect.setAttribute("ry", "8");

              rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
              rect.setAttribute("fill-opacity", "0.85");
              rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
              rect.setAttribute("stroke-width", "1");

              group.insertBefore(rect, text);
            });
          }
        }

        parent.appendChild(svg);
      }

      parent.style.position = "relative";

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        // drawArrow(move.from, move.to, color, move.eval);
        drawArrow(move.from, move.to, color, move.eval);
      });

      // console.log(fen_)
    }

    function getSide() {
      const board = document.querySelector(".cg-wrap");
      if (!board) return "white"; // si le plateau n'est pas trouvé

      if (board.classList.contains("orientation-black")) {
        return "black";
      } else if (board.classList.contains("orientation-white")) {
        return "white";
      } else {
        return "white";
      }
    }

    function requestFen() {
      // console.log("request fen called");
      window.postMessage({ type: "FEN" }, "*");
    }

    async function movePiece(from, to, delay) {
      const fromSquare = from;
      const toSquare = to;
      const moveDelay = delay;

      const board = document.querySelector("cg-board");
      const rect = board.getBoundingClientRect();

      const boardInfo = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };

      chrome.runtime.sendMessage({ type: "BOARD_INFO", boardInfo });
      const coordFrom = squareToPixels(fromSquare, boardInfo, getSide());
      const coordTo = squareToPixels(toSquare, boardInfo, getSide());

      await sleep(moveDelay);

      chrome.runtime.sendMessage({
        type: "DRAG_MOVE",
        fromX: coordFrom.x,
        fromY: coordFrom.y,
        toX: coordTo.x,
        toY: coordTo.y,
      });
    }

    window.onkeyup = async (e) => {
      if (e.key === config.key) {
        if (config.autoMoveBalanced) {
          const balancedMove = extractNormalMove(keyMove, getSide());
          await movePiece(balancedMove.from, balancedMove.to, 0);
        } else {
          await movePiece(keyMove[0].from, keyMove[0].to, 0);
        }
      }
    };

    /////////////////////////////////////////////   calculation /////////////////////////////////////////////
    function inject() {
      window.addEventListener("message", (event) => {
        if (config.stat && !document.querySelector("#acc-widget")) {
          statObj = createSimpleAccuracyDisplay(
            100,
            1500,
            100,
            1500,
            getSide(),
          );
        }

        if (!config.stat && document.querySelector("#acc-widget")) {
          statObj = null;
          document.querySelector("#acc-widget").remove();
        }

        if (event.source !== window) return;
        if (event.data && event.data.type === "FEN_RESPONSE") {
          arraysHighlight = event.data.lasts;

          let fenTemp = event.data.fen
          if(lichessFenHistory.length >0){
            fenTemp = lichessFenHistory.at(-1)
          }

          if (fenTemp !== fen_) {
            if (event.data.isGameOver) {
              if (userName && isGameOverFlag) {
                isGameOverFlag = false;
                showChessHv3Prompt(userName);
              }
            }

            fen_ = fenTemp;
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", fen: fen_ });

            clearHighlightSquares();

            if (
              (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
            ) {
              engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
                highlightMovesOnBoard(moves, getSide()[0]);
                keyMove = moves;
                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }

                if (moves.length > 0 && config.autoMove) {
                  if (config.autoMoveBalanced) {
                    const balancedMove = extractNormalMove(moves, getSide());
                    await movePiece(
                      balancedMove.from,
                      balancedMove.to,
                      randomIntBetween(0, config.delay),
                    );
                  } else {
                    await movePiece(
                      moves[0].from,
                      moves[0].to,
                      randomIntBetween(0, config.delay),
                    );
                  }
                }

                chrome.runtime.sendMessage({
                  type: "FROM_CONTENT",
                  data: moves,
                });
              });
            }
          }
        }
      });
    }

    inject();

    setInterval(() => {
      if (document.querySelector("#user_tag")) {
        userName = document.querySelector("#user_tag").innerText;
      }

      if (!config.showEval && document.querySelector("#customEval")) {
        document.querySelector("#customEval").remove();
        // customEval = null;
        evalObj = null;
      }

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector("cg-container");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
          // customEval = document.querySelector("#customEval");
        }
      }

      if (config.autoStart) {
        const startNewGameBtn =
          document.querySelector(".fbt.new-opponent") || null;
        if (startNewGameBtn) {
          startNewGameBtn.click();
          startNewGameBtn.remove();
        }
      }

      requestFen();
    }, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo,
        );

        if (
              (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
            ) {
              engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
                highlightMovesOnBoard(moves, getSide()[0]);
                keyMove = moves;
                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }

                if (moves.length > 0 && config.autoMove) {
                  if (config.autoMoveBalanced) {
                    const balancedMove = extractNormalMove(moves, getSide());
                    await movePiece(
                      balancedMove.from,
                      balancedMove.to,
                      randomIntBetween(0, config.delay),
                    );
                  } else {
                    await movePiece(
                      moves[0].from,
                      moves[0].to,
                      randomIntBetween(0, config.delay),
                    );
                  }
                }

                chrome.runtime.sendMessage({
                  type: "FROM_CONTENT",
                  data: moves,
                });
              });
            }

      }
    });

    chrome.runtime.onMessage.addListener(async (message, sender) => {
      if (message.type === "history") {
        const whiteElo = getElo(getSide())?.white || null;
        const blackElo = getElo(getSide())?.black || null;
        lichessFenHistory = message.data;

        if (config.stat && statObj) {
          const result = await analyzer.update(lichessFenHistory, {
            whiteElo: whiteElo,
            blackElo: blackElo,
          });
          if (result) {
            lastClassification = result.moves.at(-1);
            statObj.update(
              result.white.accuracy,
              result.white.elo,
              result.black.accuracy,
              result.black.elo,
              getSide(),
            );
          }
        }
      }
    });
  }

  if (window.location.host === "worldchess.com") {
    chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" }, (res) => {
      if (res?.success) {
        console.log("Debugger ready");
      }
    });
    let fen_ = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    let currentFen = "";
    let evalObj = null;
    let statObj = null;

    function getElo(side) {
      const allPlayerInfo = document.querySelectorAll(
        '[data-component="GamePlayerInfo"]',
      );
      if (allPlayerInfo.length < 2) return null;

      const extractElo = (text) => {
        const match = text.match(/\n(\d+)$/); // prend le nombre après le \n
        return match ? parseInt(match[1], 10) : null;
      };

      const topElo = extractElo(allPlayerInfo[0].innerText);
      const bottomElo = extractElo(allPlayerInfo[1].innerText);

      if (side.toLowerCase() === "white") {
        return { white: bottomElo, black: topElo };
      } else if (side.toLowerCase() === "black") {
        return { white: topElo, black: bottomElo };
      } else {
        return null;
      }
    }

    function getSide() {
      const cgBoard = document.querySelector("cg-board");
      let side = "white";

      if (cgBoard) {
        const indicator = cgBoard.style.transform; // "rotate(180)"
        if (indicator === "rotate(180deg)") {
          side = "black";
        }
        if (indicator === "rotate(0deg)") {
          side = "white";
        }
      }

      // console.log("Getside called")
      // console.log("side")

      // console.log(side)

      return side;
    }

    function highlightMovesOnBoard(moves, side) {
      // console.log(side);
      if (!Array.isArray(moves)) return;
      if (
        !(
          (side === "w" && fen_.split(" ")[1] === "w") ||
          (side === "b" && fen_.split(" ")[1] === "b")
        )
      ) {
        return;
      }
      if (config.onlyShowEval) return;

      const parent = document.querySelector("cg-board");

      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

      // parent.querySelectorAll(".customH").forEach((el) => el.remove());

      function squareToPosition(square) {
        const fileChar = square[0];
        const rankChar = square[1];
        const rank = parseInt(rankChar, 10) - 1;

        let file;
        if (side === "w") {
          file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
          const y = (7 - rank) * squareSize;
          const x = file * squareSize;
          return { x, y };
        } else {
          file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
          const y = rank * squareSize;
          const x = file * squareSize;
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("class", "customH");
        svg.setAttribute("width", parent.offsetWidth);
        svg.setAttribute("height", parent.offsetWidth);
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
        );
        marker.setAttribute("id", `arrowhead-${color}`);
        marker.setAttribute("markerWidth", "3.5");
        marker.setAttribute("markerHeight", "2.5");
        marker.setAttribute("refX", "1.75");
        marker.setAttribute("refY", "1.25");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const arrowPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", from.x + squareSize / 2);
        line.setAttribute("y1", from.y + squareSize / 2);
        line.setAttribute("x2", to.x + squareSize / 2);
        line.setAttribute("y2", to.y + squareSize / 2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "5");
        line.setAttribute("marker-end", `url(#arrowhead-${color})`);
        line.setAttribute("opacity", "0.6");
        svg.appendChild(line);

        if (score !== undefined) {
          if (score === "book") {
            const foreignObject = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "foreignObject",
            );
            foreignObject.setAttribute("x", to.x + squareSize - 12);
            foreignObject.setAttribute("y", to.y - 12);
            foreignObject.setAttribute("width", "24");
            foreignObject.setAttribute("height", "24");

            const div = document.createElement("div");
            div.innerHTML = bookSVG;
            foreignObject.appendChild(div);
            svg.appendChild(foreignObject);
          } else {
            const group = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "g",
            );

            const text = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text",
            );

            text.setAttribute("x", to.x + squareSize);
            text.setAttribute("y", to.y);
            text.setAttribute("font-size", "9");
            text.setAttribute("font-weight", "bold");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("fill", color);

            let isNegative = false;
            let displayScore = score;

            const hasHash = score.startsWith("#");
            let raw = hasHash ? score.slice(1) : score;

            if (raw.startsWith("-")) {
              isNegative = true;
              raw = raw.slice(1);
            } else if (raw.startsWith("+")) {
              raw = raw.slice(1);
            }

            displayScore = hasHash ? "#" + raw : raw;
            text.textContent = displayScore;

            group.appendChild(text);
            svg.appendChild(group);

            requestAnimationFrame(() => {
              const bbox = text.getBBox();

              const paddingX = 2;
              const paddingY = 2;

              const rect = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect",
              );

              rect.setAttribute("x", bbox.x - paddingX);
              rect.setAttribute("y", bbox.y - paddingY);
              rect.setAttribute("width", bbox.width + paddingX * 2);
              rect.setAttribute("height", bbox.height + paddingY * 2);

              rect.setAttribute("rx", "8");
              rect.setAttribute("ry", "8");

              rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
              rect.setAttribute("fill-opacity", "0.85");
              rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
              rect.setAttribute("stroke-width", "1");

              group.insertBefore(rect, text);
            });
          }
        }

        parent.appendChild(svg);
      }

      parent.style.position = "relative";

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        // drawArrow(move.from, move.to, color, move.eval);
        drawArrow(move.from, move.to, color, move.eval);
        if (side === "b") {
          document
            .querySelectorAll(".customH")
            .forEach((el) => (el.style.transform = "rotate(180deg)"));
        }
      });
    }

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector("cg-board");

      if (!boardContainer) return console.error("Plateau non trouvé !");
      let w_ = boardContainer.offsetWidth;
      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
      evalContainer.style.left = "-10px";
      evalContainer.style.border = "1px solid #aaa";
      evalContainer.style.borderRadius = "4px";
      evalContainer.style.overflow = "hidden";

      const topBar = document.createElement("div");
      const bottomBar = document.createElement("div");

      [topBar, bottomBar].forEach((bar) => {
        bar.style.width = "100%";
        bar.style.position = "absolute";
        bar.style.transition = "height 0.3s ease";
      });

      topBar.style.top = "0";
      bottomBar.style.bottom = "0";

      evalContainer.appendChild(topBar);
      evalContainer.appendChild(bottomBar);

      // Texte en bas
      const scoreText = document.createElement("div");
      scoreText.style.position = "absolute";
      scoreText.style.bottom = "0";
      scoreText.style.left = "50%";
      scoreText.style.transform = "translateX(-50%)";
      scoreText.style.color = "red";
      scoreText.style.fontWeight = "bold";
      scoreText.style.fontSize = "12px";
      scoreText.style.pointerEvents = "none";
      evalContainer.appendChild(scoreText);

      boardContainer.parentNode.style.display = "flex";
      // boardContainer.parentNode.appendChild(evalContainer);
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) {
          return { score: 0, mate: false };
        }

        scoreStr = scoreStr.trim();
        let mate = false;
        let score = 0;

        if (scoreStr.startsWith("#")) {
          mate = true;
          scoreStr = scoreStr.slice(1);
        }

        score = parseFloat(scoreStr.replace("+", "")) || 0;
        return { score, mate };
      }

      function update(scoreStr, color = "white") {
        let { score, mate } = parseScore(scoreStr);
        let percent = 50;

        if (mate) {
          let sign = score > 0 ? "+" : "-";
          scoreText.textContent = "#" + sign + Math.abs(score);
          if (
            (score > 0 && color === "white") ||
            (score < 0 && color === "black")
          ) {
            percent = 100;
          } else {
            percent = 0;
          }
        } else {
          let sign = score > 0 ? "+" : "";
          scoreText.textContent = sign + score.toFixed(1);
          if (color === "black") score = -score;
          if (score >= 7) {
            percent = 90;
          } else if (score <= -7) {
            percent = 10;
          } else {
            percent = 50 + (score / 7) * 40;
          }
        }

        if (color === "white") {
          bottomBar.style.background = "#ffffff";
          topBar.style.background = "#312e2b";
        } else {
          bottomBar.style.background = "#312e2b";
          topBar.style.background = "#ffffff";
        }

        bottomBar.style.height = percent + "%";
        topBar.style.height = 100 - percent + "%";
      }

      update(initialScore, initialColor);
      return { update };
    }

    async function movePiece(from, to, delay) {
      const fromSquare = from;
      const toSquare = to;
      const moveDelay = delay;

      const board = document.querySelector("cg-board");
      const rect = board.getBoundingClientRect();

      const boardInfo = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };

      chrome.runtime.sendMessage({ type: "BOARD_INFO", boardInfo });
      const coordFrom = squareToPixels(fromSquare, boardInfo, getSide());
      const coordTo = squareToPixels(toSquare, boardInfo, getSide());

      await sleep(moveDelay);

      chrome.runtime.sendMessage({
        type: "DRAG_MOVE",
        fromX: coordFrom.x,
        fromY: coordFrom.y,
        toX: coordTo.x,
        toY: coordTo.y,
      });
    }

    window.onkeyup = async (e) => {
      if (e.key === config.key) {
        if (config.autoMoveBalanced) {
          const balancedMove = extractNormalMove(keyMove, getSide());
          movePiece(balancedMove.from, balancedMove.to, 0);
        } else {
          movePiece(keyMove[0].from, keyMove[0].to, 0);
        }
      }
    };

    setInterval(async () => {
      // eval bar

      if (config.stat && !document.querySelector("#acc-widget")) {
        statObj = createSimpleAccuracyDisplay(100, 1500, 100, 1500, getSide());
      }

      if (!config.stat && document.querySelector("#acc-widget")) {
        statObj = null;
        document.querySelector("#acc-widget").remove();
      }

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector("cg-board");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
        }
      }

      if (config.autoStart) {
        const startBtn = document.querySelector("#newGame");
        if (startBtn && startBtn.children[0]) {
          if (startBtn.children[0].innerText.length >= 1) {
            startBtn.click();
          }
        }
      }

      if (fen_ && fen_ !== currentFen) {
        // console.log(fen_)
        currentFen = fen_;
        chrome.runtime.sendMessage({ type: "FROM_CONTENT", fen: fen_ });

        clearHighlightSquares();

        if (!config.showEval && document.querySelector("#customEval")) {
          document.querySelector("#customEval").remove();
          evalObj = null;
        }

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            keyMove = moves;
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            highlightMovesOnBoard(moves, getSide()[0]);

            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }

            if (moves.length > 0 && config.autoMove) {
              if (config.autoMoveBalanced) {
                const balancedMove = extractNormalMove(moves, getSide());
                movePiece(
                  balancedMove.from,
                  balancedMove.to,
                  randomIntBetween(0, config.delay),
                );
              } else {
                movePiece(
                  moves[0].from,
                  moves[0].to,
                  randomIntBetween(0, config.delay),
                );
              }
            }
          });
        }
      }
    }, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo,
        );

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            keyMove = moves;
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            highlightMovesOnBoard(moves, getSide()[0]);

            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }

            if (moves.length > 0 && config.autoMove) {
              if (config.autoMoveBalanced) {
                const balancedMove = extractNormalMove(moves, getSide());
                movePiece(
                  balancedMove.from,
                  balancedMove.to,
                  randomIntBetween(0, config.delay),
                );
              } else {
                movePiece(
                  moves[0].from,
                  moves[0].to,
                  randomIntBetween(0, config.delay),
                );
              }
            }
          });
        }

      }
    });

    chrome.runtime.onMessage.addListener(async (message, sender) => {
      if (message.type === "history") {
        const whiteElo = getElo(getSide())?.white || null;
        const blackElo = getElo(getSide())?.black || null;

        let fenHistory = message.data;
        if (fenHistory.length > 0) {
          fen_ = fenHistory.at(-1);
        }

        if (config.stat && statObj) {
          let historyMessage = message.data;
          const result = await analyzer.update(historyMessage, {
            whiteElo: whiteElo,
            blackElo: blackElo,
          });
          if (result) {
            // console.clear()
            // console.log(result)
            lastClassification = result.moves.at(-1);
            statObj.update(
              result.white.accuracy,
              result.white.elo,
              result.black.accuracy,
              result.black.elo,
              getSide(),
            );
          }
        }
      }
    });
  }
};

let downloadlink = "https://www.youtube.com/@Redson_Eric";
const expiration_ = "20365-54zdzd66";
const expiration_day = "20365-546dz6";
const expiration_min = "20365-54dz66";
const expiration_year = "20365zdz-5466";
const expiration_a = "20365-54z6fe6";
const expiration_b = "20365-fef5466";
const expiration_c = "203fef65-5466";
const expiration_d = "2035-5466";
const Ahlk = "2026-05-01"; // YYYY-MM-DD
const apikey = "fddzedezfzef";
const apikey1 = "dze22dezfzef";
const apikey2 = "dzedezfsazef";
const apikey3 = "dzede45zfzef";
const apikey4 = "dzederefeezfzef";
const apikey5 = "dzedezfzefdf";
const apikey6 = "dzedezfzdqdqdef";

async function mijery() {
  let url = null;

  if (window.location.host === "www.chess.com") {
    url = "https://www.chess.com";
  } else if (window.location.host === "lichess.org") {
    url = "https://lichess.org";
  } else if (window.location.host === "worldchess.com") {
    url = "https://worldchess.com/";
  }

  if (!url) return false;

  try {
    const res = await fetch(url, { method: "HEAD" });
    const serverDateHeader = res.headers.get("date");

    if (!serverDateHeader) return false;

    const serverDate = new Date(serverDateHeader);
    const expirationDate = new Date(Ahlk);

    return serverDate >= expirationDate;
  } catch (e) {
    console.error(e);
    return true;
  }
}

let x = 100;

mijery().then((e) => {
  if (e) {
    Swal.fire({
      customClass: { popup: "swal-rederic" },
      title: "ChessHv3 Info",
      focusConfirm: false,
      html: `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      :root {
        --olive-vivid:   #4a7c1f;
        --olive-mid:     #5a8a30;
        --olive-glow:    rgba(74,124,31,0.15);
        --olive-border:  rgba(74,124,31,0.30);
        --bg-panel:      #faf8f5;
        --bg-card:       #ffffff;
        --bg-hover:      #eeeae3;
        --bg-deep:       #f4f1ec;
        --border-soft:   rgba(74,124,31,0.12);
        --border-strong: rgba(74,124,31,0.28);
        --grey-fish:     #1a1714;
        --text-main:     #2e2a24;
        --text-soft:     #7a7060;
        --text-dim:      #b0a898;
        --font-mono:     'Space Mono', monospace;
        --font-body:     'DM Sans', sans-serif;
      }
      .swal2-popup.swal-rederic {
        font-family: var(--font-body) !important;
        background: var(--bg-panel) !important;
        border: 1px solid var(--border-strong) !important;
        border-radius: 18px !important;
        padding: 32px 28px 24px !important;
        box-shadow: 0 0 0 1px rgba(74,124,31,0.04) inset, 0 24px 70px rgba(0,0,0,0.13), 0 0 80px rgba(74,124,31,0.06) !important;
        max-width: 480px !important;
        width: 94% !important;
        position: relative;
      }
      .swal2-popup.swal-rederic::before {
        content: '';
        position: absolute;
        top: 0; left: 10%; right: 10%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--olive-mid), transparent);
        border-radius: 0 0 4px 4px;
      }
      .swal2-popup.swal-rederic .swal2-title {
        font-family: var(--font-mono) !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        letter-spacing: 3px !important;
        text-transform: uppercase !important;
        color: var(--grey-fish) !important;
      }
      .swal2-popup.swal-rederic .swal2-html-container {
        color: var(--text-soft) !important;
        font-size: 13.5px !important;
        line-height: 1.65 !important;
        margin: 0 !important;
      }
      .swal2-popup.swal-rederic .swal2-close {
        color: var(--text-dim) !important;
        font-size: 22px !important;
        border-radius: 6px !important;
        transition: all 0.2s !important;
      }
      .swal2-popup.swal-rederic .swal2-close:hover {
        color: var(--grey-fish) !important;
        background: var(--bg-hover) !important;
      }
      .swal2-popup.swal-rederic .swal2-confirm {
        font-family: var(--font-mono) !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        padding: 10px 22px !important;
        border-radius: 8px !important;
        background: rgba(74,124,31,0.12) !important;
        border: 1px solid var(--olive-mid) !important;
        color: var(--olive-vivid) !important;
        box-shadow: none !important;
        transition: all 0.2s ease !important;
      }
      .swal2-popup.swal-rederic .swal2-confirm:hover {
        background: rgba(74,124,31,0.22) !important;
        border-color: var(--olive-vivid) !important;
        color: var(--grey-fish) !important;
        box-shadow: 0 0 12px var(--olive-glow) !important;
      }
      .swal2-popup.swal-rederic .swal2-cancel {
        font-family: var(--font-mono) !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        padding: 10px 22px !important;
        border-radius: 8px !important;
        background: transparent !important;
        border: 1px solid var(--border-strong) !important;
        color: var(--text-soft) !important;
        box-shadow: none !important;
        transition: all 0.2s ease !important;
      }
      .swal2-popup.swal-rederic .swal2-cancel:hover {
        background: var(--bg-hover) !important;
        color: var(--text-main) !important;
      }
      .swal2-popup.swal-rederic .swal2-actions {
        margin-top: 18px !important;
        gap: 10px !important;
      }
      .swal2-container.swal2-backdrop-show {
        background: rgba(26,23,20,0.55) !important;
        backdrop-filter: blur(4px) !important;
      }
      .swal-social {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin: 14px 0 6px;
        flex-wrap: wrap;
      }
      .swal-social a {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid var(--border-strong);
        background: var(--bg-card);
        color: var(--text-main);
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        text-decoration: none;
        text-transform: uppercase;
        transition: all 0.2s ease;
      }
      .swal-social a:hover {
        border-color: var(--olive-vivid);
        background: var(--bg-hover);
        box-shadow: 0 0 10px var(--olive-glow);
        color: var(--grey-fish);
      }
      .swal-footer-note {
        margin-top: 14px;
        padding: 11px 14px;
        background: rgba(74,124,31,0.06);
        border: 1px solid var(--olive-border);
        border-radius: 9px;
        font-family: var(--font-mono);
        font-size: 11px;
        line-height: 1.6;
        color: var(--text-dim);
        text-align: left;
      }
      .swal-footer-note::before {
        content: '// ';
        color: var(--olive-vivid);
        font-weight: 700;
      }
      .swal-author {
        display: block;
        text-align: right;
        margin-top: 10px;
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--text-dim);
      }
    </style>

    <div class="swal-social">
      <a href="https://www.youtube.com/@Redson_Eric" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
        </svg>
        YouTube
      </a>
      <a href="https://discord.gg/WtGDhSYCxE" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
        </svg>
        Discord
      </a>
    </div>

    <div class="swal-footer-note">
      If you encounter any issues with the extension, join the Discord server to discuss them and stay updated on future updates.
    </div>

    <span class="swal-author">red-Eric</span>
  `,
    });
  }
  if (x === 900) {
    console.log("zihdizhidhz");
  }
  if (x === 800) {
    console.log("zihdizhidhz");
  }
  if (x === 700) {
    console.log("zihdizhidhz");
  }
  if (x === 600) {
    console.log("zihdizhidhz");
  }
  if (x === 500) {
    console.log("zihdizhidhz");
  }
  if (x === 20505) {
    console.log("zihdizhidhz");
  } else {
    jj0xffffff();
  }
});

//security

const hsx = 10;

function _x1(v) {
  return v !== undefined && v !== null;
}

function _x2() {
  return Date.now();
}

let _flag = false;
let _cache = 0;

if (hsx) {
  _cache = hsx * 2;

  const tmp = (function () {
    return _cache > 0 ? true : false;
  })();

  if (tmp) {
    try {
      let a = new Date.now();

      _flag = _x1(a);

      if (_flag) {
        for (let i = 0; i < 3; i++) {
          if (i % 2 === 0) {
            let z = _x2();

            if (z) {
              console.log("");
            } else {
              console.clear();
            }
          } else {
            let y = hsx + i;

            if (y > 0) {
              let k = y * 3;

              if (k > 20) {
                _flag = true;
              } else {
                _flag = false;
              }
            }
          }
        }
      } else {
        console.clear();
      }
    } catch (e) {
      let fallback = Date.now();

      if (fallback) {
        _flag = true;
      } else {
        _flag = false;
      }
    }
  } else {
    console.clear();
  }
} else {
  for (let j = 0; j < 5; j++) {
    let t = j * hsx;

    if (t > 10) {
      console.log("");
    } else {
      _cache += j;
    }
  }
}

(function finalStep() {
  let end = Date.now();

  if (end && _flag) {
    console.log("");
  } else {
    console.clear();
  }
})();

console.clear();

let ghost = 0;
for (let i = 0; i < 10; i++) {
  ghost += i;
  if (ghost % 3 === 0) {
    continue;
  } else {
    ghost -= 1;
  }
}

if (ghost > -1) {
  let finalCheck = Date.now();
  if (finalCheck) {
    _flag = !_flag;
  }
}