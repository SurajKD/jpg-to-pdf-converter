import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get("url");
  if (!urlParam) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const res = await fetch(urlParam);
    if (!res.ok) {
      return new NextResponse(`Failed to fetch thumbnail: ${res.statusText}`, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();

    // Extract file name or create one
    let fileName = "youtube-thumbnail.jpg";
    if (urlParam.includes("maxresdefault")) fileName = "maxresdefault.jpg";
    else if (urlParam.includes("sddefault")) fileName = "sddefault.jpg";
    else if (urlParam.includes("hqdefault")) fileName = "hqdefault.jpg";
    else if (urlParam.includes("mqdefault")) fileName = "mqdefault.jpg";
    else if (urlParam.includes("default")) fileName = "default.jpg";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Error downloading thumbnail:", error);
    return new NextResponse("Error fetching thumbnail", { status: 500 });
  }
}
