import { prisma } from "@/libs/index";

export async function GET(request) {
  const urls = new URL(request.url);
  const pathParts = urls.pathname.split("/");
  const code = pathParts[pathParts.length - 1];

  if (typeof code == "string") {
    const analytic = await prisma.urlAnalytic.findFirst({
      where: {
        url: {
          urlCode: code,
        },
      },
      include: {
        url: true,
      },
    });

    if (!analytic) {
      return Response.json({
        statusCode: 400,
        error: {
          message: "Analytic not found",
        },
        data: null,
      });
    }

    return Response.json({
      statusCode: 200,
      error: null,
      data: {
        clicked: analytic.clicked,
        url: {
          originalUrl: analytic.url.originalUrl,
          shortUrl: analytic.url.shortUrl,
          codeUrl: analytic.url.urlCode,
        },
      },
    });
  }
}
