// src/pages/Home.js
import CommentBoard from "./commentboards.js";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Website</h1>
      <CommentBoard />
    </div>
  );
}