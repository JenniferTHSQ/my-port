import React, { useState } from "react";

export default function Fortune() {
  const [zodiac, setZodiac] = useState("");
  const [dream, setDream] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateFortune = async () => {
    setLoading(true);
    setResult("");

    const prompt = `<|system|>
你是一位具有靈性與詩意風格的中文 AI 占卜師，請使用「純繁體中文」回答，不可混用英文單詞，所有詞語與句子都必須使用中文完整表達。
請根據使用者提供的星座與夢境內容進行命運解析，不得創造新的星座或內容。

請遵守以下格式輸出：
【命運解析】
（以詩意、柔和的語氣解析夢境與星座所帶來的命運訊息，建議與提醒）

【今日幸運色】
（請直接給出顏色名稱，不得省略此段）

請直接開始回應，不要重複問題內容，也不要產生任何 <|user|> 或 <|system|> 格式。
<|user|>
我的星座是：${zodiac}
夢境內容是：${dream}
請給我今日的命運占卜與幸運色。
<|assistant|>`;

    try {
      const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.8,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}：${errorText}`);
      }

      const data = await response.json();

      if (data.error) {
        setResult(`❌ API 錯誤：${data.error}`);
      } else if (Array.isArray(data) && data[0]?.generated_text) {
        const rawText = data[0].generated_text;

// 找出 <|assistant|> 開頭
const assistantStart = rawText.indexOf("<|assistant|>");
const userNext = rawText.indexOf("<|user|>", assistantStart);

// 擷取 <|assistant|> 到下一個 <|user|> 之前的內容
const assistantText = rawText.slice(
  assistantStart + "<|assistant|>".length,
  userNext === -1 ? undefined : userNext
).trim();

// 額外強化：只從「【命運解析】」開始擷取（更乾淨）
const parsed = assistantText.includes("【命運解析】")
  ? "【命運解析】" + assistantText.split("【命運解析】")[1].trim()
  : assistantText;

setResult(parsed);
      } else {
        setResult("⚠ 未收到有效的占卜結果");
      }
    } catch (error) {
      console.error("API 錯誤：", error);
      setResult(`⚠ 發生錯誤：${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 text-center border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">AI 占卜師 🔮</h2>
      <p className="text-gray-600 text-sm mb-4">♡我是一個看心情使用繁體簡體英文混雜的超級晶晶體占卜師♡</p>
      <input
        type="text"
        placeholder="請輸入你的星座"
        value={zodiac}
        onChange={(e) => setZodiac(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />
      <textarea
        placeholder="請描述你最近的夢境..."
        value={dream}
        onChange={(e) => setDream(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        rows={4}
      />
      <button
        onClick={generateFortune}
        disabled={loading}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
      >
        {loading ? "占卜中..." : "生成占卜（準不準的不好說👍）"}
      </button>

      {result && (
        <div className="mt-6 text-left whitespace-pre-wrap bg-gray-100 p-4 rounded shadow">
          <strong>🔮 AI的不準占卜結果：</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}