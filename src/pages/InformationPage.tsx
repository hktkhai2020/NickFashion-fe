import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Breadcrumb, Collapse } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  ShopOutlined,
  TeamOutlined,
  HeartOutlined,
  RocketOutlined,
  GiftOutlined,
  TruckOutlined,
  CustomerServiceOutlined,
  RightOutlined,
} from "@ant-design/icons";

type Section = {
  id: string;
  group: string;
  title: string;
  icon: React.ReactNode;
};

const SECTIONS: Section[] = [
  { id: "gioi-thieu", group: "Thương hiệu", title: "Giới thiệu", icon: <ShopOutlined /> },
  { id: "he-thong-cua-hang", group: "Thương hiệu", title: "Hệ thống cửa hàng", icon: <EnvironmentOutlined /> },
  { id: "tin-tuc", group: "Thương hiệu", title: "Tin tức", icon: <RocketOutlined /> },
  { id: "tuyen-dung", group: "Thương hiệu", title: "Tuyển dụng", icon: <TeamOutlined /> },
  { id: "voi-cong-dong", group: "Thương hiệu", title: "Với cộng đồng", icon: <HeartOutlined /> },
  { id: "lien-he", group: "Thương hiệu", title: "Liên hệ", icon: <PhoneOutlined /> },
  { id: "hoi-dap", group: "Hỗ trợ", title: "Hỏi đáp", icon: <CustomerServiceOutlined /> },
  { id: "dieu-kien-dieu-khoan", group: "Hỗ trợ", title: "Điều kiện - Điều khoản KHTT", icon: <GiftOutlined /> },
  { id: "chinh-sach-khtt", group: "Hỗ trợ", title: "Chính sách KHTT", icon: <GiftOutlined /> },
  { id: "chinh-sach-van-chuyen", group: "Hỗ trợ", title: "Chính sách vận chuyển", icon: <TruckOutlined /> },
  { id: "chinh-sach-bao-mat", group: "Hỗ trợ", title: "Chính sách bảo mật", icon: <HeartOutlined /> },
  { id: "tra-cuu-don-hang", group: "Hỗ trợ", title: "Tra cứu đơn hàng", icon: <TruckOutlined /> },
  { id: "bang-kich-co", group: "Hỗ trợ", title: "Bảng kích cỡ", icon: <RocketOutlined /> },
];

const STORES = [
  { city: "Hà Nội", address: "170 La Thành, P. Ô Chợ Dừa", district: "Quận Đống Đa", phone: "024-7303-0222", hours: "09:00 - 22:00" },
  { city: "Hà Nội", address: "688 Quang Trung, P. Hà Đông", district: "Quận Hà Đông", phone: "024-7303-0223", hours: "09:00 - 22:00" },
  { city: "TP. Hồ Chí Minh", address: "235 Nguyễn Văn Cừ, P. Ngọc Lâm", district: "Quận Long Biên (Chi nhánh HCM)", phone: "028-7303-0224", hours: "09:00 - 22:00" },
  { city: "Đà Nẵng", address: "01 Nguyễn Văn Linh", district: "Quận Hải Châu", phone: "0236-7303-0225", hours: "09:00 - 22:00" },
  { city: "Hải Phòng", address: "10 Lê Hồng Phong", district: "Quận Ngô Quyền", phone: "0225-7303-0226", hours: "09:00 - 22:00" },
  { city: "Cần Thơ", address: "50 Trần Hưng Đạo", district: "Quận Ninh Kiều", phone: "0292-7303-0227", hours: "09:00 - 22:00" },
];

const NEWS = [
  { tag: "Bộ sưu tập", date: "20/05/2026", title: "Ra mắt BST Summer Vibes 2026 – Tự do và mát mẻ", desc: "BST lấy cảm hứng từ biển xanh, đem đến những thiết kế nhẹ nhàng, thoáng đãng cho mùa hè." },
  { tag: "Khuyến mãi", date: "15/05/2026", title: "Đại tiệc hè – Giảm giá đến 50% toàn bộ sản phẩm", desc: "Chương trình áp dụng từ 15/05 đến 30/05/2026 trên toàn hệ thống cửa hàng và website." },
  { tag: "Sự kiện", date: "10/05/2026", title: "Fashion Show Thu Đông 2026 tại Hà Nội", desc: "Sàn diễn thời trang hoành tráng với sự góp mặt của nhiều người mẫu nổi tiếng." },
  { tag: "Thời trang", date: "02/05/2026", title: "5 xu hướng thời trang không thể bỏ qua mùa hè này", desc: "Từ tone màu pastel đến phong cách Y2K, cập nhật ngay những trend hot nhất." },
];

