import React from 'react';
import style from '@/styles/preferences-setting.module.css';

export default function ThemeAutoBox() {
  return (
    <div className={style.themeAutoContainer}>
      <div className={style.backgroundLightHalf}>
        <span className={style.menuLight}>
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className={style.glowEffect}></span>
          ))}
        </span>
        <div className={style.browserStatusLightHalf}>
          <svg
            width="40"
            height="44"
            viewBox="0 0 40 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className={style.browserGlow} filter="url(#filter0_bdi_12579_54372)">
              <g clip-path="url(#clip0_12579_54372)">
                <rect
                  x="4"
                  width="32"
                  height="32"
                  rx="16"
                  fill="#F8F8F8"
                  fill-opacity="0.01"
                  shape-rendering="crispEdges"
                />
                <g filter="url(#filter1_f_12579_54372)">
                  <rect
                    x="-12"
                    y="-14"
                    width="40"
                    height="40"
                    rx="20"
                    fill="#F8F8F8"
                    fill-opacity="0.2"
                  />
                </g>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_bdi_12579_54372"
                x="-1.9523"
                y="-5.9523"
                width="43.9046"
                height="57.7933"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur
                  in="BackgroundImageFix"
                  stdDeviation="2.97615"
                />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_12579_54372"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="7.93641"
                  operator="erode"
                  in="SourceAlpha"
                  result="effect2_dropShadow_12579_54372"
                />
                <feOffset dy="15.8728" />
                <feGaussianBlur stdDeviation="5.9523" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
                />
                <feBlend
                  mode="multiply"
                  in2="effect1_backgroundBlur_12579_54372"
                  result="effect2_dropShadow_12579_54372"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow_12579_54372"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1.9841" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.972549 0 0 0 0 0.972549 0 0 0 0 0.972549 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect3_innerShadow_12579_54372"
                />
              </filter>
              <filter
                id="filter1_f_12579_54372"
                x="-31.841"
                y="-33.841"
                width="79.682"
                height="79.682"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="9.92051"
                  result="effect1_foregroundBlur_12579_54372"
                />
              </filter>
              <clipPath id="clip0_12579_54372">
                <rect x="4" width="32" height="32" rx="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className={style.backgroundDarkHalf}>
        <div className={style.menuLight}></div>
        <div className={style.browserStatusDarkHalf}>
          <div className={style.tabControlsContainer}>
            <div className={style.leftTab}></div>
            <div className={style.middleTab}></div>
            <div className={style.middleTab}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
