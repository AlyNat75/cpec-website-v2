import type { Metadata } from "next";
import RecruitmentPageClient from "../_pagecomponents/RecruitmentPageClient";

export const metadata: Metadata = { title: "Recruitment" };

export default function Page() {
  return <RecruitmentPageClient />;
}


