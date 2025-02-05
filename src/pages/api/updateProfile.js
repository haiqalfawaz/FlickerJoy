import axios from "axios";

const updateProfileAPI = async (req, res) => {
  const token = req.cookies.token || "";
  if (req.method === "POST") {
    try {
      const {
        name,
        username,
        email,
        profilePictureUrl,
        phoneNumber,
        bio,
        website,
      } = req.body;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const response = await axios.post(
        `${apiUrl}/update-profile`,
        { name, username, email, profilePictureUrl, phoneNumber, bio, website },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error in updateProfileAPI:", error);
      res.status(500).json({
        error: "Failed to update profile",
        message: error.message,
        details: error.response ? error.response.data : null,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default updateProfileAPI;
