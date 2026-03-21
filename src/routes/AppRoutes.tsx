// App Routes - Main application routes
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
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
} from '@/pages';
import { MainLayout } from '@/components/layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.SHOP} element={<ShopPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.ORDER_HISTORY} element={<OrderHistoryPage />} />
        <Route path={ROUTES.ORDER_DETAIL} element={<OrderHistoryPage />} />
        <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
