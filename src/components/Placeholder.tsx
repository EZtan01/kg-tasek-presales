import { useState, type CSSProperties } from "react";
import { ImageIcon } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  label?: string;
};

// Renders an image — if it fails (file not in /public/photos yet), falls back
// to a diagonal-striped placeholder box. Lets us ship before photos arrive.
export function PhotoOrPlaceholder({
  src,
  alt,
  className = "",
  imgClassName = "",
  style,
  label,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`placeholder-stripes flex items-center justify-center border border-kg-border ${className}`}
        style={style}
        aria-label={alt}
        role="img"
      >
        <div className="flex flex-col items-center gap-2 text-kg-dim">
          <ImageIcon className="w-6 h-6" />
          <span className="text-xs font-mont uppercase tracking-wider">
            {label ?? src.split("/").pop()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={imgClassName}
      style={style}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}
