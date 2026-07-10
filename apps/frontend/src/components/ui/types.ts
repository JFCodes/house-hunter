import type { RouteLocationRaw } from 'vue-router'
import type { Component } from 'vue'

export type UiPageTab = {
  icon?: Component
  label: string
  key: string
}

export type UiPageTabRoute = UiPageTab & { to: RouteLocationRaw }
