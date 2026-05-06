import { create } from "zustand";
import { Cart } from "@/types";

interface CartStoreActions {
  cart: Cart | null;
  setCart: (card: Cart) => void;
  removeCart: () => void;

  isShowCart: boolean;
  setIsShowCart: (isShowCart: boolean) => void;
}
const useCartStore = create<CartStoreActions>((set) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
  removeCart: () => set({ cart: null }),
  isShowCart: false,
  setIsShowCart: (isShowCart) => set({ isShowCart }),
}));

export default useCartStore;
