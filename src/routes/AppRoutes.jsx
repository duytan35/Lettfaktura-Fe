import { Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from '../components/layouts/PublicLayout'
import PrivateLayout from '../components/layouts/PrivateLayout'
import Terms from '../pages/Terms'
import PriceList from '../pages/PriceList'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Terms />} />
        <Route path="terms" element={<Terms />} />
      </Route>
      
      <Route path="/dashboard" element={<PrivateLayout />}>
        <Route index element={<Navigate to="/dashboard/price-list" />} />
        <Route path="price-list" element={<PriceList />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes