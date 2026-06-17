import { Routes, Route } from "react-router-dom";
import { ADMIN_ROUTES } from "@/constants/routes";
import { Dashboard, AdminProduct, AdminCategoryList, AdminSellInvoice } from "@/pages/admin";
import { AdminLayout } from "@/components/layout";
import AdminSupplier from "@/pages/admin/AdminSupplier";
import AdminBrand from "@/pages/admin/AdminBrand";
import AdminSize from "@/pages/admin/AdminSize";
import AdminColor from "@/pages/admin/AdminColor";
import AdminVariant from "@/pages/admin/AdminVariant";
import AdminCoupon from "@/pages/admin/AdminCoupon";
import AdminSellingData from "@/pages/admin/AdminSellingData";
import AdminGoodsReceipt from "@/pages/admin/AdminGoodsReceipt";
import AdminImportStatistics from "@/pages/admin/AdminImportStatistics";
import AdminUsers from "@/pages/admin/AdminUsers";
import { NotFoundPage } from "@/pages";
import AdminChat from "@/pages/admin/AdminChat";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<AdminLayout />}>
        <Route path={ADMIN_ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ADMIN_ROUTES.SELLING_DATA} element={<AdminSellingData />} />
        <Route path={ADMIN_ROUTES.PRODUCTS} element={<AdminProduct />} />
        <Route path={ADMIN_ROUTES.CATEGORIES} element={<AdminCategoryList />} />
        <Route path={ADMIN_ROUTES.SUPPLIER} element={<AdminSupplier />} />
        <Route path={ADMIN_ROUTES.BRAND} element={<AdminBrand />} />
        <Route path={ADMIN_ROUTES.SIZE} element={<AdminSize />} />
        <Route path={ADMIN_ROUTES.COLOR} element={<AdminColor />} />
        <Route path={ADMIN_ROUTES.VARIANTS} element={<AdminVariant />} />
        <Route path={ADMIN_ROUTES.COUPON} element={<AdminCoupon />} />
        <Route path={ADMIN_ROUTES.SELLINVOICE} element={<AdminSellInvoice />} />
        <Route path={ADMIN_ROUTES.GOODSRECEIPT} element={<AdminGoodsReceipt />} />
        <Route path={ADMIN_ROUTES.IMPORTSTATISTICS} element={<AdminImportStatistics />} />
        <Route path={ADMIN_ROUTES.USERS} element={<AdminUsers />} />
        <Route path={ADMIN_ROUTES.CHAT} element={<AdminChat />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
