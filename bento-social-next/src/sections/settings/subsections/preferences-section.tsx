import {
  Loader,
  Palette,
  Pictures,
  Play,
  Sun,
  Sunrise,
  TextSize,
} from '@/components/icons';
import { Toggle } from '@/components/toggle';
import { Typography } from '@/components/typography';
import SettingCard from '../components/setting-card';
import ThemeAutoBox from '../components/theme-auto-box';
import ThemeDarkBox from '../components/theme-dark-box';
import ThemeLightBox from '../components/theme-light-box';
import ThemeSelectGroup, {
  ThemeOption,
} from '../components/theme-select-group';

import ColorToggleGroup from '../components/color-toggle-group';
import TextSizeSlider from '../components/TextSizeSlider';
import BrightnessSlider from '../components/BrightnessSlider';
export const PreferencesSection = () => {
  const accentColors = [
    {
      key: 'blue',
      value: '#425DE8',
    },
    {
      key: 'yellow',
      value: '#EDBF64',
    },
    {
      key: 'green',
      value: '#64C089',
    },
    {
      key: 'purple',
      value: '#9B7AF9',
    },
    {
      key: 'pink',
      value: '#F16D8D',
    },
  ];

  return (
    <section className="flex-1 flex flex-col h-full gap-3 overflow-auto no-scrollbar">
      <SettingCard>
        <SettingCard.item className="group flex flex-col items-start gap-4 md:flex-row">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Sunrise />
            <Typography level="base2r" className=" text-secondary mr-auto">
              Appearance
            </Typography>
          </span>
          <ThemeSelectGroup className="w-full justify-center flex gap-2 md:gap-5 md:w-fit">
            <ThemeSelectGroup.item
              value={ThemeOption.light}
              className="w-[96px] h-[72px] bg-slate-200"
              leading={<ThemeLightBox />}
              title="Light"
            />
            <ThemeSelectGroup.item
              value={ThemeOption.dark}
              className="w-[96px] h-[72px] bg-slate-200"
              leading={<ThemeDarkBox />}
              title="Dark"
            />
            <ThemeSelectGroup.item
              value={ThemeOption.auto}
              className="w-[96px] h-[72px] bg-slate-200"
              leading={<ThemeAutoBox />}
              title="Auto"
            />
          </ThemeSelectGroup>
        </SettingCard.item>
        <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Palette />
            <Typography level="base2r" className=" text-secondary">
              Accent color
            </Typography>
          </span>
          <ColorToggleGroup
            colorOptions={accentColors}
            selectedColor={accentColors[0].key}
          />
        </SettingCard.item>
        <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <TextSize />
            <Typography level="base2r" className=" text-secondary">
              Text size
            </Typography>
          </span>
          <TextSizeSlider initialValue={20} />
        </SettingCard.item>

        <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Sun />
            <Typography level="base2r" className=" text-secondary">
              Brighness
            </Typography>
          </span>
          <BrightnessSlider />
        </SettingCard.item>
      </SettingCard>
      <SettingCard>
        <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Loader />
            <Typography level="base2r" className=" text-secondary">
              Reduce motion
            </Typography>
          </span>
          <Toggle />
        </SettingCard.item>
        <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Play />
            <Typography level="base2r" className=" text-secondary">
              Auto play
            </Typography>
          </span>
          <Toggle />
        </SettingCard.item>
        <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Pictures />
            <Typography level="base2r" className=" text-secondary">
              High quality photo
            </Typography>
          </span>
          <Toggle defaultChecked />
        </SettingCard.item>
      </SettingCard>
    </section>
  );
};
