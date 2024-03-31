"use client";

import Image from "next/image";
import styles from "./book.module.css";
import { getMessage } from "@/app/actions/get-message";
import { useState } from "react";
import { useFormState } from "react-dom";
import Spinner from "./spinner";

interface IBookProps {
  url: string;
  image: string;
  title: string;
  author: string;
  width: number;
  height: number;
}

export default function Book({
  url,
  image,
  title,
  author,
  width,
  height,
}: IBookProps) {
  const [review, setIsReview] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowThanks, setIsShowThanks] = useState(false);

  const onMouseEnter = async () => {
    if (review) {
      console.log(review, "aleady exists");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    const reviewMessage = await getMessage(title);

    setIsReview((prev) => reviewMessage);
    setIsLoading(false);
  };

  const onBuyMeTokenClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsShowThanks((prev) => !prev);
  };

  return (
    <li className={styles.item}>
      <Image
        src={image}
        alt={title}
        width={width}
        height={height}
        // layout="fixed"
        loading="lazy"
      />
      <div className={styles.title}>{title}</div>
      <div className={styles.author}>{author}</div>
      <div className={styles.reviewButton}>ChatGPT Review</div>

      <div className={styles.overlay} onMouseEnter={onMouseEnter}>
        {isLoading ? (
          <div className={styles.loading}>
            <div>이모티콘 3개로 책리뷰 해주세요.</div>
            <div>
              <Spinner
                size={"35px"}
                borderColor="rgba(255,255,255,0.4)"
                borderTopColor="white"
              />
              <div>{` ChatGPT's working!`}</div>
            </div>
          </div>
        ) : (
          <div className={styles.reviewContainer}>
            <div className={styles.review}>{review}</div>
            <div className={styles.buttonContainer}>
              <div
                className={`${styles.buyMeTokenButton} ${
                  isShowThanks ? styles.isTokenButtonSelected : ""
                }`}
                onClick={onBuyMeTokenClick}
              >
                Buy me Token☕️
                {isShowThanks ? (
                  <div className={styles.thanks}>
                    🎉🎉🎉마음만 고맙게 받겠습니다.😀
                  </div>
                ) : null}
              </div>
              <div className={styles.buyButton}>
                <a href={url} target="blank">
                  Buy now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
