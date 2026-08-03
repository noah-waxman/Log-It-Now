import { useState } from "react";
import Navbar from "../navbar/navbar";
import Login from "../login/login";
import Register from "../register/register";

export default function Home() {
  const [view, setView] = useState(null);

  return (
    <div>
      <Navbar onViewClick={setView} />
      {view === "login" && <Login />}
      {view === "register" && <Register />}
    </div>
  );
}
