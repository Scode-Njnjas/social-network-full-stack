import { BellIcon, BrowserIcon, EmailIcon, NewsIcon } from '@/components/icons';
import { Toggle } from '@/components/toggle';
import SettingCard from '../components/setting-card';
import NotificationBanner from '../components/notification-banner';

export const NotificationsSection = () => {
  return (
    <section className="flex-1 flex flex-col h-full gap-3 overflow-auto no-scrollbar">
      <NotificationBanner />
      <SettingCard>
        <SettingCard.item>
          <span className="inline-flex gap-3 items-center">
            <EmailIcon />
            <p className="text-secondary font-rubik text-sm opacity-80">
              Email
            </p>
          </span>
          <Toggle defaultChecked />
        </SettingCard.item>
        <SettingCard.item>
          <span className="inline-flex gap-3 items-center">
            {/* TODO: split SVG */}
            <svg
              className="h-6 w-6 stroke-secondary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.75 19.25H14.25M8.75 22.25H15.25C16.9069 22.25 18.25 20.9069 18.25 19.25V4.75C18.25 3.09315 16.9069 1.75 15.25 1.75H8.75C7.09315 1.75 5.75 3.09315 5.75 4.75V19.25C5.75 20.9069 7.09315 22.25 8.75 22.25Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-secondary font-rubik text-sm opacity-80">SMS</p>
          </span>
          <Toggle />
        </SettingCard.item>
        <SettingCard.item>
          <span className="inline-flex gap-3 items-center">
            <BrowserIcon />
            <p className="text-secondary font-rubik text-sm opacity-80">
              Browser
            </p>
          </span>
          <Toggle />
        </SettingCard.item>
      </SettingCard>
      <SettingCard>
        <SettingCard.item>
          <span className="inline-flex gap-3 items-center">
            <NewsIcon />
            <p className="text-secondary font-rubik text-sm opacity-80">
              News ands Programs
            </p>
          </span>
          <Toggle />
        </SettingCard.item>
        <SettingCard.item>
          <span className="inline-flex gap-3 items-center">
            <BellIcon />
            <p className="text-secondary font-rubik text-sm opacity-80">
              Product updates
            </p>
          </span>
          <Toggle />
        </SettingCard.item>
      </SettingCard>
    </section>
  );
};
