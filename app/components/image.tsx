type ImageComponentProps = {
  src: string;
  alt: string;
  className?: string;
  height?: number;
  width?: number;
};

export default function Image({
  src,
  alt,
  className,
  height,
  width,
}: ImageComponentProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      height={height}
      width={width}
      loading="lazy"
      decoding="async"
    />
  );
}
