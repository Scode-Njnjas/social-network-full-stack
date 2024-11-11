export interface IFollower {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  followedAt: string;
  hasFollowedBack: boolean;
}

export interface IFollowing {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  followedAt: string;
  hasFollowedBack: boolean;
}
