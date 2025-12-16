import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ArticleContent() {
  const { t } = useTranslation();
  const highlights = (t("article.highlights", { returnObjects: true }) as string[]) || [];
  const steps = (t("article.steps", { returnObjects: true }) as string[]) || [];
  const resultsAdvantages = (t("article.resultsAdvantages", { returnObjects: true }) as string[]) || [];
  const systemTestResults = (t("article.systemTestResults", { returnObjects: true }) as string[]) || [];

  return (
    <article className="news-body space-y-6">
      <p className="text-lg leading-relaxed font-bold first-letter:text-5xl first-letter:font-headline first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary">
        {t("article.lead")}
      </p>

      <p>{t("article.p2")}</p>

      <p>{t("article.p3")}</p>

      <h2 className="font-headline text-2xl font-bold text-news-headline mt-10 mb-4">
        {t("article.systemObjectiveTitle")}
      </h2>

      <p>{t("article.systemObjectiveIntro")}</p>

      <ul className="space-y-3 my-6">
        {systemTestResults.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p>{t("article.systemVerification")}</p>

      <p>{t("article.p4")}</p>

      <h2 className="font-headline text-2xl font-bold text-news-headline mt-10 mb-4">
        {t("article.highlightsTitle")}
      </h2>

      <ul className="space-y-3 my-6">
        {highlights.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="font-headline text-2xl font-bold text-news-headline mt-10 mb-4">
        {t("article.projectHistoryTitle")}
      </h2>

      <p>{t("article.projectHistoryBody")}</p>

      <h2 className="font-headline text-2xl font-bold text-news-headline mt-10 mb-4">
        {t("article.commentaryTitle")}
      </h2>

      <p>{t("article.commentaryBody")}</p>

      <h2 className="font-headline text-2xl font-bold text-news-headline mt-10 mb-4">
        {t("article.resultsTitle")}
      </h2>

      <p>{t("article.resultsIntro")}</p>

      <h3 className="font-headline text-xl font-bold text-news-headline mt-6 mb-4">
        {t("article.resultsAdvantagesTitle")}
      </h3>

      <ul className="space-y-3 my-6">
        {resultsAdvantages.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="bg-news-sidebar p-6 rounded my-8">
        <h3 className="font-headline text-lg font-bold text-news-headline mb-3">
          {t("article.projectTitle")}
        </h3>
        <p className="text-sm">
          {t("article.projectBody")}
        </p>
      </div>

      <h2 className="font-headline text-2xl font-bold text-news-headline mt-10 mb-4">
        {t("article.howTitle")}
      </h2>

      <ol className="space-y-4 my-6">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              {index + 1}
            </span>
            <span className="pt-1">{step}</span>
          </li>
        ))}
      </ol>

      <h2 className="font-headline text-2xl font-bold text-news-headline mt-10 mb-4">
        {t("article.impactTitle")}
      </h2>

      <p>{t("article.impactBody")}</p>
    </article>
  );
}