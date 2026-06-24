import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  gameType: string;
  year: number;
  link: string;
  image: string;
  tags: string[];
}

export interface GameDetail extends Game {
  content: string;
  privacyPolicy?: string;
}

export async function getGames(): Promise<Game[]> {
  const gamesPath = path.join(
    process.cwd(),
    "src",
    "data",
    "games.md"
  );
  
  const fileContent = fs.readFileSync(gamesPath, "utf-8");

  // Extract YAML frontmatter - handle both LF and CRLF line endings
  const frontmatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    throw new Error(`No frontmatter found in games.md. File starts with: ${fileContent.substring(0, 50)}`);
  }

  const frontmatter = yaml.load(frontmatterMatch[1]) as { games: Game[] };
  return frontmatter.games;
}

export async function getGameById(id: string): Promise<GameDetail | null> {
  const gameFilePath = path.join(
    process.cwd(),
    "src",
    "data",
    "games",
    `${id}.md`
  );

  if (!fs.existsSync(gameFilePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(gameFilePath, "utf-8");

  // Extract YAML frontmatter and content - handle both LF and CRLF
  const frontmatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    throw new Error(`No frontmatter found in game file: ${id}`);
  }

  const frontmatter = yaml.load(frontmatterMatch[1]) as Game;
  const content = frontmatterMatch[2];

  return {
    ...frontmatter,
    content,
  };
}

export async function getGamePrivacyPolicy(id: string): Promise<string | null> {
  const privacyPolicyPath = path.join(
    process.cwd(),
    "src",
    "data",
    "games",
    "privacy-policies",
    `${id}.md`
  );

  if (!fs.existsSync(privacyPolicyPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(privacyPolicyPath, "utf-8");
  return fileContent;
}
