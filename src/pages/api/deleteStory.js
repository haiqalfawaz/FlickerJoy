import axios from "axios";

const deleteStoryAPI = async (req, res) => {
  const token = req.cookies.token || "";
  if (req.method === "DELETE") {
    try {
      const { storyId } = req.query;
      const apiURL = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const response = await axios.delete(`${apiURL}/delete-story/${storyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKEY: apiKEY ?? "",
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error Delete Post:", error);
      res.status(500).json({ error: "failed to delete post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default deleteStoryAPI;
