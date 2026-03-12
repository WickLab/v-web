import { NextResponse } from "next/server";
import { getPrivateProjectCredentials } from "@/lib/privateproject-credentials";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const projectId = String(body.projectId ?? "").trim();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "").trim();

    if (!projectId || !username || !password) {
      return NextResponse.json(
        { error: "Project ID, username, and password are required." },
        { status: 400 }
      );
    }

    const credentials = getPrivateProjectCredentials(projectId);

    if (!credentials) {
      return NextResponse.json(
        { error: "Secure access is not configured for this project." },
        { status: 404 }
      );
    }

    const valid =
      username === credentials.username && password === credentials.password;

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid login credentials." },
        { status: 401 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to process login right now." },
      { status: 500 }
    );
  }
}