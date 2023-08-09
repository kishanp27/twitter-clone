import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  query: { params: { postId: string } }
) {
  try {
    const currentUser = await serverAuth();
    const { body } = await req.json();

    const postId = (await req.nextUrl.searchParams.get("postId")) as string;

    const comment = await prisma?.comment.create({
      data: {
        body,
        userId: currentUser?.id,
        postId,
      },
    });

    return NextResponse.json({ comment }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 200 });
  }
}


