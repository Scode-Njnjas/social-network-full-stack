import React from 'react';

import { Typography } from '@/components/typography';

//-----------------------------------------------------------------------------------------------

interface BrightnessSliderProps {
  width?: number;
  height?: number;
  initialValue?: number;
}

const BrightnessSlider: React.FC<BrightnessSliderProps> = ({
  width = 168,
  height = 32,
  initialValue = 0,
}) => {
  const [brightness, setBrightness] = React.useState(initialValue);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newBrightness = Math.max(
      1,
      Math.min(100, Math.round((offsetX / width) * 100))
    );
    setBrightness(newBrightness);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleSliderChange(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSliderChange(e);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      className="relative"
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Slider Track */}
      <div
        className="w-full h-full bg-gray-200 rounded-xl overflow-hidden"
        style={{
          position: 'relative',
          background: `linear-gradient(to right, #F8F8F81A ${brightness}%, #F8F8F80D ${brightness}%)`,
        }}
      />

      {/* Floating Percentage Indicator */}
      <span className="absolute left-7 top-0 bottom-0 inline-flex justify-start items-center transform -translate-x-1/2 text-sm font-semibold ">
        <Typography level="captionsm" className=" text-primary">
          {brightness}%
        </Typography>
      </span>
    </div>
  );
};

export default BrightnessSlider;
