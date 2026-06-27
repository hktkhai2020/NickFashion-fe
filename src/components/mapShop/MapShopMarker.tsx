import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { Store } from "../../data/stores";

// Tạo HTML icon cho marker
const createIconHTML = (store: Store, isActive: boolean) => {
  const cls = isActive ? "active" : "";
  const flagCls = store.type === "flagship" ? "flagship" : "";

  return renderToStaticMarkup(
    <div className={`marker-wrapper ${cls} ${flagCls}`}>
      <div className={`marker-pin ${flagCls}`}></div>
    </div>,
  );
};

export const createCustomIcon = (store: Store, isActive: boolean) =>
  L.divIcon({
    html: createIconHTML(store, isActive),
    className: "custom-marker",
    iconSize: store.type === "flagship" ? [42, 42] : [36, 36],
    iconAnchor: [store.type === "flagship" ? 21 : 18, store.type === "flagship" ? 42 : 36],
    popupAnchor: [0, store.type === "flagship" ? -38 : -32],
  });