// src/pages/CertificatePage.jsx
import { useNavigate } from "react-router-dom";
import CertificateModal from "../components/CertificateModal";

function CertificatePage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0c0806" }}>
      <CertificateModal 
        onClose={() => navigate("/worldmap")} 
        pathName="HTML & CSS Web Mastery"
        xp={7350}
        coins={450}
      />
    </div>
  );
}

export default CertificatePage;