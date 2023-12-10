import { prisma } from "@/libs/index";

export async function GET(request) {
  const urls = new URL(request.url);
  const pathParts = urls.pathname.split("/");
  const code = pathParts[pathParts.length - 1];

  if (typeof code == "string") {
    const result = await prisma.$transaction(async (tx) => {
      const url = await tx.url.findUnique({
        where: {
          urlCode: code,
        },
      });
      if (!url) return null;

      await tx.urlAnalytic.update({
        where: {
          url_id: url.id,
        },
        data: {
          clicked: {
            increment: 1,
          },
        },
      });

      return url;
    });

    if (!result) {
      return Response.json({
        statusCode: 400,
        error: {
          message: "Code Invalid",
        },
        data: null,
      });
    }
    return Response.redirect(result.originalUrl);
  }
}
