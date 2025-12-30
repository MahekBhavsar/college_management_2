// Define a single interface for both
export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  gender: 'male' | 'female';
}

// You can create aliases so your component code still uses the names 'Student' and 'Teacher'
export type StudentData = UserProfile;
export type TeacherData = UserProfile;