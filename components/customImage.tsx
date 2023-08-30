import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

export default function CustomImage({ ...props}: ImageProps) {
  const { src, alt, title, width, height } = props;
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setShowImage(false);
  }, [src]);

  return <Image
    src={src}
    alt={alt}
    title={title}
    width={width}
    height={height}
    sizes="100vw"
    style={{
      objectFit: 'contain',
      visibility: showImage ? 'visible' : 'hidden',
    }}
    onLoadingComplete={() => {setShowImage(true);}}
  />
}