import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TypingAnimation from "../../components/TypingAnimation/TypingAnimation";
import { fetchAppointments, createAppointment } from "../../api/appointments";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const categoriesPricing = {
    "Short Haircuts": 100,
    "Medium Haircuts": 150,
    "Long Haircuts": 200,
    Undercut: 250,
    "Textured Cuts": 300,
  };

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    date: "",
    time: "",
    category: "",
    price: 0,
  });
  const [appointments, setAppointments] = useState([]);
  const categories = Object.keys(categoriesPricing);

  useEffect(() => {
    (async () => {
      const data = await fetchAppointments();
      setAppointments(data);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAppointment(formData);
    const data = await fetchAppointments();
    setAppointments(data);
    setFormData({
      name: "",
      number: "",
      email: "",
      date: "",
      time: "",
      category: "",
      price: 0,
    });
    navigate("/appointment-details", { state: formData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "category" ? value : value,
      price: name === "category" ? categoriesPricing[value] : formData.price,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr to-blue-500 from-red-500 p-10">
      <Navbar />
      <div className="relative mt-[50px] flex flex-col sm:flex-row items-center space-x-16 py-6 sm:max-w-[90%] sm:mx-auto">
        <TypingAnimation />

        <div className="relative sm:flex-1 w-[500px]">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <form
            className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl text-cyan-400 font-bold mb-6 text-center">
              Book an Appointment
            </h2>
            <div className="space-y-6">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "number", label: "Number", type: "text" },
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
                    onChange={handleChange}
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
                  onChange={handleChange}
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
                  {categories.map((category) => (
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
