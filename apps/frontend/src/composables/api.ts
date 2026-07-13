import {
  // Payload
  type T_API_PAYLOAD_PathPostingHunterFields,
  // Responses
  type T_API_RESPONSE_TasksCrawlNewPostingsSearch,
  type T_API_RESPONSE_PostingsSearch,
  type T_API_RESPONSE_Posting,
  type T_API_RESPONSE_Ping,
} from '@house-hunter/types'


type RequestBaseOptions = {
  method: 'GET' | 'POST' | 'PATCH'
  path: string
}

type RequestOptions<Body = never> =
  [Body] extends [never]
    ? RequestBaseOptions
    : RequestBaseOptions & { body: Body }

const baseUrl = `${import.meta.env.VITE_BACKEND_HOST}/api`

export function useApi () {

  const ping = () => request<T_API_RESPONSE_Ping>({ path: 'ping', method: 'GET' })
  const testStuff = () => request({ path: 'test-stuff', method: 'GET' })
  
  const tasks = {
    crawlNewPostings: {
      search: () => request<T_API_RESPONSE_TasksCrawlNewPostingsSearch>({ path: 'tasks/crawl-new-postings/search', method: 'GET' }),
      schedule: (taskId: string) => request({ path: `tasks/crawl-new-postings/${taskId}/schedule`, method: 'POST' })
    }
  }

  const postings = {
    search: () => request<T_API_RESPONSE_PostingsSearch>({ path: 'postings/search', method: 'GET' }),
    pathHunterFields: (postingId: string, fields: Partial<T_API_PAYLOAD_PathPostingHunterFields>) => {
      return request<T_API_RESPONSE_Posting, T_API_PAYLOAD_PathPostingHunterFields>({
        path: `postings/${postingId}/hunter-fields`,
        method: 'PATCH',
        body: fields,
      })
    }
  }

  // Private
  async function request <Response, Body = never> (options: RequestOptions<Body>): Promise<Response> {
    const { method, path } = options
    const url = getUrl(path)
    const body = 'body' in options
      ? JSON.stringify(options.body)
      : null

    const init: RequestInit = {
      headers: getHeaders(),
      method,
      body,
    }

    const response = await fetch(url, init)
    const responseText = await response.text()
    const contentType = response.headers.get('content-type') ?? ''
    const expectedJson = contentType.includes('application/json')

    try {
      return JSON.parse(responseText) as Response
    } catch (error) {
      if (expectedJson) throw error
      return responseText as Response
    }
  }

  function getUrl (path: string): string {
    const url = new URL(`${baseUrl}/${path}`)
    return url.href
  }

  function getHeaders (): Record<string, string> {
    return {
      'Content-Type': 'application/json',
    }
  }

  return {
    testStuff,
    ping,
    postings,
    tasks,
  }
}
