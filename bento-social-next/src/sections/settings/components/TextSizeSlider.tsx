import { Typography } from '@/components/typography';
import React, { useState } from 'react';
import style from "@/styles/preferences-setting.module.css";
interface TextSizeSliderProps {
  minValue?: number;  // Minimum font size
  maxValue?: number;  // Maximum font size
  initialValue?: number;  // Initial font size
}

const TextSizeSlider: React.FC<TextSizeSliderProps> = ({
  minValue = 12,
  maxValue = 36,
  initialValue = 16,
}) => {
  const [textSize, setTextSize] = useState(initialValue);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextSize(Number(event.target.value));
  };

  return (
    <div className={`${style.textSizeSlider} flex gap-1 items-center`} style={{ width: '168px' }}>
        <Typography level="captionr" className=" text-tertiary">A</Typography>
      <input
        id="text-size-slider"
        type="range"
        min={minValue}
        max={maxValue}
        value={textSize}
        onChange={handleSliderChange}
      />
        <Typography level="base2r" className=" text-tertiary">A</Typography>

    </div>
  );
};

export default TextSizeSlider;
