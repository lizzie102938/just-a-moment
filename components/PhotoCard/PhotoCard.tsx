'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Box, useMantineTheme, Badge as MantineBadge } from '@mantine/core';
import { PhotoType } from '@/types';
import classes from './PhotoCard.module.scss';

type PhotoCardProps = {
  photo: PhotoType;
};

const formatDate = (date: string, output: string = 'dd.MM.yy') => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return 'Invalid date';
  return format(parsed, output);
};

const PhotoCard = ({ photo }: PhotoCardProps) => {
  const theme = useMantineTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      key={photo.url + photo.title}
      className={classes.card}
      w={200}
      bg={theme.colors.indigo[1]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open(photo.url, '_blank')}
    >
      <img src={photo.url} alt={photo.title} className={classes.image} />
      {hovered && (
        <MantineBadge
          color={theme.colors.gray[6]}
          variant={'filled'}
          className={classes.badge}
          radius={0}
        >
          {formatDate(photo.date)}
        </MantineBadge>
      )}
    </Box>
  );
};

export default PhotoCard;
