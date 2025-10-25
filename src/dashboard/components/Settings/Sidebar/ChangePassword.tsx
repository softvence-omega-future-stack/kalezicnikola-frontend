import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// --- Reusable Password Input ---
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
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative w-full">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full p-3 pr-10 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 placeholder-medium font-medium text-base"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
        >
          {visible ? <Eye /> : <EyeOff />}
        </button>
      </div>
    </div>
  );
};

// --- Change Password Form ---
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
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">Change Password</h2>

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
            className="flex-1 py-3 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
