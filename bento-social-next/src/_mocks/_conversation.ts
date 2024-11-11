interface IConversation {
  id: number;
  user: {
    avatarUrl: string;
    name: string;
  };
  content: string;
  messages?: IMessage[];
}

interface IMessage {
  user: {
    avatarUrl: string;
    name: string;
  };
  content: string;
  time: string;
  imageUrl?: string;
}

const messages = [
  {
    user: {
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      name: 'Apple hi',
    },
    content: 'Hello, how can I help you today?',
    time: '8:30 AM',
    imageUrl: 'https://i.pravatar.cc/600?img=2',
  },
  {
    user: {
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
      name: 'Samsung',
    },
    content: 'Hello, how can I help you today?',
    time: '8:30 AM',
  },
  {
    user: {
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      name: 'Apple Releases',
    },
    content: 'Hello, can I help you?',
    time: '8:30 AM',
  },
];

export const _conversations: IConversation[] = [
  {
    id: 1,
    user: {
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      name: 'John Doe',
    },
    content: 'Test content',
    messages: messages,
  },
  {
    id: 2,
    user: {
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      name: 'John Doe 2',
    },
    content: 'Test content 2',
  },
];
