import type {
  // Payload
  // Responses
  T_API_RESPONSE_DiscoveryTasks,
  T_API_RESPONSE_AdSearch,
  T_API_RESPONSE_Ping,
  T_API_Pagination,
} from '@house-hunter/data-model'

type QueryValues = Record<string, string | number>

type RequestBaseOptions = {
  method: 'GET' | 'POST' | 'PATCH'
  path: string
  query?: QueryValues
}

type RequestOptions<Body = never> =
  [Body] extends [never]
    ? RequestBaseOptions
    : RequestBaseOptions & { body: Body }

const baseUrl = `${import.meta.env.VITE_BACKEND_HOST}/api`

export function useApi () {

  const ping = () => request<T_API_RESPONSE_Ping>({ path: 'ping', method: 'GET' })
  const testStuff = () => request({ path: 'test-stuff', method: 'GET' })
  
  const discoveryTasks = {
    schedule: (taskId: string) => request({ path: `discovery-tasks/${taskId}/schedule`, method: 'POST' }),
    get: () => request<T_API_RESPONSE_DiscoveryTasks>({ path: 'discovery-tasks', method: 'GET' }),
  }

  const ads = {
    search: (query: T_API_Pagination) => request<T_API_RESPONSE_AdSearch, never>({
      method: 'GET',
      path: 'ads',
      query,
    })
  }

  // Private
  async function request <Response, Body = never> (
    options: RequestOptions<Body>
  ): Promise<Response> {
    const { method, query, path } = options
    const url = getUrl(path, query)
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

  function getUrl (path: string, query?: QueryValues): string {
    const url = new URL(`${baseUrl}/${path}`)

    if(query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.set(key, String(value))
      })
    }

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
    discoveryTasks,
    ads
  }
}
