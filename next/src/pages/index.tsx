import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect");
    const count = localStorage.getItem("count") ?? "0";
    setCount(Number(count));
  }, []);
  const updateCount = () => {
    console.log("updateCount");
    setCount(count + 1);
    localStorage.setItem("count", `count + 1`);
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="text-lg">
        This page is server-side rendered for better performance and SEO.
      </p>
      <button
        className="text-blue-500 hover:underline mt-4 inline-block"
        onClick={updateCount}
      >
        Count: {count}
      </button>
      <Link
        href="/users"
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        Go to Users
      </Link>
    </div>
  );
}
