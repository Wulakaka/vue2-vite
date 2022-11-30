import { defineStore } from 'pinia'
import type { Wrapper } from '@/views/ListView/types'
export const useDraggingItemStore = defineStore({
  id: 'draggingItem',
  state: (): {
    item: null | Wrapper
  } => ({
    item: null,
  }),
  actions: {
    set(val: Wrapper | null) {
      this.item = val
    },
  },
})
