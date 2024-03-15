import type { UserType } from "@/types/user-type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthStoreState {
    isSignedIn: boolean;
    token: string | null;
    user: UserType | null;
    toggleSignedIn: () => void;
    setToken: (token: string) => void;
    setUser: (user: UserType) => void;
    signout: () => void;
}

const useAuthStore = create<AuthStoreState>()(
    devtools(
        persist(
            (set) => ({
                isSignedIn: false,
                token: null,
                user: null,
                toggleSignedIn: () => set((state) => ({ isSignedIn: !state.isSignedIn })),
                setToken: (token) => set({ token }),
                setUser: (user) => set({ user }),
                signout: () => set({ isSignedIn: false, token: null, user: null })
            }),
            {
                name: "auth-storage"
            }
        )
    )
);

export default useAuthStore;
