import { Clock, MessageCircle, User } from "lucide-react";

interface ArticleMetaProps {
  author: string;
  role: string;
  publishDate: string;
  publishTime: string;
  commentCount: number;
}

export function ArticleMeta({
  author,
  role,
  publishDate,
  publishTime,
  commentCount,
}: ArticleMetaProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-y border-news-divider mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{author}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>Published today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4" />
          <span>{commentCount}</span>
        </div>
      </div>
    </div>
  );
}