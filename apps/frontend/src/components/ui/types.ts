import type { RouteLocationRaw } from 'vue-router'
import type { Component } from 'vue'

export type UiPageTab = {
  icon?: Component
  label: string
  key: string
}

export type IconToggleItem<K extends string> = {
  isActive: boolean
  icon: Component
  key: K
}

export type UiPageTabRoute = UiPageTab & { to: RouteLocationRaw }

export type UiSelectOption<T extends string = string> = {
  value: null | T
  label: string
}

export type T_UI_Toast = {
  type: 'info' | 'success' | 'warning' | 'danger'
  messages?: Array<string>
  title: string
  id: string
}
