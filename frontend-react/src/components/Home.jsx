import React, { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("/currentUser", options)
      .then(response => response.json())
      .then(data => {
        setCurrentUser(data.name);
      });
  }, []);
  return <h1>Hello {currentUser.firstName}</h1>;
}
