import { NextApiRequest, NextApiResponse } from "next";
import { fetchUserData } from "@/app/actions/fetchUserData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const result = await fetchUserData();
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch user data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
