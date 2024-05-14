import { create } from "zustand";

interface DashboardStore {
    activeTab: string;
    setActiveTab: (active: string) => void;
}

const useDashboardStore = create<DashboardStore>((set) => ({
    activeTab: "home",
    setActiveTab: (active: string) => set({ activeTab: active })
}));

export default useDashboardStore;
