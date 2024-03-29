import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";

async function getMessage(book: string) {
  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.5,
  });
  const outputParser = new StringOutputParser();

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "human",
      "책 {book} 에 대해서 이모티콘 3개로 표현해줘. (줄바꿔서) 각각의 이모티콘에 대한 이유를 키워드 3개씩으로 알려줘.",
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

export default async function ChatReview({ book }: { book: string }) {
  const review = await getMessage(book);
  return <div>{review}</div>;
}
