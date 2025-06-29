import React, { useState } from 'react';
import classes from './PhotoCard.module.scss';
import { format } from 'date-fns';
import { Box, useMantineTheme, Badge as MantineBadge } from '@mantine/core';

type Photo = {
  url: string;
  title: string;
  date: string;
};

type PhotoProps = {
  photo: Photo;
};

const formatDate = (date: string, output: string = 'dd.MM.yy') => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return 'Invalid date';
  return format(parsed, output);
};

const PhotoCard = ({ photo }: PhotoProps) => {
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
    >
      <img src={photo.url} alt={photo.title} className={classes.image} />
      {hovered && (
        <MantineBadge
          color={theme.colors.indigo[3]}
          variant={'filled'}
          style={{
            position: 'absolute',

            zIndex: 1000,
          }}
        >
          {formatDate(photo.date)}
        </MantineBadge>
      )}
    </Box>
  );
};

export default PhotoCard;
