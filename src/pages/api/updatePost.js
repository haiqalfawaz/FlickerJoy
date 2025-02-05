import axios from "axios";

const updatePost = async (req, res) => {
  const token = req.cookies.token || "";
  if (req.method === "POST") {
    try {
      const { imageUrl, caption } = req.body;
      const { postId } = req.query;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const response = await axios.post(
        `${apiUrl}/update-post/${postId}`,
        {
          imageUrl,
          caption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );

      return res.status(200).json(response.data);
    } catch (error) {
      console.error("Error edit post:", error);
      res.status(500).json({ error: "failed to edit post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default updatePost;
