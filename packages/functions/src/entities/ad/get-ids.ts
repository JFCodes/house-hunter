import { E_TARGET, type T_Ad } from '@house-hunter/data-model'

type ReturnType = Pick<T_Ad, 'fromTarget' | 'targetAndId' | 'targetId'>

export function F_AdGetTargetAndId (fromTarget: E_TARGET, targetId: number | string): string {
  return `${fromTarget.toUpperCase()}-${targetId}`
}

export function F_AdGetIds (fromTarget: E_TARGET, targetId: number | string): ReturnType {
  return {
    targetAndId: F_AdGetTargetAndId(fromTarget, targetId),
    targetId: String(targetId),
    fromTarget,
  }
}