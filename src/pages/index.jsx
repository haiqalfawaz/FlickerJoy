import useLogout from "@/hooks/useLogout";
import React from "react";

const LandingPage = () => {
  const { handleLogout } = useLogout();
  return (
    <div>
      <h1>test</h1>
      <button onClick={handleLogout} className="p-2 border bg-white text-black">
        logout
      </button>
    </div>
  );
};

export default LandingPage;
