import { Select, Input } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";

type Props = {
  searchValue: string;
  onSearchChange: (v: string) => void;
  province: string | undefined;
  onProvinceChange: (v: string | undefined) => void;
  provinces: string[];
  districts: string[];
};

const MapShopSearch = ({
  searchValue,
  onSearchChange,
  province,
  onProvinceChange,
  provinces,
  districts,
}: Props) => {
  return (
    <div className="bg-white p-4 border border-[#e5eaf0] rounded-xl shadow-sm space-y-3">
      <div className="flex items-center gap-2 text-[#333f48] font-bold text-[15px]">
        <EnvironmentOutlined className="text-[#61a678]" />
        <span>Tìm kiếm cửa hàng</span>
      </div>

      <Input
        allowClear
        size="large"
        placeholder="Nhập tên đường, quận, thành phố..."
        prefix={<SearchOutlined className="text-[#adb6c9]" />}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-semibold text-[#667280] mb-1.5 uppercase tracking-wide">
            Tỉnh / Thành phố
          </label>
          <Select
            allowClear
            size="large"
            placeholder="Chọn tỉnh/thành"
            className="w-full"
            value={province}
            onChange={onProvinceChange}
            options={provinces.map((p) => ({ value: p, label: p }))}
          />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#667280] mb-1.5 uppercase tracking-wide">
            Quận / Huyện
          </label>
          <Select
            allowClear
            size="large"
            placeholder="Chọn quận/huyện"
            className="w-full"
            disabled={!province}
            options={districts.map((d) => ({ value: d, label: d }))}
          />
        </div>
      </div>
    </div>
  );
};

export default MapShopSearch;