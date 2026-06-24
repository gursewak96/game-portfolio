import Link from "next/link";
import styles from "./privacy.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Game Portfolio",
  description: "Privacy policy for the Game Portfolio and all games listed within.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Back to Home
      </Link>

      <article className={styles.document}>
        <header className={styles.header}>
          <h1>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: May 12, 2026</p>
        </header>

        <section className={styles.section}>
          <h2>1. Overview</h2>
          <p>
            This Privacy Policy explains how Game Portfolio ("we", "us", or "our") handles
            information when you visit this website or play any of the games featured here.
            We are committed to protecting your privacy and being transparent about our practices.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Information We Collect</h2>
          <p>We collect minimal information to provide and improve our services:</p>
          <ul>
            <li>
              <strong>Usage Data:</strong> Anonymous data such as pages visited and time spent,
              collected via standard web server logs.
            </li>
            <li>
              <strong>Game Progress:</strong> Some games may store save data locally in your
              browser using <code>localStorage</code>. This data never leaves your device.
            </li>
            <li>
              <strong>No Personal Data:</strong> We do not collect names, email addresses,
              or any personally identifiable information unless you explicitly contact us.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Cookies</h2>
          <p>
            This website uses only essential cookies required for basic functionality.
            We do not use advertising, tracking, or analytics cookies. You can disable
            cookies in your browser settings without affecting your ability to use this site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Third-Party Services</h2>
          <p>
            Some games may link to or embed third-party services (e.g., GitHub, itch.io).
            These services have their own privacy policies, and we encourage you to review them.
            We are not responsible for the privacy practices of any third-party websites.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Data Retention</h2>
          <p>
            Since we do not collect personal data, there is nothing to retain or delete.
            Any game progress stored locally in your browser can be cleared by clearing
            your browser&apos;s local storage at any time.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Children&apos;s Privacy</h2>
          <p>
            Our games and website are designed to be family-friendly. We do not knowingly
            collect any personal information from children under 13. If you believe a child
            has provided us with personal information, please contact us so we can address it.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be reflected
            on this page with an updated date. We encourage you to review this page periodically.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Contact</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please reach out
            via the contact information listed on the main portfolio page.
          </p>
        </section>

        <footer className={styles.footer}>
          <Link href="/" className={styles.homeLink}>← Back to Portfolio</Link>
        </footer>
      </article>
    </div>
  );
}
