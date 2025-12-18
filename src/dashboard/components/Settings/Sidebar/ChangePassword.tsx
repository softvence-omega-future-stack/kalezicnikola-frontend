import React, { useState } from "react";
import eye from "../../../../assets/svgIcon/Eye.svg";
import eyeOff from "../../../../assets/svgIcon/EyeOff.svg";
import { useTranslation } from "react-i18next";

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-base font-medium text-[#171C35] mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative w-full">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-3 pr-10 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#526FFF] focus:outline-none placeholder-[#667085] text-sm font-medium"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-0 flex items-center px-3"
        >
          {visible ? (
            <img src={eyeOff} alt="Hide" className="w-5 h-5" />
          ) : (
            <img src={eye} alt="Show" className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

const ChangePasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current || !form.newPass || !form.confirm) {
      setError(t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.errors.required"));
      return;
    }

    if (form.newPass.length < 6) {
      setError(t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.errors.minLength"));
      return;
    }

    if (form.newPass !== form.confirm) {
      setError(t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.errors.mismatch"));
      return;
    }

    console.log("Password changed successfully:", form);
    setSuccess(t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.success"));
    setForm({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="p-6 min-h-screen bg-white rounded-xl border border-gray-100">
      <h2 className="text-xl font-semibold text-[#171C35] mb-6 pb-4 border-b">
        {t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.title")}
      </h2>

      <form onSubmit={handleSubmit}>
        <PasswordInput
          label={t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.fields.current")}
          name="current"
          value={form.current}
          onChange={handleChange}
          placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.placeholders.current")}
        />
        <PasswordInput
          label={t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.fields.newPass")}
          name="newPass"
          value={form.newPass}
          onChange={handleChange}
          placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.placeholders.newPass")}
        />
        <PasswordInput
          label={t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.fields.confirm")}
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
          placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.placeholders.confirm")}
        />

        {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2 font-medium">{success}</p>}

        <div className="flex flex-col md:flex-row gap-2 w-full md:space-x-4 mt-6">
          <button
            type="button"
            onClick={() => setForm({ current: "", newPass: "", confirm: "" })}
            className="flex-1 py-3 text-[#171C35] border border-gray-200 rounded-xl cursor-pointer"
          >
            {t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.buttons.cancel")}
          </button>
          <button
            type="submit"
            className="flex-1 py-3 text-white bg-[#526FFF] rounded-xl cursor-pointer"
          >
            {t("dashboard.routes.settings.settingsSidebar.tabs.changePasswordForm.buttons.saveChanges")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
