import { prisma, generateShortLink } from "@/libs/index";

export async function POST(request) {
  const { url } = await request.json();
  const host = request.headers.get("host");
  const { shortCode, shortUrl } = generateShortLink(host);

  //Create shortLink
  const result = await prisma.$transaction(async (tx) => {
    const originalUrl = await tx.url.findFirst({
      where: {
        originalUrl: url,
      },
    });

    if (originalUrl) return originalUrl;

    const newUrl = await tx.url.create({
      data: {
        originalUrl: url,
        shortUrl,
        urlCode: shortCode,
      },
    });

    await tx.urlAnalytic.create({
      data: {
        clicked: 0,
        url: {
          connect: {
            id: newUrl.id,
          },
        },
      },
    });

    return newUrl;
  });
  return Response.json({
    statusCode: 200,
    error: null,
    data: {
      originalUrl: result.originalUrl,
      shortUrl: result.shortUrl,
      code: result.urlCode,
    },
  });
}
