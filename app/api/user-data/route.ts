import { NextApiRequest, NextApiResponse } from "next";
import { fetchUserData } from "@/app/actions/fetchUserData";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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
