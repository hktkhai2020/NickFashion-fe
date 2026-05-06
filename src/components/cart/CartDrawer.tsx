import useCartStore from "@/store/useCartStore";
import { Drawer, Divider, Spin } from "antd";
import { useWindowSize } from "@/hooks/useWindowSize";
import {
  ArrowRightOutlined,
  CheckOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { formatPrice } from "@/utils";
import { useMemo, useState } from "react";
import useCart from "@/hooks/useCart";
import ConfirmDeleteItem from "@/components/cart/confirmDeleteItem";
import ApplyDiscount from "@/components/cart/applyDiscount";
import { useNavigate } from "react-router-dom";
const CartDrawer = () => {
  const navigate = useNavigate();
  const isShowCart = useCartStore((state) => state.isShowCart);
  const cart = useCartStore((state) => state.cart);
  const {
    handleRemoveItem,
    contextHolder,
    isLoading,
    handleToggleCartItem,
    handleSelectAllCartItems,
    handleUnselectAllCartItems,
    handleUpdateCartItemQuantity,
  } = useCart();
  const setIsShowCart = useCartStore((state) => state.setIsShowCart);
  const { width } = useWindowSize();
  const [isOpenConfirmDeleteItem, setIsOpenConfirmDeleteItem] = useState(false);
  const [isOpenApplyDiscount, setIsOpenApplyDiscount] = useState(false);
  const [variantIdToDelete, setVariantIdToDelete] = useState<string | null>(
    null,
  );

  const footerCart = useMemo(() => {
    return (
      <div className="w-full ">
        <div
          className="flex justify-between cursor-pointer pt-[20px]! items-center"
          onClick={() => setIsOpenApplyDiscount(true)}
        >
          <div className="flex gap-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
            >
              <path
                d="M15.668 3.336H4.335c-.934 0-1.4 0-1.757.182-.314.16-.569.414-.728.728-.182.356-.182.823-.182 1.757v1.083a2.917 2.917 0 110 5.833v1.084c0 .933 0 1.4.182 1.756.16.314.414.569.728.729.357.181.823.181 1.757.181h11.333c.933 0 1.4 0 1.757-.181a1.67 1.67 0 00.728-.729c.182-.356.182-.823.182-1.756v-1.084a2.917 2.917 0 010-5.833V6.003c0-.934 0-1.4-.182-1.757a1.667 1.667 0 00-.728-.728c-.357-.182-.824-.182-1.757-.182zM7.5 12.406l4.904-4.903"
                stroke="#333F48"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                cx="8.163"
                cy="8.188"
                r=".417"
                transform="rotate(-45 8.163 8.188)"
                fill="#333F48"
                stroke="#333F48"
                stroke-width="1.5"
              />
              <circle
                cx="11.699"
                cy="11.719"
                r=".417"
                transform="rotate(-45 11.699 11.719)"
                fill="#333F48"
                stroke="#333F48"
                stroke-width="1.5"
              />
            </svg>
            <span className="text-[15px] text-[#333f48] font-bold">
              Mã ưu đãi
            </span>
          </div>
          <div className="text-[15px] text-[#333f48] font-[400400]">
            Chọn hoặc nhập mã <ArrowRightOutlined />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col ">
          <div className="flex justify-between">
            <div className="text-[15px] text-[#333f48] font-[400]">
              Giá trị đơn hàng
            </div>
            <div>{formatPrice(cart?.subtotal || 0)}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-[15px] text-[#333f48] font-[400]">
              Giảm giá từ Voucher
            </div>
            <div className="text-[#d80c0c]">
              -{" "}
              {formatPrice(
                cart?.appliedCoupon.code ? cart?.subtotal - cart?.total : 0,
              )}
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex justify-between mb-[10px]!">
          <div className="text-[15px] text-[#333f48] font-[700]">Tổng tiền</div>
          <div className="text-[#333f48] font-[700]">
            {formatPrice(cart?.total || 0)}
          </div>
        </div>
        <div
          className="w-full py-[13px]! text-[15px] text-white bg-[#da291c] font-bold text-center cursor-pointer"
          onClick={() => {
            navigate("/checkout");
            setIsShowCart(false);
          }}
        >
          THANH TOÁN
        </div>
      </div>
    );
  }, [cart]);

  return (
    <>
      {contextHolder}
      <Drawer
        title="Giỏ hàng"
        open={isShowCart}
        onClose={() => setIsShowCart(false)}
        width={width > 1024 ? 600 : "100%"}
        footer={footerCart}
        styles={{
          mask: {
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Spin spinning={isLoading}>
          <div className="w-full flex flex-col   ">
            {/* info free shipping */}
            <div className="flex items-center gap-2">
              <CheckOutlined className="text-[#74aa8e]! rounded-2xl bg-[#c7ddb9]!" />
              <span className="text-[12px] text-[#74aa8e]">
                Bạn được miễn phí vận chuyển
              </span>
            </div>
            <Divider />

            {/* main cart */}
            <div className="w-fill  flex justify-between  mb-[20px]!">
              <div className="flex items-center gap-[10px]">
                <input
                  type="checkbox"
                  className="w-[20px] h-[20px] rounded-full border border-[#333f48]! cursor-pointer accent-[#333f48]"
                  checked={cart?.selectedItemCount === cart?.items.length}
                  onChange={() => {
                    if (cart?.selectedItemCount === cart?.items.length) {
                      handleUnselectAllCartItems();
                    } else {
                      handleSelectAllCartItems();
                    }
                  }}
                />
                <span className="text-[14px] text-[#333f48] font-[500]">
                  Chọn tất cả
                </span>
              </div>
              <div className="text-[12px] text-[#74869b] ">
                Bạn đã chọn {cart?.selectedItemCount} sản phẩm
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              {cart?.items.map((item) => (
                <>
                  <div className="w-full flex justify-between">
                    <div className="w-full flex gap-[10px] ">
                      <div className="w-[20px] h-[20px] shrink-0 flex self-center ">
                        <input
                          type="checkbox"
                          className="w-[20px] h-[20px] rounded-full border border-[#333f48]! cursor-pointer accent-[#333f48]"
                          checked={item.selected}
                          onChange={() => {
                            handleToggleCartItem(item.variantId._id);
                          }}
                        />
                      </div>
                      <div className="w-[88px] h-[110px] shrink-0 rounded-[4px] overflow-hidden bg-[#f5f5f5]">
                        <img src={item.productId.thumbnail} alt="" />
                      </div>
                      <div className="flex flex-col justify-between ">
                        <div className="flex flex-col gap-[5px]">
                          <div> {item.productId.name}</div>
                          <div className="text-[12px] text-[#74869b]">
                            {" "}
                            {item.variantId.color.name} -{" "}
                            {item.variantId.size.name}{" "}
                          </div>
                        </div>
                        <div className="text-[15px] text-[#333f48] font-bold">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>

                    <div className="flex  flex-col justify-between">
                      <div
                        className="w-[30px] h-[30px] shrink-0 bg-[#f4f6f9]! rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e0e0e0]! transition-all duration-300 self-end"
                        onClick={() => {
                          setIsOpenConfirmDeleteItem(true);
                          setVariantIdToDelete(item.variantId._id);
                        }}
                      >
                        <DeleteOutlined />
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <MinusOutlined
                          onClick={() => {
                            if (item.quantity > 1) {
                              handleUpdateCartItemQuantity({
                                variantId: item.variantId._id,
                                quantity: item.quantity - 1,
                              });
                            } else {
                              setIsOpenConfirmDeleteItem(true);
                              setVariantIdToDelete(item.variantId._id);
                            }
                          }}
                          className={`w-[30px] h-[30px] shrink-0 bg-white rounded-full border border-[#333f48]! flex items-center justify-center  hover:bg-[#e0e0e0]! transition-all duration-300 ${item.variantId.stock > item.quantity ? "cursor-pointer" : "text-[#f4f6f9] cursor-not-allowed "}`}
                        />
                        <span className="text-[14px] text-[#333f48] font-bold ">
                          {item.quantity}
                        </span>

                        <PlusOutlined
                          onClick={() => {
                            if (item.variantId.stock > item.quantity) {
                              handleUpdateCartItemQuantity({
                                variantId: item.variantId._id,
                                quantity: item.quantity + 1,
                              });
                            }
                          }}
                          className={`w-[30px] h-[30px] shrink-0 bg-white rounded-full border border-[#333f48]! flex items-center justify-center  hover:bg-[#e0e0e0]! transition-all duration-300 ${item.variantId.stock > item.quantity ? "cursor-pointer" : "text-[#f4f6f9] cursor-not-allowed "}`}
                        />
                      </div>
                    </div>
                  </div>
                  <Divider />
                </>
              ))}
            </div>
          </div>
        </Spin>
      </Drawer>
      <ConfirmDeleteItem
        isOpen={isOpenConfirmDeleteItem}
        setIsOpen={setIsOpenConfirmDeleteItem}
        handleRemoveItem={() => handleRemoveItem(variantIdToDelete || "")}
      />
      <ApplyDiscount
        isOpen={isOpenApplyDiscount}
        setIsOpen={setIsOpenApplyDiscount}
      />
    </>
  );
};

export default CartDrawer;
