"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  E_ENGINE_SOURCES: () => E_ENGINE_SOURCES,
  E_ENGINE_TASKS: () => E_ENGINE_TASKS
});
module.exports = __toCommonJS(index_exports);

// src/server/engine-sources.ts
var E_ENGINE_SOURCES = /* @__PURE__ */ ((E_ENGINE_SOURCES2) => {
  E_ENGINE_SOURCES2["IDEALISTA_PORTUGAL"] = "idealista-portugal";
  E_ENGINE_SOURCES2["REMAX_PORTUGAL"] = "remax-portugal";
  return E_ENGINE_SOURCES2;
})(E_ENGINE_SOURCES || {});

// src/server/engine-tasks.ts
var E_ENGINE_TASKS = /* @__PURE__ */ ((E_ENGINE_TASKS2) => {
  E_ENGINE_TASKS2["CRAWL_NEW_POSTINGS"] = "crawl-new-postings";
  E_ENGINE_TASKS2["UPDATE_POSTING"] = "update-posting";
  return E_ENGINE_TASKS2;
})(E_ENGINE_TASKS || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  E_ENGINE_SOURCES,
  E_ENGINE_TASKS
});
