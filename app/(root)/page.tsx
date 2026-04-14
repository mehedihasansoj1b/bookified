import HeroSection from "@/components/ui/HeroSection";
import BookCard from "@/components/ui/BookCard";
import { sampleBooks } from "@/lib/constants";

export default function Home() {
  return (
    <div className="container wrapper">
      <HeroSection />
      <div className="library-books-grid ">
        {sampleBooks.map((book) => (
          <BookCard
            key={book._id}
            title={book.title}
            author={book.author}
            coverURL={book.coverURL}
            slug={book.slug}
          />
        ))}
      </div>
    </div>
  );
}
