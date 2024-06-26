import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("fjcdfdf");
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody + "xnsjxn");
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          error: "user already exit",
        },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const saveUser = await newUser.save();
    console.log(saveUser);

    return NextResponse.json({
      message: "user created Succesfully",
      success: true,
      saveUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
