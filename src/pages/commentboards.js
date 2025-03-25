import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  auth,
  onAuthStateChanged
} from "../firebase";
import { onSnapshot, query, orderBy } from "firebase/firestore";

export default function CommentBoard() {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  // 🔐 監聽使用者登入狀態
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 🔁 即時監聽留言
  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newComments = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((c) => c.message?.trim()); // ✅ 過濾空白留言
      setComments(newComments);
    });

    return () => unsubscribe();
  }, []);

  // ➕ 發送留言
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !message.trim()) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : {};

      await addDoc(collection(db, "comments"), {
        message: message.trim(),
        uid: user.uid,
        displayName: userData?.displayName || user.email,
        avatarUrl: userData?.avatarUrl || "",
        createdAt: Date.now(),
      });

      setMessage("");
    } catch (err) {
      console.error("留言失敗：", err);
    }
  };

  // ❌ 刪除留言（只能刪自己的）
  const handleDelete = async (id, uid) => {
    if (user?.uid !== uid) return alert("只能刪除自己的留言！");
    await deleteDoc(doc(db, "comments", id));
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">留言板</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 w-full max-w-md rounded"
            placeholder="輸入你的留言"
          />
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            發送留言
          </button>
        </form>
      ) : (
        <p className="text-gray-500 mb-6">請先登入才能留言</p>
      )}

      <ul className="space-y-4 max-w-2xl mx-auto text-left">
        {comments.map((comment) => (
          <li key={comment.id} className="flex items-start gap-4 border-b pb-4">
            <img
              src={comment.avatarUrl || "https://via.placeholder.com/40"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-bold">{comment.displayName}</p>
              <p>{comment.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
            {user?.uid === comment.uid && (
              <button
                onClick={() => handleDelete(comment.id, comment.uid)}
                className="text-sm text-red-600 hover:underline"
              >
                刪除
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}