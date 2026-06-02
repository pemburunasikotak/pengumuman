import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Result from '../pages/Result';
import Verify from '../pages/Verify';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/result" element={<Result />} />
      <Route path="/verify/:id" element={<Verify />} />
    </Routes>
  );
}
