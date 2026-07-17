// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing          from './pages/Landing';
import Auth             from './pages/Auth';
import AvatarSelection  from './pages/AvatarSelection';
import Village          from './pages/Village';
import Profile          from './pages/Profile';
import Inventory        from './pages/Inventory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Landing />} />
        <Route path="/auth"     element={<Auth />} />
        <Route path="/login"    element={<Auth startMode="login" />} />
        <Route path="/signup"   element={<Auth startMode="signup" />} />
        <Route path="/avatar"   element={<AvatarSelection />} />
        <Route path="/village"  element={<Village />} />
        <Route path="/profile"  element={<Profile />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;