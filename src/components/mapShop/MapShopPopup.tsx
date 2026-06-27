import { renderToStaticMarkup } from "react-dom/server";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { Store } from "../../data/stores";

// Hàm render HTML cho popup content (Leaflet popup nhận HTML string)
export const renderPopupHTML = (store: Store) => {
  const features = store.features
    .slice(0, 3)
    .map((f) => `<span class="popup-feature">✓ ${f}</span>`)
    .join("");

  const tag = store.type === "flagship"
    ? `<span class="popup-tag">⭐ FLAGSHIP</span>`
    : "";

  const headerIcon = store.type === "flagship"
    ? `<span style="color:#f59e0b;font-size:16px;display:inline-flex;align-items:center;">★</span>`
    : "";

  return renderToStaticMarkup(
    <div className="popup-card">
      <div className="popup-header">
        <span dangerouslySetInnerHTML={{ __html: headerIcon }} />
        <span className="popup-title">{store.name}</span>
        <span dangerouslySetInnerHTML={{ __html: tag }} />
      </div>

      <div className="popup-row">
        <EnvironmentOutlined />
        <span>{store.address}, {store.district}, {store.city}</span>
      </div>

      <div className="popup-row">
        <PhoneOutlined />
        <span>{store.phone}</span>
      </div>

      <div className="popup-row">
        <ClockCircleOutlined />
        <span>Mở cửa: {store.hours}</span>
      </div>

      {features && (
        <div className="popup-features" dangerouslySetInnerHTML={{ __html: features }} />
      )}

      <div className="popup-cta">
        <button
          type="button"
          className="btn-primary"
          onClick={() => window.open(`tel:${store.phone.replace(/[^0-9]/g, "")}`, "_self")}
        >
          <PhoneOutlined /> Gọi ngay
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`,
              "_blank",
            )
          }
        >
          <CompassOutlined /> Chỉ đường
        </button>
      </div>

      <CloseOutlined
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#adb6c9",
          fontSize: 12,
          cursor: "pointer",
        }}
      />
    </div>,
  );
};