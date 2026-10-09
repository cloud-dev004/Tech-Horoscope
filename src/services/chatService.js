/**
 * chatService.js
 *
 * Frontend API client for the portfolio chatbot.
 * This file ONLY communicates with the backend — it never calls Groq directly.
 * The Groq API key lives exclusively on the server.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Sends the conversation history to the backend and returns the assistant reply.
 * @param {Array<{role: string, content: string}>} messages - Full conversation history
 * @returns {Promise<string>} - The assistant reply text
 */
export async function sendChatMessage(messages) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30-second timeout

  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    if (!data.reply) {
      throw new Error("Invalid response from server");
    }

    return data.reply;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}