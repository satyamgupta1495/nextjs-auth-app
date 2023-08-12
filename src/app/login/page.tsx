"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";


export default function LoginPage() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const onLogin = async () => {
    }



    return (
        <>
            <h1 style={{
                "textAlign": "center",
                "fontFamily": "cursive"
            }} >Login</h1>
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
                        style={{
                            "border": "1px solid white",
                            "borderRadius": "4px",
                            "padding": "0.4rem",
                            "backgroundColor": "white",
                            "color": "black",
                            "marginTop": "0.5rem"
                        }}
                    />
                    <br />
                    <label htmlFor="password">Password : </label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        placeholder="Password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        style={{
                            "border": "1px solid white",
                            "borderRadius": "4px",
                            "padding": "0.4rem",
                            "backgroundColor": "white",
                            "color": "black",
                            "marginTop": "0.5rem"
                        }}
                    />
                    <button
                        onClick={onLogin}
                        style={{
                            "border": "1px solid white",
                            "borderRadius": "4px",
                            "padding": "0.4rem",
                            "backgroundColor": "white",
                            "color": "black",
                            "marginTop": "2rem",
                            "cursor": "pointer",
                            "width": "50%",
                            "alignSelf": "center"
                        }}
                    >Login</button>
                </div>
                <p> Don&apos;t have an account? <Link href="/signup" style={{ "color": "purple" }} > Signup here</Link>
                </p>

            </div>
        </>
    )
}

