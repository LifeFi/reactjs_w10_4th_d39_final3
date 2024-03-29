import Book from "@/components/book";
import { BASE_URL } from "@/config";
import styles from "@/styles/list-detail.module.css";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";
import Image from "next/image";
import { Suspense } from "react";

async function getBestsellerList(
  id: string
): Promise<IgetBestsellerListResult> {
  const response = await fetch(`${BASE_URL}/list?name=${id}`);
  const json = await response.json();
  return json;
}

interface IgetBestsellerListResult {
  status: string;
  copywrite: string;
  num_results: number;
  last_modified: string;
  results: {
    list_name: string;
    list_name_encoded: string;
    bestsellers_date: string;
    published_date: string;
    published_date_description: string;
    next_published_date: string;
    previous_published_date: string;
    display_name: string;
    normal_list_ends_at: number;
    updated: string;
    books: IBook[];
  };
}

interface IBook {
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: number;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  description: string;
  price: number;
  title: string;
  author: string;
  contributor: string;
  book_image: string;
  book_image_width: number;
  book_image_height: number;
  amazon_product_url: string;
  age_group: string;
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
  isbns: IIsbn[];
  buy_links: IBuyLink[];
  book_uri: string;
}

interface IIsbn {
  isbn10: string;
  isbn13: string;
}

interface IBuyLink {
  name: string;
  url: string;
}
interface IListDetailPageProps {
  params: { id: string };
}

export const generateMetadata = ({ params: { id } }: IListDetailPageProps) => {
  return {
    title: `${id}`,
  };
};

export default async function ListDetailPage({
  params: { id },
}: IListDetailPageProps) {
  const data = await getBestsellerList(id);

  return (
    <div className={styles.container}>
      <h1>{data.results.list_name}</h1>
      <ul className={styles.list}>
        {data.results.books.map((book) => (
          <Book
            key={book.primary_isbn10}
            title={book.title}
            url={book.amazon_product_url}
            image={book.book_image}
            width={200}
            height={300}
          />
        ))}
      </ul>
    </div>
  );
}
