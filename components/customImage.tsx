import Image from 'next/image';
import rgbDataURL from '../lib/rgbDataURL';
import { CustomImageProps } from '../types';

export default function CustomImage({ blurColor, ...props}: CustomImageProps) {
  const { alt } = props;

  return <Image
    {...props}
    alt={alt}
    sizes="100vw"
    style={{
      objectFit: 'contain',
    }}
    placeholder='blur'
    blurDataURL={rgbDataURL(blurColor)}
  />
}