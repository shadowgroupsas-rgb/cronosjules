import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function proxy(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathArray } = await params;
  const path = pathArray.join("/");
  const method = req.method;

  // Use environment variable for backend URL
  const apiUrl = process.env.API_URL_INTERNAL || "http://api:4000/api/v1";

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let body: any = undefined;
  if (method !== "GET" && method !== "HEAD") {
    try {
      body = await req.json();
    } catch (e) {
      // Ignore if body is not JSON or empty
    }
  }

  try {
    const response = await fetch(`${apiUrl}/${path}${req.nextUrl.search}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Error communicating with backend" },
      { status: 500 }
    );
  }
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as DELETE, proxy as PATCH };
