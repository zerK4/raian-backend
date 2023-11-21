import { prisma } from "@/utils";

export async function GET(req: Request) {
  try {
    const data = await prisma.blog.findMany({});

    return Response.json({
      data: data,
      message: "Fetched successfully!",
    });
  } catch (err: any) {
    console.log(err.message, "got an error");

    return Response.json({
      data: {},
      message: `There was an error fetching the data: ${err.message}`,
    });
  }
}
