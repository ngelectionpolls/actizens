import { MainNavigationSection } from "./sections/MainNavigationSection/MainNavigationSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";

interface PageLayoutProps {
  activePage: string;
  children: React.ReactNode;
}

export const PageLayout = ({ activePage, children }: PageLayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#0a1a0d]">
      <MainNavigationSection activePage={activePage} />
      <main>{children}</main>
      <SiteFooterSection />
    </div>
  );
};
