import { CameraIcon, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/alert-dialog';
import { Button } from '@/components/button';
import { Typography } from '../typography';

//-------------------------------------------------------------------------

interface AvatarUpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateAvatar: (file: File) => Promise<void>;
  currentAvatar: string;
  type: 'avatar' | 'cover';
}

const AvatarUpdateDialog: React.FC<AvatarUpdateDialogProps> = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  currentAvatar,
  type,
}) => {
  const [previewUrl, setPreviewUrl] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      await onUpdateAvatar(selectedFile);
      setPreviewUrl('');
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Update Profile Picture</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          <div className={`relative overflow-hidden bg-neutral2-5 ${type === 'avatar' ? 'w-40 h-40 rounded-full' : 'w-full h-40 rounded-md'}`}>
            <Image
              src={previewUrl || currentAvatar}
              alt="Avatar preview"
              fill
              className="object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
            >
              <CameraIcon className="w-8 h-8 text-white" />
            </label>
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </div>

          <div className="text-center text-sm text-tertiary">
            {previewUrl ? (
              <p>Click the image to choose a different photo</p>
            ) : (
              <p>Click the image to choose a photo</p>
            )}
          </div>
        </div>

        <AlertDialogFooter>
          <Button
            onClick={onClose}
            className="w-full sm:w-auto"
            child={
              <Typography level="base2sm" className="p-3 text-tertiary">
                Cancel
              </Typography>
            }
          />

          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="w-full sm:w-auto"
            child={
              isUploading ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <Typography level="base2sm" className="p-3 text-tertiary">
                  Save
                </Typography>
              )
            }
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AvatarUpdateDialog;
