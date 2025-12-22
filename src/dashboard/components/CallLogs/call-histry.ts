export interface Patient {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface Appointment {
  id: string;
  appointmentDate: string;
  status: string;
}

export interface CallHistoryItem {
  id: string;
  doctorId: string;
  patientId: string | null;
  phoneNumber: string | null;
  audioUrl: string | null;
  callStatus: 'SUCCESSFUL' | 'MISSED' | 'TRANSFERRED' | 'FAILED';
  duration: number;
  transcription: string;
  intent: string;
  sentiment: string;
  summary: string | null;
  appointmentId: string | null;
  patient: Patient | null;
  insuranceId: string | null;
  reasonForCalling: string | null;
  appointment: Appointment | null;
  createdAt: string;
  updatedAt: string;
}