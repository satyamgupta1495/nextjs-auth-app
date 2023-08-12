"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";


export default function SignupPage() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignUp = async () => {
    }



    return (
        <>
            <h1 style={{
                "textAlign": "center",
                "fontFamily": "cursive"
            }} >Signup</h1>
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
                        className="btn"
                    >Signup</button>
                </div>
                <p> Already have an account? <Link href="/login" style={{ "color": "purple" }} > Login here</Link>
                </p>

            </div>
        </>
    )
}

