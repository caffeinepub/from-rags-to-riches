import { useCallback, useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

const SECTIONS = [
  { id: "hero", label: "Prologue" },
  { id: "chapter1", label: "Humble Beginnings" },
  { id: "chapter2", label: "The Journey" },
  { id: "chapter3", label: "A Fairytale Encounter" },
  { id: "chapter4", label: "A Princess Life" },
  { id: "epilogue", label: "Epilogue" },
];

const DEFAULT_CHAPTERS = [
  {
    num: "I",
    title: "Humble Beginnings",
    subtitle: "Where the story begins",
    body: "Tanaka was born on a Tuesday when the rains came heavy and the red earth turned to rivers. Her village was small — a cluster of mud-brick homes with roofs of dried grass, surrounded by mango trees that bore fruit only when they wished. Her mother's hands were rough from years of labour, yet they held her with a tenderness that felt like the whole world. Even as a child, there was something about her that drew people near — a radiance that had nothing to do with the sun. Her smile, wide and full and rosy, was the kind that made strangers feel they had known her all their lives; it was the first thing anyone noticed, and the last thing they forgot. Growing up, there was never quite enough. But there was laughter around the fire, and she was always at the centre of it — not because she sought attention, but because her warmth was simply irresistible. She was humble in the way that truly great souls are humble: she greeted the village elder and the youngest child with the same gentle courtesy, the same unhurried kindness. She learned early the meaning of resilience — not from books, but from the women around her who bent without breaking, who sang while they worked, who dreamed quietly and deeply. She was one of them. She always knew she was meant for more — not because she was unhappy, but because the horizon kept calling her name.",
    image: "/assets/generated/humble-beginnings.dim_1600x900.jpg",
  },
  {
    num: "II",
    title: "The Journey",
    subtitle: "The road that forged her",
    body: "She packed what little she had into a single cloth bag — a change of clothes, her mother's photograph, and a small coin her grandmother had pressed into her palm the morning she left. The road ahead was long and uncertain, cutting through landscapes that shifted from dry savanna to dusty highways to the cold glass towers of a city she had only seen in magazines. It terrified her. But her spirit refused to be small. She took each step carrying the weight of every dream her village had not yet dared to dream. She slept on floors. She worked before sunrise. She wept when no one was watching. And each morning, she rose again — a little harder, a little wiser, a little more luminous — because the fire inside her could not be extinguished by circumstance. The world had not yet seen the last of her.",
    image: "/assets/generated/the-journey.dim_1600x900.jpg",
  },
  {
    num: "III",
    title: "A Fairytale Encounter",
    subtitle: "When the universe conspired",
    body: "She was sitting in a sun-drenched piazza in Florence — her first time in Italy, her first time feeling truly free — when she heard the laugh. Deep, warm, unself-conscious. It was the laugh of a man who had not laughed in a very long time. He was older — distinguished in the way that only decades of hard living and harder working can make a man. Tall, broad-shouldered, his silver hair swept back in a way that looked accidental but wasn't. He had a face that had seen too much: beautiful in its weathering, with dark eyes that held the particular sadness of someone who had been everywhere and still arrived nowhere. His name was Marco, and he had spent forty years building things — businesses, contracts, reputations — across the piazzas and boardrooms and port cities of the world. He had sat in cafés in Buenos Aires and Tokyo and Nairobi, always alone, always watchful, a man whose success had outrun his happiness by decades. He had loved Italy deeply once, but even Italy had begun to feel hollow. He had come to Florence that afternoon for no particular reason — habit, perhaps, or the tiredness of a man who no longer knows where he belongs. A man at the next table had knocked over his espresso trying to describe a painting with his hands, and that man was Marco himself — laughing at his own clumsiness, laughing in the way of someone surprised to find it still possible. When their eyes met across the cobblestones, the laugh died softly on his lips. It was her smile that stopped him — full and luminous, curving over those beautiful rosy lips, lighting her whole face as though she carried a private sun inside her. He told her later that he had never in his life seen anything so effortlessly magnificent. He could not look away. He crossed the piazza on the flimsiest of pretexts and introduced himself with a slight tremor in his voice he would never quite live down. When she told him her name — Tanaka — he repeated it softly, as though testing whether something so beautiful could be real. What undid him completely was not just her beauty — though her beauty was extraordinary — but the way she looked at him: without pity for his age, without awe at his wealth, wholly and humbly present. She asked him questions about his life with a genuine curiosity that made him feel, for once, truly interesting. Over days that turned into weeks, between cathedrals and candlelit dinners, she found herself not just falling in love — but being truly seen, perhaps for the first time. She had always been extraordinary. Marco — a man who had seen everything the world had to offer — simply recognised it.",
    image: "/assets/generated/fairytale-encounter.dim_1600x900.jpg",
  },
  {
    num: "IV",
    title: "A Princess Life",
    subtitle: "The life she always deserved",
    body: 'He brought her roses every morning — deep red ones, chosen by hand, because he said that only red was bold enough to sit beside her. Not because it was expected, but because the look on her face when she received them — that slow, glorious smile spreading over her beautiful lips — was, he insisted, worth more than all the gold in the world. He had earned that gold the hard way: decades of relentless work, of early mornings and sleepless nights, of managing businesses across three continents with the quiet ferocity of a man who had no one to come home to. He had built the Tuscan villa with his own vision and his own hands — not inherited, but willed into existence, stone by ancient stone. It sat among olive groves he had planted himself, its walls full of art he had collected from every corner of the globe and a silence that, before her, had felt like a verdict. He had been successful in every way that was supposed to matter, and for years he had wondered why none of it did. Then she arrived — and the villa filled with warmth. He learned to say "I love you" in her mother tongue — stumbling over the syllables with such earnest concentration that she would laugh until she cried, and her laugh was its own kind of treasure. His family called her la principessa — the princess — and the name fit like it had always belonged to her. But Marco would say, quietly and seriously, that it was not her captivating figure nor even her radiant beauty that made her truly remarkable — it was her kindness. The way she spoke to the housekeeper with the same warmth she gave to visiting dignitaries. The way she remembered every name. The humble grace she carried like a second skin, worn so naturally it seemed she had been born to set others at ease. In her, the sad old traveller had finally found his home — not a place, but a person. He had crossed the world. He had simply needed to cross one piazza. She stood now in the golden light of the life she had built — not given, but earned with every brave and painful step — and she understood at last: she had not been rescued. She had arrived.',
    image: "/assets/generated/princess-life.dim_1600x900.jpg",
  },
];

function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.12 82), transparent)",
        }}
      />
      <span
        style={{
          color: "oklch(0.72 0.12 82)",
          fontSize: "20px",
          lineHeight: 1,
        }}
      >
        ✦
      </span>
      <span
        style={{
          color: "oklch(0.72 0.12 82)",
          fontSize: "12px",
          lineHeight: 1,
        }}
      >
        ◆
      </span>
      <span
        style={{
          color: "oklch(0.72 0.12 82)",
          fontSize: "20px",
          lineHeight: 1,
        }}
      >
        ✦
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.12 82), transparent)",
        }}
      />
    </div>
  );
}

