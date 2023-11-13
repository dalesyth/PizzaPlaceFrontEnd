// CloseWindowHandler.jsx
import { useEffect } from "react";

const CloseWindowHandler = ({ onWindowClose }) => {
  useEffect(() => {
    const handleWindowClose = () => {
      if (onWindowClose && typeof onWindowClose === "function") {
        onWindowClose();
      }
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, [onWindowClose]);

  return null; // This component doesn't render anything
};

export default CloseWindowHandler;
