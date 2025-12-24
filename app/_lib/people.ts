import fs from "fs";
import path from "path";

export type Person = {
  slug: string;
  name: string;
  role: string;
  headshot: string;
  email: string;
  major: string;
  gradYear: number | string; // allow strings like "Alumni"
  workExperience?: string[];
  campusInvolvements?: string[];
  classYearLabel?: string;
  order?: number;
  content?: string;
};

const PEOPLE_DIR = path.join(process.cwd(), "content", "people");

function parseFrontMatter(fileContent: string): { data: Record<string, unknown>; content: string } {
  const start = fileContent.indexOf("---");
  if (start !== 0) return { data: {}, content: fileContent };
  const end = fileContent.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: fileContent };
  const yaml = fileContent.slice(3, end + 1).trim();
  const body = fileContent.slice(end + 4).trim();

  // Minimal YAML: key: value and list using '-'
  const lines = yaml.split(/\r?\n/);
  const data: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let currentList: string[] | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("- ")) {
      if (!currentKey) continue;
      if (!currentList) currentList = [];
      currentList.push(line.slice(2).trim());
      data[currentKey] = currentList;
      continue;
    }
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) {
      if (currentList) currentList = null;
      currentKey = m[1];
      const v = m[2];
      if (v === "" || v === "null") {
        data[currentKey] = "";
      } else if (/^\d+$/.test(v)) {
        data[currentKey] = Number(v);
      } else {
        data[currentKey] = v.replace(/^"|"$/g, "");
      }
    }
  }
  return { data, content: body };
}

function normalizePerson(raw: Record<string, unknown>, content: string): Person {
  const required = ["slug", "name", "role", "headshot", "email", "major", "gradYear"] as const;
  for (const k of required) {
    if (!(k in raw)) throw new Error(`Missing required field '${k}' in person file`);
  }

  const toArray = (v: unknown): string[] | undefined => {
    if (v == null || v === "") return undefined;
    if (Array.isArray(v)) return v.map(String).filter(Boolean);
    return [String(v)];
  };

  const p: Person = {
    slug: String(raw.slug),
    name: String(raw.name),
    role: String(raw.role),
    headshot: String(raw.headshot),
    email: String(raw.email),
    major: String(raw.major),
    gradYear: typeof raw.gradYear === "number" ? raw.gradYear : String(raw.gradYear),
    workExperience: toArray(raw.workExperience),
    campusInvolvements: toArray(raw.campusInvolvements),
    classYearLabel: raw.classYearLabel ? String(raw.classYearLabel) : undefined,
    order: raw.order != null ? Number(raw.order) : undefined,
    content,
  };
  return p;
}

export function getAllPeople(): Person[] {
  if (!fs.existsSync(PEOPLE_DIR)) return [];
  const files = fs.readdirSync(PEOPLE_DIR).filter((f) => f.endsWith(".md"));
  const people: Person[] = [];
  const slugs = new Set<string>();
  for (const file of files) {
    const full = path.join(PEOPLE_DIR, file);
    const content = fs.readFileSync(full, "utf8");
    const { data, content: body } = parseFrontMatter(content);
    const person = normalizePerson(data, body);
    if (slugs.has(person.slug)) throw new Error(`Duplicate slug '${person.slug}'`);
    slugs.add(person.slug);
    people.push(person);
  }
  return people;
}

const EBOARD_TITLES = [
  "President, Founder",
  "Vice President, Founder",
  "Co-Founder",
  "Co-President",
  "Co-VP of NME",
  "VP of DEI",
  "Co-VP of Recruitment",
  "Social Chair",
  "Treasurer",
  "VP of Professional Relations",
  "VP of Marketing",
  "VP of Membership",
  "Co-VP of Professional Development"
];

export function getExecutiveBoard(): Person[] {
  const all = getAllPeople();
  const board = all.filter((p) => EBOARD_TITLES.some((t) => p.role.toLowerCase().includes(t.toLowerCase())));
  return board
    .slice()
    .sort((a, b) => {
      const ao = a.order ?? Number.MAX_SAFE_INTEGER;
      const bo = b.order ?? Number.MAX_SAFE_INTEGER;
      if (ao !== bo) return ao - bo;
      const ar = a.role.localeCompare(b.role);
      if (ar !== 0) return ar;
      return a.name.localeCompare(b.name);
    });
}

export function getMembers(): Person[] {
  const all = getAllPeople();
  const boardSlugs = new Set(getExecutiveBoard().map((p) => p.slug));
  const members = all.filter((p) => !boardSlugs.has(p.slug));
  return members.slice().sort((a, b) => {
    const ay = a.gradYear;
    const by = b.gradYear;
    const aNum = typeof ay === "number" || /^\d+$/.test(String(ay)) ? Number(ay) : null;
    const bNum = typeof by === "number" || /^\d+$/.test(String(by)) ? Number(by) : null;
    if (aNum != null && bNum != null) return bNum - aNum || a.name.localeCompare(b.name);
    if (aNum != null) return -1; // numbers before strings
    if (bNum != null) return 1;
    // both strings
    return String(by).localeCompare(String(ay)) || a.name.localeCompare(b.name);
  });
}

export function getPersonBySlug(slug: string): Person | null {
  const all = getAllPeople();
  return all.find((p) => p.slug === slug) ?? null;
}

export function groupMembersByYear(people: Person[]): Array<{ yearKey: string | number; label: string; people: Person[] }> {
  const byYear = new Map<string | number, Person[]>();
  for (const p of people) {
    const key = p.gradYear;
    const arr = byYear.get(key) ?? [];
    arr.push(p);
    byYear.set(key, arr);
  }

  const entries = Array.from(byYear.entries()).map(([yearKey, arr]) => ({
    yearKey,
    people: arr.sort((a, b) => a.name.localeCompare(b.name)),
  }));

  const numeric = entries.filter((e) => typeof e.yearKey === "number" || /^\d+$/.test(String(e.yearKey)));
  const nonNumeric = entries.filter((e) => !numeric.includes(e));

  numeric.sort((a, b) => Number(b.yearKey) - Number(a.yearKey));
  nonNumeric.sort((a, b) => String(a.yearKey).localeCompare(String(b.yearKey)));

  const groups = [...numeric, ...nonNumeric].map((g) => ({
    yearKey: g.yearKey,
    label: g.people[0].classYearLabel ?? (typeof g.yearKey === "number" || /^\d+$/.test(String(g.yearKey)) ? `Class of ${g.yearKey}` : String(g.yearKey)),
    people: g.people,
  }));

  return groups;
}


