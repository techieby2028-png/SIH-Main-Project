import Dexie from "dexie";

export const db = new Dexie("RuralHealthcareDB");

db.version(1).stores({
  appointments: "++id, patientId, doctorId, date, status",
  syncQueue: "++id, type, createdAt"
});