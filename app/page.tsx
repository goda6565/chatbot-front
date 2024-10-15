"use client"
import { Loader2 } from "lucide-react"
import { ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast"
import { requestChat } from "./action";
import Link from "next/link";

export default function Home() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setMessages(prevMessages => [...prevMessages, text]);
    try {
      // 新規投稿
      const res = await requestChat({
        question: text,
      })

      if (!res.success || !res.chat) {
        toast.error("投稿に失敗しました")
        return
      }
      setMessages(prevMessages => [...prevMessages, res.chat.answer]);
    } catch (error) {
      toast.error("投稿に失敗しました")
    } finally {
      setText("")
      setIsLoading(false)
    }
  }


  return (
    <div className="bg-gray-100 max-w-lg w-full max-h-[700px] h-full rounded-lg border-2 border-gray-600 flex flex-col">
      {/* ヘッダー */}
      <div className="w-full p-5 text-center border-b-2 border-blue-700">
        <h1 className="font-semibold">官公庁質問応答 ChatBot</h1>
      </div>


      {/* メイン */}
      <div className="h-full p-4 overflow-scroll">
        <div className="flex justify-start p-4 ">
          <div>このChatBotは官公庁の「よくある質問」をもとに作成された、基本的なRAGになっています。<br/>
            データセット：<Link target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline" href={"https://huggingface.co/datasets/matsuxr/JaGovFaqs-22k"}>JaGovFaqs-22k</Link><br/>
            モデル：<Link target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline" href={"https://huggingface.co/tokyotech-llm/Llama-3-Swallow-8B-Instruct-v0.1"}>Llama 3 Swallow 8B</Link><br />
            Github：<Link target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline" href={"https://github.com/goda6565/chatbot-front"}>chatbot-front</Link>・
            <Link target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline" href={"https://github.com/goda6565/chatbot-back"}>chatbot-back</Link>
          </div>
        </div>
        {messages.map((message, index) => (
          <div key={index}>
            {index % 2 === 1 ? (
              // 偶数番目のメッセージ（左側）
              <div className="flex justify-start p-4">
                <div className="p-4">
                  {message}
                </div>
              </div>
            ) : (
              // 奇数番目のメッセージ（右側）
              <div className="flex justify-end p-4">
                <div className="bg-blue-700 p-4 rounded-xl text-white max-w-[70%]">
                  {message}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>


      {/* テキストボックス */}
      <div
        style={{ borderRadius: "32px 32px" }}
        className="bg-white min-h-16 mb-2 border-2 mx-2"
      >
        <form 
          onSubmit={handleSubmit}
          className="w-full h-full flex items-center px-2"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-auto rounded-full px-4 resize-none outline-none"
          >
          </textarea>
          {isLoading 
            ? <Button disabled className="w-12 h-12 bg-blue-700 rounded-full"><Loader2 className="h-4 w-4 animate-spin" /></Button> 
            : <Button type="submit" className="w-12 h-12 bg-blue-700 rounded-full"><ArrowUp /></Button>
          }
        </form>
      </div>
    </div>
  );
}
