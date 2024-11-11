import React from 'react';
import Image from 'next/image';

import SettingCard from './setting-card';

//-----------------------------------------------------------------------------------------------

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }
  return (
    <SettingCard className="relative flex-row p-4 gap-5">
      <span className="absolute top-2 right-2">
        <button
          onClick={handleClose}
          className="relative z-0 cursor-pointer before:content-[''] before:absolute before:inset-0 before:z-1 before:opacity-25 before:bg-linear-card before:rounded-[20px] after:content-[''] after:absolute after:inset-[1px] after:z-1 after:bg-[#313131] after:rounded-[19px] after:backdrop-blur-16"
        >
          <div className="p-1.5 rounded-full relative z-9 bg-neutral3-50">
            {/* TODO: split SVG */}
            <svg
              className="h-3 w-3 stroke-secondary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
              fill="none"
            >
              <g opacity="0.8">
                <path
                  d="M2.375 2.375L9.625 9.625M9.625 2.375L2.375 9.625"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </button>
      </span>
      <Image
        src="/img/laptop.png"
        alt="banner"
        className="w-[104px] h-[90px]"
        width={104}
        height={90}
      />
      <div className="flex-1 flex-col flex mr-6 gap-3">
        <span className="gap-1 flex flex-col">
          <p className="base2-m opacity-80 text-primary self-stretch">
            Browser notifications are off.
          </p>
          <p className="caption text-tertiary self-stretch">
            Turn on notifications to get notified of new responses on your
            device.
          </p>
        </span>
        <p className="font-rubik text-caption underline text-primary">
          Turn on now
        </p>
      </div>
    </SettingCard>
  );
};

export default NotificationBanner;
