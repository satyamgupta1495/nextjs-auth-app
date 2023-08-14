import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbconfig"

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getTokenData(request)
        const user = await User.findById({ _id: userId }).select("-password -isAdmin")

        return NextResponse.json(
            {
                message: "User found",
                data: user
            })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}