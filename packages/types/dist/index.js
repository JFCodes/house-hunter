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
export {
  E_ERROR_TYPES,
  E_TASK_SOURCE,
  E_TASK_TYPE,
  Err_TaskExecution
};
