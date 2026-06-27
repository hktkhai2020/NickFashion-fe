import { FrownOutlined } from "@ant-design/icons";

const MapShopEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-14 h-14 rounded-full bg-[#f7f9fc] flex items-center justify-center mb-3">
        <FrownOutlined className="text-[24px] text-[#adb6c9]" />
      </div>
      <p className="text-[14px] font-semibold text-[#333f48] mb-1">
        Không tìm thấy cửa hàng
      </p>
      <p className="text-[12px] text-[#667280] max-w-[220px]">
        Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm kết quả.
      </p>
    </div>
  );
};

export default MapShopEmpty;