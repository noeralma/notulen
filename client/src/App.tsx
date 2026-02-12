import { useState } from "react";
import FormWizard from "./components/FormWizard";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/Dashboard";
import Jadwal from "./components/Jadwal";

function App() {
  const [currentPage, setCurrentPage] = useState("notulen");

  const renderPage = () => {
    switch (currentPage) {
      case "notulen":
        return <FormWizard />;
      case "jadwal":
        return <Jadwal />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout activePage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}

export default App;
