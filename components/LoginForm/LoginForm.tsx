'use client';

import React from 'react';
import { useForm } from '@mantine/form';
import {
  Button,
  Group,
  TextInput,
  Flex,
  Text,
  useMantineTheme,
} from '@mantine/core';
import classes from './LoginForm.module.scss'; // Adjust the path as necessary

const LoginForm = () => {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= 6
          ? null
          : 'Password must be at least 6 characters long',
    },
  });

  return (
    <Flex direction={'column'} pt={140}>
      <img
        src="/user.svg"
        alt="User Icon"
        height={60}
        style={{ display: 'block' }}
      />
      <Flex
        w={'40vw'}
        mx={'auto'}
        p={'xl'}
        mt={30}
        direction="column"
        gap={'md'}
        bg={theme.colors.indigo[2]}
      >
        <Text c={theme.colors.gray[7]} fz={'xl'} fw={700} mb={'md'}>
          Create an account
        </Text>
        <form
          onSubmit={form.onSubmit((values) => console.log(values))}
          className={classes.form}
        >
          <TextInput
            c={theme.colors.gray[7]}
            withAsterisk
            label="Username"
            placeholder="your_username123"
            key={form.key('username')}
            {...form.getInputProps('username')}
          />

          <TextInput
            c={theme.colors.gray[7]}
            fw={500}
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <TextInput
            c={theme.colors.gray[7]}
            withAsterisk
            label="Password"
            placeholder="TopS3cretpa$$w0rd!"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              color={theme.colors.gray[1]}
              c={theme.colors.indigo[5]}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Flex>
    </Flex>
  );
};

export default LoginForm;
