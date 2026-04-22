import { Routes, Route } from "react-router-dom";
import { ADMIN_ROUTES } from "@/constants/routes";
import { Dashboard, AdminProductList, AdminCategoryList } from "@/pages/admin";
import { AdminLayout } from "@/components/layout";
import AdminSupplier from "@/pages/admin/AdminSupplier";
import AdminBrand from "@/pages/admin/AdminBrand";
import AdminSize from "@/pages/admin/AdminSize";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<AdminLayout />}>
        <Route path={ADMIN_ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ADMIN_ROUTES.PRODUCTS} element={<AdminProductList />} />
        <Route path={ADMIN_ROUTES.CATEGORIES} element={<AdminCategoryList />} />
        <Route path={ADMIN_ROUTES.SUPPLIER} element={<AdminSupplier />} />
        <Route path={ADMIN_ROUTES.BRAND} element={<AdminBrand />} />
        <Route path={ADMIN_ROUTES.SIZE} element={<AdminSize />} />
        {/* <Route path={ADMIN_ROUTES.IMPORTGOODS} element={<AdminImportGoods />} />
        <Route path={ADMIN_ROUTES.COLOR} element={<AdminColorList />} />
        <Route path={ADMIN_ROUTES.VARIANTS} element={<AdminVariantsList />} />
        <Route path={ADMIN_ROUTES.USER} element={<AdminUserList />} />
        <Route path={ADMIN_ROUTES.COUPON} element={<AdminCouponList />} />
        <Route path={ADMIN_ROUTES.BLOG} element={<AdminBlogList />} />
        <Route path={ADMIN_ROUTES.CHAT} element={<AdminChatList />} />
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
