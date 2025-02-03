import { deleteCookie } from "cookies-next";
import axios from "axios";

const logoutAPI = async (req, res) => {
  const token = req.cookies.token || "";

  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }

  try {
    console.log(token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
        },
      }
    );
    deleteCookie("token", { req, res });
    res
      .status(200)
      .json({ message: "Logout succsessful", data: response.data });
  } catch (error) {
    console.error(
      "Logout API Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      message: "Logout Failed",
      error: error.response?.data || "Internal Server Error",
    });
  }
};

export default logoutAPI;
