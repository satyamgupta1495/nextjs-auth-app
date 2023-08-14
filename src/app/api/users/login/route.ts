import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {

        const reqbody = await request.json()
        const { email, password } = reqbody
        console.log(reqbody)

        // Check if user exists
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.passwordHash)

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }

        //create token
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        //*creating this response because it can access the cookie
        const response = NextResponse.json({
            message: "User logged in successfully ✔️",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}
