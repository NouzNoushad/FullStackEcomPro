import { create } from "zustand"

type HeaderStore = {
    showProfile: boolean,
    showMenu: boolean,
    setShowProfile: (profile: boolean) => void
    setShowMenu: (menu: boolean) => void
}

export const useHeaderStore = create<HeaderStore>((set) => ({
    showProfile: false,
    showMenu: false,
    setShowProfile: (profile) => set({ showProfile: profile }),
    setShowMenu: (menu) => set({ showMenu: !menu }),
}))