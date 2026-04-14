import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="wrapper pt-28 mb-10">
      <div className="library-hero-card">
        <div className="library-hero-content">
          {/* Left section: Heading & CTA */}
          <div className="library-hero-text">
            <h1 className="library-hero-title">Your Library</h1>
            <p className="library-hero-description">
              Convert your books into interactive AI conversations. Listen,
              learn, and discuss your favorite reads.
            </p>
            <Link href="/books/new" className="library-cta-primary mt-2">
              <Plus className="w-5 h-5 font-bold" />
              Add new book
            </Link>
          </div>

          {/* Center Section: Illustration */}
          <div className="library-hero-illustration-desktop">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books and globe"
              width={380}
              height={280}
              className="object-contain"
              priority
            />
          </div>
          <div className="library-hero-illustration">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books and globe"
              width={260}
              height={180}
              className="object-contain"
              priority
            />
          </div>

          {/* Right Section: Steps Card */}
          <div className="library-steps-card space-y-5 shadow-soft-sm">
            <div className="library-step-item">
              <div className="library-step-number">1</div>
              <div>
                <h3 className="library-step-title">Upload PDF</h3>
                <p className="library-step-description">Add your book file</p>
              </div>
            </div>

            <div className="library-step-item">
              <div className="library-step-number">2</div>
              <div>
                <h3 className="library-step-title">AI Processing</h3>
                <p className="library-step-description">
                  We analyze the content
                </p>
              </div>
            </div>

            <div className="library-step-item">
              <div className="library-step-number">3</div>
              <div>
                <h3 className="library-step-title">Voice Chat</h3>
                <p className="library-step-description">Discuss with AI</p>
              </div>
            </div>
          </div>
        </div>

        <div className="library-hero-grid">
          {/* Left section: Heading & CTA */}
        </div>
      </div>
    </section>
  );
}
