/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { register } from '@/apis/auth';
import { registerSchema } from '../data';

import { Button } from '@/components/button';
import { GoogleSVG, LogoSVG } from '@/components/icons';
import { DebouncedInput } from '@/components/input';
import { Typography } from '@/components/typography';
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

import styled from '@/styles/auth.module.css';

//----------------------------------------------------------------------

export default function RegisterView() {
  const router = useRouter();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFirstNameError('');
    setLastNameError('');
    setUsernameError('');
    setPasswordError('');

    const result = registerSchema.safeParse({
      firstName,
      lastName,
      username,
      password,
    });
    if (!result.success) {
      result.error.errors.forEach((error) => {
        if (error.path.includes('firstName')) {
          setFirstNameError(error.message);
        } else if (error.path.includes('lastName')) {
          setLastNameError(error.message);
        } else if (error.path.includes('username')) {
          setUsernameError(error.message);
        } else if (error.path.includes('password')) {
          setPasswordError(error.message);
        }
      });
      setLoading(false);
      return;
    }

    try {
      const userData = await register({
        firstName,
        lastName,
        username,
        password,
      });

      if (userData) {
        router.push('/login');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setUsernameError(err.response.data.message);
      } else {
        setUsernameError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-auth w-full h-svh flex flex-col justify-around items-center px-[2.5rem]">
      <div id="stars" className={styled.stars}></div>
      <div className="w-full p-[2.5rem] relative mx-auto md:max-w-[25.5rem] md:before:content-[''] md:before:absolute md:before:inset-0 md:before:rounded-button md:before:pointer-events-none md:before:border-[0.75rem] md:before:border-[#f7f7f780] md:before:opacity-[0.29] md:before:blur-[20px] md:before:bg-auth-form md:after:bg-[#363638] md:after:shadow-auth-card md:after:backdrop:blur-[50px] md:after:content-[''] md:after:absolute md:after:inset-0 md:after:rounded-button md:after:pointer-events-none">
        <div className="relative z-[2]">
          <div className="flex flex-col mb-[2.5rem] items-center gap-6">
            <LogoSVG className="object-contain w-[150px]" />
            <Typography level="h4" className="text-primary">
              Bento social
            </Typography>
          </div>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-[0.875rem] mb-[1.5rem]">
              <DebouncedInput
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-full bg-neutral2-5 placeholder:text-tertiary base text-primary text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent focus:border-neutral2-10"
                value={firstName}
                onChange={(value: string) => setFirstName(value)}
              />
              {firstNameError && (
                <Typography level="captionr" className="text-red-500">
                  {firstNameError}
                </Typography>
              )}
              <DebouncedInput
                type="text"
                name="lastName"
                placeholder="Last name"
                value={lastName}
                className="w-full bg-neutral2-5 placeholder:text-tertiary base text-primary text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent focus:border-neutral2-10"
                onChange={(value: string) => setLastName(value)}
              />
              {lastNameError && (
                <Typography level="captionr" className="text-red-500">
                  {lastNameError}
                </Typography>
              )}
              <DebouncedInput
                type="text"
                name="username"
                placeholder="Username"
                className="w-full bg-neutral2-5 placeholder:text-tertiary base text-primary text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent focus:border-neutral2-10"
                value={username}
                onChange={(value: string) => setUsername(value)}
              />
              {usernameError && (
                <Typography level="captionr" className="text-red-500">
                  {usernameError}
                </Typography>
              )}
              <DebouncedInput
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                debounce={0}
                className="w-full bg-neutral2-5 placeholder:text-tertiary base text-primary text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent focus:border-neutral2-10"
                onChange={(value: string) => setPassword(value)}
              />
              {passwordError && (
                <Typography level="captionr" className="text-red-500">
                  {passwordError}
                </Typography>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full base px-[2rem] py-[0.875rem]"
                disabled={loading}
                child={
                  <Typography level="base2sm" className="text-tertiary">
                    {loading ? 'Loading...' : 'Sign up'}
                  </Typography>
                }
              />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    className="w-full px-[2rem] py-[0.875rem]"
                    child={
                      <div className="flex items-center gap-3 justify-center">
                        <GoogleSVG className="w-5 h-5" />
                        <Typography level="base2sm" className="text-secondary">
                          Sign up with Google
                        </Typography>
                      </div>
                    }
                  />
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

              <Typography
                level="captionr"
                className="opacity-80 flex items-center gap-2 text-secondary justify-center"
              >
                You have an account?
                <a href="/login" className="opacity-100 font-semibold">
                  <Typography level="captionsm" className="opacity-100">
                    Sign in, here!
                  </Typography>
                </a>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
