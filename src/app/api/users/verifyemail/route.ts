import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { token } = reqBody

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "Token is invalid or has expired" }, {
                status: 400,
            })
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, { status: 200, })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {
            status: 400,
        })
    }
}