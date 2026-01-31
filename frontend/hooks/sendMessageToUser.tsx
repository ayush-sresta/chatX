import axios from "axios";

export const sendMessageToUser = async (
  receiverId: string,
  text: string,
  token: string | null,
  image?: string,
) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/message/${receiverId}`,
      { text, image },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.data.success) {
      return res.data.newMessage;
    }
  } catch (error: any) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message,
    );
  }
};
