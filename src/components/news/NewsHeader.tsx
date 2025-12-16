import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function NewsHeader() {
  return (
    <header className="sticky top-0 z-40 bg-news-nav text-news-nav shadow-sm">
      <div className="container flex items-center justify-between h-12 md:h-14">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground font-bold text-lg md:text-xl px-2 py-0.5 rounded-sm">
            INFO
          </div>
          <span className="font-headline text-xl md:text-2xl font-bold">
            Business
          </span>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
