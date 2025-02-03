import axios from "axios";

const loginAPI = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password diperlukan" });
    }

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
        },
      }
    );
    console.log(res);
    return res.status(200).json(data);
  } catch (error) {
    console.error("error", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default loginAPI;
