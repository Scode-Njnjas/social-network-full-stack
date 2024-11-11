/* eslint-disable @typescript-eslint/no-explicit-any */
import { _conversations as fakeConversation } from '@/_mocks/_conversation';

import { AddIcon } from '@/components/icons';
import { Button } from '@/components/button';

import ConversationItem from './conversation-item';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/alert-dialog';

//----------------------------------------------------------------------
interface ConversationSidebarProps {
  onConversationClick: (id: any) => void;
}

export default function ConversationSidebar({
  onConversationClick,
}: ConversationSidebarProps) {
  return (
    <section className="relative w-full min-h-screen lg:min-h-full bg-surface-2 flex flex-col gap-3 p-3 lg:max-w-[20rem] lg:min-w-[20rem] xl:max-w-[25rem] xl:min-w-[25rem]">
      <div className="w-full flex justify-start items-center gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="p-2.5" child={<AddIcon />} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>200Lab</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Hiện tại tính năng này chưa được hỗ trợ
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Đóng</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="w-full max-h-full flex flex-col gap-2 overflow-y-auto">
        {fakeConversation.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            isReaded={false}
            conversation={conversation}
            onClick={() => onConversationClick(conversation.id)}
          />
        ))}
      </div>
    </section>
  );
}
