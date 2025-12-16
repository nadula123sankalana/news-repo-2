import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.split("-")[0] || "fr";

  const handleChange = (code: string) => {
    void i18n.changeLanguage(code);
  };

  return (
    <div className="flex items-center gap-1 text-[10px] md:text-xs font-semibold">
      {LANGS.map((lang) => {
        const isActive = current === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleChange(lang.code)}
            className={`px-1.5 py-0.5 rounded-sm border transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-news-nav border-white/40 hover:bg-white/20"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}


