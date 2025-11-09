import { useState } from "react";

const PatientDashboard = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-wrap gap-6 justify-start">
      {/* First Card: Patient Info + Photo */}
      <div
        className="bg-indigo-50 rounded-2xl p-6 flex justify-between items-start"
        style={{ width: "747px", height: "251px" }}
      >
        {/* Patient Info */}
        <div className="flex-1 pr-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            Jonathon Sanders
          </h2>
          <p className="text-xl text-black font-semibold mb-4">
            Insurance ID: #P170025
          </p>

          {/* First Row - Treatment, Diagnosis, Blood Sugar */}
          <div className="flex justify-between border-b border-gray-300 pb-3 mb-4">
            <div>
              <div className="text-lg text-gray-800">Treatment Phase</div>
              <div className="text-lg font-bold text-gray-900">
                Initial Inspection
              </div>
            </div>
            <div>
              <div className="text-lg text-gray-800">Diagnosis</div>
              <div className="text-lg font-bold text-gray-900">
                Chronic Headache
              </div>
            </div>
            <div>
              <div className="text-lg text-gray-800">Blood Sugar</div>
              <div className="text-2xl font-bold text-gray-900">
                90 <span className="text-sm">mg/dl</span>
              </div>
            </div>
          </div>

          {/* Second Row - Last Visited, Phone, Email */}
          <div className="flex justify-between">
            <div>
              <div className="text-lg text-gray-800">Last Visited</div>
              <div className="text-lg font-bold text-gray-900">30 Apr 2025</div>
            </div>
            <div>
              <div className="text-lg text-gray-800">Phone</div>
              <div className="text-lg font-bold text-gray-900">+1 54546 45648</div>
            </div>
            <div>
              <div className="text-lg text-gray-800">Email</div>
              <div className="text-lg font-bold text-gray-900">
                username@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* Patient Photo */}
        <div className="w-48 h-56 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-50 to-purple-50 shadow-md">
          {!imgError ? (
            <img
              src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=500&fit=crop"
              alt="Patient"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <div className="text-lg font-semibold">Jonathon Sanders</div>
              <div className="text-sm opacity-80">Patient #P170025</div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards Container */}
      <div className="flex flex-col gap-6">
        {/* Top Row: 2 Cards */}
        <div className="flex gap-6">
          <div
            className="bg-purple-100 rounded-2xl p-4"
            style={{ width: "355px" }}
          >
            <div className="text-lg text-red-600 font-medium mb-1">
              ESR <span className="font-bold">(Critical)</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              65 <span className="text-sm font-bold">mm/hr</span>
            </div>
            <div className="text-sm text-gray-700 mt-1">
              Inflammation (25% Increase)
            </div>
          </div>

          <div
            className="bg-blue-100 rounded-2xl p-4"
            style={{ width: "355px" }}
          >
            <div className="text-lg text-orange-600 font-bold mb-1">
              Vitamin D <span className="font-bold">(Minor)</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              28 <span className="text-sm font-bold">ng/ml</span>
            </div>
            <div className="text-sm text-gray-700 mt-1">
              Stable but declining (15% Drop)
            </div>
          </div>
        </div>

        {/* Bottom Row: 1 Card */}
        <div
          className="bg-orange-100 rounded-2xl p-4"
          style={{ width: "355px" }}
        >
          <div className="text-lg text-gray-900 font-bold mb-2">Overall Status</div>
          <div className="text-xl font-bold text-gray-900 mb-1">
            All Markers Stable
          </div>
          <div className="text-sm text-gray-800">No alerts generated at this time</div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
