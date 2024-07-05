import { NextRequest } from "next/server";
import { fetchUserData } from "@/app/actions/fetchUserData";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const result = await fetchUserData();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}
