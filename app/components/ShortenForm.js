"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

async function createUrl(url) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate`, {
    method: "POST",
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error("Failed to Fetch");
  }

  return res.json();
}

export default function ShortenForm() {
  const [error, setError] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputUrl) {
      const { data, statusCode, error } = await createUrl(inputUrl);

      if (statusCode == 200) {
        router.push(`/success?code=${data.code}`);
        setError(null);
      } else {
        setError(error.message);
      }
    }
  };

  const handleOnchange = (e) => {
    setInputUrl(e.target.value);
  };
  return (
    <form
      className="max-w-[600px] w-full flex justify-center my-4 mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-full relative">
        <input
          type="text"
          placeholder="Input Your URL"
          className={`border border-solid p-4 rounded-l-lg w-full ${
            error && "border-rose-600"
          }`}
          onChange={handleOnchange}
          required
        />
        {error && (
          <div className="text-xs text-pink-600 my-2 absolute top-14">
            {error}
          </div>
        )}
      </div>
      <input
        type="submit"
        className="bg-sky-700 font-bold text-white p-4 rounded-r-lg cursor-pointer"
        value="Shorten URL"
      />
    </form>
  );
}
