declare enum E_TASK_TYPE {
    CRAWL_NEW_POSTINGS = "crawl-new-postings",
    UPDATED_POSTING = "update-posting"
}
declare enum E_TASK_SOURCE {
    IDEALISTA_PORTUGAL = "idealista-portugal",
    REMAX_PORTUGAL = "remax-portugal"
}
type T_BaseTask<T extends E_TASK_TYPE> = {
    source: E_TASK_SOURCE;
    createdAt: number;
    id: string;
    type: T;
};
type T_TaskCrawlNewPostings = T_BaseTask<E_TASK_TYPE.CRAWL_NEW_POSTINGS> & {
    options: {
        postingOperation: T_PostingOperation;
        postingTypes: Array<T_PostingType>;
        location: string;
    };
};
type T_TaskUpdatePosting = T_BaseTask<E_TASK_TYPE.UPDATED_POSTING> & {
    options: {};
};
type T_Task = T_TaskCrawlNewPostings | T_TaskUpdatePosting;
type T_TaskCrawlNewPostingsWithStatus = T_TaskCrawlNewPostings & {
    isActive: boolean;
};

declare enum E_POSTING_USER_STATUS {
    NEW = "new",
    DISMISS = "dismiss",
    INTERESTING = "interesting",
    CONTACT_MADE = "contact-made",
    PROPOSAL_MADE = "proposal-made",
    PROPOSAL_ACCEPTED = "bought",
    BOUGHT = "bought"
}
type T_PostingOperation = 'rent' | 'buy';
type T_PostingType = 'single-home' | 'apartment';
type T_PostingLocation = {
    isExact: boolean;
    longitude: number;
    latitude: number;
    localZone: string;
    zipCode: string;
    address: string;
    region: string;
};
type T_PostingAreas = {
    builtArea: null | number;
    livingArea: number;
    totalArea: number;
};
type T_PostingTypology = {
    bedrooms: number;
    bathrooms: number;
    otherRooms: number;
    totalRooms: null | number;
    hasParking: boolean;
    hasGarage: boolean;
    parkingSpots: number;
};
type T_PostingImages = {
    main: string;
    images: Array<string>;
};
type T_PostingContacts = {
    agencyContact: string;
    agencyName: string;
    userContact: string;
    username: string;
};
type T_PostingHouseHunterFields = {
    userStatus: E_POSTING_USER_STATUS;
    proposedAmount: number;
    dismissedAt: number;
    created: number;
    notes: string;
};
type T_Posting = {
    _houseHunterFields: T_PostingHouseHunterFields;
    location: T_PostingLocation;
    contacts: T_PostingContacts;
    typology: T_PostingTypology;
    images: T_PostingImages;
    areas: T_PostingAreas;
    operation: T_PostingOperation;
    types: Array<T_PostingType>;
    constructionYear: number;
    source: E_TASK_SOURCE;
    idWithSource: string;
    description: string;
    sourceId: string;
    active: boolean;
    price: number;
    url: string;
    id: string;
};

type T_TaskExecutionOutcome = 'error-invalid-task-source' | 'error-invalid-task-type' | 'error-execution' | 'error-arguments' | 'error-unknown' | 'success';
type T_TaskExecution = {
    maxRetries: number;
    startedAt: number;
    endedAt: number;
    task: T_Task;
};
type T_TaskExecutionResult = {
    outcome: T_TaskExecutionOutcome;
    error?: Err_TaskExecution;
    postings: Array<T_Posting>;
};

declare enum E_ERROR_TYPES {
    TASK_EXECUTION_ERROR = "task-execution-error"
}
declare class Err_TaskExecution extends Error {
    readonly task: T_Task;
    readonly outcome: T_TaskExecutionOutcome;
    readonly details: string;
    errorType: E_ERROR_TYPES;
    message: string;
    constructor(task: T_Task, outcome: T_TaskExecutionOutcome, details: string);
}

type T_API_RESPONSE_TasksCrawlNewPostingsSearch = Array<T_TaskCrawlNewPostingsWithStatus>;
type T_API_RESPONSE_PostingsSearch = Array<T_Posting>;
type T_API_RESPONSE_Ping = {
    status: 'ok';
};

export { E_ERROR_TYPES, E_POSTING_USER_STATUS, E_TASK_SOURCE, E_TASK_TYPE, Err_TaskExecution, type T_API_RESPONSE_Ping, type T_API_RESPONSE_PostingsSearch, type T_API_RESPONSE_TasksCrawlNewPostingsSearch, type T_Posting, type T_PostingAreas, type T_PostingContacts, type T_PostingHouseHunterFields, type T_PostingImages, type T_PostingLocation, type T_PostingOperation, type T_PostingType, type T_PostingTypology, type T_Task, type T_TaskCrawlNewPostings, type T_TaskCrawlNewPostingsWithStatus, type T_TaskExecution, type T_TaskExecutionOutcome, type T_TaskExecutionResult, type T_TaskUpdatePosting };
