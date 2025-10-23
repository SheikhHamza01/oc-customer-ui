import { FaLock } from "react-icons/fa";

export default function PrivacyNotice() {
  return (
    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-6 flex items-start gap-3">
      <FaLock className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-teal-800 font-medium">Your privacy is protected:</p>
        <p className="text-teal-700 text-sm">
          Your video will be automatically blurred for privacy and securely
          encrypted. Only authorized personnel can access it for verification
          purposes
        </p>
      </div>
    </div>
  );
}
