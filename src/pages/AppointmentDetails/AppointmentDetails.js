import { useLocation, useNavigate } from "react-router-dom";
import { deleteAppointment } from "../../api/appointments";

function AppointmentDetails() {
  const location = useLocation();
  const appointment = location.state; // Access passed data
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/update-appointment", { state: appointment });
  };

  const handleDelete = async () => {
    try {
      if (!appointment) {
        alert("No appointment data available");
        return;
      }

      const { _id, number } = appointment;

      // Attempt deletion with ID or fallback to phone number
      await deleteAppointment(_id, number);

      alert("Appointment deleted successfully");
      navigate("/"); // Navigate back to the previous page
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-red-500 to-blue-500 p-10">
      <div className="relative bg-gradient-to-r from-cyan-400 to-sky-500 rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
        <div className="absolute inset-0 bg-white shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative p-8 sm:p-10">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center">
            Appointment Details
          </h2>
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              <strong className="text-gray-600">Name:</strong>{" "}
              {appointment.name}
            </p>
            <p>
              <strong className="text-gray-600">Number:</strong>{" "}
              {appointment.number}
            </p>
            <p>
              <strong className="text-gray-600">Email:</strong>{" "}
              {appointment.email}
            </p>
            <p>
              <strong className="text-gray-600">Date:</strong>{" "}
              {appointment.date}
            </p>
            <p>
              <strong className="text-gray-600">Time:</strong>{" "}
              {appointment.time}
            </p>
            <p>
              <strong className="text-gray-600">Category:</strong>{" "}
              {appointment.category}
            </p>
            <p>
              <strong className="text-gray-600">Price:</strong> $
              {appointment.price}
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-6 text-center">
            Created on{" "}
            {appointment.createdAt
              ? new Date(appointment.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
          <div className="mt-6 flex justify-center space-x-2 text-[15px]">
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
            >
              Delete Appointment
            </button>
            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto bg-sky-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            >
              Update Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;
