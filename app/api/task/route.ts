import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const allTask = await prisma.task.findMany();
    if (!allTask) {
      return new NextResponse("Task Not Found", { status: 404 });
    }
    return NextResponse.json(allTask, { status: 200 });
  } catch (err) {
    console.log("[API-TASK-GET] ~ ", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const createTitle = await prisma.task.create({
      data: { title: data.title },
    });
    return NextResponse.json(createTitle, { status: 200 });
  } catch (err) {
    console.log("[API-TASK-POST] ~ ", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
