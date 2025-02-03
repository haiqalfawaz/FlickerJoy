import axios from "axios";

const deleteCommentAPI = async (req, res) => {
  const token = req.cookies.token || "";
  if (req.method === "DELETE") {
    try {
      const { commentId } = req.query;
      const apiURL = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const response = await axios.delete(
        `${apiURL}/delete-comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error Delete Comment:", error);
      res.status(500).json({ error: "failed to detele comment" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default deleteCommentAPI;