const JOBS = [
  { title: "Nhân viên bán hàng (Full-time)", location: "Hà Nội, TP.HCM", type: "Toàn thời gian", salary: "8 - 12 triệu" },
  { title: "Chuyên viên tư vấn thời trang", location: "Hà Nội", type: "Toàn thời gian", salary: "10 - 15 triệu" },
  { title: "Thiết kế đồ họa – Digital Designer", location: "Hà Nội", type: "Toàn thời gian", salary: "12 - 20 triệu" },
  { title: "Nhân viên Marketing Online", location: "Hà Nội", type: "Toàn thời gian", salary: "10 - 18 triệu" },
  { title: "Quản lý cửa hàng (Store Manager)", location: "TP.HCM, Đà Nẵng", type: "Toàn thời gian", salary: "15 - 25 triệu" },
  { title: "Thực tập sinh thiết kế thời trang", location: "Hà Nội", type: "Thực tập", salary: "Thỏa thuận" },
];

const FAQ_ITEMS = [
  {
    q: "Làm sao để đặt hàng trên website NICKFASHION?",
    a: "Bạn chỉ cần chọn sản phẩm, chọn size, màu sắc và số lượng, sau đó bấm 'Thêm vào giỏ hàng' và tiến hành thanh toán. Bạn có thể thanh toán online hoặc khi nhận hàng (COD).",
  },
  {
    q: "Thời gian giao hàng mất bao lâu?",
    a: "Đơn hàng nội thành Hà Nội & TP.HCM: 1 - 2 ngày. Các tỉnh thành khác: 3 - 5 ngày. Vùng sâu vùng xa: 5 - 7 ngày làm việc.",
  },
  {
    q: "Chính sách đổi trả như thế nào?",
    a: "Sản phẩm được đổi trả trong vòng 30 ngày kể từ ngày mua, còn nguyên tem mác, chưa qua sử dụng. Vui lòng giữ hóa đơn để được hỗ trợ nhanh chóng.",
  },
  {
    q: "Làm sao để trở thành thành viên KHTT?",
    a: "Bạn chỉ cần tạo tài khoản trên website hoặc mua hàng tại cửa hàng với hóa đơn từ 500.000đ trở lên để tích lũy điểm thưởng và hưởng các ưu đãi độc quyền.",
  },
  {
    q: "Tôi có thể thanh toán bằng những hình thức nào?",
    a: "Chúng tôi hỗ trợ thanh toán COD, thẻ tín dụng/ghi nợ (Visa, MasterCard, JCB), chuyển khoản ngân hàng, ví MoMo, ZaloPay, ShopeePay và VNPay.",
  },
  {
    q: "Làm sao để kiểm tra tình trạng đơn hàng?",
    a: "Bạn có thể tra cứu đơn hàng tại mục 'Tra cứu đơn hàng' trên website, hoặc đăng nhập tài khoản và vào 'Lịch sử đơn hàng' để xem chi tiết.",
  },
];

const SIZE_CHART = [
  { size: "XS", chest: "80 - 84", waist: "64 - 68", hip: "88 - 92", height: "155 - 160" },
  { size: "S", chest: "84 - 88", waist: "68 - 72", hip: "92 - 96", height: "160 - 165" },
  { size: "M", chest: "88 - 92", waist: "72 - 76", hip: "96 - 100", height: "165 - 170" },
  { size: "L", chest: "92 - 96", waist: "76 - 80", hip: "100 - 104", height: "170 - 175" },
  { size: "XL", chest: "96 - 100", waist: "80 - 84", hip: "104 - 108", height: "175 - 180" },
  { size: "XXL", chest: "100 - 106", waist: "84 - 90", hip: "108 - 114", height: "180 - 185" },
];

