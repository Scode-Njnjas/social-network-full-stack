'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useUserProfile } from '@/context/user-context';
import { IUserProfile } from '@/interfaces/user';

import AvatarProfile from '@/components/avatar/avatar-profile';
import { Button } from '@/components/button';
import {
  CheckIcon,
  CommentIcon,
  EditIcon,
  LinkIcon,
  ProfileIcon,
  ShareIcon,
} from '@/components/icons';
import { SplashScreen } from '@/components/loading-screen';
import { Typography } from '@/components/typography';

import { USER_AVATAR_PLACEHOLDER } from '@/constant';
import { followUser, hasFollowed, unfollowUser } from '@/apis/user';

//-------------------------------------------------------------------------

interface UserInfoProps {
  user: IUserProfile;
}

export default function InfoUser({ user }: UserInfoProps) {
  const { userProfile, loading } = useUserProfile();
  const [isFollowed, setIsFollowed] = React.useState<boolean>(false);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setIsFollowed(await hasFollowed(user.id));
    })();
  }, [user]);

  const handleFollow = () => {
    if (isFollowed) {
      unfollowUser(user.id);
      setIsFollowed(false);
    } else {
      followUser(user.id);
      setIsFollowed(true);
    }
  };

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/profile/${user.id}`;
    try {
      await navigator.clipboard.writeText(profileUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  if (loading) return <SplashScreen />;

  return (
    <>
      <div className="w-full relative z-[2]">
        <Image
          width={1280}
          height={180}
          src={user.cover ? user.cover : '/img/default-cover.jpg'}
          className="max-h-[11.25rem] w-full object-cover"
          alt="cover"
        />
        <AvatarProfile
          avatar={user.avatar || USER_AVATAR_PLACEHOLDER}
          canEdit={false}
        />
      </div>

      <div className="w-full flex flex-col gap-[1.25rem] p-6 mt-6 relative z-[2] ">
        <div
          id="profile-info-header"
          className="flex items-center gap-[0.4375rem]"
        >
          <div className="grow opacity-80">
            <Typography level="title" className="text-primary">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography level="base2r" className="text-tertiary">
              @{user.username}
            </Typography>
          </div>

          <Button
            child={
              isCopied ? <CheckIcon /> : <ShareIcon width={24} height={24} />
            }
            className="p-2.5"
            onClick={handleShare}
          />

          {user.id !== userProfile?.id && (
            <Button
              child={
                <Typography level="base2r" className="text-tertiary">
                  {isFollowed ? 'Unfollow' : 'Follow'}
                </Typography>
              }
              className="p-2.5"
              onClick={handleFollow}
            />
          )}

          {user.id === userProfile?.id && (
            <>
              <Link href={`/profile/${user.id}/edit`}>
                <Button child={<EditIcon />} className="p-2.5 md:hidden" />
                <Button
                  child={
                    <Typography level="base2sm" className="text-secondary">
                      Edit profile
                    </Typography>
                  }
                  className="hidden md:block px-5 py-2"
                />
              </Link>
            </>
          )}
        </div>
        <Typography level="body2r" className="text-tertiary opacity-80">
          {user.bio}
        </Typography>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-sm base opacity-80 cursor-pointer rounded-button px-3 py-2 hover:bg-neutral2-5">
              <CommentIcon />

              <Typography
                level="base2r"
                className="text-primary flex items-center gap-2"
              >
                {user.postCount}
                <Typography level="base2r" className="text-tertiary">
                  posts
                </Typography>
              </Typography>
            </div>

            <Link href={`/profile/${user.id}/followers`}>
              <div className="flex items-center gap-2 text-sm base opacity-80 cursor-pointer rounded-button px-3 py-2 hover:bg-neutral2-5">
                <ProfileIcon />
                <Typography
                  level="base2r"
                  className="text-primary flex items-center gap-2"
                >
                  {user.followerCount}
                  <Typography level="base2r" className="text-tertiary">
                    followers
                  </Typography>
                </Typography>
              </div>
            </Link>
          </div>

          {user.websiteUrl && (
            <div className="flex items-center gap-2 text-sm base opacity-80 cursor-pointer rounded-button px-3 py-2 hover:bg-neutral2-5">
              <LinkIcon />
              <a href={user.websiteUrl}>
                <Typography
                  level="base2r"
                  className="text-primary flex items-center gap-2"
                >
                  {user.websiteUrl}
                </Typography>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
