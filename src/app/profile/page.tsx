'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter()
    const [userData, setUserData] = useState()

    const logout = () => {
        try {
            const response = axios.get("/api/users/logout")
            console.log("response", response)
            router.push('/login')
        } catch (error: any) {
            console.log(error)
        }
    }

    const getUserDetails = async () => {
        const response = await axios.get("/api/users/me")
        console.log("user", response.data)

        setUserData(response.data.data._id)
    }


    return (
        <div className="container">
            <h1>Profile</h1>
            <h2>{!userData ? "Nothing" :
                <Link href={`/profile/${userData}`}>{userData}</Link>}</h2>
            <hr />
            <button
                className="btn"
                onClick={logout}
            >
                Logout
            </button>
            <button
                className="btn"
                onClick={getUserDetails}
            >Fetch user
            </button>
        </div>
    );
}