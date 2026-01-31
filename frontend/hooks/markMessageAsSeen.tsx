import axios from "axios";

export const markMessagesSeenForUser = async (
  receiverId: string,
  token: string,
) => {
  try {
    await axios.put(
      `http://localhost:8000/api/message/${receiverId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch (error) {
    console.error("Failed to mark messages as seen", error);
  }
};
