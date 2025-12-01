
// import Head from 'next/head';

const Impressum = () => {
  const hospitalInfo = {
    name: "Docline. Alle Rechte vorbehalten.",
    legalForm: "Private Limited Hospital",
    registrationNo: "REG-123456789",
    address: "Medical Road, Sector-10,German",
    phone: "+880-2-XXXX-XXXX",
    email: "info@hospitalname.com",
    website: "www.hospitalname.com",
    chairperson: "Dr. A. B. C. Rahman",
    medicalSuperintendent: "Dr. A. K. Azad",
    dataProtectionOfficer: "Mr. Md. Karim",
    ministryRegNo: "MOHFW-2023-4567",
    district: "Dhaka",
    medicalCouncilNo: "BMDC-7890",
    vatNo: "VAT-567890123",
    emergencyPhone: "+880-1711-XXXXXX"
  };

  return (
    <>
  <div className='pt-[100px]'>


        <title>Impressum (Legal Information) | {hospitalInfo.name}</title>
        <meta name="description" content="Legal information and contact details of the hospital" />
   </div>

      <div className="min-h-screen  py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Impressum
            </h1>
            <p className="text-gray-600">
              (Legal Disclosure – Mandatory according to German/European law)
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          {/* Content */}
          <div className="">
            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    1
                  </span>
                  About this Site
                </h2>
                <div className="ml-11">
                  <p className="text-gray-700 mb-3">
                    This website is operated as a doctor dashboard system by <strong>{hospitalInfo.name}</strong>.
                  </p>
                  <p className="text-gray-700">
                    It is intended solely for registered doctors and medical staff. A separate portal exists for general patients.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    2
                  </span>
                  Service Provider
                </h2>
                <div className="ml-11 bg-blue-50 p-5 rounded-lg">
                  <ul className="space-y-3">
                    <li className="flex">
                      <span className="font-medium text-gray-800 w-40">Hospital Name:</span>
                      <span className="text-gray-700">{hospitalInfo.name}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-800 w-40">Legal Form:</span>
                      <span className="text-gray-700">{hospitalInfo.legalForm}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-800 w-40">Registration No:</span>
                      <span className="text-gray-700">{hospitalInfo.registrationNo}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-800 w-40">Address:</span>
                      <span className="text-gray-700">{hospitalInfo.address}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-800 w-40">Phone:</span>
                      <span className="text-gray-700">{hospitalInfo.phone}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-800 w-40">Email:</span>
                      <span className="text-gray-700">{hospitalInfo.email}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-800 w-40">Website:</span>
                      <span className="text-gray-700">{hospitalInfo.website}</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    3
                  </span>
                  Legal Representatives
                </h2>
                <div className="ml-11">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">Chairperson / MD</h3>
                      <p className="text-gray-700">{hospitalInfo.chairperson}</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">Medical Superintendent</h3>
                      <p className="text-gray-700">{hospitalInfo.medicalSuperintendent}</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg md:col-span-2">
                      <h3 className="font-medium text-gray-800 mb-2">Data Protection Officer</h3>
                      <p className="text-gray-700">{hospitalInfo.dataProtectionOfficer}</p>
                      <p className="text-gray-600 text-sm mt-1">dpo@{hospitalInfo.website.replace('www.', '')}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 & 5 */}
              <section>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        4
                      </span>
                      Regulatory Authority
                    </h2>
                    <div className="ml-11">
                      <ul className="space-y-2">
                        <li className="text-gray-700">
                          <span className="font-medium">Ministry Registration No:</span> {hospitalInfo.ministryRegNo}
                        </li>
                        <li className="text-gray-700">
                          <span className="font-medium">District:</span> {hospitalInfo.district}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        5
                      </span>
                      Professional Oversight
                    </h2>
                    <div className="ml-11">
                      <p className="text-gray-700 mb-2">
                        Registered with Bangladesh Medical and Dental Council (BMDC)
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Membership No:</span> {hospitalInfo.medicalCouncilNo}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    6
                  </span>
                  VAT Number
                </h2>
                <div className="ml-11">
                  <div className="inline-block bg-green-50 border border-green-200 rounded-lg px-6 py-3">
                    <p className="text-gray-800">
                      <span className="font-medium">VAT/TIN Number:</span> {hospitalInfo.vatNo}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7 - Disclaimer */}
              <section className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    ⚠
                  </span>
                  Important Notice
                </h2>
                <div className="ml-11">
                  <p className="text-gray-700 mb-3">
                    This portal is <strong>intended solely for professional use by doctors</strong>. It is not a platform to establish patient-doctor relationships.
                  </p>
                  <p className="text-gray-700 mb-4">
                    In emergencies, please contact the hospital directly or call:
                  </p>
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <p className="text-red-600 font-bold text-xl">
                      {hospitalInfo.emergencyPhone}
                    </p>
                  </div>
                </div>
              </section>

              {/* Last Updated */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-sm text-center">
                  Last updated: {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-400 text-xs text-center mt-2">
                  © {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Impressum;

