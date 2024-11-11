/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { _conversations as fakeConversation } from '@/_mocks/_conversation';

import { Avatar } from '@/components/avatar';
import { CloseIcon, MoreIcon } from '@/components/icons';
import { Typography } from '@/components/typography';
import { Button } from '@/components/button';
import { ChatInput, MessageItem } from '../components';

//----------------------------------------------------------------------
interface ConversationDetailPageProps {
  id: string;
}

export default function ConversationDetailPage({
  id,
}: ConversationDetailPageProps) {
  const router = useRouter();

  // Chuyển đổi `id` sang kiểu số và tìm kiếm cuộc trò chuyện
  const conversationId = Number(id);
  const conversation = fakeConversation.find(
    (item: any) => item.id === conversationId
  );

  if (!conversation) return <p>Conversation not found</p>;

  const handleBack = () => {
    router.push('/messages');
  };

  return (
    <section className="block md:hidden w-full h-full flex-col bg-surface lg:flex">
      <section
        id="conversation-header"
        className="w-full flex items-center gap-4 py-3 pr-6 pl-3"
      >
        <Avatar src={conversation.user.avatarUrl} alt="avatar" />

        <Typography level="base2m" className="text-primary grow">
          {conversation.user.name}
        </Typography>

        <Button className="p-2.5" child={<MoreIcon />} />

        <Button
          onClick={handleBack}
          className="p-2.5 lg:hidden"
          child={<CloseIcon />}
        />
      </section>

      <section
        id="chat-container"
        className="flex flex-col gap-2 h-[calc(100vh-150px)] overflow-y-auto items-center justify-start p-3"
      >
        {conversation.messages?.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
      </section>

      <ChatInput />
    </section>
  );
}
