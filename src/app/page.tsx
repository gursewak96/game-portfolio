import styles from "./page.module.css";
import { getGames } from "@/lib/games";
import Link from "next/link";

export default async function Home() {
  const games = await getGames();
  const hyperCasualGames = games.filter((g) => g.gameType === "Hyper Casual");
  const fullGames = games.filter((g) => g.gameType === "Full Game");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.badge}>calm mode on 🍃</p>
          <h1>Game Portfolio</h1>
          <p>
            A cozy corner for your games, experiments, and dev journey. Keep it
            playful, keep it positive, and let every project shine. 🎮✨
          </p>
          <div className={styles.ctas}>
            <a className={styles.primary} href="#projects">
              View Projects 🚀
            </a>
            <a className={styles.secondary} href="#about">
              About Me 🌱
            </a>
          </div>
        </section>

        <section id="projects">
          {hyperCasualGames.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Hyper Casual Games ✨</h2>
              <div className={styles.grid}>
                {hyperCasualGames.map((game) => (
                  <Link key={game.id} href={game.link} className={styles.cardLink}>
                    <article className={styles.card}>
                      <h3>{game.title}</h3>
                      <p>{game.description}</p>
                      <div className={styles.cardMeta}>
                        <span className={styles.category}>{game.category}</span>
                        <span className={styles.year}>{game.year}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {fullGames.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Full Games 🎮</h2>
              <div className={styles.grid}>
                {fullGames.map((game) => (
                  <Link key={game.id} href={game.link} className={styles.cardLink}>
                    <article className={styles.card}>
                      <h3>{game.title}</h3>
                      <p>{game.description}</p>
                      <div className={styles.cardMeta}>
                        <span className={styles.category}>{game.category}</span>
                        <span className={styles.year}>{game.year}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <section id="about" className={styles.about}>
          <h2>Build With Good Vibes 😊</h2>
          <p>
            This portfolio is powered by Next.js and designed to feel calm,
            bright, and optimistic.
          </p>
        </section>
      </main>
    </div>
  );
}
