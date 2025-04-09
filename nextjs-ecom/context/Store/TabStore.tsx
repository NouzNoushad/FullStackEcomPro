import { TabState } from "@/lib/Constants"
import { create } from "zustand"

type TabStore = {
    selectedTab: TabState,
    setSelectedTab: (tab: TabState) => void
}

export const useTabStore = create<TabStore>((set) => ({
    selectedTab: TabState.General,
    setSelectedTab: (tab) => set({ selectedTab: tab })
}))