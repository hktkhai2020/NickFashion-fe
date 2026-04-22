import { create } from "zustand";
import { User } from "@/types";

interface UserStoreActions {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}
const useUserStore = create<UserStoreActions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));

export default useUserStore;
