import Image from 'next/image';

//----------------------------------------------------------------------

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={'/svg/logo.svg'}
      width={200}
      height={200}
      alt="logo"
      className={`w-[100px] h-auto ${className}`}
    />
  );
}
