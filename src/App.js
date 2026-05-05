import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import PublicLayout from "./layouts/PublicLayout";
import DealerLayout from "./layouts/DealerLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";
import Search from "./pages/public/Search";
import VehicleDetail from "./pages/public/VehicleDetail";
import RequirementForm from "./pages/public/RequirementForm";
import BusinessSignup from "./pages/public/BusinessSignup";
import BusinessLogin from "./pages/public/BusinessLogin";
import DealerSignup from "./pages/public/BusinessSignup";

import DealerDashboard from "./pages/dealer/DealerDashboard";
import MyListings from "./pages/dealer/MyListings";
import AddVehicle from "./pages/dealer/AddVehicle";
import Inquiries from "./pages/dealer/Inquiries";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DealerApprovals from "./pages/admin/DealerApprovals";
import VehicleApprovals from "./pages/admin/VehicleApprovals";
import ListingManagement from "./pages/admin/ListingManagement";
import LeadManagement from "./pages/admin/LeadManagement";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/requirement" element={<RequirementForm />} />
            <Route path="/business/signup" element={<BusinessSignup />} />
            <Route path="/business/login" element={<BusinessLogin />} />
            <Route path="/dealer/signup" element={<DealerSignup />} />
          </Route>

          <Route element={<DealerLayout />}>
            <Route path="/dealer/dashboard" element={<DealerDashboard />} />
            <Route path="/dealer/listings" element={<MyListings />} />
            <Route path="/dealer/add-vehicle" element={<AddVehicle />} />
            <Route path="/dealer/inquiries" element={<Inquiries />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dealer-approvals" element={<DealerApprovals />} />
            <Route path="/admin/vehicle-approvals" element={<VehicleApprovals />} />
            <Route path="/admin/listings" element={<ListingManagement />} />
            <Route path="/admin/leads" element={<LeadManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;