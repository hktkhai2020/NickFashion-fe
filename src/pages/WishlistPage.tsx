import React from "react";
import { Image, Spin } from "antd";
import { LoadingOutlined, HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useWishlist from "@/hooks/useWishlist";
import useUserStore from "@/store/useUserStore";
import wishlistService from "@/services/wishlistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [_api, contextHolder] = notification.useNotification();
  const userId = useUserStore((state) => state.user?._id);
  const { data: wishlistData, isPending, isError } = useWishlist(userId || "");
  const wishlist = wishlistData?.data || [];

  // Remove from wishlist mutation
  const removeMutation = useMutation({
    mutationFn: (productId: string) =>
      wishlistService.removeFromWishlist(productId, userId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", userId] });
      _api.success({
        message: "Đã xóa khỏi yêu thích",
        placement: "top",
      });
    },
    onError: () => {
      _api.error({
        message: "Xóa thất bại",
        placement: "top",
      });
    },
  });

  const formatPriceDisplay = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  if (isPending) {
    return (
      <div className="lg:w-[70%]! w-full min-h-[300px] border border-[#e5eaf0] rounded-xl flex items-center justify-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
      </div>
    );
  }

  if (isError || !userId) {
    return (
      <div className="lg:w-[70%]! w-full flex flex-col gap-6 border border-[#e5eaf0] rounded-xl lg:p-8! p-4!">
        <div className="flex flex-col items-center justify-center py-16! gap-4">
          <div className="w-16 h-16 rounded-full bg-[#f3f4f6] flex items-center justify-center">
            <HeartOutlined style={{ fontSize: 28, color: "#9ca3af" }} />
          </div>
          <div className="text-center">
            <p className="text-[16px] font-semibold text-[#374151]">
              Bạn chưa đăng nhập
            </p>
            <p className="text-[13px] text-[#9ca3af] mt-1!">
              Vui lòng đăng nhập để xem danh sách yêu thích
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="lg:w-[70%]! w-full flex flex-col gap-6 border border-[#e5eaf0] rounded-xl lg:p-8! p-4!">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#1a1a1a] leading-tight">
              YÊU THÍCH
            </h1>
            <span className="text-[14px] text-[#6b7280] bg-[#f3f4f6] px-3! py-1! rounded-full">
              {wishlist.length} sản phẩm
            </span>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16! gap-4 border border-dashed border-[#d1d5db] rounded-xl bg-[#fafafa]">
            <div className="w-16 h-16 rounded-full bg-[#f3f4f6] flex items-center justify-center">
              <HeartOutlined style={{ fontSize: 28, color: "#9ca3af" }} />
            </div>
            <div className="text-center">
              <p className="text-[16px] font-semibold text-[#374151]">
                Danh sách yêu thích trống
              </p>
              <p className="text-[13px] text-[#9ca3af] mt-1!">
                Hãy thêm sản phẩm bạn thích vào danh sách yêu thích
              </p>
            </div>
            <Link
              to="/"
              className="mt-2! px-6! py-2! bg-[#1a1a1a] text-white text-[14px] font-semibold rounded-lg hover:bg-[#333] transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {wishlist.map((item) => {
              const product = item.productId;
              const discountPercent =
                product.sale?.discountValue && product.priceSell > 0
                  ? Math.round(product.sale.discountValue)
                  : 0;
              const hasDiscount = discountPercent > 0;

              return (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4! bg-white border border-[#e5eaf0] rounded-xl hover:shadow-md hover:border-[#61a678]/30 transition-all duration-300 group"
                >
                  {/* Thumbnail */}
                  <div
                    className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-[#f9fafb] cursor-pointer"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    <Image
                      src={product.thumbnail || ""}
                      fallback="https://via.placeholder.com/96/e5eaf0/9ca3af?text=No+Image"
                      preview={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    <p className="text-[14px] font-semibold text-[#1a1a1a] leading-snug line-clamp-2 group-hover:text-[#61a678] transition-colors">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5!">
                      {product.category?.[0] && (
                        <span className="text-[12px] text-[#6b7280]">
                          {product.category[0].name}
                        </span>
                      )}
                      {product.brand?.name && (
                        <span className="text-[12px] text-[#6b7280]">
                          | {product.brand.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2!">
                      {hasDiscount ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-[14px] font-bold text-[#da291c]">
                            {formatPriceDisplay(product.finalPrice)}
                          </span>
                          <span className="text-[12px] text-[#9ca3af] line-through!">
                            {formatPriceDisplay(product.priceSell)}
                          </span>
                          <span className="text-[11px] text-white bg-[#ef4444] px-1.5! py-0.5! rounded font-bold">
                            -{discountPercent}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-[14px] font-bold text-[#1a1a1a]">
                          {formatPriceDisplay(product.priceSell)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 items-end shrink-0!">
                    <button
                      onClick={() => removeMutation.mutate(product._id)}
                      disabled={removeMutation.isPending}
                      className="w-10 h-10 rounded-full bg-[#fee2e2] hover:bg-[#fecaca] flex items-center justify-center transition-colors group/btn"
                      title="Xóa khỏi yêu thích"
                    >
                      {removeMutation.isPending ? (
                        <Spin size="small" />
                      ) : (
                        <HeartOutlined className="text-[#dc2626] text-[16px]" />
                      )}
                    </button>
                    <button
                      onClick={() => navigate(`/product/${product.slug}`)}
                      className="w-10 h-10 rounded-full bg-[#f3f4f6] hover:bg-[#e5eaf0] flex items-center justify-center transition-colors"
                      title="Xem chi tiết"
                    >
                      <ShoppingOutlined className="text-[#6b7280] text-[16px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Back link */}
        <div className="pt-4! border-t border-[#e5eaf0]">
          <Link
            to="/"
            className="text-[14px] text-[#00613f] font-medium hover:underline"
          >
            ← Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
