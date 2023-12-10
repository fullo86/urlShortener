import { CopyBoard } from "../components/index";

export default function SuccessPage({ searchParams }) {
  const { code } = searchParams;
  return (
    <>
      <h1 className="text-4xl text-slate-700 my-4 text-center">
        Copy your Shorten URL.
      </h1>
      <CopyBoard code={code} />
    </>
  );
}
