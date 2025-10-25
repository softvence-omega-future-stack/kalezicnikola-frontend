
import { Home, Edit2 } from 'lucide-react';

export default function StaffProfile() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Home className="w-4 h-4" />
          <span>Dashboard</span>
          <span>›</span>
          <span>Patients</span>
          <span>›</span>
          <span className="text-gray-900 font-medium">Patient Profile</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Staff Profile</h1>

        {/* Profile Card */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                alt="Jonathon Sanders"
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Jonathon Sanders</h2>
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">Role: Receptionist</p>
                  <p className="text-sm text-gray-700">Id: 555-0101</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors self-start">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold">Jonathon Sanders</span> is a board-certified cardiologist with over 12 years of experience in diagnosing and treating cardiovascular conditions. She specializes in interventional cardiology and echocardiography, with a focus on preventive care. Dr. Johnson is dedicated to providing compassionate.
              </p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Jonathon Sanders. History</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Name:</span>
              <span className="text-sm font-medium text-gray-900">Jonathon Sanders</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Gender:</span>
              <span className="text-sm font-medium text-gray-900">Male</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Present Address:</span>
              <span className="text-sm font-medium text-gray-900">USA</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Permanent Address:</span>
              <span className="text-sm font-medium text-gray-900">Jarmany</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Marital Status:</span>
              <span className="text-sm font-medium text-gray-900">Married</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Date of Birth:</span>
              <span className="text-sm font-medium text-gray-900">07-10-1997</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Passport Country:</span>
              <span className="text-sm font-medium text-gray-900">USA</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Nationality:</span>
              <span className="text-sm font-medium text-gray-900">USA</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">National ID:</span>
              <span className="text-sm font-medium text-gray-900">N/A</span>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
          <p className="text-sm text-gray-600 mb-6">Manage your email address, mobile number and password</p>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-gray-200">
              <span className="text-sm text-gray-700">Mobile number:</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">+880123456789</span>
                <span className="flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="currentColor"/>
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Verified
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-gray-200">
              <span className="text-sm text-gray-700">Email ID:</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">username@gmail.com</span>
                <button className="text-xs text-blue-600 font-medium hover:text-blue-700">
                  Verify your email
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">
              <span className="text-sm text-gray-700">Password:</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">••••••••</span>
                <button className="text-xs text-blue-600 font-medium hover:text-blue-700">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}