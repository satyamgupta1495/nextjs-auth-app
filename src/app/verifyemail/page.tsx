"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState<any>("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const urlToken = window.location.search.split('?')[1];
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length) {
            verifyUserEmail()
        }
    }, [token])

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post(`/api/users/verify/${token}`)
            console.log("response", response)
            setVerified(true)
        } catch (error: any) {
            console.log(error)
            setError(true)
        }
    }

    return (
        <>
            <div className="container">
                <h1>Verify Email</h1>
                {verified && <h2>Verified</h2>}
                {error && <h2>Error</h2>}
            </div>
        </>
    )

}