'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
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

      // if (!res.ok) {
      //   const error = await res.text();
      //   throw new Error(error || 'Failed to create user');
      // }
      if (!res.ok) {
        const err = await res.json();
        // Check for Prisma P2002
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
      const user = await res.json();
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
    } else {
      window.location.href = '/main';
    }
  };

  return (
    <Box w={'100vw'}>
      <BackArrow />

      <Flex className={classes.container}>
        <Box className={classes.leftPanel}></Box>
        <Box className={classes.rightPanel}>
          <Flex direction={'column'} pt={40}>
            <Form onSubmit={handleCreateUser} title={'Create an account'} />
            <Text c={theme.colors.gray[7]} p={20} fw={800} ta={'center'}>
              OR
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
