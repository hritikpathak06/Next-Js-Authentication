import { connectDatabase } from "@/libs/db/connection";
import User from "@/libs/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/libs/helpers/getDataFromToken";
import { request } from "http";

connectDatabase();

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findById({ _id: userID });
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.log(error);
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
