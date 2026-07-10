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
  SOURCES_MAP: () => SOURCES_MAP
});
module.exports = __toCommonJS(index_exports);
var import_types2 = require("@house-hunter/types");

// src/sources/idealista-portugal.ts
var SourceClass = class {
  async updatePosting(task) {
    console.log("IdealistaPortugalSource:updatePosting");
    return { outcome: "success", postings: [] };
  }
  async crawlNewPostings(task) {
    console.log("IdealistaPortugalSource:crawlNewPostings");
    return { outcome: "success", postings: [] };
  }
};
var IdealistaPortugalSource = new SourceClass();

// src/sources/remax-portugal/crawl-new-postings.ts
var import_types = require("@house-hunter/types");

// src/engine/scripts/get-network-interceptor.ts
function getNetworkInterceptor(page, options) {
  return page.waitForResponse((response) => {
    const url = response.url();
    if (options.status && response.status() !== options.status) return false;
    if (response.request().method() !== options.method) return false;
    if (!url.includes(options.inUrl)) return false;
    return true;
  }).then(async (response) => {
    const request = {};
    try {
      request.payload = response.request().postDataJSON();
    } catch (_) {
    }
    const json = await response.json();
    return json.appErrorCode === void 0 ? { status: response.status(), data: json, request } : null;
  }).catch(() => null);
}

// src/engine/scripts/intercept-network-on-action.ts
async function InterceptNetworkOnAction(options) {
  const { page, action } = options;
  const [response] = await Promise.all([
    getNetworkInterceptor(page, options),
    action(page)
  ]);
  return response;
}

// src/engine/scripts/get-browser-and-page.ts
var import_playwright = require("playwright");
async function GetBrowserAndPage() {
  const browser = await import_playwright.chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { height: 1200, width: 1900 } });
  return { browser, page };
}

// src/sources/remax-portugal/_constants.ts
var BASE_IMAGE_URL = "https://i.maxwork.pt/l-feat";
var BASE_URL = "https://remax.pt/pt";
var SELECTORS = {
  cookieBanner: {
    allowButton: "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection",
    banner: "#CybotCookiebotDialog"
  }
};

// src/sources/remax-portugal/scripts/initialize-browsing.ts
async function initializeBrowsing() {
  const { browser, page } = await GetBrowserAndPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  const banner = page.locator(SELECTORS.cookieBanner.banner);
  if (await banner.isVisible()) {
    const button = banner.locator(SELECTORS.cookieBanner.allowButton);
    await button.waitFor({ state: "visible" });
    await button.click();
    await banner.waitFor({ state: "hidden" });
  }
  return { browser, page };
}

// src/sources/remax-portugal/crawl-new-postings/get-search-url.ts
function getSearchUrl(task) {
  const operationSegment = getPostingOperationSegment(task.options.postingOperation);
  let url = BASE_URL;
  url += `/${getPostingOperationSegment(task.options.postingOperation)}`;
  url += "/imoveis";
  url += `/${getPostingTypesSegment(task.options.postingTypes)}`;
  if (task.options.location) url += `/${task.options.location}`;
  return url;
}
function getPostingOperationSegment(operation) {
  switch (operation) {
    case "rent":
      return "arrendar";
    case "buy":
      return "comprar";
  }
}
function getPostingTypesSegment(types) {
  if (types.length === 0) return `habitacao`;
  const mapTypology = (typology) => {
    switch (typology) {
      case "single-home":
        return "moradia";
      case "apartment":
        return "apartamento";
    }
  };
  return types.map(mapTypology).join(",");
}

// src/sources/remax-portugal/scripts/parse-result.ts
var import_functions = require("@house-hunter/functions");
function parseResult(task, fromSource) {
  const getLocationData = () => {
    const region = [
      fromSource.regionName1 || "",
      fromSource.regionName2 || "",
      fromSource.regionName3 || ""
    ].filter((r) => !!r).join(", ").trim();
    return {
      isExact: fromSource.isExactAddress,
      longitude: fromSource.longitude,
      localZone: fromSource.localZone,
      latitude: fromSource.latitude,
      zipCode: fromSource.zipCode,
      address: fromSource.address,
      region
    };
  };
  const getContactsData = () => ({
    agencyContact: fromSource.userAgencyPhoneNumber,
    userContact: fromSource.userCellPhoneTrimmed,
    agencyName: fromSource.userAgencyName || "",
    username: fromSource.userName
  });
  const getTypologyData = () => {
    const { numberOfBathrooms, numberOfBedrooms } = fromSource;
    const bedAndBathRooms = numberOfBathrooms + numberOfBedrooms;
    const totalRooms = fromSource.totalRooms ?? bedAndBathRooms;
    const otherRooms = Math.max(0, totalRooms - bedAndBathRooms);
    return {
      bedrooms: fromSource.numberOfBedrooms,
      bathrooms: fromSource.numberOfBathrooms,
      parkingSpots: fromSource.garageSpots,
      hasParking: fromSource.parking,
      hasGarage: fromSource.garage,
      totalRooms,
      otherRooms
    };
  };
  const getImagesData = () => {
    const withImageBaseUrl = (url) => `${BASE_IMAGE_URL}/${url}`;
    return {
      images: fromSource.listingPictures.map(withImageBaseUrl),
      main: withImageBaseUrl(fromSource.listingPictureUrl)
    };
  };
  const getAreasData = () => ({
    livingArea: fromSource.livingArea,
    totalArea: fromSource.totalArea,
    builtArea: fromSource.builtArea
  });
  const getUrl = () => {
    return `${BASE_URL}/imoveis/${fromSource.descriptionTags}/${fromSource.listingTitle}`;
  };
  return {
    ...(0, import_functions.F_GetPostingIds)(task.source, fromSource.id),
    _houseHunterFields: (0, import_functions.F_GetPostingEmptyHouseHunterFields)(),
    location: getLocationData(),
    contacts: getContactsData(),
    typology: getTypologyData(),
    images: getImagesData(),
    areas: getAreasData(),
    url: getUrl(),
    constructionYear: fromSource.constructionYear,
    operation: task.options.postingOperation,
    description: fromSource.descriptionTags,
    types: task.options.postingTypes,
    price: fromSource.listingPrice,
    active: fromSource.isActive
  };
}

// src/sources/remax-portugal/crawl-new-postings.ts
async function crawl(task) {
  const { browser, page } = await initializeBrowsing();
  const searchUrl = getSearchUrl(task);
  const response = await InterceptNetworkOnAction({
    action: async (page2) => {
      await page2.goto(searchUrl);
    },
    inUrl: "api/Listing/PaginatedMultiMatchSearch",
    method: "POST",
    status: 200,
    page
  });
  if (!response || !response.data || response.data.results.length === 0) {
    const error = new import_types.Err_TaskExecution(task, "error-execution", "search error or search has no results");
    await browser.close();
    throw error;
  }
  const postings = response.data.results.map((item) => parseResult(task, item));
  await browser.close();
  return { outcome: "success", postings };
}

// src/sources/remax-portugal.ts
var SourceClass2 = class {
  async updatePosting(task) {
    console.log("RemaxPortugalSource:updatePosting");
    return { outcome: "success", postings: [] };
  }
  async crawlNewPostings(task) {
    return crawl(task);
  }
};
var RemaxPortugalSource = new SourceClass2();

// src/index.ts
var SOURCES_MAP = {
  [import_types2.E_TASK_SOURCE.IDEALISTA_PORTUGAL]: IdealistaPortugalSource,
  [import_types2.E_TASK_SOURCE.REMAX_PORTUGAL]: RemaxPortugalSource
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SOURCES_MAP
});
