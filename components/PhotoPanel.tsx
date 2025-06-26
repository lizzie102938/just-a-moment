// components/PhotoPanel.tsx
import styles from './PhotoPanel.module.scss';
import { format } from 'date-fns';
import Badge from '@/components/Badge';
import {
  Modal,
  NavLink,
  Text,
  Box,
  useMantineTheme,
  Flex,
} from '@mantine/core';

type Photo = {
  url: string;
  title: string;
  date: string;
};

type PhotoPanelProps = {
  readonly photos: Photo[];
  readonly location: { lat: number; lng: number };
  readonly placeName?: string | null;
  readonly onClose: () => void;
};

const formatDate = (date: string, output: string = 'dd.MM.yy') => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return 'Invalid date';
  return format(parsed, output);
};

export function PhotoPanel({
  photos,
  location,
  placeName,
  onClose,
}: PhotoPanelProps) {
  const theme = useMantineTheme();

  return (
    <Modal opened={!!location} onClose={onClose} zIndex={1000} size={'auto'}>
      <div className={styles.panel}>
        <Flex align="center" gap={25}>
          <h2 className={styles.heading}>
            Photos of ({location.lat.toFixed(2)}, {location.lng.toFixed(2)})
            {placeName ? ` – ${placeName}` : ''}
          </h2>
          <Badge label={'Add to my Bucket List'} type={'simple'} />
        </Flex>
        <Box className={styles.grid}>
          {photos.map((photo) => {
            console.log('Photo date:', photo.date);
            return (
              <Box
                key={photo.url + photo.title}
                className={styles.card}
                w={200}
                bg={theme.colors.indigo[1]}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className={styles.image}
                />

                <Text ta={'center'} size={'sm'} c={''} pt={4}>
                  {' '}
                  {formatDate(photo.date)}
                </Text>

                <NavLink
                  className={styles.link}
                  ta={'center'}
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  label="View on Unsplash"
                />
              </Box>
            );
          })}
        </Box>
      </div>
    </Modal>
  );
}
