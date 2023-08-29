import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody
        console.log(reqBody)

        // Check if user exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const passwordHash = await bcryptjs.hash(password, salt);

        // Create a user
        const newUser = new User({
            name: username,
            email,
            passwordHash
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}