import { LinksType } from "@/lib/Constants"
import { create } from "zustand"

type SidebarStore = {
    selectedLink: LinksType,
    setSelectedLink: (link: LinksType) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    selectedLink: LinksType.Products,
    setSelectedLink: (link) => set({ selectedLink: link }),
}))