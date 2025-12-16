import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EventCategories from './pages/EventCategories';
import Events from './pages/Events';
import EventRegistrations from './pages/EventRegistrations';
import Users from './pages/Users';
import Sponsors from './pages/Sponsors';
import Accommodation from './pages/Accommodation';
import Concerts from './pages/Concerts';
import Artists from './pages/Artists';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Merchandise from './pages/Merchandise';
import MerchandiseOrders from './pages/MerchandiseOrders';

// Inside your Routes, add:



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events/categories" element={<EventCategories />} />
          <Route path="events" element={<Events />} />
          <Route path="registrations" element={<EventRegistrations />} />
          <Route path="events/:eventId/registrations" element={<EventRegistrations />} />
          <Route path="users" element={<Users />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="accommodation" element={<Accommodation />} />
          <Route path="concerts" element={<Concerts />} />
          <Route path="concerts/artists" element={<Artists />} />
          <Route path="merchandise" element={<Merchandise />} />
          <Route path="merchandise/orders" element={<MerchandiseOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
