import { Tag, Tooltip } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import type { Store } from "../../data/stores";

type Props = {
  store: Store;
  isActive: boolean;
  onClick: () => void;
};

const MapShopCard = ({ store, isActive, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
        isActive
          ? "border-[#61a678] bg-[#f0f9f3] shadow-md ring-1 ring-[#61a678]/20"
          : "border-[#e5eaf0] bg-white hover:border-[#61a678]/60 hover:shadow-sm"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {store.type === "flagship" ? (
            <Tooltip title="Cửa hàng Flagship">
              <CrownOutlined className="text-[#f59e0b] text-[16px] shrink-0" />
            </Tooltip>
          ) : (
            <EnvironmentOutlined className="text-[#61a678] text-[16px] shrink-0" />
          )}
          <h3
            className={`font-bold text-[14px] leading-tight truncate ${
              isActive ? "text-[#61a678]" : "text-[#333f48]"
            }`}
          >
            {store.name}
          </h3>
        </div>
        {store.type === "flagship" && (
          <Tag color="gold" className="!m-0 !text-[10px] !font-bold !px-2 !py-0">
            FLAGSHIP
          </Tag>
        )}
      </div>

      {/* Address */}
      <p className="text-[12px] text-[#45525e] leading-[18px] mb-2 line-clamp-2">
        {store.address}, {store.district}
      </p>

      {/* Contact info */}
      <div className="space-y-1.5 text-[12px] text-[#667280]">
        <div className="flex items-center gap-2">
          <PhoneOutlined className="text-[#61a678] text-[11px] shrink-0" />
          <span className="font-medium">{store.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockCircleOutlined className="text-[#61a678] text-[11px] shrink-0" />
          <span>Giờ mở cửa: {store.hours}</span>
        </div>
      </div>

      {/* Features */}
      {store.features.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#e5eaf0] flex flex-wrap gap-1.5">
          {store.features.slice(0, 3).map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 text-[10px] text-[#667280] bg-[#f7f9fc] px-2 py-0.5 rounded"
            >
              <CheckCircleFilled className="text-[#61a678] text-[9px]" />
              {f}
            </span>
          ))}
        </div>
      )}
    </button>
  );
};

export default MapShopCard;