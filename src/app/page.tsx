import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeHero } from "@/components/home-hero";
import { HomeSearchBand } from "@/components/home-search-band";
import { DirectionsGrid } from "@/components/directions-grid";
import { UpcomingEvents } from "@/components/upcoming-events";
import { CorporateBand } from "@/components/corporate-band";
import { WhyUs } from "@/components/why-us";
import { LecturersSection } from "@/components/lecturers-section";
import { ResourcesSection } from "@/components/resources-section";
import { NewsletterBand } from "@/components/newsletter-band";
import { HelpBand } from "@/components/help-band";

export const metadata: Metadata = {
  title: "Дом науки и техники — профессиональное обучение",
  description:
    "Семинары, курсы и вебинары повышения квалификации для бухгалтерии, кадровой службы, юристов и руководителей. С 1998 года.",
};

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <HomeHero />
        <HomeSearchBand />
        <DirectionsGrid />
        <UpcomingEvents />
        <CorporateBand />
        <WhyUs />
        <LecturersSection />
        <ResourcesSection />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <NewsletterBand />
        </div>

        <HelpBand />
      </main>

      <SiteFooter />
    </>
  );
}
