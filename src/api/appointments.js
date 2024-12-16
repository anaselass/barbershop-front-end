import axios from "axios";

const API_BASE_URL = "https://barbershop-back-end.vercel.app/api";

export const fetchAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const createAppointment = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

export const deleteAppointment = async (id, number) => {
  try {
    if (id) {
      return await axios.delete(`${API_BASE_URL}/appointments/${id}`);
    } else if (number) {
      return await axios.delete(`${API_BASE_URL}/appointments/deleteByNumber`, {
        data: { number },
      });
    } else {
      throw new Error("No ID or phone number provided for deletion");
    }
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

export const updateAppointmentByNumber = async (number, updates) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/appointments/updateByNumber`,
      {
        number,
        updates,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};
