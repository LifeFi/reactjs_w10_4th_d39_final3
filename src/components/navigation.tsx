"use client";

import About from "@/app/about/page";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import styles from "../styles/navigation.module.css";

export default function Navigation() {
  const path = usePathname();
  console.log("path:", path);

  useEffect(() => {
    console.log("Nav rendered!");
  }, []);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link> {path == "/" ? "🔥" : ""}
        </li>
        <li>
          <Link href="/about">About</Link> {path == "/about" ? "🔥" : ""}
        </li>
      </ul>
    </nav>
  );
}
