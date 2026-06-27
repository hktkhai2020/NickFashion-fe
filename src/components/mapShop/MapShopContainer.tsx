import { useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import MapShopHeader from "./MapShopHeader";
import MapShopSidebar from "./MapShopSidebar";
import MapShopMap from "./MapShopMap";
import { STORES } from "../../data/stores";

const MapShopContainer = () => {
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState<string | undefined>(undefined);
  const [activeId, setActiveId] = useState<number | null>(null);

  // Danh sách tỉnh duy nhất từ data
  const provinces = useMemo(
    () => Array.from(new Set(STORES.map((s) => s.city))).sort(),
    [],
  );

  // Quận/huyện theo tỉnh đang chọn
  const districts = useMemo(() => {
    if (!province) return [];
    return Array.from(
      new Set(
        STORES.filter((s) => s.city === province).map((s) => s.district),
      ),
    );
  }, [province]);

  // Lọc store theo search + province
  const filteredStores = useMemo(() => {
    const q = search.trim().toLowerCase();
    return STORES.filter((s) => {
      const matchProvince = !province || s.city === province;
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q);
      return matchProvince && matchSearch;
    });
  }, [search, province]);

  const handleStoreClick = (id: number) => {
    setActiveId(id);
  };

  const handleProvinceChange = (v: string | undefined) => {
    setProvince(v);
    setActiveId(null); // reset khi đổi filter
  };

  // Khi user đổi filter mà store đang active không còn trong danh sách → reset
  useEffect(() => {
    if (activeId && !filteredStores.some((s) => s.id === activeId)) {
      setActiveId(null);
    }
  }, [activeId, filteredStores]);

  return (
    <div className="map-shop-page min-h-screen bg-[#f7f9fc] font-['Montserrat',sans-serif]">
      <MapShopHeader totalStores={STORES.length} />

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4">
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/" className="flex items-center gap-1">
                  <HomeOutlined /> Trang chủ
                </Link>
              ),
            },
            { title: <span className="text-[#333f48] font-semibold">Hệ thống cửa hàng</span> },
          ]}
        />
      </div>

      {/* Layout chính */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <MapShopSidebar
            searchValue={search}
            onSearchChange={setSearch}
            province={province}
            onProvinceChange={handleProvinceChange}
            provinces={provinces}
            districts={districts}
            filteredStores={filteredStores}
            activeId={activeId}
            onStoreClick={handleStoreClick}
            totalCount={STORES.length}
          />

          {/* Map area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-[#e5eaf0] rounded-xl shadow-sm overflow-hidden h-[500px] lg:h-[680px] sticky top-4">
              <MapShopMap
                stores={filteredStores}
                activeId={activeId}
                onStoreClick={handleStoreClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapShopContainer;