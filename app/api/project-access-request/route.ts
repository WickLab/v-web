import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const projectId = String(body.projectId ?? "").trim();
    const projectTitle = String(body.projectTitle ?? "").trim();
    const requesterEmail = String(body.requesterEmail ?? "").trim();

    if (!projectId || !projectTitle || !requesterEmail) {
      return NextResponse.json(
        { error: "Project ID, project title, and email are required." },
        { status: 400 }
      );
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requesterEmail);

    if (!emailIsValid) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("project-access-request failed:", error);

    return NextResponse.json(
      { error: "Unable to send access request right now." },
      { status: 500 }
    );
  }
}