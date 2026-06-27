export const MAP_CONFIG = {
  defaultCenter: { lat: 14.0583, lng: 108.2772 }, // Trung tâm Việt Nam
  defaultZoom: 6,
  storeZoom: 14,
  fallbackContainerStyle: {
    width: "100%",
    height: "100%",
  },
};

// Tọa độ biên giới Việt Nam (dùng cho fallback SVG map)
// Dùng để convert lat/lng sang % trên SVG viewBox 1000x500
export const VIETNAM_BOUNDS = {
  north: 23.5,
  south: 8.5,
  west: 102.0,
  east: 109.5,
};