import React, { useEffect, useState } from "react";
import logoNickFashion from "@/assets/logoNickFashion.svg";
import useCheckout from "@/hooks/useCheckout";
import { Steps, Input, Form, Divider, Button, Result } from "antd";
import {
  SmileOutlined,
  LoadingOutlined,
  RollbackOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  FileDoneOutlined,
  TruckOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { StepProps } from "antd/lib";
import { formatPrice } from "@/utils";
import { motion } from "framer-motion";
type FieldType = {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
};
const CheckoutPage: React.FC = () => {
  const [form] = Form.useForm<FieldType>();
  const { user, step, cart, setCustomerInfo, contextHolder, createPayment } =
    useCheckout();
  const navigate = useNavigate();
  const [isFieldsValidating, setIsFieldsValidating] = useState(false);
  const items = [
    {
      title: "Giỏ hàng",
      icon: <CheckCircleOutlined />,
    },
    {
      title: "Thanh toán",
      icon:
        step == 1 || step == 0 ? <LoadingOutlined /> : <CheckCircleOutlined />,
    },
    {
      title: "Hoàn tất",
      icon: step == 2 ? <CheckCircleOutlined /> : <SmileOutlined />,
    },
  ];
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        customerEmail: user.email,
      });
    }
  }, [user, form]);
  return (
    <>
      {contextHolder}
      <div className="w-full relative   bg-[#f5f5f5] min-h-screen pb-[20px]! ">
        <header className=" header-checkout flex items-center justify-between lg:px-[5rem]! px-[1.5rem]! bg-white lg:fixed left-0 right-0 top-0 z-50 lg:mb-0! mb-[20px]! ">
          <div className="header-checkout-left-logo">
            <img src={logoNickFashion} alt="logo" />
          </div>
          <div className="lg:w-[50%]  hidden lg:block">
            <Steps items={items as StepProps[]} current={step} />
          </div>
          <div
            className="lg:flex items-center  cursor-pointer lg:block hidden gap-[10px]"
            onClick={() => {
              navigate("/nickfashion");
            }}
          >
            <div className=" text-[15px] font-bold text-[#4d575f]">
              TIẾP TỤC MUA SẮM
            </div>
            <div className="text-[#4d575f] ">
              <RollbackOutlined style={{ fontSize: 17 }} />
            </div>
          </div>
          <div className="lg:hidden block">
            {step == 2 ? (
              <div className=" text-[15px] font-bold text-[#4d575f]">
                THANH TOÁN
              </div>
            ) : (
              <div className=" text-[15px] font-bold text-[#4d575f]">
                HOÀN TẤT
              </div>
            )}
          </div>
        </header>
        {step == 1 ? (
          <div className=" w-full lg:pt-[175px]! lg:px-[5rem]! px-[1.5rem]!  relative flex gap-[20px]! lg:flex-row flex-col">
            <div className="lg:w-2/3 w-full flex flex-col gap-[20px]!">
              <div className="bg-white p-[20px]! flex flex-col gap-[20px]!">
                <div className="flex items-center gap-[10px]!">
                  <EnvironmentOutlined className="text-[20px]! text-[#4d575f]! " />
                  <span className="text-[18px]! font-bold! text-[#4d575f]! ">
                    Thông tin giao hàng
                  </span>
                </div>

                <div className="flex flex-col gap-[10px]!">
                  <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={(_, allFields) => {
                      const requiredFields: (keyof FieldType)[] = [
                        "customerName",
                        "customerPhone",
                        "customerEmail",
                        "customerAddress",
                      ];
                      const allRequiredFilled = requiredFields.every(
                        (field) =>
                          allFields[field] &&
                          String(allFields[field]).trim() !== "",
                      );
                      if (allRequiredFilled) {
                        console.log(allFields);
                        setCustomerInfo(allFields);
                        setTimeout(() => {
                          setIsFieldsValidating(true);
                        }, 1000);
                      } else {
                        setTimeout(() => {
                          setIsFieldsValidating(false);
                        }, 1000);
                      }
                    }}
                  >
                    <div className="text-[15px]! font-bold! text-[#4d575f]! mb-[5px]! ">
                      Họ và tên
                    </div>
                    <Form.Item<FieldType>
                      name="customerName"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ và tên" },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập họ và tên"
                        className="lg:w-[400px] w-[270px] border border-[#a6b5c4] pl-[10px]! py-[5px]! outline-none rounded-[4px]! text-[15px]! "
                      />
                    </Form.Item>
                    <div className="text-[15px]! font-bold! text-[#4d575f]! mb-[5px]! ">
                      Số điện thoại
                    </div>
                    <Form.Item<FieldType>
                      name="customerPhone"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại",
                        },
                        {
                          pattern: /^[0-9]{10,11}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập số điện thoại"
                        className="lg:w-[400px] w-[270px] border border-[#a6b5c4] pl-[10px]! py-[5px]! outline-none rounded-[4px]! text-[15px]! "
                      />
                    </Form.Item>
                    <div className="text-[15px]! font-bold! text-[#4d575f]! mb-[5px]! ">
                      Email
                    </div>
                    <Form.Item<FieldType>
                      name="customerEmail"
                      rules={[
                        { required: true, message: "Vui lòng nhập email" },
                        {
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Email không hợp lệ",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập email"
                        className="lg:w-[400px] w-[270px] border border-[#a6b5c4] pl-[10px]! py-[5px]! outline-none rounded-[4px]! text-[15px]! "
                        value={user?.email}
                        defaultValue={user?.email}
                        disabled
                      />
                    </Form.Item>
                    <div className="text-[15px]! font-bold! text-[#4d575f]! mb-[5px]! ">
                      Địa chỉ
                    </div>
                    <Form.Item<FieldType>
                      name="customerAddress"
                      rules={[
                        { required: true, message: "Vui lòng nhập địa chỉ" },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập địa chỉ"
                        className="lg:w-[400px] w-[270px] border border-[#a6b5c4] pl-[10px]! py-[5px]! outline-none rounded-[4px]! text-[15px]! "
                      />
                    </Form.Item>
                  </Form>
                </div>
              </div>

              <div className="bg-white p-[20px]! flex flex-col gap-[20px]!">
                <div className="flex items-center gap-[10px]!">
                  <TruckOutlined className="text-[20px]! text-[#4d575f]! " />
                  <div className="text-[18px]! font-bold! text-[#4d575f]! ">
                    Thông tin vận chuyển
                  </div>
                </div>
                <div className="flex items-center gap-[10px]!">
                  <CheckCircleOutlined className="text-[13px]! text-[#74aa50]! bg-[#c7ddb9]   rounded-full!  " />
                  <span className="text-[13px]!  text-[#74aa50]! ">
                    Đơn hàng được miễn phí vận chuyển
                  </span>
                </div>
                <div className="w-full p-[10px]! border border-[black]!  border-solid bg-[#f5f5f5]! flex justify-between ">
                  <div className="flex  gap-[20px]!">
                    <input
                      type="radio"
                      name="shipping"
                      id="shipping"
                      className="w-[18px]! h-[18px]!  cursor-pointer accent-[black]! "
                      checked={true}
                    />
                    <div className="flex flex-col gap-[5px]!">
                      <div className="text-[14px]! font-bold! text-[#4d575f]! ">
                        Tiêu chuẩn 2-7 ngày
                      </div>
                      <div className="text-[13px]!  text-[#74869b]! font-[5500]! ">
                        Thời gian giao hàng tùy thuộc vào điều kiện của đơn vị
                        vận chuyển. Dự kiến giao hàng:2-7 ngày
                      </div>
                      <div className="flex gap-[10px]!">
                        <img
                          className="w-[75px]! h-[35px]! object-cover"
                          src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/shipping/giaohanglex.1c5972e.webp"
                          alt=""
                        />
                        <img
                          className="w-[75px]! h-[35px]! object-cover"
                          src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/shipping/giaohangnhanh.acf9215.webp"
                          alt=""
                        />
                        <img
                          className="w-[75px]! h-[35px]! object-cover"
                          src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/shipping/shopeexpress.b2bd26c.webp"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-[14px]! font-bold! text-[#4d575f]! ">
                    {formatPrice(0)}{" "}
                  </div>
                </div>
              </div>

              <div className="bg-white p-[20px]! flex flex-col gap-[20px]!">
                <div className="flex items-center gap-[10px]!">
                  <WalletOutlined className="text-[20px]! text-[#4d575f]! " />
                  <div className="text-[18px]! font-bold! text-[#4d575f]! ">
                    Phương thức thanh toán
                  </div>
                </div>

                <div className="flex flex-col gap-[10px]!">
                  <div className="w-full p-[10px]! border border-[black]!  border-solid bg-[#f5f5f5]! cursor-pointer ">
                    <div className="flex  gap-[20px]! items-center">
                      <input
                        type="radio"
                        className="w-[18px]! h-[18px]!  cursor-pointer accent-[black]! "
                        checked={true}
                      />
                      <div className="">
                        <img
                          src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/shipping/cod.svg"
                          alt=""
                        />
                      </div>
                      <div>Thanh toán khi nhận hàng (COD)</div>
                    </div>
                  </div>

                  <div className="w-full p-[10px]! border border-[black]!  border-solid bg-[#f5f5f5]! cursor-not-allowed ">
                    <div className="flex  gap-[20px]! items-center">
                      <input
                        type="radio"
                        className="w-[18px]! h-[18px]!  cursor-pointer accent-[black]! "
                        disabled={true}
                      />
                      <div className="">
                        <img
                          src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/shipping/vnpay.svg"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-[5px]!">
                        <div>Cổng thanh toán VNPAY</div>
                        <div className="flex items-center gap-[5px]! flex-wrap">
                          <div className="text-[13px]!  text-[#74869b]! font-[400]! ">
                            Hỗ trợ các hình thức
                          </div>
                          <img
                            className="w-[310px]! h-[20px]! object-fill"
                            src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/shipping/vnpays.e7ab074.webp"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-[20px]! flex flex-col gap-[20px]!">
                <div className="w-full flex flex-col gap-[20px]!">
                  <div className="flex items-center gap-[10px]!">
                    <img
                      src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/icon_service/icon_product.svg"
                      alt=""
                    />
                    <div className="text-[18px]! font-bold! text-[#4d575f]! ">
                      Sản phẩm
                    </div>
                  </div>
                </div>
                {cart?.items.map((item) => (
                  <>
                    <div className="w-full flex justify-between">
                      <div className="w-full flex gap-[10px] ">
                        <div className="w-[88px] h-[110px] shrink-0 rounded-[4px] overflow-hidden bg-[#f5f5f5]">
                          <img src={item.productId.thumbnail} alt="" />
                        </div>
                        <div className="flex flex-col justify-between ">
                          <div className="flex flex-col gap-[5px] ">
                            <div className="text-[16px] text-[#4d575f] font-[500]">
                              {item.productId.name}
                            </div>
                            <div className="text-[15px] text-[#74869b]">
                              {item.variantId.color.name} -{" "}
                              {item.variantId.size.name}
                            </div>
                            <div className="text-[14px] text-[#74869b]">
                              SKU: {item.productId.sku}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-[50px]!">
                        <div className="text-[14px]! text-[#4d575f]! ">
                          {" "}
                          x{item.quantity}
                        </div>
                        <div className="text-[14px]! text-[#4d575f]! font-[500]!">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>
                    <Divider />
                  </>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3 w-full lg:absolute lg:top-0 lg:right-0 lg:fixed lg:mt-[175px]! ">
              <div className="w-full bg-white p-[20px]! flex flex-col gap-[20px]! lg:absolute">
                <div className="flex items-center gap-[10px]!">
                  <FileDoneOutlined />{" "}
                  <div className="text-[18px]! font-bold! text-[#4d575f]! ">
                    Chi tiết đơn hàng
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-[15px]!  text-[#4d575f]! font-[500]!">
                    Giá trị đơn hàng
                  </div>
                  <div className="text-[15px]!  text-[#4d575f]! font-[500]!">
                    {formatPrice(cart?.subtotal || 0)}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-[15px]!  text-[#4d575f]! font-[500]!">
                    Giảm giá từ Voucher
                  </div>
                  <div className="text-[15px]!  text-[red]! font-[500]!">
                    -
                    {formatPrice(
                      cart?.appliedCoupon.code
                        ? cart?.subtotal - cart?.total
                        : 0,
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <div className="text-[15px]!  text-[#4d575f]! font-[500]!">
                      Phí vận chuyển
                    </div>
                    <i className="text-[13px]!  text-[#74869b]! font-[400]! ">
                      Free Shipping toàn bộ sản phẩm
                    </i>
                  </div>
                  <div className="text-[15px]!  text-[#4d575f]! font-[500]!">
                    {formatPrice(0)}
                  </div>
                </div>
                <Divider />
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <div className="text-[17px]!  text-[#4d575f]! font-[700]!">
                      Tổng tiền thanh toán
                    </div>
                    <div className="text-[12px]!  text-[#4d575f]! font-[500]!">
                      (Đã bao gồn thuế VAT)
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[17px]!  text-[#4d575f]! font-[700]!">
                      {formatPrice(cart?.total || 0)}
                    </div>
                    <div className="text-[12px]!  text-[#d80c0c]! font-[500]!">
                      Tiết kiệm{" "}
                      {formatPrice(
                        cart?.appliedCoupon.code
                          ? cart?.subtotal - cart?.total
                          : 0,
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <button
                    className={`w-full h-[40px]   text-[15px] font-bold border border-[#a6b5c4] rounded-[4px]!  ${isFieldsValidating ? " bg-[#da291c] cursor-pointer text-[#ffffff] " : "bg-[#f3f5f6] cursor-not-allowed text-[#a6b5c4]"}`}
                    onClick={() => {
                      if (isFieldsValidating) {
                        createPayment();
                      }
                    }}
                  >
                    THANH TOÁN
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <div className=" w-full lg:pt-[175px]! lg:px-[5rem]! px-[1.5rem]!  flex justify-center items-center">
              <Result
                status="success"
                title="Thanh toán thành công"
                subTitle="Đơn hàng đã được thanh toán thành công. Vui lòng kiểm tra email để xác nhận đơn hàng."
                extra={[
                  <Button
                    type="primary"
                    key="console"
                    onClick={() => {
                      navigate("/nickfashion");
                    }}
                  >
                    Tiếp tục mua sắm
                  </Button>,
                ]}
              />
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
