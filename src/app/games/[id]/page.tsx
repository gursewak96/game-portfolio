import { getGameById, getGames } from "@/lib/games";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./game.module.css";

export async function generateStaticParams() {
  const games = await getGames();
  return games.map((game) => ({
    id: game.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: game.title,
    description: game.description,
  };
}

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Back to Home
      </Link>

      <article className={styles.gameDetail}>
        <header className={styles.header}>
          <h1>{game.title}</h1>
          <p className={styles.description}>{game.description}</p>
          <div className={styles.meta}>
            <span className={styles.category}>{game.category}</span>
            <span className={styles.year}>{game.year}</span>
            <div className={styles.tags}>
              {game.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: markdownToHtml(game.content) }}
        />

        <footer className={styles.footer}>
          <p>Created in {game.year} • {game.category} Game</p>
          <div className={styles.footerLinks}>
            <Link href="/" className={styles.homeLink}>
              ← Back to Portfolio
            </Link>
            <Link href="/privacy-policy" className={styles.privacyLink}>
              Privacy Policy
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Line breaks
  html = html.replace(/\n\n/g, "</p><p>");
  html = html.replace(/\n/g, "<br />");

  // Wrap in paragraphs
  const lines = html.split("</p><p>");
  html = lines
    .map((line) => {
      if (line.startsWith("<h") || line.startsWith("<ul") || line.startsWith("<ol")) {
        return line;
      }
      return `<p>${line}</p>`;
    })
    .join("");

  // Clean up
  html = html.replace(/<p><\/p>/g, "");
  html = html.replace(/<p><h/g, "<h");
  html = html.replace(/<\/h\d><\/p>/g, "</h>");

  return html;
}
