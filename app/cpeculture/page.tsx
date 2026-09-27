import type { Metadata } from "next";
import CulturePageClient from "../_pagecomponents/CulturePageClient";

export const metadata: Metadata = { title: "CPECulture" };

export default function Page() {
  return <CulturePageClient />;
}
