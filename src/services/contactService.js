export const submitContactForm = async (data) => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("Web3Forms access key is missing.");
  }

  // Anti-spam honeypot check
  if (data.website) {
    // Silently pretend it succeeded to trick the bot
    return { success: true, message: "Message sent successfully." };
  }

  const payload = {
    access_key: accessKey,
    subject: `New contact from ${data.name}`,
    ...data,
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to submit form");
    }

    return {
      success: true,
      message: result.message || "Message sent successfully",
    };
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
