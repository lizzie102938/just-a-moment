import React from 'react';
import { Modal, Box, Flex } from '@mantine/core';
import classes from './GuessThePlace.module.scss';
import { Photo } from './types';
import PhotoCard from './PhotoCard';

type GuessThePlaceProps = {
  // readonly location: { lat: number; lng: number };
  readonly placeName?: string | null;
  photos: Photo[]; // Adjust type as needed
  readonly onClose: () => void;
  country: string | null;
};

export function GuessThePlace({
  onClose,
  photos,
  placeName,
  country,
}: GuessThePlaceProps) {
  return (
    <Modal opened={true} onClose={onClose} zIndex={1000} size={'auto'}>
      <Box>{placeName}</Box>
      <Box className={classes.panel}>
        <Flex align="center" gap={25}>
          {/* <h2 className={classes.heading}>
            Photos of ({location.lat.toFixed(2)}, {location.lng.toFixed(2)})
            {placeName ? ` – ${placeName}` : ''}
          </h2> */}
          {/* <Badge label={'Add to my Bucket List'} type={'simple'} /> */}
        </Flex>

        <Box className={classes.grid}>
          {photos.map((photo) => {
            return <PhotoCard key={photo.url} photo={photo} />;
          })}
        </Box>
      </Box>
    </Modal>
  );
}

export default GuessThePlace;
