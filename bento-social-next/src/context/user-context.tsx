// 'use client';
// import { getUserProfile } from '@/apis/user';
// import { IUserProfile } from '@/interfaces/user';
// import React from 'react';

// interface UserProfileContextType {
//   userProfile: IUserProfile | null;
//   setUserProfile: (profile: IUserProfile) => void;
//   loading: boolean;
//   error: Error | null;
//   refreshProfile: () => Promise<void>;
// }

// const UserProfileContext = React.createContext<
//   UserProfileContextType | undefined
// >(undefined);

// export function ProfileProvider({ children }: { children: React.ReactNode }) {
//   const [userProfile, setUserProfile] = React.useState<IUserProfile | null>(
//     null
//   );
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<Error | null>(null);

//   const fetchUserProfile = async () => {
//     await getUserProfile()
//       .then((res) => {
//         setUserProfile(res.data);

//         setError(null);
//       })
//       .catch((err) => {
//         setError(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const refreshProfile = async () => {
//     await fetchUserProfile();
//   };

//   React.useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   return (
//     <UserProfileContext.Provider
//       value={{
//         userProfile,
//         loading,
//         error,
//         setUserProfile,
//         refreshProfile,
//       }}
//     >
//       {children}
//     </UserProfileContext.Provider>
//   );
// }

// export function useUserProfile() {
//   const context = React.useContext(UserProfileContext);
//   if (context === undefined) {
//     throw new Error('useUserProfile must be used within a UserProfileProvider');
//   }
//   return context;
// }

'use client';

import React from 'react';

import { getUserProfile } from '@/apis/user';
import { IUserProfile } from '@/interfaces/user';

//-----------------------------------------------------------------------------------------------

interface UserProfileContextType {
  userProfile: IUserProfile | null;
  setUserProfile: (profile: IUserProfile) => void;
  loading: boolean;
  error: Error | null;
  refreshProfile: () => Promise<void>;
}

const UserProfileContext = React.createContext<
  UserProfileContextType | undefined
>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = React.useState<IUserProfile | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await getUserProfile();
      setUserProfile(res.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        loading,
        error,
        setUserProfile,
        refreshProfile: fetchUserProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = React.useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
