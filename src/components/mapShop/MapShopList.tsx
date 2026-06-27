import { ShopOutlined } from "@ant-design/icons";
import MapShopCard from "./MapShopCard";
import MapShopEmpty from "./MapShopEmpty";
import type { Store } from "../../data/stores";

type Props = {
  stores: Store[];
  activeId: number | null;
  onStoreClick: (id: number) => void;
  totalCount: number;
};

const MapShopList = ({ stores, activeId, onStoreClick, totalCount }: Props) => {
  return (
    <div className="bg-white border border-[#e5eaf0] rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-linear-to-r from-[#61a678] to-[#73b863] flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-[14px]">
          <ShopOutlined />
          <span>Hệ thống cửa hàng</span>
        </div>
        <span className="text-white/90 text-[12px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">
          {stores.length} / {totalCount}
        </span>
      </div>

      {/* List */}
      <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
        {stores.length === 0 ? (
          <MapShopEmpty />
        ) : (
          stores.map((store) => (
            <MapShopCard
              key={store.id}
              store={store}
              isActive={store.id === activeId}
              onClick={() => onStoreClick(store.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MapShopList;