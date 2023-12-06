// CloseWindowHandler.jsx
import { useEffect } from "react";

const CloseWindowHandler = ({ onWindowClose }) => {
  useEffect(() => {
    const handleWindowClose = () => {
      if (onWindowClose && typeof onWindowClose === "function") {
        onWindowClose();
      }
    };

    const handleUnload = () => {
      // Additional cleanup or logout logic if needed
      handleWindowClose();
    };

    window.addEventListener("beforeunload", handleWindowClose);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("unload", handleUnload);
    };
  }, [onWindowClose]);

  return null; // This component doesn't render anything
};

export default CloseWindowHandler;
