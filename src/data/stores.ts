export type Store = {
  id: number;
  name: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  type: "flagship" | "standard";
  features: string[];
};

// 5 cửa hàng giả đặt tại các thành phố lớn của Việt Nam
export const STORES: Store[] = [
  {
    id: 1,
    name: "NICKFASHION 170 La Thành",
    address: "170 La Thành, P. Ô Chợ Dừa",
    district: "Quận Đống Đa",
    city: "Hà Nội",
    phone: "024-7303-0222",
    hours: "09:00 - 22:00",
    lat: 21.0118,
    lng: 105.8235,
    type: "flagship",
    features: ["Wifi miễn phí", "Phòng thử đồ VIP", "Thanh toán QR"],
  },
  {
    id: 2,
    name: "NICKFASHION Nguyễn Văn Cừ",
    address: "554 Nguyễn Văn Cừ, P. Ngọc Lâm",
    district: "Quận Long Biên",
    city: "Hà Nội",
    phone: "024-7303-0223",
    hours: "09:00 - 22:00",
    lat: 21.0451,
    lng: 105.8611,
    type: "standard",
    features: ["Wifi miễn phí", "Đổi trả 30 ngày"],
  },
  {
    id: 3,
    name: "NICKFASHION Lê Lợi",
    address: "135 Lê Lợi, P. Bến Nghé",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    phone: "028-7303-0224",
    hours: "09:00 - 22:00",
    lat: 10.7717,
    lng: 106.7009,
    type: "flagship",
    features: ["Wifi miễn phí", "Phòng thử đồ VIP", "Cà phê miễn phí", "Personal Stylist"],
  },
  {
    id: 4,
    name: "NICKFASHION Nguyễn Văn Linh",
    address: "01 Nguyễn Văn Linh",
    district: "Quận Hải Châu",
    city: "Đà Nẵng",
    phone: "0236-7303-0225",
    hours: "09:00 - 22:00",
    lat: 16.0544,
    lng: 108.2022,
    type: "standard",
    features: ["Wifi miễn phí", "Đổi trả 30 ngày", "Bãi đỗ xe miễn phí"],
  },
  {
    id: 5,
    name: "NICKFASHION Trần Hưng Đạo",
    address: "50 Trần Hưng Đạo",
    district: "Quận Ninh Kiều",
    city: "Cần Thơ",
    phone: "0292-7303-0226",
    hours: "09:00 - 22:00",
    lat: 10.0452,
    lng: 105.7469,
    type: "standard",
    features: ["Wifi miễn phí", "Đổi trả 30 ngày"],
  },
];

// Danh sách tỉnh/thành có cửa hàng (tính từ data)
export const PROVINCES = Array.from(new Set(STORES.map((s) => s.city))).sort();