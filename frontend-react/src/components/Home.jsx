import React from "react";

export default function Home({ user }) {
  console.log(user);
  return <h1>{user.firstName}</h1>;
}
