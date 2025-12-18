import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: { en: string; de: string };
  isLoading?: boolean;
}

const PatientDeleteModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, message,isLoading }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "de" ? "de" : "en";


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 sm:w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">
          {lang === "de" ? "Profil löschen" : "Delete Profile"}
        </h2>
        <p className="mb-6 text-gray-700">{message ? message[lang] : lang === "de" ? "Sind Sie sicher, dass Sie dieses Profil löschen möchten?" : "Are you sure you want to remove this profile?"}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            {lang === "de" ? "Abbrechen" : "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            {
              isLoading ? (lang === "de" ? "Löschen..." : "Deleting...") : "Delete"
            }
           
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDeleteModal;
