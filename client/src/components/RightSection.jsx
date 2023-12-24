import { LoadingIcon, PlaneIcon } from "../assets/icons";
import { useState } from "react";
import QuestionAnswer from "./QuestionAnswer";

function RightSection() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="h-full pl-[260px]">
      <main className="relative h-full w-full flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col text-sm h-screen bg-lightBlack">
            <div className="text-gray-800 w-full max-w-2xl h-full flex flex-col px-6 min-w-full">
              {!loading && !responses && (
                <h1 className="text-4xl text-gray-100 font-semibold text-center mt-[20vh] mx-auto mb-16">
                  ChatGPT
                </h1>
              )}
              {loading && (
                <div className="text-white h-full flex justify-center items-center">
                  <LoadingIcon />
                </div>
              )}
              {!loading && responses && (
                <QuestionAnswer responses={responses} />
              )}
            </div>

            <div className="w-full h-48 flex-shrink-0"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 bg-vert-light-gradient !bg-transparent bg-gray-800 w-full">
          <form
            className="flex gap-3 last:mb-6 mx-auto max-w-3xl pt-6"
            onSubmit={async (e) => {
              e.preventDefault();
              setPrompt("");
              setLoading(true);
              // Make POST API call to localhost:8000/api/chat

              const res = await fetch("http://localhost:8000/api/chat", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  messages: [
                    {
                      role: "user",
                      content: prompt,
                    },
                  ],
                }),
              });
              const data = await res.json();
              console.log(data);
              setResponses(data);
              setLoading(false);
            }}
          >
            <div className="relative flex h-full flex-1 flex-col">
              <div className="flex flex-col w-full flex-grow py-3 relative border border-black/10 dark:border-gray-900/50 text-white rounded-md bg-[rgba(64,65,79, var(--tw-bg-opacity))]">
                <input
                  className="m-0 w-full resize-none border-0 bg-transparent pl-4 focus:ring-0 focus-visible:ring-0 outline-none overflow-y-hidden h-[23px]"
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                  }}
                />
                <button className="absolute p-1 rounded-md text-gray-400 bottom-2.5 right-2 hover:bg-black">
                  <PlaneIcon />
                </button>
              </div>
            </div>
          </form>
          <div className="text-center text-xs text-gray-100/50 px-4 pt-3 pb-6">
            <span>
              ChatGPT may produce inaccurate information about people, places or
              facts.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RightSection;
