import { useEffect } from "react";

const CloseWindowHandler = ({ onWindowClose }) => {
  useEffect(() => {
    const handleWindowClose = () => {
      if (onWindowClose && typeof onWindowClose === "function") {
        onWindowClose();
      }
    };

    const handleUnload = () => {
      
      handleWindowClose();
    };

    window.addEventListener("beforeunload", handleWindowClose);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("unload", handleUnload);
    };
  }, [onWindowClose]);

  return null;
};

export default CloseWindowHandler;
