import { create } from "zustand";

interface UserStore {
  authType: [];
  googleId: string | null;
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string | null;
  gender: string;
  address: string | null;
  avatar: string | null;
  role: "user" | "admin";
  resetPasswordToken: string | null;
  resetPasswordExpires: string | null;
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  emailVerifiedAt: string | null;
  isActive: boolean;
  isDeleted: boolean;
  lastLogin: string | null;
  loginCount: number;
  addresses: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  defaultAddress: null;
  id: string;
}
interface UserStoreActions {
  user: UserStore | null;
  setUser: (user: UserStore) => void;
  removeUser: () => void;
}
const useUserStore = create<UserStoreActions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));

export default useUserStore;
