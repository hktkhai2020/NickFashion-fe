import { Routes, Route } from "react-router-dom";
import { ADMIN_ROUTES } from "@/constants/routes";
import { Dashboard, AdminProduct, AdminCategoryList } from "@/pages/admin";
import { AdminLayout } from "@/components/layout";
import AdminSupplier from "@/pages/admin/AdminSupplier";
import AdminBrand from "@/pages/admin/AdminBrand";
import AdminSize from "@/pages/admin/AdminSize";
import AdminColor from "@/pages/admin/AdminColor";
import AdminVariant from "@/pages/admin/AdminVariant";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<AdminLayout />}>
        <Route path={ADMIN_ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ADMIN_ROUTES.PRODUCTS} element={<AdminProduct />} />
        <Route path={ADMIN_ROUTES.CATEGORIES} element={<AdminCategoryList />} />
        <Route path={ADMIN_ROUTES.SUPPLIER} element={<AdminSupplier />} />
        <Route path={ADMIN_ROUTES.BRAND} element={<AdminBrand />} />
        <Route path={ADMIN_ROUTES.SIZE} element={<AdminSize />} />
        <Route path={ADMIN_ROUTES.COLOR} element={<AdminColor />} />
        <Route path={ADMIN_ROUTES.VARIANTS} element={<AdminVariant />} />
        {/* <Route path={ADMIN_ROUTES.IMPORTGOODS} element={<AdminImportGoods />} />
        <Route path={ADMIN_ROUTES.VARIANTS} element={<AdminVariants />} />
        <Route path={ADMIN_ROUTES.USER} element={<AdminUser />} />
        <Route path={ADMIN_ROUTES.COUPON} element={<AdminCoupon />} />
        <Route path={ADMIN_ROUTES.BLOG} element={<AdminBlog />} />
        <Route path={ADMIN_ROUTES.CHAT} element={<AdminChat />} />
        <Route
          path={ADMIN_ROUTES.SELLINVOICE}
          element={<AdminSellInvoiceList />}
        />
        <Route
          path={ADMIN_ROUTES.GOODSRECEIPT}
          element={<AdminGoodsReceiptList />}
        />
        <Route path={ADMIN_ROUTES.STATISTICAL} element={<AdminStatistical />} /> */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
