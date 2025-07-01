'use client';

import React from 'react';

import { Flex, Text, useMantineTheme, Box } from '@mantine/core';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BackArrow from '@/components/BackArrow/BackArrow';
import Form from '@/components/Form/Form';

const Login = () => {
  const router = useRouter();
  const theme = useMantineTheme();

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
        const error = await res.text();
        throw new Error(error || 'Failed to create user');
      }

      const user = await res.json();
      router.push('/main');
      console.log('User created:', user);
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
      <Flex direction={'column'} pt={140}>
        <Form onSubmit={handleCreateUser} title={'Create an account'} />
        <Text c={theme.colors.indigo[2]} pt={20} fw={800} ta={'center'}>
          OR
        </Text>
        <Form onSubmit={handleLogin} title={'Login'} />
      </Flex>
    </Box>
  );
};

export default Login;
