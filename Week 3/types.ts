export interface RegistrationData {
  fullName: string;
  email: string;
  college: string;
  year: string;
  events: string[];
  studentId: File | null;
}

export enum TechEvent {
  CODING = 'Coding Challenge',
  ROBO = 'Robo Race',
  UI = 'UI/UX Design',
  QUIZ = 'Tech Quiz',
  HACKATHON = '24h Hackathon'
}

export interface ScheduleItem {
  time: string;
  event: string;
  location: string;
  description: string;
}
