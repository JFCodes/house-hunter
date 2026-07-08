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
export {
  E_ENGINE_SOURCES,
  E_ENGINE_TASKS
};
