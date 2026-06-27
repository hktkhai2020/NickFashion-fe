import { EnvironmentOutlined } from "@ant-design/icons";

type Props = {
  totalStores: number;
};

const MapShopHeader = ({ totalStores }: Props) => {
  return (
    <div className="relative w-full h-[180px] lg:h-[220px] overflow-hidden bg-linear-to-r from-[#333f48] to-[#1f2a32]">
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#73b863" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative h-full flex flex-col justify-center px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 text-[#73b863] text-[13px] font-semibold mb-2">
          <EnvironmentOutlined />
          <span>HỆ THỐNG CỬA HÀNG TOÀN QUỐC</span>
        </div>
        <h1 className="text-white text-[32px] lg:text-[44px] font-extrabold tracking-tight leading-tight">
          Tìm cửa hàng gần bạn
        </h1>
        <p className="text-white/80 text-[14px] lg:text-[16px] mt-2 max-w-[600px]">
          Khám phá {totalStores} cửa hàng NICKFASHION trên toàn quốc — mua sắm dễ dàng, đổi trả thuận tiện.
        </p>
      </div>
    </div>
  );
};

export default MapShopHeader;