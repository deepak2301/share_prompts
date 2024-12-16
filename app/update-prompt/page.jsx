"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false); // Tracks if the form is being submitted
  const [post, setPost] = useState({
    // Form data for the prompt
    prompt: "", // The main text input
    tag: "", // The category or tag for the prompt
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setSubmitting(true); // Indicate the form is being submitted
    if (!promptId) return alert("prompt not found!");
    try {
      // Send form data to the API
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH", // HTTP method
        body: JSON.stringify({
          prompt: post.prompt, // User's prompt
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
