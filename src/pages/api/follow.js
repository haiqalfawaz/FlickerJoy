import axios from "axios";

const followAPI = async (req, res) => {
  const token = req.cookies.token || "";
  if (req.method === "POST") {
    try {
      const { userIdFollow } = req.body;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const response = await axios.post(
        `${apiUrl}/follow`,
        { userId: userIdFollow },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error follow User:", error);
      res.status(500).json({ error: "failed to follow user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default followAPI;
