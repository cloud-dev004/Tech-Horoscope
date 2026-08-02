import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../utils/validation";
import { submitContactForm } from "../services/contactService";

export const useContactForm = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const showToast = useCallback((status, message) => {
    setSubmitStatus(status);
    setToastMessage(message);

    setTimeout(() => {
      setSubmitStatus(null);
    }, 3000);
  }, []);

  const onSubmit = async (data) => {
    try {
      await submitContactForm(data);
      reset();
      showToast(
        "success",
        "✓ Message Sent Successfully\n\nThanks for reaching out!\nI'll get back to you soon.",
      );
    } catch (error) {
      console.error("Submission error:", error);
      showToast(
        "error",
        "Couldn't send your message.\nPlease try again later.",
      );
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    submitStatus,
    toastMessage,
  };
};
