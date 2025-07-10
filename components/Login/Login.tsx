'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Flex, Text, useMantineTheme, Box } from '@mantine/core';

import { Form, BackArrow, Toast } from '@/components';
import classes from './Login.module.scss';
import { AlertType } from '@/types';

const Login = () => {
  const router = useRouter();
  const theme = useMantineTheme();

  const showError = (message: string) => setAlert({ type: 'error', message });
  const [alert, setAlert] = useState<AlertType | null>(null);

  const handleCreateUser = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const err = await res.json();

        if (
          err.details?.code === 'P2002' &&
          err.details?.meta?.target?.includes('email')
        ) {
          showError('Email is already in use.');
        } else {
          showError('Failed to create user. Please try again.');
        }
        return;
      }

      if (res.ok) {
        handleLogin(values);
      }

      router.push('/main');
    } catch (err) {
      console.error('User creation failed:', err);
    }
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.error) {
      console.error('Login error:', res.error);
      showError('Invalid email or password. Please try again.');
    } else {
      window.location.href = '/main';
    }
  };

  return (
    <Box w={'100vw'}>
      <BackArrow />

      <Flex className={classes.container}>
        <Box className={classes.leftPanel}>
          <Image
            src={'/user-2-compressed.webp'}
            alt={''}
            fill
            sizes={'(max-width: 768px) 100vw, 50vw'}
            className={classes.image}
            priority
            loading="eager"
            blurDataURL="/user-2-compressed.webp"
          />
        </Box>
        <Box className={classes.rightPanel}>
          <Flex direction={'column'} pt={40}>
            <Form onSubmit={handleCreateUser} title={'Create an account'} />
            <Text c={theme.colors.gray[7]} p={20} fw={800} ta={'center'}>
              OR, if you already have an account:
            </Text>
            <Form onSubmit={handleLogin} title={'Login'} />
          </Flex>
        </Box>
      </Flex>
      {alert && <Toast alert={alert} setAlert={setAlert} />}
    </Box>
  );
};

export default Login;
