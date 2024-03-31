"use client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end ",
        marginTop: "50px",
        fontSize: "24px",
      }}
    >
      오류 발생. 앗 무슨 일이죠?
    </div>
  );
}
