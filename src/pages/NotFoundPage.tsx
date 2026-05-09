import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/gerneral/404.e4901f9.webp"
          alt=""
        />
        <div className="text-[20px]! font-bold! text-[#333f48]!">
          Không tìm thấy trang!
        </div>
        <div>
          Xin lỗi! Địa chỉ bạn truy cập không tồn tại. Có thể đường dẫn bị sai
          hoặc trang đã bị xóa bỏ
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-white bg-[#333f48] px-[12px]! py-[13px]! text-[15px]! font-bold!  cursor-pointer hover:bg-[#333f48]/80 transition-all duration-300"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
