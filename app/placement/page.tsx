import type { Metadata } from "next";
import PlacementPageClient from "../_pagecomponents/PlacementPageClient";

export const metadata: Metadata = { title: "Placement" };

export default function Page() {
  return <PlacementPageClient />;
}


