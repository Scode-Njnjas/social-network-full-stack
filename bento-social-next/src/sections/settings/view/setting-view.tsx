'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { AppBar } from '@/components/appbar';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { ChevronDownSmall, Eye, NotificationIcon } from '@/components/icons';
import ArrowBack from '@/components/icons/arrow-back';
import ListTile from '@/components/list-tile/list-tile';
import SearchInput from '@/components/search-input/search-input';
import { Typography } from '@/components/typography';

import { useUserProfile } from '@/context/user-context';
import useBreakPoint from '@/hooks/use-breakpoint';
import { paths } from '@/routes/paths';

import { USER_AVATAR_PLACEHOLDER } from '@/constant/contants';
import { AccountsSection } from '../subsections/account-section';
import { NotificationsSection } from '../subsections/notification-section';
import { PreferencesSection } from '../subsections/preferences-section';

//-----------------------------------------------------------------------------------------------

type Setting = {
  key: string;
  label: string;
  icon: JSX.Element;
  content?: {
    title: string;
    subtile: string;
    status: string;
    avatarUrl: string;
  };
};

const SETTINGS: Setting[] = [
  {
    key: 'account-settings',
    label: 'Account Settings',
    icon: <></>,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: <NotificationIcon />,
  },
  {
    key: 'preferences',
    label: 'Preferences',
    icon: <Eye />,
  },
];

const SettingsView = () => {
  const { breakpoint } = useBreakPoint();
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentView = searchParams?.get('view');

  const { userProfile } = useUserProfile();

  const currentUser = userProfile && {
    fullname: `${userProfile.firstName} ${userProfile.lastName}`,
    nickname: userProfile.username,
    avatar: userProfile.avatar || USER_AVATAR_PLACEHOLDER,
    isActive: userProfile.status === 'active',
  };

  const isLargeScreen =
    breakpoint === 'lg' ||
    breakpoint === 'xl' ||
    breakpoint === '2xl' ||
    breakpoint === '3xl';

  const SettingsSection = {
    'account-settings': <AccountsSection />,
    notifications: <NotificationsSection />,
    preferences: <PreferencesSection />,
    notfound: (
      <section className="h-full w-full flex items-center justify-center text-tertiary text-base2 font-semibold">
        Not Found
      </section>
    ),
  };

  const settings = SETTINGS.filter(
    (setting) => setting.key !== 'account-settings'
  );

  const settingLabel =
    SETTINGS.find((setting) => setting.key === currentView)?.label ||
    'Settings';

  const showView = () => {
    switch (currentView) {
      case 'account-settings':
        return SettingsSection['account-settings'];
      case 'notifications':
        return SettingsSection.notifications;
      case 'preferences':
        return SettingsSection.preferences;
      case null:
        return <></>;
      default:
        return SettingsSection.notfound;
    }
  };

  return (
    <div className="h-screen w-full flex relative">
      <div className="grow lg:max-w-[316px] 2xl:max-w-[376px] transition-[max-width] h-full bg-surface-2 p-3 flex flex-col gap-3">
        <section
          id="settings-appbar"
          className="flex items-center justify-between gap-2 w-full min-h-11"
        >
          <Button
            onClick={() => {
              router.back();
            }}
            className="group size-[40px]"
            child={
              <ArrowBack className="h-6 w-6 stroke-secondary group-hover:stroke-primary group-active:stroke-primary group-[.disabled]:stroke-tertiary" />
            }
          />
          <SearchInput placeholder="Search settings" />
        </section>
        <ul className="h-full flex-1 flex flex-col gap-2 overflow-auto no-scrollbar">
          {currentUser && (
            <ListTile
              key="account-settings"
              active={'account-settings' === currentView}
              onClick={() =>
                router.replace(`${paths.settings}?view=${'account-settings'}`)
              }
            >
              <Avatar src={currentUser.avatar} alt={currentUser.nickname} />
              <div className="flex-1 flex flex-col items-start">
                <Typography
                  level="baser"
                  className="font-medium text-secondary"
                >
                  {currentUser.fullname}
                </Typography>
                <Typography
                  level="baser"
                  className="font-medium text-xs text-tertiary"
                >
                  @{currentUser.nickname}
                </Typography>
              </div>
              <span
                className={`${'account-settings' === currentView && 'bg-neutral1-5 rounded-full -rotate-90 '} transition-all p-1.5 flex items-center justify-center`}
              >
                <ChevronDownSmall />
              </span>
            </ListTile>
          )}
          {settings.map((setting) => {
            const isActive = currentView === setting.key;
            return (
              <ListTile
                active={isActive}
                onClick={() =>
                  router.replace(`${paths.settings}?view=${setting.key}`)
                }
                key={setting.key}
              >
                <span className="h-11 w-11 p-2.5 rounded-full bg-neutral2-5">
                  {setting.icon}
                </span>
                <Typography
                  level="baser"
                  className="font-medium text-secondary flex-1"
                >
                  {setting.label}
                </Typography>
                <span
                  className={`${isActive && 'bg-neutral1-5 rounded-full -rotate-90 '} transition-all p-1.5 flex items-center justify-center`}
                >
                  <ChevronDownSmall />
                </span>
              </ListTile>
            );
          })}
        </ul>
      </div>
      {isLargeScreen && (
        <div className="flex-1 h-full bg-surface p-3 flex flex-col gap-3">
          <AppBar
            title={settingLabel}
            trailing={
              <Button
                className="py-3 px-6 group"
                child={
                  <Typography
                    level="base2sm"
                    className=" text-secondary group-hover:text-primary"
                  >
                    Save
                  </Typography>
                }
              />
            }
          />
          {showView()}
        </div>
      )}

      <section
        className={`fixed z-99 inset-0 h-screen p-3 flex flex-col gap-3 bg-background transition-all ${currentView && !isLargeScreen ? ' opacity-100 translate-x-0 ' : ' opacity-0 translate-x-full '}  before:fixed before:inset-0 before:bg-[#313131]`}
      >
        <AppBar
          className="z-1"
          title={settingLabel}
          leading={
            <Button
              onClick={() => router.replace(paths.settings)}
              className="group size-[44px]"
              child={
                <ArrowBack className=" stroke-secondary group-hover:stroke-primary group-active:stroke-primary group-[.disabled]:stroke-tertiary" />
              }
            />
          }
          trailing={
            <Button
              className="py-3 px-6 group"
              child={
                <Typography
                  level="base2sm"
                  className=" text-secondary group-hover:text-primary"
                >
                  Save
                </Typography>
              }
            />
          }
        />
        {showView()}
      </section>
    </div>
  );
};

export default SettingsView;
