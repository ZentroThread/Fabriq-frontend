import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;
