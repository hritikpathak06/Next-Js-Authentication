import { connectDatabase } from "@/libs/db/connection";
import User from "@/libs/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// connectDatabase();

export async function POST(req: NextRequest) {
  try {
    connectDatabase();
    const body = await req.json();
    const { email, password } = body;
    console.log(body);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User Does Not Exists" },
        { status: 400 }
      );
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    }
    // Create Token Data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    // Create Token
    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "7d",
    });
    const response  = NextResponse.json({
      message:"Login successfull",
      success:true,
      user
    })
    response.cookies.set("token",token,{
      httpOnly:true,
    })
    
    return response;
  } catch (error: any) {
    console.log(error);
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
