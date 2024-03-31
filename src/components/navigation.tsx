"use client";

import About from "@/app/about/page";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import styles from "./navigation.module.css";

export default function Navigation() {
  const path = usePathname();
  // console.log("path:", path);

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={`${styles.item} ${path == "/" ? styles.selected : ""}`}>
          <Link scroll={false} href="/">
            Home
          </Link>{" "}
        </li>
        <li
          className={`${styles.item} ${
            path == "/about" ? styles.selected : ""
          }`}
        >
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
