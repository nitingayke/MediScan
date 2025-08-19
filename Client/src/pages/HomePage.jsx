import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="home">
            <h1>Home Page 🏡</h1>
            <p>You are now on the home page.</p>
            <Link to="/">
                <button>Back to Landing</button>
            </Link>
        </div>
    );
}
