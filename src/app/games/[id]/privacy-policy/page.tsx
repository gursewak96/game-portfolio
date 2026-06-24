import { getGameById, getGames, getGamePrivacyPolicy } from "@/lib/games";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "../game.module.css";

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
    title: `Privacy Policy — ${game.title}`,
    description: `Privacy policy for ${game.title}`,
  };
}

export default async function GamePrivacyPolicyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await getGameById(id);
  const privacyPolicy = await getGamePrivacyPolicy(id);

  if (!game || !privacyPolicy) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Link href={`/games/${game.id}`} className={styles.backButton}>
        ← Back to {game.title}
      </Link>

      <article className={styles.gameDetail}>
        <header className={styles.header}>
          <h1>Privacy Policy</h1>
          <p className={styles.description}>Privacy policy for {game.title}</p>
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: markdownToHtml(privacyPolicy) }}
        />

        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            <Link href={`/games/${game.id}`} className={styles.homeLink}>
              ← Back to {game.title}
            </Link>
            <Link href="/" className={styles.privacyLink}>
              Back to Portfolio
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
