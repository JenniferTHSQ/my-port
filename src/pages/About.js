import React from "react";

export default function About() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 text-center border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-6">關於不是很值錢的我</h2>

      <img
        src="https://i.imgur.com/zKHHWmS.jpg" 
        alt="頭貼"
        className="w-32 h-32 mx-auto rounded-full shadow mb-4 object-cover"
      />

      <p className="text-lg text-gray-700 leading-relaxed">
        嗨，我是 Cheryl曹哲甄，一位正在寫各種作業還有實驗的可憐研究牲，今年又老了一歲。
      </p>
    </div>
  );
}