function SideNav({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav
      data-ocid="nav.section"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
      aria-label="Section navigation"
    >
      {SECTIONS.map((section) => (
        <button
          type="button"
          key={section.id}
          data-ocid={`nav.${section.id}.button`}
          onClick={() => onNavigate(section.id)}
          title={section.label}
          aria-label={`Navigate to ${section.label}`}
          className="group relative flex items-center justify-end gap-3"
        >
          <span
            className="absolute right-7 whitespace-nowrap text-xs font-cormorant tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ color: "oklch(0.72 0.12 82)", letterSpacing: "0.15em" }}
          >
            {section.label}
          </span>
          <div
            className="transition-all duration-300"
            style={{
              width: activeSection === section.id ? "14px" : "8px",
              height: activeSection === section.id ? "14px" : "8px",
              borderRadius: "50%",
              backgroundColor:
                activeSection === section.id
                  ? "oklch(0.72 0.12 82)"
                  : "oklch(0.72 0.12 82 / 0.3)",
              boxShadow:
                activeSection === section.id
                  ? "0 0 12px oklch(0.72 0.12 82 / 0.7)"
                  : "none",
              border:
                activeSection === section.id
                  ? "none"
                  : "1px solid oklch(0.72 0.12 82 / 0.5)",
            }}
          />
        </button>
      ))}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1920x1080.jpg')",
        }}
      />
      {/* Layered overlays for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.08 0.02 55 / 0.6) 0%, oklch(0.08 0.02 55 / 0.75) 50%, oklch(0.08 0.02 55 / 0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, oklch(0.05 0.01 55 / 0.7) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ animation: "fade-in-up 1.2s ease-out forwards" }}
      >
        {/* Pre-title ornament */}
        <div
          className="flex items-center justify-center gap-3 mb-8"
          style={{ animation: "fade-in 1.5s ease-out 0.3s both" }}
        >
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "oklch(0.72 0.12 82 / 0.6)",
            }}
          />
          <span
            className="font-cormorant tracking-[0.3em] uppercase text-sm"
            style={{ color: "oklch(0.72 0.12 82)", letterSpacing: "0.3em" }}
          >
            A True Story
          </span>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "oklch(0.72 0.12 82 / 0.6)",
            }}
          />
        </div>

        {/* Main title */}
        <h1
          className="font-playfair font-bold leading-none mb-6 shimmer-gold"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.02em",
            animation: "fade-in-up 1s ease-out 0.2s both",
          }}
        >
          From Rags
          <br />
          <em>to Riches</em>
        </h1>

        {/* Ornament divider */}
        <div style={{ animation: "fade-in 1s ease-out 0.7s both" }}>
          <OrnamentDivider className="mb-6" />
        </div>

        {/* Subtitle */}
        <p
          className="font-cormorant font-light tracking-wider"
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
            color: "oklch(0.90 0.04 88)",
            letterSpacing: "0.12em",
            animation: "fade-in-up 1s ease-out 0.9s both",
          }}
        >
          A Story of Resilience, Love, and Grace
        </p>

        {/* Character intro */}
        <p
          className="font-cormorant italic"
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
            color: "oklch(0.72 0.12 82 / 0.85)",
            letterSpacing: "0.06em",
            marginTop: "1.25rem",
            animation: "fade-in-up 1s ease-out 1.1s both",
          }}
        >
          The story of Tanaka — a woman whose smile could silence a room, whose
          grace could move mountains.
        </p>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex flex-col items-center gap-3"
          style={{ animation: "fade-in 1s ease-out 1.4s both" }}
        >
          <span
            className="font-cormorant text-sm tracking-[0.2em] uppercase"
            style={{ color: "oklch(0.72 0.12 82 / 0.8)" }}
          >
            Begin the Journey
          </span>
          <div className="float-down" style={{ color: "oklch(0.72 0.12 82)" }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              role="img"
              aria-label="Scroll down"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.14 0.025 55))",
        }}
      />
    </section>
  );
}

