"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false); // Tracks if the form is being submitted
  const [post, setPost] = useState({
    // Form data for the prompt
    prompt: "", // The main text input
    tag: "", // The category or tag for the prompt
  });
  const createPrompt = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setSubmitting(true); // Indicate the form is being submitted

    try {
      // Send form data to the API
      const response = await fetch("/api/prompt/new", {
        method: "POST", // HTTP method
        body: JSON.stringify({
          prompt: post.prompt, // User's prompt
          userId: session?.user.id, // Current user ID
          tag: post.tag, // Tag/category of the prompt
        }),
        headers: {
          "Content-Type": "application/json", // Ensure the server interprets the body correctly
        },
      });

      // Redirect to home page if the request is successful
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error); // Log errors for debugging
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
