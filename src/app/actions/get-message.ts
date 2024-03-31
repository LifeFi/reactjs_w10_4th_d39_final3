"use server";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";

export async function getMessage(book: string) {
  //  서버 시간 기준임을 확인할 것.
  // - 클라이언트 기준이면, 쉽게 조작됨.
  const now = new Date();
  const expiredDate = new Date(`${process.env.OPENAI_API_EXPIRED_DATE}`);

  console.log("now:", now.toISOString());
  console.log("expiredDate:", expiredDate.toISOString());
  console.log("now > expiredDate:", now > expiredDate);

  if (!now || !expiredDate || now > expiredDate) return "API Key Expired 😭";

  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.5,
  });
  const outputParser = new StringOutputParser();

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "human",
      "책 {book} 에 대해서 이모티콘 3개로 표현해줘. (줄바꿔서) 각각의 이모티콘에 대한 이유를 키워드 3개씩으로 알려줘. 한국어로 해줘.",
    ],
  ]);

  const chain = prompt.pipe(chatModel).pipe(outputParser);

  console.log("chatModel invoked!!!!");
  const response = await chain.invoke({
    book: book,
  });
  console.log("response:", response);

  return response;
}
