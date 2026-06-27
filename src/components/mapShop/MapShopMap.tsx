import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { AimOutlined } from "@ant-design/icons";
import type { Store } from "../../data/stores";
import { MAP_CONFIG } from "../../constants/mapConfig";
import { createCustomIcon } from "./MapShopMarker";
import { renderPopupHTML } from "./MapShopPopup";
import "./mapShop.css";

// Fix icon default của Leaflet (tránh warning)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Props = {
  stores: Store[];
  activeId: number | null;
  onStoreClick: (id: number) => void;
};

// Sub-component: xử lý pan tới marker đang active
const MapController = ({
  activeStore,
}: {
  activeStore: Store | null;
}) => {
  const map = useMap();
  const lastIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!activeStore || lastIdRef.current === activeStore.id) return;
    lastIdRef.current = activeStore.id;
    map.flyTo([activeStore.lat, activeStore.lng], MAP_CONFIG.storeZoom, {
      duration: 0.8,
    });
  }, [activeStore, map]);

  return null;
};

const MapShopMap = ({ stores, activeId, onStoreClick }: Props) => {
  const activeStore = stores.find((s) => s.id === activeId) ?? null;

  return (
    <div className="map-shop-wrapper">
      {/* Nút "Vị trí của tôi" */}
      <button
        type="button"
        className="locate-btn"
        title="Xem tất cả cửa hàng"
        onClick={() => {
          window.dispatchEvent(new CustomEvent("mapshop:fit-all"));
        }}
      >
        <AimOutlined />
      </button>

      {/* Legend */}
      <div className="map-legend">
        <div className="legend-title">Chú thích</div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#f59e0b" }}></span>
          <span>Flagship Store</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#61a678" }}></span>
          <span>Cửa hàng tiêu chuẩn</span>
        </div>
      </div>

      <MapContainer
        center={[MAP_CONFIG.defaultCenter.lat, MAP_CONFIG.defaultCenter.lng]}
        zoom={MAP_CONFIG.defaultZoom}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={true}
        style={{ width: "100%", height: "100%" }}
      >
        {/* OpenStreetMap tiles - bản đồ thật, 2D, miễn phí */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <MapController activeStore={activeStore} />

        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.lat, store.lng]}
            icon={createCustomIcon(store, store.id === activeId)}
            eventHandlers={{
              click: () => onStoreClick(store.id),
            }}
          >
            <Popup
              closeButton={false}
              maxWidth={300}
              minWidth={280}
              autoPan={true}
            >
              <div dangerouslySetInnerHTML={{ __html: renderPopupHTML(store) }} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapShopMap;