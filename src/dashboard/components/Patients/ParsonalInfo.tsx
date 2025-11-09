const ParsonalInfo = () => {
  return (
    <div>
       <div className="p-6 space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#171C35] mb-4">Personal Information</h3>
                <div className="">
                  <div className="flex">
                    <span className="text-base text-[#171C35] w-32">Date of Birth:</span>
                    <span className="text-base text-[#171C35] " >1978-05-15</span>
                  </div>
                  <div className="flex">
                    <span className="text-base text-[#171C35] w-32">Phone:</span>
                    <span className="text-base text-[#171C35] ">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex">
                    <span className="text-base text-[#171C35] w-32">Email:</span>
                    <span className="text-base text-[#171C35] ">username@gmail.com</span>
                  </div>
                  <div className="flex">
                    <span className="text-base text-[#171C35] w-32">Address:</span>
                    <span className="text-base text-[#171C35] ">123 Main Street, Apt 48, New York, NY 10001</span>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#171C35] mb-4">Medical Information</h3>
                <div className="">
                  <div className="flex">
                    <span className="text-sm text-[#171C35] w-32">Blood Type:</span>
                    <span className="text-sm text-[#171C35] ">O+</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-[#171C35] w-32">Allergies:</span>
                    <span className="text-sm text-[#171C35] ">Penicillin, Peanuts</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-[#171C35] w-32">Conditions:</span>
                    <span className="text-sm text-[#171C35] ">Hypertension, Type 2 Diabetes</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-[#171C35] w-32">Doctor:</span>
                    <span className="text-sm text-[#171C35] ">Dr. Sarah Johnson</span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-xl font-semibold text-[#171C35] mb-4">Emergency Contact</h3>
                <div className="">
                  <div className="flex">
                    <span className="text-sm text-[#171C35] w-32">Name:</span>
                    <span className="text-sm text-[#171C35] d">Mary Smith</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-[#171C35] w-32">Relationship:</span>
                    <span className="text-sm text-[#171C35] ">Wife</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-[#171C35] w-32">Phone:</span>
                    <span className="text-sm text-[#171C35] ">+1 (555) 987-6543</span>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default ParsonalInfo
