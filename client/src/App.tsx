import { useState } from "react";
import FormWizard from "./components/FormWizard";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/Dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState("notulen");

  return (
    <MainLayout activePage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === "notulen" ? <FormWizard /> : <Dashboard />}
    </MainLayout>
  );
}

export default App;
