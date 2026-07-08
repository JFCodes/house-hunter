declare enum E_ENGINE_SOURCES {
    IDEALISTA_PORTUGAL = "idealista-portugal",
    REMAX_PORTUGAL = "remax-portugal"
}

declare enum E_ENGINE_TASKS {
    CRAWL_NEW_POSTINGS = "crawl-new-postings",
    UPDATE_POSTING = "update-posting"
}

type T_Source = {
    source: E_ENGINE_SOURCES;
    task: E_ENGINE_TASKS;
    id: string;
    options: {
        location: string;
    };
};

type T_EngineEventExecutionOutcome = 'error-execution' | 'error-arguments' | 'success';
type T_EngineEventExecution = {
    outcome: T_EngineEventExecutionOutcome;
};

type T_EngineEvent<Options extends object> = {
    source: E_ENGINE_SOURCES;
    task: E_ENGINE_TASKS;
    retries: number;
    args: Options;
};

type T_API_RESPONSE_Ping = {
    status: 'ok';
};

export { E_ENGINE_SOURCES, E_ENGINE_TASKS, type T_API_RESPONSE_Ping, type T_EngineEvent, type T_EngineEventExecution, type T_EngineEventExecutionOutcome, type T_Source };
