import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Appointments from "./pages/Appointments/Appointments";
import { Layout } from "./Layout/Layout";
import AppointmentDetails from "./pages/AppointmentDetails/AppointmentDetails";
import UpdateAppointment from "./pages/UpdateAppointment/UpdateAppointment";

const App = () => {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointment-details" element={<AppointmentDetails />} />
        <Route path="/update-appointment" element={<UpdateAppointment />} />
      </Routes>
    </Router>
  );
};

export default App;
