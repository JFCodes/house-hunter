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
  F_GetPostingEmptyHouseHunterFields: () => F_GetPostingEmptyHouseHunterFields,
  F_GetPostingIds: () => F_GetPostingIds,
  F_IsSameTask: () => F_IsSameTask,
  F_IsSameTaskExecution: () => F_IsSameTaskExecution
});
module.exports = __toCommonJS(index_exports);

// src/entities/get-posting-empty-house-hunter-fields.ts
var import_types = require("@house-hunter/types");
function F_GetPostingEmptyHouseHunterFields() {
  return {
    userStatus: import_types.E_POSTING_USER_STATUS.NEW,
    created: (/* @__PURE__ */ new Date()).getTime(),
    proposedAmount: 0,
    dismissedAt: 0,
    notes: ""
  };
}

// src/entities/get-posting-id.ts
function F_GetPostingIds(source, sourceId) {
  return {
    idWithSource: `${source.toUpperCase()}-${sourceId}`,
    sourceId: String(sourceId),
    id: crypto.randomUUID(),
    source
  };
}

// src/entities/is-same-task.ts
var import_types2 = require("@house-hunter/types");
function F_IsSameTask(leftTask, rightTask) {
  if (leftTask.source !== rightTask.source) return false;
  if (leftTask.type === import_types2.E_TASK_TYPE.CRAWL_NEW_POSTINGS && rightTask.type === import_types2.E_TASK_TYPE.CRAWL_NEW_POSTINGS) {
    const { options: leftOptions } = leftTask;
    const { options: rightOptions } = rightTask;
    if (leftOptions.postingOperation !== rightOptions.postingOperation) return false;
    if (leftOptions.location !== rightOptions.location) return false;
    const rightPostingTypes = rightOptions.postingTypes.sort().join(",");
    const leftPostingTypes = leftOptions.postingTypes.sort().join(",");
    if (leftPostingTypes !== rightPostingTypes) return false;
  }
  if (leftTask.type === import_types2.E_TASK_TYPE.UPDATED_POSTING && rightTask.type === import_types2.E_TASK_TYPE.UPDATED_POSTING) {
  }
  return true;
}
function F_IsSameTaskExecution(leftExecution, rightExecution) {
  return F_IsSameTask(leftExecution.task, rightExecution.task);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  F_GetPostingEmptyHouseHunterFields,
  F_GetPostingIds,
  F_IsSameTask,
  F_IsSameTaskExecution
});
