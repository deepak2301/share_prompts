"use client"; // This ensures the component runs on the client side (used in Next.js).

// Import necessary hooks and components
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard"; // Import a custom component for displaying prompts

// Component to render a list of PromptCard components
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {/* Iterate over the 'data' array and render a PromptCard for each post */}
      {data.map((post) => (
        <PromptCard
          key={post._id} // Use a unique key to help React efficiently render the list
          post={post} // Pass the post data to the PromptCard component
          handleTagClick={handleTagClick} // Pass a callback for handling tag clicks
        />
      ))}
    </div>
  );
};

// Main Feed component
const Feed = () => {
  // Define a state to store the search text (initially empty)
  const [searchText, setSearchText] = useState("");
  // Define a state to store posts fetched from the server (initially an empty array)
  const [posts, setPosts] = useState([]);

  // Function to handle changes in the search input field (currently empty)
  const handleSearchChange = (e) => {
    // Logic for handling search can go here (e.g., filtering posts)
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch posts from the server
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt"); // Make a GET request to the API
      const data = await response.json(); // Parse the response as JSON

      setPosts(data); // Update the 'posts' state with the fetched data
    };

    fetchPosts(); // Call the function to fetch posts
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <section className="feed">
      {/* Search form */}
      <form className="relative w-full flex-center">
        <input
          type="text" // Input field for searching prompts or users
          placeholder="Search For Prompt or User" // Placeholder text for the input
          value={searchText} // Bind the input's value to the 'searchText' state
          onChange={handleSearchChange} // Call handleSearchChange on input change
          required // Make the input field mandatory
          className="search_input peer" // Apply styling classes
        />
      </form>

      {/* Render the list of prompts using the PromptCardList component */}
      <PromptCardList
        data={posts} // Pass the fetched posts to the component
        handleTagClick={() => {}} // Pass a function for handling tag clicks (currently empty)
      />
    </section>
  );
};

export default Feed; // Export the Feed component to be used in other parts of the app
