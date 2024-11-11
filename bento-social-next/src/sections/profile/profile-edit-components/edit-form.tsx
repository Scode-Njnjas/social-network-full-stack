import React from 'react';

import { IUserProfile } from '@/interfaces/user';

import {
  AvatarIcon,
  EditIcon,
  LinkIcon,
  OutlineCheckIcon,
  SolidCheckIcon,
  TagIcon,
} from '@/components/icons';
import { DebouncedInput } from '@/components/input';
import { Typography } from '@/components/typography';

//----------------------------------------------------------------

interface EditFormProps {
  userInfo: IUserProfile;
  onUpdateProfile: (updatedData: Partial<IUserProfile>) => void;
  loading: boolean;
}

export default function EditForm({
  userInfo,
  onUpdateProfile,
  loading,
}: EditFormProps) {
  const [profileData, setProfileData] = React.useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    username: userInfo.username,
    bio: userInfo.bio,
    websiteUrl: userInfo.websiteUrl,
  });

  const handleChange = (name: keyof IUserProfile, value: string) => {
    setProfileData((prev) => ({ ...prev, [name]: value }));
    onUpdateProfile({ [name]: value });
  };

  return (
    <section className="w-full h-full mt-[2rem] p-3">
      <div className="flex flex-col rounded-[2rem] bg-neutral2-2">
        <div className="w-full px-4 py-3">
          <Typography
            level="hairline1"
            className="text-tertiary uppercase opacity-50"
          >
            edit profile
          </Typography>
        </div>

        <ul className="w-full">
          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Typography
              level="base2r"
              className="text-secondary opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <AvatarIcon />
              First Name
            </Typography>
            <div className="w-full flex justify-between items-center">
              <DebouncedInput
                name="firstName"
                onChange={(value) => handleChange('firstName', value)}
                type="text"
                className="grow text-primary text-sm opacity-80"
                value={profileData.firstName}
              />
              <SolidCheckIcon />
            </div>
          </li>

          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Typography
              level="base2r"
              className="text-secondary opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <AvatarIcon />
              Last Name
            </Typography>
            <div className="w-full flex justify-between items-center">
              <DebouncedInput
                name="lastName"
                onChange={(value) => handleChange('lastName', value)}
                type="text"
                className="grow text-primary text-sm opacity-80"
                value={profileData.lastName}
              />
              <SolidCheckIcon />
            </div>
          </li>

          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Typography
              level="base2r"
              className="text-secondary opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <TagIcon />
              Username
            </Typography>
            <div className="w-full flex justify-between items-center">
              <DebouncedInput
                name="username"
                onChange={(value) => handleChange('username', value)}
                type="text"
                className="grow text-primary text-sm opacity-80"
                value={profileData.username}
              />
              <OutlineCheckIcon />
            </div>
          </li>

          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-start md:gap-3">
            <Typography
              level="base2r"
              className="text-secondary opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <EditIcon />
              Bio
            </Typography>
            <textarea
              name="bio"
              onChange={(e) => handleChange('bio', e.target.value)}
              className="grow min-h-[8.75rem] max-h-[8.75rem] bg-transparent focus:outline-none text-primary text-sm opacity-80"
              value={profileData.bio}
              placeholder="Write something about yourself..."
            />
          </li>

          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Typography
              level="base2r"
              className="text-secondary opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <LinkIcon />
              Link
            </Typography>
            <div className="w-full flex justify-between items-center">
              <DebouncedInput
                name="websiteUrl"
                onChange={(value) => handleChange('websiteUrl', value)}
                type="text"
                className="grow text-primary text-sm opacity-80"
                value={profileData.websiteUrl || ''}
                placeholder="https://example.com"
              />
              <OutlineCheckIcon />
            </div>
          </li>
        </ul>
        {loading && <p>Updating...</p>}
      </div>
    </section>
  );
}
