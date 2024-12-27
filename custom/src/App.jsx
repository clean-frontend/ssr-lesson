import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

export default function App({ users }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/users"
          element={
            <div>
              <h1>Users</h1>
              <div>
                {users.map((user) => (
                  <p key={user.id}>{user.name}</p>
                ))}
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}
