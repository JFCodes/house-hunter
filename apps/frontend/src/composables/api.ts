import type { T_API_RESPONSE_Ping } from '@house-hunter/types'

type RequestOptions = {
  path: string
  method: 'GET'
}

export function useApi () {
  const baseUrl = 'http://localhost:3000/api'

  const ping = () => request<T_API_RESPONSE_Ping>({ path: 'ping', method: 'GET' })

  // Private
  async function request <Response> (options: RequestOptions): Promise<Response> {
    const { method, path } = options
    const url = getUrl(path)

    const init: RequestInit = {
      // ...(body && { body: JSON.stringify(body) }),
      // headers: this.getHeaders(),
      method,
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

  return {
    ping,
  }
}
