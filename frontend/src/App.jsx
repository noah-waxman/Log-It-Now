import { useState } from "react";
import Home from "./components/home/home";
import Layout from "./layout/layout";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen w-screen overflow-hidden bg-twilight bg-gradient-to-r from-bg-twilight to-bright-teal/40">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
