import React, { useEffect, useState } from "react";
import { fetchAppointments } from "../../api/appointments";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments");
        setLoading(false);
      }
    };
    loadAppointments();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-500 to-blue-500 py-10 px-5 flex justify-center items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center text-white mb-10">
          Appointments
        </h1>
        {appointments.length === 0 ? (
          <div className="text-center text-white text-xl font-semibold">
            No appointments yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="relative bg-gradient-to-r from-cyan-400 to-sky-500 rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-white shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-cyan-400 mb-2 text-center">
                    {appointment.name}
                  </h2>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    {appointment.category}
                  </p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <strong>Number:</strong> {appointment.number}
                    </p>
                    <p>
                      <strong>Email:</strong> {appointment.email}
                    </p>
                    <p>
                      <strong>Date:</strong> {appointment.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {appointment.time}
                    </p>
                    <p>
                      <strong>Price:</strong> ${appointment.price}
                    </p>
                    <p>
                      <strong>Status:</strong> {appointment.orderStatus}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    Created on{" "}
                    {new Date(appointment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
