// App Routes - Main application routes
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import {
  HomePage,
  ShopPage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  ProfilePage,
  OrderHistoryPage,
  WishlistPage,
  ContactPage,
  AboutPage,
  NotFoundPage,
  ProductFemale,
  ProductMale,
  ProductGirl,
  ProductBoy,
  RunawayCollection,
  SearchPage,
} from "@/pages";
import { MainLayout } from "@/components/layout";
import CustomerLayout from "@/components/layout/CustomerLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={ROUTES.PRODUCT_FEMALE} element={<ProductFemale />} />
        <Route path={ROUTES.PRODUCT_MALE} element={<ProductMale />} />
        <Route path={ROUTES.PRODUCT_GIRL} element={<ProductGirl />} />
        <Route path={ROUTES.PRODUCT_BOY} element={<ProductBoy />} />
        <Route path={ROUTES.RUNAWAY_COLLECTION} element={<RunawayCollection />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />

        {/* customer */}
        <Route path={"customer/"} element={<CustomerLayout />}>
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.ORDER_HISTORY} element={<OrderHistoryPage />} />
        </Route>

        {/* <Route path={ROUTES.PRODUCT_NEW} element={<ProductNew />} /> */}
        {/* <Route path={ROUTES.SHOP} element={<ShopPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.ORDER_HISTORY} element={<OrderHistoryPage />} />
        <Route path={ROUTES.ORDER_DETAIL} element={<OrderHistoryPage />} />
        <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};


export default AppRoutes;
