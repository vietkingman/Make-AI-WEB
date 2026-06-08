import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout';
import BlogDetailPage from '@/pages/BlogDetailPage';
import BlogListPage from '@/pages/BlogListPage';
import HomePage from '@/pages/HomePage';
import LeaderboardPage from '@/pages/LeaderboardPage';
import NotFoundPage from '@/pages/NotFoundPage';
import OrdersPage from '@/pages/OrdersPage';
import RewardsPage from '@/pages/RewardsPage';
import ShippingPage from '@/pages/ShippingPage';
import WarehousePage from '@/pages/WarehousePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/warehouse" element={<WarehousePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
