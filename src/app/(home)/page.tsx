import { Metadata } from "next";
import Link from "next/link";
import styles from "./home.module.css";
import { BASE_URL } from "@/constants";

export const metadata: Metadata = {
  title: "Home",
};

async function getBestsellerLists(): Promise<IgetBestsellerListsResult> {
  const response = await fetch(`${BASE_URL}/lists`);
  const json = await response.json();
  // throw new Error("This is an error");
  return json;
}

interface IgetBestsellerListsResult {
  status: string;
  copywrite: string;
  num_results: number;
  results: IListInfo[];
}

interface IListInfo {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  newest_published_date: string;
  oldest_published_date: string;
  updated: string;
}

export default async function HomePage() {
  const data = await getBestsellerLists();

  return (
    <div className={styles.container}>
      <h1>THE NEW YORK TIMES BEST SELLER EXPLORER</h1>
      <ul className={styles.list}>
        {data.results.map((list) => (
          <li className={styles.item} key={list.list_name}>
            <Link href={`/list/${list.list_name_encoded}`}>
              {list.display_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
