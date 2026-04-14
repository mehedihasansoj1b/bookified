import Link from "next/link";
import { sampleBooks } from "@/types";
import Image from "next/image";

const BookCard = ({
  title,
  author,
  coverURL,
  slug,
}: { title: string, author: string, coverURL: string, slug: string }) => {
  return (
    <Link href={`/books/${slug}`}>
      <article className="book-card">
        <figure className="book-card-figure">
          <div className="book-card-cover-wrapper">
            <Image
              src={coverURL}
              alt={`${title} cover`}
              width={133}
              height={200}
              className="book-card-cover"
            />
          </div>
        </figure>
        <figcaption className="book-card-meta">
          <h3 className="book-card-title">{title}</h3>
          <p className="book-card-author">{author}</p>
        </figcaption>
      </article>
    </Link>
  );
};

export default BookCard;
