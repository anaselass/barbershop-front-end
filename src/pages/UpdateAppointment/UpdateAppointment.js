import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateAppointmentByNumber } from "../../api/appointments";

function UpdateAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state;

  const categoriesPricing = {
    "Short Haircuts": 100,
    "Medium Haircuts": 150,
    "Long Haircuts": 200,
    Undercut: 250,
    "Textured Cuts": 300,
  };

  const [formData, setFormData] = useState({
    name: appointment.name,
    number: appointment.number,
    email: appointment.email,
    date: appointment.date,
    time: appointment.time,
    category: appointment.category,
    price: categoriesPricing[appointment.category],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      price: name === "category" ? categoriesPricing[value] : prevData.price,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updates = {
        name: formData.name,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        category: formData.category,
        price: formData.price,
      };
      await updateAppointmentByNumber(formData.number, updates);
      alert("Appointment updated successfully!");
      navigate("/appointment-details", {
        state: { ...appointment, ...updates },
      });
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr to-blue-500 from-red-500 p-10">
      <div className="relative mt-[50px] flex flex-col sm:flex-row items-center space-x-16 py-6 sm:max-w-[90%] sm:mx-auto">
        <div className="relative sm:flex-1 w-[500px]">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <form
            className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10"
            onSubmit={handleUpdate}
          >
            <h2 className="text-2xl text-cyan-400 font-bold mb-6 text-center">
              Update Appointment
            </h2>
            <div className="space-y-6">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "number", label: "Phone Number", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "date", label: "", type: "date" },
                { id: "time", label: "", type: "time" },
              ].map((field) => (
                <div className="relative" key={field.id}>
                  <input
                    autoComplete="off"
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={handleInputChange}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-500"
                    placeholder={field.label}
                    required
                  />
                  <label
                    htmlFor={field.id}
                    className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    {field.label}
                  </label>
                </div>
              ))}

              {/* Category Select */}
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-500"
                  required
                >
                  <option
                    value=""
                    disabled
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-500"
                  >
                    Select a Category
                  </option>
                  {Object.keys(categoriesPricing).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Display */}
              <div className="relative">
                <label className="block text-gray-600 text-sm mb-2">
                  Appointment Price: ${formData.price}
                </label>
              </div>

              <button className="w-full bg-cyan-500 text-white py-2 rounded-lg shadow-lg hover:bg-cyan-600 transition duration-300">
                Update Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateAppointment;
