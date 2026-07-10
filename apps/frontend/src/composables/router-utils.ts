import { type ComputedRef, computed } from 'vue'
import { useRoute } from 'vue-router'
// App
import type { E_ROUTER_PARAMS } from '@/router/enums'

export function useRouterUtils () {
  const route = useRoute()

  const computedStringParam = (param: E_ROUTER_PARAMS): ComputedRef => {
    return computed(() => getStringParam(param))
  }

  // 'Private'
  function getStringParam (param: E_ROUTER_PARAMS): null | string {
    const value = route.params[param]
    return typeof value === 'string' ? value : null
  }

  return {
    computedStringParam
  }
}
