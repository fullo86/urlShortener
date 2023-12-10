"use client";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";

export default function CopyBoard({ code }) {
  const [isCopy, setIsCopy] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setIsCopy(true);
    } else {
      setIsCopy(false);
    }
  };

  return (
    <div className="flex flex-col">
      <form
        className="max-w-[600px] w-full flex justify-center my-4 mx-auto flex-1"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border border-solid p-4 rounded-l-lg w-full"
          value={`${process.env.NEXT_PUBLIC_API_URL}/api/${code}`}
          ref={inputRef}
          readOnly
        />
        <div className="relative">
          <input
            type="submit"
            className="bg-sky-700 font-bold text-white p-4 rounded-r-lg cursor-pointer"
            value="Copy URL"
          />
          {isCopy && (
            <div className="absolute top-16 left-2 bg-black text-white p-2 rounded-lg text-sm">
              URL Copied
            </div>
          )}
        </div>
      </form>

      <div className="flex flex-1 my-10 max-w-[600px] mx-auto">
        <span className="mr-2">See how many time your link hot clicked!</span>
        <Link
          href={`/analytic?code=${code}`}
          className="text-blue-300"
          target="_blank"
        >
          Click here
        </Link>
      </div>
    </div>
  );
}
