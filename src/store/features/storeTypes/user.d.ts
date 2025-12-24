export type TUser = {
    id: string;
    firstName: string;
    lastName: string;
    photo: string | null;
    email: string;
    doctorId: string;
    role: string;
    isVerified: boolean;
    profile_type: string;
    authType: string;
    lastOTP: string;
    isSubscribed: boolean;
    createdAt: string;
    updatedAt: string;
    profile_id: string;
  } ;