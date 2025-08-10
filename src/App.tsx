import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ClientPage from "./pages/ClientPage";
import RoomPage from "./pages/RoomPage";
import ReservePage from "./pages/ReservePage";
import { Header } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className={`bg-gray-100 text-slate-500 min-h-screen w-full`}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clients" element={<ClientPage />} />
            <Route path="/rooms" element={<RoomPage />} />
            <Route path="/reserves" element={<ReservePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
export default App;
