export interface TUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  photo?: string; 
  [key: string]: any; 
}
