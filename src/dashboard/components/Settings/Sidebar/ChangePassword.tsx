import React, { useState } from "react";
import eye from '../../../../assets/svgIcon/Eye.svg'
import eyeOf from '../../../../assets/svgIcon/EyeOff.svg'



interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, name, value, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-base font-medium text-[#171C35] mb-1">{label} <span className="">*</span> </label>
      <div className="relative w-full">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full p-3 pr-10 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:[#526FFF] focus:outline-none placeholder-[#667085] text-sm placeholder-medium font-medium "
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
        >
          {visible ? <img src={eye} alt="" /> :  <img src={eyeOf} alt="" /> }  

        </button>
      </div>
    </div>
  );
};

const ChangePasswordForm: React.FC = () => {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted passwords:", form);
  };

  return (
    <div className="p-6 bg-white rounded-xl ">
      <h2 className="text-xl font-semibold text-[#171C35] mb-6 pb-4">Change Password</h2>

      <form onSubmit={handleSubmit}>
        <PasswordInput
          label="Current Password"
          name="current"
          value={form.current}
          onChange={handleChange}
        />
        <PasswordInput
          label="New Password"
          name="newPass"
          value={form.newPass}
          onChange={handleChange}
        />
        <PasswordInput
          label="Confirm Password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
        />

        <div className="flex space-x-4 mt-6">
          <button
            type="button"
            className="flex-1 py-3 text-[#171C35] border border-gray-200 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 text-white bg-[#526FFF] rounded-xl cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
