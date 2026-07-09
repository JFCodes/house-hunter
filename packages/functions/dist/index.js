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
import { E_TASK_TYPE } from "@house-hunter/types";
function F_IsSameTask(leftTask, rightTask) {
  if (leftTask.source !== rightTask.source) return false;
  if (leftTask.type === E_TASK_TYPE.CRAWL_NEW_POSTINGS && rightTask.type === E_TASK_TYPE.CRAWL_NEW_POSTINGS) {
    const { options: leftOptions } = leftTask;
    const { options: rightOptions } = rightTask;
    if (leftOptions.postingOperation !== rightOptions.postingOperation) return false;
    if (leftOptions.location !== rightOptions.location) return false;
    const rightPostingTypes = rightOptions.postingTypes.sort().join(",");
    const leftPostingTypes = leftOptions.postingTypes.sort().join(",");
    if (leftPostingTypes !== rightPostingTypes) return false;
  }
  if (leftTask.type === E_TASK_TYPE.UPDATED_POSTING && rightTask.type === E_TASK_TYPE.UPDATED_POSTING) {
  }
  return true;
}
function F_IsSameTaskExecution(leftExecution, rightExecution) {
  return F_IsSameTask(leftExecution.task, rightExecution.task);
}
export {
  F_GetPostingIds,
  F_IsSameTask,
  F_IsSameTaskExecution
};
