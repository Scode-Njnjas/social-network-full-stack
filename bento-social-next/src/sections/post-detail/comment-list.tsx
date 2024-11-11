import React from 'react';

import { Post } from '@/components/post';
import { IChilrenComment, ICommment } from '@/interfaces/comment';

import { cn } from '@/lib/utils';

//--------------------------------------------------------------------------------------------------------

interface commentListProps {
  comments: ICommment[];
  className?: string;
  setParentComment?: (parentComment: { id: string; fullname: string }) => void;
}

export default function CommentList({
  comments,
  className,
  setParentComment,
}: commentListProps) {
  return (
    <>
      {comments?.length > 0 && (
        <ul className={cn(`w-full overflow-y-auto mt-2`, className)}>
          {comments.map((comment: ICommment) => (
            <li key={comment.id} className="mb-2">
              {comment.children.length === 0 ? (
                <Post
                  data={comment}
                  className="bg-neutral2-2"
                  setParentComment={setParentComment}
                />
              ) : (
                <ul className="rounded-[1.25rem] hover:bg-neutral2-3">
                  <li>
                    <Post
                      className='rounded-bl-none rounded-br-none after:content-[""] after:absolute after:top-[64px] after:left-[33.5px] after:bottom-0 after:w-[1.5px] after:bg-neutral2-10 bg-none hover:bg-neutral2-2'
                      data={comment}
                    />
                  </li>
                  {comment.children?.map(
                    (reply: IChilrenComment, index: number) => (
                      <li key={reply.id} className=" ">
                        <Post
                          className={`rounded-none ${
                            index === (comment.children?.length ?? 0) - 1
                              ? 'rounded-tl-none rounded-tr-none rounded-bl-[1.25rem] rounded-br-[1.25rem]'
                              : 'after:content-[""] after:absolute after:top-[64px] after:left-[33.5px] after:bottom-0 after:w-[1.5px] after:bg-neutral2-10 bg-none '
                          }`}
                          data={reply}
                        />
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
