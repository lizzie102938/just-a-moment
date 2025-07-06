'use client';

import React, { useEffect } from 'react';
import { Alert, Text } from '@mantine/core';
import { AlertType } from '@/types';
import classes from './Toast.module.scss';

interface ToastProps {
  alert: AlertType | null;
  setAlert: (alert: AlertType | null) => void;
}

const Toast = ({ alert, setAlert }: ToastProps) => {
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <Alert
      bg={alert?.type === 'success' ? 'green' : 'red'}
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
