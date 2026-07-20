import { spawn, type ChildProcess } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

const CDP_PORT = 9222
export const CDP_ENDPOINT = `http://127.0.0.1:${CDP_PORT}`

export function startChrome(): ChildProcess {
  const profilePath = path.resolve('./runtime/idealista-profile')

  const chrome = spawn(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    [
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${profilePath}`,
      '--start-maximized',
      'about:blank',
    ],
    {
      detached: false,
      stdio: 'inherit',
    },
  )

  chrome.on('error', error => {
    console.error('Failed to start Chrome:', error)
  })

  return chrome
}