import { useEffect, useState } from "react";
import { db } from "./db/offlineDB";
import NetworkStatus from "./components/NetworkStatus";
function App() {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);
  // Load appointments when the app starts
  useEffect(() => {
    loadAppointments();
  }, []);
  // Get appointments from IndexedDB
  async function loadAppointments() {
    try {
      const savedAppointments = await db.appointments.toArray();
      console.log("Saved appointments:", savedAppointments);
      setAppointments(savedAppointments);
    } catch (error) {
      console.error("Could not load appointments:", error);
    }
  }
  // Book a new appointment
  const bookAppointment = async (e) => {
    e.preventDefault();
    if (!patientName || !doctorName || !date) {
      setMessage("Please fill all fields.");
      return;
    }
    const appointment = {
      patientName: patientName,
      doctorName: doctorName,
      date: date,
      status: "pending",
      offline: !navigator.onLine,
      createdAt: Date.now(),
    };
    try {
      // Save appointment in IndexedDB
      await db.appointments.add(appointment);
      // Reload appointments from IndexedDB
      await loadAppointments();
      // Add to sync queue if offline
      if (!navigator.onLine) {
        await db.syncQueue.add({
          type: "CREATE_APPOINTMENT",
          data: appointment,
          createdAt: Date.now(),
        });
        setMessage(
          "🔴 Offline: Appointment saved locally and will sync when internet returns."
        );
      } else {
        setMessage("🟢 Appointment saved successfully.");
      }
      // Clear form
      setPatientName("");
      setDoctorName("");
      setDate("");
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("❌ Could not save appointment.");
    }
  };
  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h1>Rural Healthcare Access Platform</h1>
      <NetworkStatus />
      <hr />
      <h2>Book Doctor Appointment</h2>
      <form onSubmit={bookAppointment}>
        <div>
          <label>Patient Name</label>
          <br />
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient name"
          />
        </div>
        <br />
        <div>
          <label>Doctor Name</label>
          <br />
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Enter doctor name"
          />
        </div>
        <br />
        <div>
          <label>Appointment Date</label>
          <br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Book Appointment</button>
      </form>
      <br />
      {message && <p>{message}</p>}
      <h2>My Appointments</h2>

{appointments.length === 0 ? (
  <p>No appointments booked yet.</p>
) : (
  <ul>
    {appointments.map((appointment) => (
      <li key={appointment.id}>
        <strong>{appointment.patientName}</strong>
        {" - "}
        Dr. {appointment.doctorName}
        {" - "}
        {appointment.date}
        {" - "}
        {appointment.status}
      </li>
    ))}
  </ul>
)}
      <hr />
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        appointments.map((appointment) => (
          <div key={appointment.id}>
            <p>
              <strong>Patient:</strong> {appointment.patientName}
            </p>
            <p>
              <strong>Doctor:</strong> {appointment.doctorName}
            </p>
            <p>
              <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              <strong>Status:</strong> {appointment.status}
            </p>
            {appointment.offline && (
              <p>🔴 Waiting for internet synchronization</p>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
export default App;