const InformationPage = () => {
  const [searchParams] = useSearchParams();
  const sectionParam = searchParams.get("section") || "gioi-thieu";
  const [activeId, setActiveId] = useState<string>(sectionParam);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });

  const groups = useMemo(() => {
    const map = new Map<string, Section[]>();
    SECTIONS.forEach((s) => {
      if (!map.has(s.group)) map.set(s.group, []);
      map.get(s.group)!.push(s);
    });
    return Array.from(map.entries());
  }, []);

  useEffect(() => {
    const el = document.getElementById(sectionParam);
    if (el) {
      setTimeout(() => {
        const offset = 120;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }, 100);
    }
    setActiveId((prev) => (prev === sectionParam ? prev : sectionParam));
  }, [sectionParam]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      return;
    }
    setContactForm({ name: "", email: "", phone: "", message: "" });
    window.alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h.");
  };

  return (
    <div className="info-page w-full min-h-screen bg-linear-to-b from-[#f7f9fc] to-white font-['Montserrat',sans-serif]">
      {/* Hero Banner */}
      <div className="relative w-full h-[260px] lg:h-[340px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
          alt="NICKFASHION"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-[20px]! lg:px-[100px]">
          <h1 className="text-white text-[36px] lg:text-[56px] font-[800] tracking-tight">
            Trung tâm thông tin
          </h1>
          <p className="text-white/90 text-[14px] lg:text-[18px] mt-2! max-w-[600px]">
            Mọi thông tin bạn cần về NICKFASHION – từ giới thiệu thương hiệu, chính sách mua hàng đến hỗ trợ khách hàng.
          </p>
        </div>
      </div>

      <div className="w-full mx-auto! px-[16px]! lg:px-[100px]! py-[24px]!">
        <Breadcrumb
          items={[
            { title: <Link to="/">Trang chủ</Link> },
            { title: <span className="text-[#333f48] font-semibold">Thông tin &amp; Hỗ trợ</span> },
          ]}
        />
      </div>

      <div className="w-full mx-auto px-[16px]! lg:px-[100px]! pb-[60px]">
        <div className="flex flex-col lg:flex-row gap-[32px]">
          {/* Sidebar */}
          <aside className="lg:w-[280px] w-full shrink-0">
            <div className="lg:sticky lg:top-[20px] bg-white border border-[#e5eaf0] rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5! py-4! bg-gradient-to-r from-[#61a678] to-[#73b863]">
                <h3 className="text-white text-[16px] font-[700]">Danh mục</h3>
                <p className="text-white/85 text-[12px] mt-1">Tìm hiểu về NICKFASHION</p>
              </div>
              <nav className="p-2! max-h-[70vh] overflow-y-auto">
                {groups.map(([group, items]) => (
                  <div key={group} className="mb-1!">
                    <div className="px-3! py-2! text-[11px] uppercase tracking-wider text-[#adb6c9] font-[700]">
                      {group}
                    </div>
                    <ul>
                      {items.map((item) => {
                        const active = activeId === item.id;
                        return (
                          <li key={item.id}>
                            <Link
                              to={`?section=${item.id}`}
                              className={`flex items-center justify-between gap-2 px-3! py-2.5! rounded-lg text-[13px] transition-all ${
                                active
                                  ? "bg-[#f0f9f3] text-[#61a678] font-[600]"
                                  : "text-[#333f48] hover:bg-[#f7f9fc]"
                              }`}
                            >
                              <span className="flex items-center gap-2.5 truncate">
                                <span className={active ? "text-[#61a678]" : "text-[#adb6c9]"}>
                                  {item.icon}
                                </span>
                                <span className="truncate">{item.title}</span>
                              </span>
                              {active && <RightOutlined style={{ fontSize: 10 }} />}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>

            {/* Support Card */}
            <div className="mt-4! bg-gradient-to-br from-[#333f48] to-[#1f2a32] text-white rounded-2xl p-5!">
              <CustomerServiceOutlined className="text-[24px] text-[#73b863] mb-2!" />
              <h4 className="font-[700] text-[15px]">Bạn cần hỗ trợ?</h4>
              <p className="text-white/70 text-[12px] mt-1 mb-3">
                Đội ngũ CSKH luôn sẵn sàng hỗ trợ bạn 24/7.
              </p>
              <a
                href="tel:02473030222"
                className="block text-center py-2! bg-[#73b863] hover:bg-[#61a678] rounded-lg text-[13px] font-[600] transition-colors"
              >
                Gọi 024-7303-0222
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-[40px]">
            {/* Giới thiệu */}
            <Section id="gioi-thieu" title="Giới thiệu về NICKFASHION" subtitle="Hành trình 10 năm kiến tạo phong cách Việt">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4 text-[14px] leading-[24px] text-[#45525e]">
                  <p>
                    <strong className="text-[#333f48]">NICKFASHION</strong> là thương hiệu thời trang Việt Nam được thành lập từ năm 2016,
                    chuyên cung cấp các sản phẩm may mặc chất lượng cao với thiết kế hiện đại, tinh tế và phù hợp với mọi lứa tuổi.
                  </p>
                  <p>
                    Với hơn <strong className="text-[#61a678]">150 cửa hàng</strong> trên toàn quốc và nền tảng thương mại điện tử
                    NICKFASHION.VN, chúng tôi tự hào phục vụ hàng triệu khách hàng Việt mỗi năm, mang đến trải nghiệm mua sắm
                    tiện lợi, thân thiện và đáng tin cậy.
                  </p>
                  <p>
                    Sứ mệnh của chúng tôi là <em>"Kiến tạo phong cách – Nâng tầm cuộc sống"</em>, mang đến những sản phẩm
                    thời trang bền vững, thân thiện với môi trường và đóng góp tích cực cho cộng đồng.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard value="150+" label="Cửa hàng" color="#61a678" />
                  <StatCard value="10+" label="Năm kinh nghiệm" color="#2e90fa" />
                  <StatCard value="5M+" label="Khách hàng" color="#f59e0b" />
                  <StatCard value="2000+" label="Sản phẩm" color="#ef4444" />
                </div>
              </div>
              <div className="mt-6! grid grid-cols-1 md:grid-cols-3 gap-4">
                <ValueCard icon={<RocketOutlined />} title="Sáng tạo" desc="Không ngừng đổi mới, cập nhật xu hướng thời trang mới nhất." />
                <ValueCard icon={<HeartOutlined />} title="Chất lượng" desc="Cam kết chất lượng vượt trội, từ chất liệu đến đường may." />
                <ValueCard icon={<TeamOutlined />} title="Cộng đồng" desc="Đồng hành cùng khách hàng và cộng đồng trên mọi hành trình." />
              </div>
            </Section>

            {/* Hệ thống cửa hàng */}
            <Section id="he-thong-cua-hang" title="Hệ thống cửa hàng" subtitle="Hơn 150 cửa hàng trên toàn quốc">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STORES.map((store, idx) => (
                  <div
                    key={idx}
                    className="group p-5! bg-white border border-[#e5eaf0] rounded-xl hover:border-[#61a678] hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f0f9f3] text-[#61a678] flex items-center justify-center text-[18px]">
                        <EnvironmentOutlined />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-[700] text-[15px] text-[#333f48]">
                          NICKFASHION {store.city}
                        </h4>
                        <p className="text-[13px] text-[#667280] mt-1">{store.address}</p>
                        <p className="text-[13px] text-[#667280]">{store.district}</p>
                        <div className="mt-3! flex flex-wrap gap-3 text-[12px] text-[#45525e]">
                          <span className="flex items-center gap-1.5">
                            <PhoneOutlined className="text-[#61a678]" /> {store.phone}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <ClockCircleOutlined className="text-[#61a678]" /> {store.hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Tin tức */}
            <Section id="tin-tuc" title="Tin tức &amp; Sự kiện" subtitle="Cập nhật tin tức mới nhất từ NICKFASHION">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {NEWS.map((n, idx) => (
                  <article
                    key={idx}
                    className="group bg-white border border-[#e5eaf0] rounded-xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#61a678] to-[#73b863] relative">
                      <img
                        src={`https://images.unsplash.com/photo-${idx % 2 === 0 ? "1490481651871" : "1483985988355-763728e1935b"}?w=600&q=70`}
                        alt={n.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span className="absolute top-3 left-3 px-2.5! py-1! bg-white/95 text-[11px] font-[700] text-[#61a678] rounded">
                        {n.tag}
                      </span>
                    </div>
                    <div className="p-4!">
                      <p className="text-[12px] text-[#adb6c9] mb-1">{n.date}</p>
                      <h4 className="font-[700] text-[15px] text-[#333f48] group-hover:text-[#61a678] transition-colors line-clamp-2">
                        {n.title}
                      </h4>
                      <p className="text-[13px] text-[#667280] mt-2! line-clamp-2">{n.desc}</p>
                      <button className="mt-3! text-[13px] font-[600] text-[#61a678] hover:underline">
                        Đọc tiếp →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            {/* Tuyển dụng */}
            <Section id="tuyen-dung" title="Tuyển dụng" subtitle="Cơ hội nghề nghiệp tại NICKFASHION">
              <div className="bg-gradient-to-r from-[#61a678] to-[#73b863] rounded-xl p-6! text-white mb-6!">
                <h3 className="text-[20px] font-[700]">Gia nhập đội ngũ NICKFASHION</h3>
                <p className="text-white/90 text-[13px] mt-2 max-w-[600px]">
                  Chúng tôi luôn tìm kiếm những tài năng nhiệt huyết, sáng tạo để cùng chúng tôi kiến tạo tương lai
                  của ngành thời trang Việt Nam.
                </p>
              </div>
              <div className="space-y-3">
                {JOBS.map((job, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4! bg-white border border-[#e5eaf0] rounded-xl hover:border-[#61a678] hover:shadow-md transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-[700] text-[15px] text-[#333f48] group-hover:text-[#61a678] transition-colors">
                        {job.title}
                      </h4>
                      <div className="mt-2! flex flex-wrap gap-2 text-[12px] text-[#667280]">
                        <span className="px-2! py-0.5! bg-[#f0f9f3] text-[#61a678] rounded">{job.location}</span>
                        <span className="px-2! py-0.5! bg-[#f7f9fc] text-[#45525e] rounded">{job.type}</span>
                        <span className="px-2! py-0.5! bg-[#fff7ed] text-[#f59e0b] rounded">{job.salary}</span>
                      </div>
                    </div>
                    <button className="shrink-0 px-5! py-2.5! bg-[#333f48] hover:bg-[#61a678] text-white text-[13px] font-[600] rounded-lg transition-colors">
                      Ứng tuyển ngay
                    </button>
                  </div>
                ))}
              </div>
            </Section>

            {/* Với cộng đồng */}
            <Section id="voi-cong-dong" title="Với cộng đồng" subtitle="NICKFASHION – Đồng hành cùng cộng đồng">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <CommunityCard
                  title="Chiến dịch 'Áo ấm mùa đông'"
                  desc="Trao tặng hơn 50.000 chiếc áo ấm cho trẻ em vùng cao Tây Bắc trong 3 năm qua."
                  year="2023 - 2026"
                  color="#61a678"
                />
                <CommunityCard
                  title="Quỹ học bổng 'Nâng bước tương lai'"
                  desc="Tài trợ học bổng cho 500+ sinh viên nghèo vượt khó trên cả nước."
                  year="2022 - nay"
                  color="#2e90fa"
                />
                <CommunityCard
                  title="Bảo vệ môi trường xanh"
                  desc="Sử dụng 100% bao bì tái chế và vải organic trong sản xuất từ năm 2024."
                  year="2024 - nay"
                  color="#f59e0b"
                />
                <CommunityCard
                  title="Hiến máu nhân đạo"
                  desc="Phối hợp tổ chức ngày hội hiến máu thường niên với hàng nghìn CBNV tham gia."
                  year="Thường niên"
                  color="#ef4444"
                />
              </div>
            </Section>

            {/* Liên hệ */}
            <Section id="lien-he" title="Liên hệ với chúng tôi" subtitle="Chúng tôi sẵn sàng lắng nghe bạn">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <InfoRow icon={<PhoneOutlined />} label="Hotline" value="024 - 7303.0222" />
                  <InfoRow icon={<MailOutlined />} label="Email" value="hello@nickfashion.vn" />
                  <InfoRow icon={<EnvironmentOutlined />} label="Trụ sở chính" value="Phòng 301, tầng 3, tòa nhà GP Invest, 170 La Thành, P. Ô Chợ Dừa, Hà Nội" />
                  <InfoRow icon={<ClockCircleOutlined />} label="Giờ làm việc" value="Thứ 2 - Chủ nhật: 08:00 - 22:00" />

                  <div className="pt-3">
                    <p className="text-[13px] text-[#667280] mb-2">Theo dõi chúng tôi:</p>
                    <div className="flex gap-3">
                      {[
                        { icon: <FacebookOutlined />, bg: "#1877f2" },
                        { icon: <InstagramOutlined />, bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" },
                        { icon: <YoutubeOutlined />, bg: "#ff0000" },
                        { icon: <TikTokOutlined />, bg: "#000000" },
                      ].map((s, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[16px] hover:scale-110 transition-transform"
                          style={{ background: s.bg }}
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleContactSubmit}
                  className="bg-white border border-[#e5eaf0] rounded-xl p-5 space-y-4"
                >
                  <h4 className="font-[700] text-[16px] text-[#333f48]">Gửi tin nhắn cho chúng tôi</h4>
                  <Input label="Họ và tên *" value={contactForm.name} onChange={(v) => setContactForm({ ...contactForm, name: v })} placeholder="Nhập họ tên" />
                  <Input label="Email *" type="email" value={contactForm.email} onChange={(v) => setContactForm({ ...contactForm, email: v })} placeholder="example@email.com" />
                  <Input label="Số điện thoại" value={contactForm.phone} onChange={(v) => setContactForm({ ...contactForm, phone: v })} placeholder="0123 456 789" />
                  <div>
                    <label className="block text-[13px] font-[600] text-[#333f48] mb-1.5">
                      Nội dung *
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Nhập nội dung liên hệ..."
                      rows={4}
                      className="w-full px-3 py-2.5 border border-[#e5eaf0] rounded-lg text-[13px] focus:outline-none focus:border-[#61a678] focus:ring-2 focus:ring-[#f0f9f3] transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#333f48] hover:bg-[#61a678] text-white text-[14px] font-[600] rounded-lg transition-colors"
                  >
                    Gửi liên hệ
                  </button>
                </form>
              </div>
            </Section>

            {/* Hỏi đáp */}
            <Section id="hoi-dap" title="Hỏi đáp thường gặp" subtitle="Giải đáp nhanh những thắc mắc phổ biến">
              <Collapse
                ghost
                expandIconPosition="end"
                items={FAQ_ITEMS.map((item, idx) => ({
                  key: idx.toString(),
                  label: <span className="font-[600] text-[14px] text-[#333f48]">{item.q}</span>,
                  children: <p className="text-[13px] text-[#45525e] leading-[22px]">{item.a}</p>,
                  style: { borderBottom: "1px solid #e5eaf0" },
                }))}
              />
            </Section>

            {/* Điều kiện - Điều khoản KHTT */}
            <Section id="dieu-kien-dieu-khoan" title="Điều kiện &amp; Điều khoản KHTT" subtitle="Chương trình khách hàng thân thiết">
              <PolicyContent
                intro="Chương trình Khách hàng Thân thiết (KHTT) của NICKFASHION được thiết kế để tri ân và mang đến những đặc quyền dành riêng cho khách hàng thường xuyên."
                items={[
                  { title: "Điều kiện tham gia", content: "Mọi khách hàng có hóa đơn mua hàng từ 500.000đ trở lên hoặc đăng ký tài khoản trên website đều có thể tham gia chương trình KHTT." },
                  { title: "Cách tích điểm", content: "Mỗi 10.000đ giá trị đơn hàng = 1 điểm thưởng. Điểm thưởng có giá trị quy đổi thành voucher giảm giá hoặc quà tặng." },
                  { title: "Hạng thành viên", content: "Hạng Đồng (0-999 điểm), Bạc (1000-4999 điểm), Vàng (5000-19999 điểm), Bạch Kim (trên 20000 điểm). Mỗi hạng có ưu đãi riêng." },
                  { title: "Thời hạn điểm thưởng", content: "Điểm thưởng có giá trị trong vòng 12 tháng kể từ ngày tích lũy. Sau thời hạn sẽ tự động reset." },
                  { title: "Điều khoản chung", content: "NICKFASHION có quyền thay đổi điều khoản chương trình với thông báo trước 30 ngày trên website và tại cửa hàng." },
                ]}
              />
            </Section>

            {/* Chính sách KHTT */}
            <Section id="chinh-sach-khtt" title="Chính sách Khách hàng Thân thiết" subtitle="Quyền lợi đặc quyền dành cho bạn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <TierCard tier="Đồng" color="#cd7f32" discount="5%" perks={["Tích điểm cơ bản", "Voucher sinh nhật 100K", "Miễn phí đổi trả 7 ngày"]} />
                <TierCard tier="Bạc" color="#9ca3af" discount="10%" perks={["Tất cả quyền lợi hạng Đồng", "Voucher sinh nhật 200K", "Ưu đãi độc quyền mỗi tháng"]} />
                <TierCard tier="Vàng" color="#f59e0b" discount="15%" perks={["Tất cả quyền lợi hạng Bạc", "Voucher sinh nhật 500K", "Xem trước BST mới", "Free ship không giới hạn"]} />
                <TierCard tier="Bạch Kim" color="#1f2937" discount="20%" perks={["Tất cả quyền lợi hạng Vàng", "Voucher sinh nhật 1 triệu", "Personal stylist", "Sự kiện VIP"]} />
              </div>
            </Section>

            {/* Chính sách vận chuyển */}
            <Section id="chinh-sach-van-chuyen" title="Chính sách vận chuyển" subtitle="Giao hàng nhanh chóng – An toàn – Tin cậy">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <ShippingCard time="24h" area="Nội thành HN, HCM" price="25.000đ" />
                <ShippingCard time="2 - 3 ngày" area="Các tỉnh thành khác" price="35.000đ" />
                <ShippingCard time="5 - 7 ngày" area="Vùng sâu, vùng xa" price="45.000đ" />
              </div>
              <PolicyContent
                items={[
                  { title: "Thời gian xử lý đơn hàng", content: "Đơn hàng được xử lý trong vòng 24h làm việc (không tính cuối tuần và ngày lễ). Sau khi xác nhận, đơn hàng sẽ được chuyển cho đơn vị vận chuyển." },
                  { title: "Đơn vị vận chuyển", content: "Chúng tôi hợp tác với các đơn vị vận chuyển uy tín: GHTK, GHN, Viettel Post, J&T Express, Ninja Van và các đối tác khác." },
                  { title: "Miễn phí vận chuyển", content: "Đơn hàng từ 500.000đ trở lên được miễn phí vận chuyển toàn quốc. Thành viên Vàng & Bạch Kim được freeship không giới hạn giá trị đơn." },
                  { title: "Theo dõi đơn hàng", content: "Bạn sẽ nhận được mã vận đơn qua email/SMS ngay khi đơn hàng được giao cho đơn vị vận chuyển để theo dõi hành trình đơn hàng." },
                  { title: "Đóng gói", content: "Sản phẩm được đóng gói cẩn thận, sử dụng bao bì thân thiện môi trường. Đảm bảo sản phẩm đến tay khách hàng trong tình trạng hoàn hảo." },
                ]}
              />
            </Section>

            {/* Chính sách bảo mật */}
            <Section id="chinh-sach-bao-mat" title="Chính sách bảo mật thông tin" subtitle="Cam kết bảo vệ dữ liệu khách hàng">
              <PolicyContent
                intro="NICKFASHION cam kết bảo vệ thông tin cá nhân của khách hàng theo đúng các quy định của pháp luật Việt Nam về bảo vệ dữ liệu cá nhân."
                items={[
                  { title: "Thông tin thu thập", content: "Chúng tôi thu thập: họ tên, email, số điện thoại, địa chỉ giao hàng, lịch sử mua hàng và các tương tác của bạn trên website." },
                  { title: "Mục đích sử dụng", content: "Thông tin được sử dụng để xử lý đơn hàng, chăm sóc khách hàng, gửi thông báo khuyến mãi (nếu bạn đăng ký), và cải thiện chất lượng dịch vụ." },
                  { title: "Bảo mật thông tin", content: "Áp dụng công nghệ mã hóa SSL 256-bit, hệ thống tường lửa đa lớp, và các tiêu chuẩn bảo mật quốc tế PCI-DSS trong thanh toán." },
                  { title: "Chia sẻ thông tin", content: "Chúng tôi KHÔNG bán, trao đổi hoặc chia sẻ thông tin cá nhân của khách hàng cho bên thứ ba, trừ khi có sự đồng ý của bạn hoặc theo yêu cầu của cơ quan pháp luật." },
                  { title: "Quyền của khách hàng", content: "Bạn có quyền yêu cầu truy cập, chỉnh sửa, xóa thông tin cá nhân bất kỳ lúc nào. Liên hệ hello@nickfashion.vn để được hỗ trợ." },
                  { title: "Cookies", content: "Website sử dụng cookies để nâng cao trải nghiệm người dùng. Bạn có thể tắt cookies trong cài đặt trình duyệt, một số tính năng có thể bị giới hạn." },
                ]}
              />
            </Section>

            {/* Tra cứu đơn hàng */}
            <Section id="tra-cuu-don-hang" title="Tra cứu đơn hàng" subtitle="Theo dõi hành trình đơn hàng của bạn">
              <div className="bg-gradient-to-br from-[#f0f9f3] to-white border border-[#e5eaf0] rounded-xl p-6">
                <h4 className="font-[700] text-[16px] text-[#333f48] mb-4">Tra cứu nhanh</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Nhập mã đơn hàng (VD: ORD-20260520-001)"
                    className="flex-1 px-4 py-3 border border-[#e5eaf0] rounded-lg text-[13px] focus:outline-none focus:border-[#61a678] focus:ring-2 focus:ring-[#f0f9f3]"
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    className="flex-1 px-4 py-3 border border-[#e5eaf0] rounded-lg text-[13px] focus:outline-none focus:border-[#61a678] focus:ring-2 focus:ring-[#f0f9f3]"
                  />
                  <button className="px-6 py-3 bg-[#61a678] hover:bg-[#4f8c62] text-white text-[13px] font-[600] rounded-lg transition-colors whitespace-nowrap">
                    Tra cứu
                  </button>
                </div>
                <p className="text-[12px] text-[#667280] mt-3">
                  * Mã đơn hàng đã được gửi qua email khi bạn đặt hàng thành công.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  { step: 1, label: "Đã đặt hàng", desc: "Đơn hàng được tạo thành công" },
                  { step: 2, label: "Đang xử lý", desc: "Đang đóng gói sản phẩm" },
                  { step: 3, label: "Đang giao", desc: "Đơn vị vận chuyển đang giao" },
                  { step: 4, label: "Hoàn tất", desc: "Đã giao thành công" },
                ].map((s) => (
                  <div key={s.step} className="relative bg-white border border-[#e5eaf0] rounded-xl p-4">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#61a678] text-white rounded-full flex items-center justify-center text-[12px] font-[700]">
                      {s.step}
                    </div>
                    <h5 className="font-[700] text-[14px] text-[#333f48] mt-1">{s.label}</h5>
                    <p className="text-[12px] text-[#667280] mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Bảng kích cỡ */}
            <Section id="bang-kich-co" title="Bảng kích cỡ" subtitle="Hướng dẫn chọn size phù hợp">
              <div className="bg-white border border-[#e5eaf0] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead className="bg-gradient-to-r from-[#61a678] to-[#73b863] text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-[700]">Size</th>
                        <th className="px-4 py-3 text-left font-[700]">Vòng ngực (cm)</th>
                        <th className="px-4 py-3 text-left font-[700]">Vòng eo (cm)</th>
                        <th className="px-4 py-3 text-left font-[700]">Vòng hông (cm)</th>
                        <th className="px-4 py-3 text-left font-[700]">Chiều cao (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_CHART.map((row, idx) => (
                        <tr
                          key={row.size}
                          className={`border-t border-[#e5eaf0] hover:bg-[#f7f9fc] transition-colors ${
                            idx % 2 === 0 ? "bg-white" : "bg-[#fafbfc]"
                          }`}
                        >
                          <td className="px-4 py-3 font-[700] text-[#61a678]">{row.size}</td>
                          <td className="px-4 py-3 text-[#45525e]">{row.chest}</td>
                          <td className="px-4 py-3 text-[#45525e]">{row.waist}</td>
                          <td className="px-4 py-3 text-[#45525e]">{row.hip}</td>
                          <td className="px-4 py-3 text-[#45525e]">{row.height}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-[#f0f9f3] border border-[#e5eaf0] rounded-xl">
                  <h4 className="font-[700] text-[15px] text-[#333f48] mb-2">📏 Hướng dẫn đo size</h4>
                  <ul className="space-y-2 text-[13px] text-[#45525e] leading-[22px]">
                    <li>• <strong>Vòng ngực:</strong> Đo quanh phần đầy đặn nhất của ngực</li>
                    <li>• <strong>Vòng eo:</strong> Đo quanh phần nhỏ nhất của eo</li>
                    <li>• <strong>Vòng hông:</strong> Đo quanh phần đầy đặn nhất của hông</li>
                    <li>• Sử dụng thước dây, không kéo quá chặt</li>
                  </ul>
                </div>
                <div className="p-5 bg-[#fff7ed] border border-[#fde6c1] rounded-xl">
                  <h4 className="font-[700] text-[15px] text-[#333f48] mb-2">💡 Mẹo chọn size</h4>
                  <ul className="space-y-2 text-[13px] text-[#45525e] leading-[22px]">
                    <li>• Nếu số đo giữa 2 size, nên chọn size lớn hơn</li>
                    <li>• Áo form rộng nên chọn đúng size hoặc +1 size</li>
                    <li>• Quần/Đầm ôm nên chọn đúng số đo</li>
                    <li>• Liên hệ CSKH để được tư vấn chi tiết</li>
                  </ul>
                </div>
              </div>
            </Section>
          </main>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-[120px]">
    <div className="mb-5 pb-4 border-b-2 border-[#e5eaf0]">
      <h2
        className="text-[24px] lg:text-[28px] font-[800] text-[#333f48] tracking-tight"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && <p className="text-[14px] text-[#667280] mt-1">{subtitle}</p>}
    </div>
    {children}
  </section>
);

const StatCard = ({ value, label, color }: { value: string; label: string; color: string }) => (
  <div className="bg-white border border-[#e5eaf0] rounded-xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="text-[32px] font-[800]" style={{ color }}>
      {value}
    </div>
    <div className="text-[13px] text-[#667280] mt-1 font-[500]">{label}</div>
  </div>
);

const ValueCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="p-5 bg-gradient-to-br from-white to-[#f7f9fc] border border-[#e5eaf0] rounded-xl">
    <div className="w-12 h-12 rounded-lg bg-[#f0f9f3] text-[#61a678] flex items-center justify-center text-[22px] mb-3">
      {icon}
    </div>
    <h4 className="font-[700] text-[15px] text-[#333f48]">{title}</h4>
    <p className="text-[13px] text-[#667280] mt-1 leading-[20px]">{desc}</p>
  </div>
);

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3 p-4 bg-white border border-[#e5eaf0] rounded-xl">
    <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f0f9f3] text-[#61a678] flex items-center justify-center text-[16px]">
      {icon}
    </div>
    <div className="min-w-0">
      <div className="text-[12px] text-[#adb6c9] uppercase tracking-wider font-[600]">{label}</div>
      <div className="text-[14px] text-[#333f48] font-[600] mt-0.5 break-words">{value}</div>
    </div>
  </div>
);

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div>
    <label className="block text-[13px] font-[600] text-[#333f48] mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-[#e5eaf0] rounded-lg text-[13px] focus:outline-none focus:border-[#61a678] focus:ring-2 focus:ring-[#f0f9f3] transition-all"
    />
  </div>
);

const TierCard = ({
  tier,
  color,
  discount,
  perks,
}: {
  tier: string;
  color: string;
  discount: string;
  perks: string[];
}) => (
  <div className="bg-white border border-[#e5eaf0] rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="p-4 text-center text-white" style={{ background: color }}>
      <div className="text-[18px] font-[800]">{tier}</div>
      <div className="text-[24px] font-[800] mt-1">Giảm {discount}</div>
    </div>
    <div className="p-4">
      <ul className="space-y-2 text-[13px] text-[#45525e]">
        {perks.map((p, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-[#61a678] mt-0.5">✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ShippingCard = ({ time, area, price }: { time: string; area: string; price: string }) => (
  <div className="bg-white border border-[#e5eaf0] rounded-xl p-5 text-center hover:border-[#61a678] transition-colors">
    <div className="w-12 h-12 mx-auto rounded-full bg-[#f0f9f3] text-[#61a678] flex items-center justify-center text-[20px] mb-3">
      <TruckOutlined />
    </div>
    <div className="text-[20px] font-[800] text-[#333f48]">{time}</div>
    <div className="text-[13px] text-[#667280] mt-1">{area}</div>
    <div className="mt-3 pt-3 border-t border-[#e5eaf0]">
      <span className="text-[14px] font-[700] text-[#61a678]">{price}</span>
    </div>
  </div>
);

const PolicyContent = ({
  intro,
  items,
}: {
  intro?: string;
  items: { title: string; content: string }[];
}) => (
  <div className="bg-white border border-[#e5eaf0] rounded-xl p-5 lg:p-6 space-y-4">
    {intro && <p className="text-[14px] text-[#45525e] leading-[24px] italic border-l-4 border-[#61a678] pl-4">{intro}</p>}
    {items.map((item, idx) => (
      <div key={idx} className="border-b border-[#e5eaf0] last:border-b-0 pb-4 last:pb-0">
        <h4 className="font-[700] text-[15px] text-[#333f48] mb-2 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#f0f9f3] text-[#61a678] flex items-center justify-center text-[11px] font-[800]">
            {idx + 1}
          </span>
          {item.title}
        </h4>
        <p className="text-[13px] text-[#45525e] leading-[22px] pl-8">{item.content}</p>
      </div>
    ))}
  </div>
);

const CommunityCard = ({
  title,
  desc,
  year,
  color,
}: {
  title: string;
  desc: string;
  year: string;
  color: string;
}) => (
  <div className="bg-white border border-[#e5eaf0] rounded-xl p-5 hover:shadow-lg transition-all">
    <div className="flex items-start gap-3">
      <div
        className="w-12 h-12 shrink-0 rounded-lg flex items-center justify-center text-white text-[20px]"
        style={{ background: color }}
      >
        <HeartOutlined />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-[700] text-[15px] text-[#333f48]">{title}</h4>
        <p className="text-[13px] text-[#667280] mt-2 leading-[20px]">{desc}</p>
        <span className="inline-block mt-3 text-[11px] font-[600] text-[#61a678] bg-[#f0f9f3] px-2 py-1 rounded">
          {year}
        </span>
      </div>
    </div>
  </div>
);

export default InformationPage;
