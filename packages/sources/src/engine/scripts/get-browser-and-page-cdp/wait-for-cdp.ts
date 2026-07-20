export async function waitForCDP(endpoint: string, timeoutMs = 15_000): Promise<void> {
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${endpoint}/json/version`)
      if (response.ok) return
    } catch {
      // Chrome is not ready yet.
    }

    await new Promise(resolve => setTimeout(resolve, 250))
  }

  throw new Error(`CDP endpoint did not become available: ${endpoint}`)
}