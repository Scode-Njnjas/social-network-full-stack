import React from 'react';

import { PostDetailView } from '@/sections/post-detail/view';

//------------------------------------------------------------------------------------------------

export default function PostDetail({ params }: { params: { id: string } }) {
  return <PostDetailView id={params.id} />;
}
