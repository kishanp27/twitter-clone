import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PATCH(req: Request) {
  try {
    const currentUser= await serverAuth();
    const { name, username, bio, profileImage, coverImage } = await req.json();

    if (!name || !username) {
      throw new Error("Missing some data");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
