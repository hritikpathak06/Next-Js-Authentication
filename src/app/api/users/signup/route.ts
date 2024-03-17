import { connectDatabase } from "@/libs/db/connection";
import User from "@/libs/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDatabase();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    console.log(body);
    // Check Existing User
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User Already Exists" },
        { status: 400 }
      );
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    console.log(user);
    return NextResponse.json(
      { message: "User Created Successfully", success: true, user },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
