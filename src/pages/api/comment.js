const { default: axios } = require("axios");

const commentAPI = async (req, res) => {
  const token = req.cookies.token || "";
  if (req.method === "POST") {
    try {
      const { postId, comment } = req.body;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const response = await axios.post(
        `${apiUrl}/create-comment`,
        {
          postId,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "failed to create comment" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default commentAPI;
