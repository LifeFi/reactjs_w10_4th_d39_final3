import { BASE_URL } from "@/app/(home)/page";
import styles from "@/styles/list-detail.module.css";
import Image from "next/image";

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

export default async function ListDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getBestsellerList(id);

  return (
    <div className={styles.container}>
      <h1>{data.results.list_name}</h1>
      <ul className={styles.list}>
        {data.results.books.map((book) => (
          <li className={styles.item} key={book.primary_isbn13}>
            <a href={book.amazon_product_url} target="blank">
              <Image
                src={book.book_image}
                alt={book.title}
                width={200}
                height={(200 * book.book_image_height) / book.book_image_width}
                layout="fixed"
                loading="lazy"
              />
              <div>{book.title}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
