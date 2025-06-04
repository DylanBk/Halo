import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Trending from "./components/pages/Trending/Trending";
import Auth from "./components/pages/Auth/Auth";
import Settings from "./components/pages/Settings/Settings";

const app = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default app;