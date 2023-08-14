"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const onLogin = async () => {
        try {
            setloading(true)
            const response = await axios.post("api/users/login", user)
            console.log(response)
            toast.success("Login successfully ❤️")
            router.push("/profile")

        } catch (error: any) {
            console.log("Login failed", error.message)
            toast.error(error.message)
        } finally {
            setloading(false)
        }
    }



    return (
        <>
            <h1 style={{
                "textAlign": "center",
                "fontFamily": "cursive"
            }} >{loading ? "processing..." : "Login"}</h1>
            <div style={{ "display": "flex", "padding": "1rem", "flexDirection": "column", "fontFamily": "cursive", "justifyContent": "center", "alignItems": "center", "width": "100vw", "height": "100vh" }}>

                <div style={{
                    "display": "inline-flex",
                    "flexDirection": "column",
                    "justifyContent": "center",
                    "width": "30vw",
                    "height": "50vh"
                }}>
                    <br />

                    <label htmlFor="email">Email : </label>
                    <input
                        id="email"
                        type="text"
                        value={user.email}
                        placeholder="Email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="custom-input"
                    />
                    <br />
                    <label htmlFor="password">Password : </label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        placeholder="Password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="custom-input"
                    />
                    <button
                        onClick={onLogin}
                        className="btn"
                    >{buttonDisabled ? "Enter details" : "Login"}</button>
                </div>
                <p> Don&apos;t have an account? <Link href="/signup" style={{ "color": "purple" }} > Signup here</Link>
                </p>

            </div>
        </>
    )
}

