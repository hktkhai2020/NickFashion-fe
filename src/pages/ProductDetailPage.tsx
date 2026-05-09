import React, { useState, useRef, useEffect } from "react";
import useProductDetail from "@/hooks/useProductDetail";
import CardProductList from "@/components/home/CardProductList";
import useProduct from "@/hooks/useProduct";
import { Breadcrumb } from "antd";
import { formatPrice } from "@/utils";
import { PlusOutlined, ScissorOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import useUserStore from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import Reviews from "@/components/product/Reviews";
const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    product,
    productId,
    activeColor,
    setActiveColor,
    setSelectedVariant,
    selectedVariant,
    contextHolder,
    handleAddToCart,
    _api,
  } = useProductDetail();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { products } = useProduct();
  const user = useUserStore((state) => state.user);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const currentImages =
    product?.colorGroups?.find((item) => item.color._id === activeColor)
      ?.images || [];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  return (
    <>
      {contextHolder}
      <div className="w-full py-[40px]! lg:px-[120px]! px-[16px]!  ">
        {/* breadcrumb */}
        <div className="lg:block! hidden! mb-[20px]!">
          <Breadcrumb
            items={[
              {
                title: <a href="/nickfashion/">Trang chủ</a>,
              },
              {
                title: <a href="">Áo nam</a>,
              },
              {
                title: <a href="">{product?.name}</a>,
              },
            ]}
          />
        </div>

        {/* image and content */}
        <div className="w-full lg:flex lg:flex-row flex-col lg:gap-[60px] gap-[20px]">
          {/* image gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-[12px]">
            {/* main image with zoom on hover */}
            <div
              ref={imageContainerRef}
              className="w-full aspect-3/4 overflow-hidden rounded-[4px] bg-[#f5f5f5] cursor-zoom-in"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={currentImages[activeImageIndex]}
                alt={product?.name}
                className="w-full h-full object-cover transition-transform duration-200"
                style={{
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transform: isHovering ? "scale(2)" : "scale(1)",
                }}
              />
            </div>

            {/* thumbnail strip */}
            <div className="w-full flex gap-[8px] overflow-x-auto pb-[4px]">
              {currentImages.map((img, index) => (
                <div
                  key={index}
                  className={`shrink-0 w-[60px] h-[75px] cursor-pointer rounded-[4px] overflow-hidden border-2 transition-all duration-200 ${
                    activeImageIndex === index
                      ? "border-[#d80c0c]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* name */}
            <div className="text-[18px] text-[#333f48] font-bold">
              {product?.name}
            </div>

            {/* sku */}
            <div className="text-[14px] text-[#333f48] font-[500]">
              SKU: {product?.sku}
            </div>

            {/* price */}
            {product?.is.discounted ? (
              <div>
                <div className="flex gap-[10px] ">
                  <div className="text-[#74869b] text-[16px] font-bold line-through [text-decoration-thickness:2px] ">
                    {formatPrice(product?.priceSell ?? 0)}
                  </div>
                  <div className="text-[#d80707] text-[16px] font-bold ">
                    -{product?.sale?.discountValue ?? 0}%
                  </div>
                </div>
                <div className="text-[#d80c0c] text-[20px] font-bold flex items-center gap-[20px] ">
                  {formatPrice(product?.finalPrice ?? 0)}
                  <div className="text-[#da291c] text-[12px] w-[52px] h-[24px] bg-[#fbe9e8] flex items-center justify-center  py-[4px]!  px-[6px]!">
                    giá tốt
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-[20px] text-[#333f48] font-bold">
                {formatPrice(product?.finalPrice ?? 0)}
              </div>
            )}
            {/* banner freeship */}
            <div className="w-full">
              <img
                src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/freeship_tagdetail_desktop-02oct_1.webp"
                alt=""
                className="w-full object-cover"
              />
            </div>
            {/* Color  */}
            <div className="w-full text-[15px] text-[#333f48]">
              Màu sắc :{" "}
              {product?.colorGroups?.find(
                (item) => item.color._id === activeColor,
              )?.color.name || ""}
            </div>
            {/* color image mini */}
            <div className="w-full flex gap-[10px]">
              {product?.colorGroups?.map((item) => (
                <div
                  key={item.color._id}
                  className={`w-[50px] h-[65px] cursor-pointer rounded-[4px] overflow-hidden border-2 transition-all ${
                    activeColor === item.color._id
                      ? "border-[#d80c0c]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => {
                    setActiveColor(item.color._id);
                    setActiveImageIndex(0);
                  }}
                >
                  <img
                    src={item.images[1]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {/* size */}
            <div className="w-full flex justify-between ">
              <div className="text-[15px] text-[#333f48]">
                Kick cỡ:ㅤ
                {selectedVariant
                  ? product?.colorGroups
                      ?.find((item) => item.color._id === activeColor)
                      ?.sizes.find((item) => item._id === selectedVariant)?.size
                      .name
                  : ""}
              </div>
              <div className="text-[15px] text-[#0785e6] flex items-center gap-[5px] cursor-pointer">
                <ScissorOutlined /> Gợi ý tìm kích cỡ
              </div>
            </div>

            {/* size list */}
            <div className="w-full flex  gap-[10px]">
              {product?.colorGroups
                ?.find((item) => item.color._id === activeColor)
                ?.sizes.map((item) => (
                  <div
                    className={`w-[50px] h-[50px] bg-[#ffffff] flex items-center justify-center text-[15px] text-[#333f48] border border-[#e0e0e0] rounded-[5px] cursor-pointer  ${selectedVariant === item._id ? "border-[#d80c0c]" : "border-transparent"} `}
                    onClick={() => {
                      setSelectedVariant(item._id);
                    }}
                    key={item._id}
                  >
                    {item.size.name}
                  </div>
                ))}
            </div>

            {/* button add to cart and buy now */}
            <div className="w-full flex gap-[10px]">
              <button
                className="w-full h-[40px] bg-[#ff0000] text-[#ffffff] text-[15px] font-bold rounded-[5px] cursor-pointer"
                onClick={() => {
                  if (user) {
                    handleAddToCart({
                      userId: user?._id || "",
                      productId: product?._id || "",
                      variantId: selectedVariant || "",
                      quantity: 1,
                      price: product?.finalPrice ?? 0,
                    });
                  } else {
                    _api.error({
                      message: "Vui lòng đăng nhập",
                      description:
                        "Vui lòng đăng nhập để sử dụng chức năng này",
                    });
                  }
                }}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                className="w-full h-[40px] bg-[#ffffff] text-[#333f48] text-[15px] font-bold cursor-pointer border border-[#333f48] border-solid "
                onClick={() => {
                  if (user) {
                    handleAddToCart({
                      userId: user?._id || "",
                      productId: product?._id || "",
                      variantId: selectedVariant || "",
                      quantity: 1,
                      price: product?.finalPrice ?? 0,
                    });

                    setTimeout(() => {
                      navigate("/checkout");
                    }, 2000);
                  } else {
                    _api.error({
                      message: "Vui lòng đăng nhập",
                      description:
                        "Vui lòng đăng nhập để sử dụng chức năng này",
                    });
                  }
                }}
              >
                Mua ngay
              </button>
            </div>

            {/* description and  material*/}
            <div className="w-full ">
              <Divider />

              <div
                className=" flex items-center justify-between cursor-pointer"
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              >
                <div className="text-[16px] text-[#333f48] font-bold ">
                  Mô tả
                </div>
                <div>
                  <PlusOutlined />
                </div>
              </div>
              {isDescriptionOpen && (
                <div className="text-[15px] text-[#333f48] mt-[10px]! leading-[1.5]!">
                  {product?.description}
                </div>
              )}
              <Divider />
              <div
                className=" flex items-center justify-between cursor-pointer"
                onClick={() => setIsMaterialOpen(!isMaterialOpen)}
              >
                <div className="text-[16px] text-[#333f48] font-bold ">
                  Chất liệu
                </div>
                <div>
                  <PlusOutlined />
                </div>
              </div>
              {isMaterialOpen && (
                <div className="text-[15px] text-[#333f48] mt-[10px]! leading-[1.5]!">
                  {product?.material}
                </div>
              )}
              <Divider />
            </div>

            {/* related products */}
            <div className="w-full flex flex-col gap-[10px]">
              <div className="flex flex-row gap-[10px]">
                <img
                  src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/icon_service/icon_payment.svg"
                  alt=""
                />
                <div className="flex   flex-col ">
                  <span className="text-[15px] text-[#333f48] font-bold ">
                    Thanh toán khi nhận hàng (COD)
                  </span>
                  <span>Giao hàng toàn quốc.</span>
                </div>
              </div>

              <div className="flex flex-row gap-[10px]">
                <img
                  src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/icon_service/icon_exchange.svg"
                  alt=""
                />
                <div className="flex   flex-col ">
                  <span className="text-[15px] text-[#333f48] font-bold ">
                    Đổi hàng miễn phí
                  </span>
                  <span>rong 30 ngày kể từ ngày mua.</span>
                </div>
              </div>

              <div className="flex flex-row gap-[10px]">
                <img
                  src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/icon_service/icon_deliver.svg"
                  alt=""
                />
                <div className="flex   flex-col ">
                  <span className="text-[15px] text-[#333f48] font-bold ">
                    Miễn phí giao hàng
                  </span>
                  <span>Với đơn hàng trên 199.000 ₫</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* reviews */}
        <div className="w-full flex flex-col gap-[10px] mt-[40px]!">
          <div className="lg:text-[36px] text-[24px] text-[#333f48] font-bold ">Đánh giá</div>
          <div className="w-full ">
            <Reviews productId={productId} />
            
          </div>
        </div>

        {/* related products */}
        <div className="lg:text-[36px] text-[24px] text-[#333f48] font-bold mt-[40px]!">
          SẢN PHẨM GẦN ĐÂY
        </div>
        {products && products.length > 0 && (
          <CardProductList products={products} />
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;
