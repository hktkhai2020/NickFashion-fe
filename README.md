# 🧥 NickFashion - Premium Fashion E-Commerce Platform

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.29-0170FE.svg?logo=ant-design)](https://ant.design/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-https%3A%2F%2Fwww.nickfashion.asia%2F-FF6B6B.svg?logo=google-chrome)](https://www.nickfashion.asia/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101.svg?logo=socket.io)](https://socket.io/)

NickFashion is a state-of-the-art fashion e-commerce solution designed for a premium shopping experience. Built with the latest web technologies, it offers a seamless, lightning-fast interface for customers and a comprehensive management suite for business owners.

🌐 **Live site:** [https://www.nickfashion.asia/](https://www.nickfashion.asia/)

---

## ✨ Core Highlights

### 🛍️ Customer-Centric Experience
*   **Adaptive Product Hub**: Intelligent filtering by gender (Male, Female, Kids), price spectrum, color palettes, and sizing.
*   **Dynamic Visuals**: High-fidelity product galleries with variant-specific images and smooth transitions using **Framer Motion**.
*   **Smart Shopping Cart**: Real-time updates, coupon application, and persistent storage using **Zustand**.
*   **Secure Checkout**: Multi-step checkout flow with order summary and secure payment integration.
*   **Universal Auth**: Modern authentication supporting traditional JWT and **Google OAuth 2.0**.
*   **Global Reach**: Fully localized experience in Vietnamese and English via **i18next**.
*   **Real-time Chat Support**: Live conversation with support staff via **Socket.IO**, with typing indicators and instant message delivery.

### ⚙️ Professional Admin Control Center
*   **Insightful Analytics**: Dynamic sales charts and growth metrics powered by **@ant-design/charts**.
*   **Inventory Mastery**: Granular control over Brands, Suppliers, Categories, and Product Variants (Sizes/Colors).
*   **Logistic Efficiency**: Full lifecycle management of Goods Receipts and Sell Invoices.
*   **Promotional Engine**: Robust Coupon management system to drive sales.
*   **User Governance**: Advanced user role management and profile auditing.
*   **Live Support Console**: Admin-side chat panel to handle customer conversations in real time, with the ability to close conversations.

---

## 🛠️ Technical Architecture

### Frontend Stack
-   **Core**: `React 19` (Latest features), `Vite 7` (Ultra-fast builds), `TypeScript` (Type safety).
-   **UI System**: `Ant Design 5` (Enterprise components), `TailwindCSS 4` (Modern styling).
-   **Animations**: `Framer Motion` & `React Spring` (Premium micro-interactions).
-   **State Management**: `Zustand` (Lightweight, reactive state).
-   **Data Layer**: `@tanstack/react-query` (Server-state caching & synchronization).
-   **Realtime**: `Socket.IO Client` (Bi-directional events for chat).
-   **Networking**: `Axios` with custom interceptors for seamless API communication.
-   **Architecture**: Service-oriented architecture with custom hooks for clean logic separation.

### Project Structure
```text
src/
├── api/            # API configurations & Axios instances
├── components/     # Reusable UI components & layouts
│   ├── admin/      # Admin-only components (chat, etc.)
│   └── chat/       # Customer-facing chat widgets
├── constants/      # Application constants & route definitions
├── hooks/          # Custom business logic hooks
├── lib/            # Core libraries (Socket service, etc.)
├── pages/          # Feature-specific page components
│   └── admin/      # Admin pages
├── providers/      # React context providers (Socket, etc.)
├── routes/         # Centralized routing logic (Admin/Auth/App)
├── services/       # API abstraction layer (Auth, Product, Order, etc.)
├── store/          # Zustand global state stores
├── styles/         # SCSS modules (admin, customer, etc.)
└── types/          # Global TypeScript definitions
```

---

## 🚀 Development Workflow

### Prerequisites
- Node.js (v18+)
- npm / yarn / pnpm

### Setup
1.  **Clone & Install**:
    ```bash
    git clone https://github.com/hktkhai2020/NickFashion-fe.git
    cd NickFashion-fe
    npm install
    ```

2.  **Environment Setup**:
    Create `.env.production` (used at runtime) and `.env.development` (for local dev):
    ```env
    VITE_API_URL=https://api.nickfashion.asia/api
    VITE_GOOGLE_CLIENT_ID=your-google-id
    ```

3.  **Launch**:
    ```bash
    npm run dev
    ```

### Available Scripts
| Script | Description |
| :--- | :--- |
| `npm run dev` | Start development server with HMR on `http://localhost:3000` |
| `npm run build` | Generate production-ready bundle in `dist/` |
| `npm run lint` | Analyze code for potential issues |
| `npm run preview` | Serve production build locally |

---

## 🌐 Deployment

The production build is deployed and publicly available at:

**👉 [https://www.nickfashion.asia/](https://www.nickfashion.asia/)**

### Build for Production
```bash
npm run build
```
The optimized static assets are emitted to the `dist/` directory, ready to be served by any static host (Nginx, Vercel, Netlify, Cloudflare Pages, etc.).

The frontend talks to the production backend at **`https://api.nickfashion.asia`** (configured in `src/lib/socket.ts` and `src/api/endpoints.ts`). For local development against the local backend, swap these URLs back to `http://localhost:5000`.

---

## 💬 Real-time Chat (Socket.IO)

Customer ↔ Admin live chat is powered by Socket.IO:

- `src/lib/socket.ts` — Singleton `SocketService` with typed event payloads.
- `src/providers/SocketProvider.tsx` — React context provider for global socket access.
- `src/hooks/useMessage.ts` — Customer-side chat logic (join conversation, send/receive messages, typing indicator).
- `src/hooks/useAdminMessage.ts` — Admin-side chat logic (conversation list, reply, close conversation).
- `src/components/chat/*` — Customer chat UI (drawer, conversation, input).
- `src/components/admin/chat/*` — Admin chat UI (conversation list, message list, input).
- `src/pages/admin/AdminChat.tsx` — Admin chat page.

Key events handled: `new_message`, `message_sent`, `user_typing`, `user_stop_typing`, `conversation_closed`.

---

## 🤝 Contribution

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Developed with ❤️ by **HKT Khai**