function ChapterSection({
  num,
  title,
  subtitle,
  body,
  image,
  sectionId,
  ocid,
}: {
  num: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  sectionId: string;
  ocid: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={sectionId}
      data-ocid={ocid}
      ref={sectionRef}
      className={`relative flex items-center justify-center overflow-hidden ${
        revealed ? "chapter-revealed" : "section-hidden"
      }`}
      style={{ minHeight: "100svh" }}
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* Dark cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.08 0.02 55 / 0.85) 0%, oklch(0.12 0.04 30 / 0.75) 50%, oklch(0.08 0.02 55 / 0.9) 100%)",
        }}
      />

      {/* Top and bottom gradient transitions */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.14 0.025 55), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(to top, oklch(0.14 0.025 55), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 py-24 max-w-3xl mx-auto text-center">
        {/* Chapter number */}
        <div
          className="chapter-num font-playfair font-bold mb-2"
          style={{
            fontSize: "clamp(4rem, 12vw, 9rem)",
            color: "oklch(0.72 0.12 82 / 0.15)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
              color: "oklch(0.72 0.12 82)",
              letterSpacing: "0.4em",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
            CHAPTER {num}
          </span>
          {num}
        </div>

        {/* Chapter title */}
        <h2
          className="chapter-title font-playfair font-bold mb-2"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            color: "oklch(0.97 0.025 88)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          className="chapter-title font-cormorant italic mb-6"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            color: "oklch(0.72 0.12 82)",
            letterSpacing: "0.08em",
          }}
        >
          {subtitle}
        </p>

        {/* Ornament */}
        <div className="chapter-ornament mb-8">
          <OrnamentDivider />
        </div>

        {/* Body text */}
        <p
          className="chapter-body font-cormorant"
          style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "oklch(0.92 0.02 88)",
            lineHeight: 1.9,
            fontWeight: 300,
            textAlign: "justify",
            hyphens: "auto",
          }}
        >
          {body}
        </p>
      </div>
    </section>
  );
}

function EpilogueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="epilogue"
      data-ocid="epilogue.section"
      className="relative flex items-center justify-center py-32 px-6"
      style={{
        minHeight: "100svh",
        background:
          "radial-gradient(ellipse at center bottom, oklch(0.20 0.04 40 / 0.4) 0%, oklch(0.12 0.025 55) 60%)",
      }}
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.72 0.12 82 / 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        ref={sectionRef}
        className="relative z-10 max-w-3xl mx-auto text-center"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(50px)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
        }}
      >
        {/* Top ornament */}
        <OrnamentDivider className="mb-12" />

        {/* Epilogue label */}
        <p
          className="font-cormorant tracking-[0.3em] uppercase text-sm mb-8"
          style={{ color: "oklch(0.72 0.12 82)", letterSpacing: "0.3em" }}
        >
          Epilogue
        </p>

        {/* Large decorative quote marks */}
        <div
          className="font-playfair"
          style={{
            fontSize: "8rem",
            lineHeight: 0.6,
            color: "oklch(0.72 0.12 82 / 0.15)",
            marginBottom: "-1rem",
          }}
        >
          &ldquo;
        </div>

        {/* Quote */}
        <blockquote
          className="font-cormorant italic"
          style={{
            fontSize: "clamp(1.3rem, 2.8vw, 2rem)",
            color: "oklch(0.95 0.03 88)",
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: "2rem",
          }}
        >
          She did not escape poverty. She transcended it — with grace, with
          love, and with a heart that never forgot where it came from.
        </blockquote>

        {/* Bottom ornament */}
        <OrnamentDivider className="mb-10" />

        {/* Closing line */}
        <p
          className="font-cormorant tracking-wider"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            color: "oklch(0.72 0.12 82)",
            letterSpacing: "0.1em",
            marginBottom: "4rem",
          }}
        >
          This is Tanaka&apos;s story.{" "}
          <em style={{ color: "oklch(0.90 0.04 88)" }}>This is your story.</em>
        </p>

        {/* The end ornament */}
        <div className="flex flex-col items-center gap-3">
          <div
            style={{
              width: "2px",
              height: "60px",
              background:
                "linear-gradient(to bottom, oklch(0.72 0.12 82), transparent)",
            }}
          />
          <span
            className="font-playfair italic"
            style={{
              fontSize: "1.1rem",
              color: "oklch(0.72 0.12 82 / 0.6)",
            }}
          >
            — Finis —
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="py-8 px-6 text-center"
      style={{
        borderTop: "1px solid oklch(0.72 0.12 82 / 0.15)",
        background: "oklch(0.10 0.02 55)",
      }}
    >
      <p
        className="font-cormorant text-sm tracking-wider"
        style={{ color: "oklch(0.55 0.05 80)" }}
      >
        © {year}. Built with ❤ using{" "}
        <a
          href={utmLink}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 hover:underline"
          style={{ color: "oklch(0.72 0.12 82)" }}
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [chapters, setChapters] = useState(DEFAULT_CHAPTERS);

  const { actor } = useActor();

  // Optionally enrich with backend data
  useEffect(() => {
    if (!actor) return;
    actor
      .getChapters()
      .then((backendChapters) => {
        if (backendChapters.length >= 4) {
          setChapters((prev) =>
            prev.map((ch, i) => ({
              ...ch,
              title: backendChapters[i]?.title || ch.title,
              subtitle: backendChapters[i]?.subtitle || ch.subtitle,
              body: backendChapters[i]?.body || ch.body,
            })),
          );
        }
      })
      .catch(() => {
        // Use default chapters if backend fails
      });
  }, [actor]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  const navigateToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      style={{
        background: "oklch(0.14 0.025 55)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <SideNav activeSection={activeSection} onNavigate={navigateToSection} />

      <main>
        <HeroSection />

        {chapters.map((chapter, i) => (
          <ChapterSection
            key={chapter.num}
            num={chapter.num}
            title={chapter.title}
            subtitle={chapter.subtitle}
            body={chapter.body}
            image={chapter.image}
            sectionId={`chapter${i + 1}`}
            ocid={`chapter${i + 1}.section`}
          />
        ))}

        <EpilogueSection />
      </main>

      <Footer />
    </div>
  );
}
