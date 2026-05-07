# NickFashion Frontend

NickFashion is a modern, high-performance e-commerce web application specialized in fashion. This project provides a seamless shopping experience for customers and a robust management system for administrators.

## 🚀 Features

### Customer Experience
- **Elegant Homepage**: Featured collections, promotional banners, and trending products.
- **Dynamic Product Filtering**: Filter by category (Male, Female, Boy, Girl), price range, color, size, and discounts.
- **Product Details**: Detailed views with variants selection and smooth image transitions.
- **Cart & Checkout**: Streamlined shopping cart and secure checkout process.
- **User Account**:
  - Secure Authentication (JWT, Google OAuth).
  - Profile Management.
  - Order History & Tracking.
  - Wishlist.
- **Multilingual Support**: Vietnamese and English support via i18next.

### Admin Dashboard
- **Comprehensive Analytics**: Visual charts for sales and user growth.
- **Product Management**: Create, update, and manage inventory.
- **Order Management**: Track and update shipping statuses.
- **User Management**: Manage customer accounts and permissions.

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **UI/UX**: 
  - [Ant Design](https://ant.design/) & [Pro Components](https://procomponents.ant.design/)
  - [TailwindCSS 4](https://tailwindcss.com/) & [Sass](https://sass-lang.com/)
  - [Framer Motion](https://www.framer.com/motion/) & [React Spring](https://www.react-spring.dev/) for animations
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [React Router Dom 7](https://reactrouter.com/)
- **API Calls**: [Axios](https://axios-http.com/)
- **Date Handling**: [Dayjs](https://day.js.org/)
- **Internationalization**: [i18next](https://www.i18next.com/)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hktkhai2020/NickFashion-fe.git
   cd NickFashion-fe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env.development` file in the root directory and add:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run preview`: Locally previews the production build.

## 📄 License

This project is licensed under the MIT License.
