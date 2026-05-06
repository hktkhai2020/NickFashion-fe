import { Modal } from "antd";
import useCoupon from "@/hooks/useCoupon";
import { useState } from "react";
import { formatDate } from "@/utils";
import useCart from "@/hooks/useCart";

const ApplyDiscount = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { coupons } = useCoupon();
  const { handleApplyCoupon, contextHolder } = useCart();
  const [couponCode, setCouponCode] = useState<string>("");
  const [selectedCoupon, setSelectedCoupon] = useState<string>("");
  return (
    <Modal
      width={600}
      centered
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      title="MÃ GIẢM GIÁ"
      styles={{
        header: {
          display: "flex",
          justifyContent: "center",
        },
      }}
      footer={
        <>
          <div
            className="w-full py-[13px]! text-[15px] text-white bg-[#da291c] font-bold text-center"
            onClick={() => {
              handleApplyCoupon(selectedCoupon);
              setIsOpen(false);
              setSelectedCoupon("");
              setCouponCode("");
            }}
          >
            <span>ÁP DỤNG</span>
          </div>
        </>
      }
    >
      {contextHolder}
      <div className="w-full flex flex-col">
        <div className="w-full  flex  justify-between gap-[20px] mb-[20px]!">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            className="lg:w-[400px] w-[270px] border border-[#a6b5c4] pl-[10px]! py-[5px]! outline-none rounded-[4px]! "
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <div
            className={` px-[20px]! py-[10px]!  border border-[#a6b5c4] rounded-[4px]! ${couponCode ? "bg-[#333f48] cursor-pointer" : "bg-[#f3f5f6] cursor-not-allowed"}`}
          >
            <button
              className={`text-[15px]   font-bold text-center ${couponCode ? "text-white cursor-pointer" : "text-[#a6b5c4] cursor-not-allowed"}`}
              onClick={() => {
                handleApplyCoupon(couponCode);
                setIsOpen(false);
                setSelectedCoupon("");
                setCouponCode("");
              }}
            >
              ÁP DỤNG
            </button>
          </div>
        </div>
        <div className="w-full  flex flex-col gap-[20px]!">
          {coupons?.map((coupon) => (
            <div
              key={coupon._id}
              className="w-full  flex  relative border border-[#a6b5c4] bg-[#f3f5f6] rounded-[4px]! "
            >
              <div className=" w-2/3 flex  flex-col p-[10px]! gap-[5px]!">
                <div className="text-[16px] text-[#333f48] font-bold">
                  {coupon.name}
                </div>
                <div className="text-[13px] text-[#333f48] font-normal">
                  {coupon.description}
                </div>
                <div className=" ">
                  <span className="text-[13px] text-[#333f48] font-normal">
                    Mã:{" "}
                  </span>
                  <span className="text-[13px] text-[#333f48] font-bold px-[5px]! py-[5px]! bg-[#e5eaf0] inline-block">
                    {coupon.code}
                  </span>
                </div>
                <div className="text-[13px] text-[#333f48] font-normal">
                  HSD: {coupon.endDate ? formatDate(coupon.endDate) : "N/A"}
                </div>
              </div>
              <div className=" w-1/3 flex  justify-center items-center border-l border-[#a6b5c4] border-dashed">
                <input
                  type="radio"
                  name="coupon-selection"
                  className="w-[20px] h-[20px] border border-[#333f48]! cursor-pointer accent-[#74aa50]"
                  checked={selectedCoupon === coupon.code}
                  onChange={() => setSelectedCoupon(coupon.code)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
export default ApplyDiscount;
