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
  E_ERROR_TYPES: () => E_ERROR_TYPES,
  E_POSTING_USER_STATUS: () => E_POSTING_USER_STATUS,
  E_TASK_SOURCE: () => E_TASK_SOURCE,
  E_TASK_TYPE: () => E_TASK_TYPE,
  Err_TaskExecution: () => Err_TaskExecution
});
module.exports = __toCommonJS(index_exports);

// src/entities/posting.ts
var E_POSTING_USER_STATUS = /* @__PURE__ */ ((E_POSTING_USER_STATUS2) => {
  E_POSTING_USER_STATUS2["NEW"] = "new";
  E_POSTING_USER_STATUS2["DISMISS"] = "dismiss";
  E_POSTING_USER_STATUS2["INTERESTING"] = "interesting";
  E_POSTING_USER_STATUS2["CONTACT_MADE"] = "contact-made";
  E_POSTING_USER_STATUS2["PROPOSAL_MADE"] = "proposal-made";
  E_POSTING_USER_STATUS2["PROPOSAL_ACCEPTED"] = "bought";
  E_POSTING_USER_STATUS2["BOUGHT"] = "bought";
  return E_POSTING_USER_STATUS2;
})(E_POSTING_USER_STATUS || {});

// src/entities/task.ts
var E_TASK_TYPE = /* @__PURE__ */ ((E_TASK_TYPE2) => {
  E_TASK_TYPE2["CRAWL_NEW_POSTINGS"] = "crawl-new-postings";
  E_TASK_TYPE2["UPDATED_POSTING"] = "update-posting";
  return E_TASK_TYPE2;
})(E_TASK_TYPE || {});
var E_TASK_SOURCE = /* @__PURE__ */ ((E_TASK_SOURCE2) => {
  E_TASK_SOURCE2["IDEALISTA_PORTUGAL"] = "idealista-portugal";
  E_TASK_SOURCE2["REMAX_PORTUGAL"] = "remax-portugal";
  return E_TASK_SOURCE2;
})(E_TASK_SOURCE || {});

// src/server/error-interfaces.ts
var E_ERROR_TYPES = /* @__PURE__ */ ((E_ERROR_TYPES2) => {
  E_ERROR_TYPES2["TASK_EXECUTION_ERROR"] = "task-execution-error";
  return E_ERROR_TYPES2;
})(E_ERROR_TYPES || {});
var Err_TaskExecution = class extends Error {
  constructor(task, outcome, details) {
    const errorMessage = `[${task.source.toUpperCase()}][${task.type.toUpperCase()}]: ${details}`;
    super(errorMessage);
    this.task = task;
    this.outcome = outcome;
    this.details = details;
    this.errorType = "task-execution-error" /* TASK_EXECUTION_ERROR */;
    this.name = "task-execution-error" /* TASK_EXECUTION_ERROR */;
    this.message = errorMessage;
  }
  task;
  outcome;
  details;
  errorType;
  message;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  E_ERROR_TYPES,
  E_POSTING_USER_STATUS,
  E_TASK_SOURCE,
  E_TASK_TYPE,
  Err_TaskExecution
});
