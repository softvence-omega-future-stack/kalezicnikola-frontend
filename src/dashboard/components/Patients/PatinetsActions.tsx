import { EllipsisVerticalIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import PatientDeleteModal from "./PatientDeleteMOdal";

interface Props {
  patientId: string;
}

const PatientActions: React.FC<Props> = ({ patientId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const lang = i18n.language === "de" ? "de" : "en";

  const handleView = () => {
    navigate(`/dashboard/patients/${patientId}`);
    setOpen(false);
  };

  const handleDelete = () => {
    setShowModal(true);
    setOpen(false);
  };

  const confirmDelete = () => {
    // API call এখানে করতে পারো
    setShowModal(false);
    toast.success(
      lang === "de"
        ? "Profil erfolgreich gelöscht!"
        : "Profile deleted successfully!"
    );
  };

  const cancelDelete = () => setShowModal(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <EllipsisVerticalIcon className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 h-24 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            onClick={handleView}
            className="flex items-center gap-2 w-full px-4 py-2 text-left   cursor-pointer hover:bg-gray-100"
          >
            <EyeIcon className="w-4 h-4" /> {lang === "de" ? "Profil ansehen" : "View Profile"}
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 w-full px-4 py-2 text-left cursor-pointer hover:bg-gray-100 text-red-600"
          >
            <TrashIcon className="w-4 h-4" /> {lang === "de" ? "Profil löschen" : "Delete Profile"}
          </button>
        </div>
      )}

      <PatientDeleteModal
        isOpen={showModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message={{
          en: "Are you sure you want to remove this profile?",
          de: "Sind Sie sicher, dass Sie dieses Profil löschen möchten?",
        }}
      />
    </div>
  );
};

export default PatientActions;
