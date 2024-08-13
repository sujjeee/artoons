import { create } from "zustand"

type RefetchStore = {
  refetchTrigger: number
  triggerRefetch: () => void
}

export const useRefetchStore = create<RefetchStore>((set) => ({
  refetchTrigger: 0,
  triggerRefetch: () =>
    set((state) => ({ refetchTrigger: state.refetchTrigger + 1 })),
}))
