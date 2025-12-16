interface VideoPlaceholderProps {
  imageUrl?: string;
  caption?: string;
}

export function VideoPlaceholder({ imageUrl, caption }: VideoPlaceholderProps) {
  return (
    <figure className="my-6 max-w-4xl mx-auto">
      <div className="relative aspect-video bg-muted rounded-sm overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Article illustration" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-accent flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Image placeholder</p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="text-xs text-muted-foreground mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
