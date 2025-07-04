'use client';

import React, { useEffect } from 'react';
import { Alert, Text, useMantineTheme } from '@mantine/core';
import { AlertType } from '@/types';
import classes from './Toast.module.scss';

interface ToastProps {
  alert: AlertType | null;
  setAlert: (alert: AlertType | null) => void;
}

const Toast = ({ alert, setAlert }: ToastProps) => {
  const theme = useMantineTheme();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <Alert
      bg={alert?.type === 'success' ? theme.colors.gray[7] : 'red'}
      className={classes.toast}
      onClose={() => setAlert(null)}
    >
      {' '}
      <Text fw={500} c={'white'} fz={'md'}>
        {alert?.message}
      </Text>
    </Alert>
  );
};

export default Toast;
