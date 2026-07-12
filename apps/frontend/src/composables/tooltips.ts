import { useTooltipStore } from '@/stores/tooltip'
// Components
import TooltipMessage from '@/components/tooltips/t-message.vue'
import { TOOLTIP_POSITION } from '@/stores/tooltip/types'
import type { TooltipMessageProps } from '@/components/tooltips/types'

export function useTooltips () {
  const tooltipStore = useTooltipStore()

  const sourceLocationInfo = (event: MouseEvent, props: TooltipMessageProps) => {
    if (!event.target) return

    tooltipStore.launchTooltip<TooltipMessageProps>(event.target as HTMLElement, {
      position: TOOLTIP_POSITION.RIGHT,
      component: TooltipMessage,
      props
    })
  }

  return {
    sourceLocationInfo
  }
}