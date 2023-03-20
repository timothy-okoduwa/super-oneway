import './App.css';
import Alerts from './components/Alerts/Alerts';
import NavBar from './components/NavBar/NavBar';
import Footer from './pages/Footer/Footer';
import Home from './pages/Home/Home';
import {  Route, Routes } from 'react-router-dom';
import Detailed from './pages/PaidTemplate/TemplateDetailed/Detailed';
import FHome from './pages/FreeTemplate/Home/FHome';
import FDetail from './pages/FreeTemplate/Free/FreeDetails/FDetail';
import PDownload from './pages/PaidTemplate/PDownload/PDownload';
import FDownload from './pages/FreeTemplate/Free/FDownload/FDownload';
import { UserAuthContextProvider } from './components/context/UserAuthContext';
import ProtectedRoute from './components/wow/ProtectedRoute';
import Upload from './pages/Upload/Upload';
import FreeUpload from './pages/Upload/FreeUpload';
import Admin from './pages/Admin/Admin';
import DashBoard from './pages/DashBoard/DashBoard';
import FreeUpdate from './pages/Update/FreeUpdate';
import Update from './pages/Update/Update';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <UserAuthContextProvider>
      <Alerts />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:templateId" element={<Detailed />} />
        <Route
          path="/pdownloadthakjeuyeyou112jrhghrhdgdhdgdvhd9876789jdEUIEU3U3U32UI43838ydjhgUYtyrtdhy9UJJSSH9276gdgnc12(*-*)487/:templateId"
          element={<PDownload />}
        />
        <Route path="/free" element={<FHome />} />
        <Route path="/fdetail/:templateId" element={<FDetail />} />
        <Route
          path="/fdownloadthankfree183636egndh03984*5^n/:templateId"
          element={<FDownload />}
        />
        <Route
          path="/paidupload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/freeupload"
          element={
            <ProtectedRoute>
              <FreeUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/freeupdate/:templateId"
          element={
            <ProtectedRoute>
              <FreeUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paidupdate/:templateId"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Admin />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <ScrollToTop />
      <Footer />
    </UserAuthContextProvider>
  );
}

export default App;
