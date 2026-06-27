import MapShopSearch from "./MapShopSearch";
import MapShopList from "./MapShopList";
import type { Store } from "../../data/stores";

type Props = {
  searchValue: string;
  onSearchChange: (v: string) => void;
  province: string | undefined;
  onProvinceChange: (v: string | undefined) => void;
  provinces: string[];
  districts: string[];
  filteredStores: Store[];
  activeId: number | null;
  onStoreClick: (id: number) => void;
  totalCount: number;
};

const MapShopSidebar = ({
  searchValue,
  onSearchChange,
  province,
  onProvinceChange,
  provinces,
  districts,
  filteredStores,
  activeId,
  onStoreClick,
  totalCount,
}: Props) => {
  return (
    <aside className="w-full lg:w-[380px] shrink-0 space-y-4">
      <MapShopSearch
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        province={province}
        onProvinceChange={onProvinceChange}
        provinces={provinces}
        districts={districts}
      />
      <MapShopList
        stores={filteredStores}
        activeId={activeId}
        onStoreClick={onStoreClick}
        totalCount={totalCount}
      />
    </aside>
  );
};

export default MapShopSidebar;