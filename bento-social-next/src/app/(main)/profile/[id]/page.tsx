import React from 'react';
import { ProfileUserView } from '@/sections/profile/view';

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <ProfileUserView userId={id} />;
}
