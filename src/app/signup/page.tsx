"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [disabledButton, setDisabledButton] = useState(true)
    const [loading, setLoading] = useState(false)

    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("success " + response.data)
            router.push("/login")

        } catch (error: any) {
            console.log("failed " + error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [user])


    return (
        <>
            <h1 style={{
                "textAlign": "center",
                "fontFamily": "cursive"
            }} >{loading ? "processing..." : "Signup"}</h1>
            <div className="container">
                <div className="wrapper">
                    <br />
                    <label htmlFor="username">Username : </label>
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        placeholder="Username"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="custom-input"

                    />
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
                        onClick={onSignUp}
                        className={disabledButton ? "disabled-btn" : "btn"}
                    >{disabledButton ? "Enter details" : "Signup"}</button>
                </div>
                <p> Already have an account? <Link href="/login" style={{ "color": "purple" }} > Login here</Link>
                </p>

            </div>
        </>
    )
}

