import React from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import {
  TextInput,
  useMantineTheme,
  Group,
  Button,
  Flex,
  Text,
} from '@mantine/core';
import classes from './Form.module.scss';

interface FormProps {
  onSubmit: (values: { email: string; password: string }) => void;
  title: string;
}

const Form = ({ onSubmit, title }: FormProps) => {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
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
    <Flex
      w={'40vw'}
      mx={'auto'}
      p={'lg'}
      mt={10}
      direction="column"
      gap={'md'}
      bg={theme.colors.indigo[2]}
    >
      <Text c={theme.colors.gray[7]} fz={'xl'} fw={700}>
        {title}
      </Text>
      <form onSubmit={form.onSubmit(onSubmit)} className={classes.form}>
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

        <Group justify="flex-end">
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
  );
};

export default Form;
