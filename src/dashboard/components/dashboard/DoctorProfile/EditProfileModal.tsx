
import { useUpdateMyProfileMutation } from '@/store/features/doctorSettings/doctorProfileApi';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


interface ProfileData {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  licenceNo: string | null;
  specialities: string[];
  experience: string;
   dob: string | null;        
  photo: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  address: string;
  emailVerifiedAt: string | null;
  twoFactorEnabled: boolean | null;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onSuccess: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  profileData,
  onSuccess 
}) => {
  const { t } = useTranslation();
  const [updateProfile, { isLoading: isSaving }] = useUpdateMyProfileMutation();

  const [formData, setFormData] = useState({
       photo: null as File | string | null,
    firstName: '',
    lastName: '',
    phone: '',
    specialities: [] as string[],
    licenceNo: '',
    dob: '',
    gender: '' as "MALE" | "FEMALE" | "OTHER" | '',
    address: '',
    experience: '',
  });

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Initialize form with profile data
  useEffect(() => {
    if (profileData) {
      // Format date for input field (YYYY-MM-DD)
      const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      setFormData({
        photo: profileData.photo || null,
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        phone: profileData.phone || '',
        specialities: profileData.specialities || [],
        licenceNo: profileData.licenceNo || '',
       dob: formatDate(profileData.dob ?? '') || '',

        gender: profileData.gender || '',
        address: profileData.address || '',
        experience: profileData.experience || '',
      });
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  // Handle specialities (comma-separated input)
  const handleSpecialitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const specialitiesArray = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData(prev => ({ ...prev, specialities: specialitiesArray }));
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setErrorMessage('');
      
      // ✅ Prepare data (remove empty gender)
      interface UpdateProfilePayload {
        firstName: string;
        lastName: string;
        phone: string;
        specialities: string[];
        licenceNo: string | null;
        dob: string;
        address: string;
        experience: string;
        gender?: "MALE" | "FEMALE" | "OTHER";
      }

      const updateData: UpdateProfilePayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        specialities: formData.specialities,
        licenceNo: formData.licenceNo || null,
        dob: formData.dob,
        address: formData.address,
        experience: formData.experience,
      };

      // Only add gender if selected
      if (formData.gender) {
        updateData.gender = formData.gender;
      }

      console.log('Submitting update:', updateData);
      
      // ✅ Call update API
      await updateProfile(updateData).unwrap();
      
      // ✅ Show success toast
      setShowSuccessToast(true);
      
      // ✅ Wait 1.5 seconds then close
      setTimeout(() => {
        setShowSuccessToast(false);
        onSuccess();
      }, 1500);
      
    } catch (error: unknown) {
      console.error('Update profile error:', error);

      let errorMsg = 'Failed to update profile. Please try again.';
      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as { data?: unknown }).data === 'object' &&
        (error as { data?: unknown }).data !== null &&
        'message' in (error as { data: { message?: unknown } }).data!
      ) {
        errorMsg = ((error as { data: { message: string } }).data).message;
      }

      setErrorMessage(errorMsg);
    }
  };

   // Handle photo change
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleClose = () => {
    if (!isSaving) {
      setErrorMessage('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-headingBlack">
                {t('dashboard.doctorProfile.editModal.title') || 'Edit Profile'}
              </h2>
              <button 
                onClick={handleClose}
                disabled={isSaving}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}

      {/* Photo Upload */}
              <div className="md:col-span-2 flex flex-col items-start">
                <label className="block text-sm font-medium text-headingBlack mb-2">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSaving}
                />
                {formData.photo && typeof formData.photo !== 'string' && (
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Preview"
                    className="mt-2 w-32 h-32 rounded-lg object-cover"
                  />
                )}
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-headingBlack mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={isSaving}
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-headingBlack mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={isSaving}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-headingBlack mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={isSaving}
                  placeholder="+1234567890"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-headingBlack mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={isSaving}
                  placeholder="e.g., 10 years"
                />
              </div>

              {/* Specialities */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-headingBlack mb-2">
                  Specialities (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.specialities.join(', ')}
                  onChange={handleSpecialitiesChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={isSaving}
                  placeholder="e.g., Cardiology, Internal Medicine"
                />
              </div>

              {/* License Number */}
              <div>
                <label className="block text-sm font-medium text-headingBlack mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  name="licenceNo"
                  value={formData.licenceNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={isSaving}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-headingBlack mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={isSaving}
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-headingBlack mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={isSaving}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Address - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-headingBlack mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={isSaving}
                  placeholder="123 Medical Street, City"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSaving}
                className="flex-1 px-6 py-3 border border-gray-300 text-[#111C35] rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-[#526FFF] text-white rounded-lg hover:bg-[#4158D9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p className="font-semibold">Profile updated successfully!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;