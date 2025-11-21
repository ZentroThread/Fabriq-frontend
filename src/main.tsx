import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <div className="flex flex-col h-screen">
        <Nav username={"John Doe"} position={"Administrator"} sidebarOpen={false} setSidebarOpen={function (v: boolean): void {
          throw new Error("Function not implemented.");
        } } />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar open={false} />
          <main className="flex-1 overflow-auto">
            <App />
          </main>
        </div>
      </div> */}
      <App/>
    </BrowserRouter>
  </StrictMode>
);
