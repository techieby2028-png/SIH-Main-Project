import Dexie, { Table } from 'dexie';

export interface ConsultationNote {
  id?: number;
  patientId: string;
  doctorNotes: string;
  timestamp: string;
  synced: boolean;
}

export class TelemedicineDatabase extends Dexie {
  notes!: Table<ConsultationNote>;

  constructor() {
    super('TelemedicineDB');
    this.version(1).stores({
      notes: '++id, patientId, timestamp, synced'
    });
  }
}

export const db = new TelemedicineDatabase();