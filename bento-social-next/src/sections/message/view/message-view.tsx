'use client';
import React from 'react';

import useBreakPoint from '@/hooks/use-breakpoint';

import { ConversationSidebar } from '../components';
import EmptyContent from '@/components/empty-content/empty-content';
import { Typography } from '@/components/typography';

import ConversationDetailPage from './conversation-detail-view';

//-----------------------------------------------------------------------------------------------

export default function Message() {
  const { breakpoint } = useBreakPoint();
  const [showDetailOnly, setShowDetailOnly] = React.useState(false);
  const [selectedConversationId, setSelectedConversationId] = React.useState<
    string | null
  >(null);

  const isMobile = breakpoint === 'sm';
  const hideConsolidation = breakpoint === 'sm' || breakpoint === 'md';

  const handleConversationClick = (id: string) => {
    if (isMobile) {
      setShowDetailOnly(true);
    }
    setSelectedConversationId(id);
  };

  return (
    <section className="w-full h-full flex flex-col justify-start transition-all duration-[0.5s] lg:flex-row lg:items-start">
      {!isMobile || !showDetailOnly ? (
        <ConversationSidebar onConversationClick={handleConversationClick} />
      ) : null}

      {!hideConsolidation ? (
        <section className="bg-surface h-screen w-full grow flex flex-col justify-center items-center gap-3 py-[1.75rem]">
          {selectedConversationId ? (
            <ConversationDetailPage id={selectedConversationId} />
          ) : (
            <EmptyContent
              content={
                <Typography level="base2sm" className="text-secondary">
                  Select conversation to start messaging
                </Typography>
              }
              image="/svg/ai_data_consolidation.svg"
            />
          )}
        </section>
      ) : selectedConversationId ? (
        <ConversationDetailPage id={selectedConversationId} />
      ) : null}
    </section>
  );
}
