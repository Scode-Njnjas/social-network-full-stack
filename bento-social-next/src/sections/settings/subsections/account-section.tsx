// import Image from 'next/image';
import React from 'react';

import { updateUserProfile } from '@/apis/user';
import { useUserProfile } from '@/context/user-context';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/alert-dialog';
import {
  EmailIcon,
  LockIcon,
  ProtectionIcon,
  QRCodeIcon,
  TrashIcon,
  TunerIcon,
} from '@/components/icons';
import Bubble from '@/components/icons/bubble';
import Bubbles1 from '@/components/icons/bubbles1';
import Bubbles2 from '@/components/icons/bubbles2';
import Ring1 from '@/components/icons/ring1';
import Ring2 from '@/components/icons/ring2';
import Ring3 from '@/components/icons/ring3';
import { Typography } from '@/components/typography';

import SettingCard from '../components/setting-card';

import { USER_AVATAR_PLACEHOLDER } from '@/constant/contants';
import { Avatar } from '@/components/avatar';

//-----------------------------------------------------------------------------------------------

export const AccountsSection = () => {
  const { userProfile } = useUserProfile();
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSavePassword = async () => {
    if (!password) return;

    setLoading(true);
    try {
      await updateUserProfile({ password });
      setPassword('');
    } catch (error) {
      console.error('Failed to update password', error);
      alert('Failed to update password');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex-1 flex flex-col h-full gap-3 overflow-auto no-scrollbar">
      <SettingCard className="p-8 gap-7 flex flex-col h-[256px]  items-center justify-center">
        <div className="inline-block relative rounded-full bg-green-200 z-20">
          <Avatar
            size={64}
            src={userProfile?.avatar || USER_AVATAR_PLACEHOLDER}
            alt="Avatar"
            className="z-10 relative"
          />
          <Bubble className="absolute inset-0 right-0 transform -translate-x-1 -translate-y-1" />
          <Bubbles1 className="absolute inset-0 right-0 transform -translate-x-4 translate-y-6" />
          <Bubbles2 className="absolute inset-0 right-0 transform -translate-x-10 -translate-y-10 " />
          <Ring1 className="absolute inset-0 right-0 transform -translate-x-7 -translate-y-7 z-9 " />
          <Ring2 className="absolute inset-0 right-0 transform -translate-x-[50px] -translate-y-12 z-1 " />
          <Ring3 className="absolute inset-0 right-0 transform -translate-x-[70px] -translate-y-12" />
        </div>
        <span className="flex flex-col items-center gap-2">
          <p className="font-rubik font-medium text-title text-primary self-center">
            {userProfile
              ? `${userProfile.firstName} ${userProfile.lastName}`
              : 'User'}
          </p>
          <p className="text-tertiary opacity-80">
            {`@${userProfile?.username}` || '@username'}
          </p>
        </span>
      </SettingCard>
      <SettingCard settingLabel="Account Settings">
        <SettingCard.item className="relative items-center justify-start gap-3 after:absolute after:right-4 after:content-['Change_settings']  after:hidden after:text-sm after:text-secondary after:opacity-80 hover:after:block">
          <EmailIcon />

          <span className="inline-flex gap-2 items-center">
            <Typography level="base2r" className="text-secondary opacity-80">
              Email
            </Typography>
            <Typography level="base2r" className="text-tertiary opacity-80">
              {userProfile?.username}@gmail.com
            </Typography>
          </span>
        </SettingCard.item>

        <SettingCard.item className="group/item">
          <span className="inline-flex gap-3 items-center">
            <LockIcon />
            <Typography level="base2r" className="text-secondary opacity-80">
              Password
            </Typography>
          </span>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Typography
                level="base2m"
                className="cursor-pointer text-secondary font-rubik text-sm opacity-80 group-hover/item:opacity-100"
              >
                Change Password
              </Typography>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Change Password?</AlertDialogTitle>
                <AlertDialogDescription>
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full p-3 border border-neutral-400 rounded-[10px] mb-4 focus:outline-none "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-red-500 text-white hover:bg-red-600">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSavePassword}
                  disabled={loading}
                >
                  Change
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SettingCard.item>

        <SettingCard.item>
          <span className="inline-flex gap-3 items-center">
            <QRCodeIcon />
            <Typography level="base2r" className="text-secondary opacity-80">
              2FA
            </Typography>
          </span>
          <label className="switch inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer"></input>
            <div className="relative w-11 h-6 p-1 bg-neutral2-5 rounded-full peer peer-checked:after:translate-x-[20px] rtl:peer-checked:after:-translate-x-[20px]  after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-neutral2-30 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral3-50 peer-checked:after:bg-linear-object"></div>
          </label>
        </SettingCard.item>
        <SettingCard.item>
          <span className="inline-flex gap-3 items-center">
            <TrashIcon />
            <Typography
              level="base2r"
              className=" text-sm text-secondary opacity-80"
            >
              Delete account
            </Typography>
          </span>
        </SettingCard.item>
      </SettingCard>
      <SettingCard settingLabel="Privacy">
        <div className="flex w-full p-4 border-t border-t-neutral2-2 hover:bg-neutral2-2 items-center justify-between">
          <span className="inline-flex gap-3 items-center">
            <LockIcon />
            <Typography
              level="base2r"
              className=" text-sm text-secondary opacity-80"
            >
              Private profile
            </Typography>
          </span>
          <label className="switch inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 p-1 bg-neutral2-5 rounded-full peer peer-checked:after:translate-x-[20px] rtl:peer-checked:after:-translate-x-[20px]  after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-neutral2-30 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral3-50 peer-checked:after:bg-linear-object"></div>
          </label>
        </div>
        <div className="flex w-full p-4 border-t border-t-neutral2-2  hover:bg-neutral2-2 justify-between items-center group/item">
          <span className="inline-flex gap-3 items-center">
            <ProtectionIcon />
            <Typography
              level="base2r"
              className=" text-sm text-secondary opacity-80"
            >
              Cookie settings
            </Typography>
          </span>
          <span className="flex gap-1 opacity-80 items-center">
            <Typography
              level="base2r"
              className=" text-sm text-secondary opacity-80"
            >
              Customize
            </Typography>

            <TunerIcon />
          </span>
        </div>
        <div className="flex w-full p-4 border-t border-t-neutral2-2  hover:bg-neutral2-2 justify-between items-center group/item">
          <span className="inline-flex gap-3 items-center">
            <ProtectionIcon />
            <Typography
              level="base2r"
              className=" text-sm text-secondary opacity-80"
            >
              Direct messages
            </Typography>
          </span>
          <span className="flex gap-1 opacity-80 items-center">
            <Typography
              level="baser"
              className=" text-sm text-secondary opacity-80"
            >
              Everyone
            </Typography>

            <TunerIcon />
          </span>
        </div>
      </SettingCard>
    </section>
  );
};
