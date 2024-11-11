import React from 'react';
import { uploadImage } from '@/apis/media';
import { updateUserProfile } from '@/apis/user';
import { useUserProfile } from '@/context/user-context';
import { IUserProfile } from '@/interfaces/user';

import { CameraIcon } from '../icons';
import { USER_AVATAR_PLACEHOLDER } from '@/constant';
import Avatar from './avatar';
import AvatarUpdateDialog from './avatar-profile-dialog';

//-------------------------------------------------------------------------

interface AvatarProfileProps {
  avatar?: string;
  canEdit: boolean;
}
const AvatarProfile = ({ avatar, canEdit }: AvatarProfileProps) => {
  const { setUserProfile, userProfile } = useUserProfile();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleUpdateAvatar = async (file: File) => {
    if (file) {
      try {
        if (!file.type.startsWith('image/')) {
          throw new Error('File type is not supported');
        }

        if (file.size > 512 * 1024) {
          throw new Error('File size is too large');
        }

        const response = await uploadImage(file);
        const newAvatarUrl = response.data.url;

        await updateUserProfile({ avatar: newAvatarUrl });

        setUserProfile({
          ...userProfile,
          avatar: newAvatarUrl,
        } as IUserProfile);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <>
      <div
        className={`w-fit absolute flex justify-center items-center left-[20px] -bottom-[36px] z-1 rounded-full border-[4px] border-[#303030] overflow-hidden ${canEdit && 'after:content-[""] after:absolute after:bg-[#12121299] after:inset-0'}`}
      >
        <Avatar size={80} src={avatar} alt="Avatar" />

        {canEdit && (
          <button
            className="absolute z-[2]"
            onClick={() => setIsDialogOpen(true)}
          >
            <CameraIcon />
          </button>
        )}
      </div>

      <AvatarUpdateDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onUpdateAvatar={handleUpdateAvatar}
        currentAvatar={avatar || USER_AVATAR_PLACEHOLDER}
        type='avatar'
      />
    </>
  );
};

export default AvatarProfile;
