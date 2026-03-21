import { Routes, Route } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import {
  Dashboard,
  AdminProductList,
  AdminProductForm,
  AdminCategoryList,
  AdminCategoryForm,
  AdminOrderList,
  AdminOrderDetail,
  AdminCustomerList,
} from '@/pages/admin';
import { AdminLayout } from '@/components/layout';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={ADMIN_ROUTES.DASHBOARD} element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProductList />} />
        <Route path="products/add" element={<AdminProductForm />} />
        <Route path="products/:id/edit" element={<AdminProductForm />} />
        <Route path="categories" element={<AdminCategoryList />} />
        <Route path="categories/add" element={<AdminCategoryForm />} />
        <Route path="categories/:id/edit" element={<AdminCategoryForm />} />
        <Route path="orders" element={<AdminOrderList />} />
        <Route path="orders/:id" element={<AdminOrderDetail />} />
        <Route path="customers" element={<AdminCustomerList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
