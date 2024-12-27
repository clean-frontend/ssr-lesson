import React, { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    console.log("useEffect");
    const count = localStorage.getItem("count") ?? "0";
    setCount(Number(count));
  }, []);

  const updateCount = () => {
    console.log("updateCount");
    setCount(count + 1);
    localStorage.setItem("count", count + 1);
  };

  return (
    <div className="container mx-auto p-4" onClick={() => updateCount()}>
      conter: {count}
      <h1 className="text-4xl font-bold mb-4">
        Welcome to React SSR with Vite!
      </h1>
      <p className="text-lg">
        This page is server-side rendered for better performance and SEO.
      </p>
      <Link
        to="/users"
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        Go to Users
      </Link>
    </div>
  );
}
