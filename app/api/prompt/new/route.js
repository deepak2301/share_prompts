import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    // Connect to the database
    await connectToDB();

    // Create a new prompt document
    const newPrompt = new Prompt({
      creator: userId,
      prompt, // Include the prompt field
      tag,
    });

    // Save the new prompt to the database
    await newPrompt.save();

    // Return the saved document as a response
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error("Error saving prompt:", error); // Log the error for debugging
    return new Response("Something Went Wrong!", { status: 500 });
  }
};
