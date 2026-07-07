import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
// App
import { useApi } from '@/composables/api'

export const useServerStatusStore = defineStore('server-status', () => {
  const { ping } = useApi()

  const isInitializing = ref(true)
  const serverOk = ref(true)

  const checkStatus = async (): Promise<void> => {
    serverOk.value = await ping()
      .then(result => result.status === 'ok')
      .catch(() => false)
  }

  // Private
  async function initialize (): Promise<void> {
    await checkStatus()
    isInitializing.value = false
  }

  onMounted(() => initialize())

  return {
    isInitializing,
    serverOk
  }
})
