import { ShortenForm } from "@/components/index";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl text-slate-700 my-4 text-center">
        URL SHORTENER
      </h1>
      <ShortenForm />
    </>
  );
}
