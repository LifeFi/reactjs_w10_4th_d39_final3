"use client";

import Image from "next/image";
import styles from "@/styles/book.module.css";
import { getMessage } from "@/app/actions/get-message";
import { useState } from "react";

export default function Book({
  url,
  image,
  title,
  width,
  height,
}: {
  url: string;
  image: string;
  title: string;
  width: number;
  height: number;
}) {
  const [review, setIsReview] = useState<string>();

  const onMouseEnter = async () => {
    // const response = await fetch(`/api/books/review?title=${title}`, {
    //   method: "GET",
    // });

    // const data = await response.json();
    const review = await getMessage(title);

    setIsReview((prev) => review);
  };

  return (
    <li className={styles.item}>
      <a href={url} target="blank">
        <Image
          src={image}
          alt={title}
          width={width}
          height={height}
          // layout="fixed"
          loading="lazy"
        />
        <div>{title}</div>
      </a>
      <div className={styles.overlay} onMouseEnter={onMouseEnter}>
        {review}
      </div>
    </li>
  );
}
