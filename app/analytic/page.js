import Link from "next/link";

async function getAnalytic(code) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/analytic/${code}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

export default async function AnalyticPage({ searchParams }) {
  const { code } = searchParams;
  const res = await getAnalytic(code);
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-slate-600 text-3xl">
        Total URL Clicks: {res.data.clicked}
      </h1>

      <div className="flex flex-col gap-4 mt-8">
        <div className="flex">
          <span className="mr-2">Original URL</span>
          <Link
            href={res.data.url.originalUrl}
            className="text-blue-300"
            target="_blank"
          >
            {res.data.url.originalUrl}
          </Link>
        </div>

        <div className="flex">
          <span className="mr-2">Short URL</span>
          <Link
            href={res.data.url.shortUrl}
            className="text-blue-300"
            target="_blank"
            prefetch={false}
          >
            {res.data.url.shortUrl}
          </Link>
        </div>
      </div>

      <button type="button" className="p-4 mt-8 bg-slate-400 rounded-lg">
        <Link href={"/"} className="text-white" target="_blank">
          Click To Shorten More Links!
        </Link>
      </button>
    </div>
  );
}
