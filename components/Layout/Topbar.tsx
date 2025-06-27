import { Flex, useMantineTheme, Tooltip } from '@mantine/core';
import Switch from '@/components/Switch';
import Badge from '@/components/Badge';
import styles from './Topbar.module.scss';
import { useState } from 'react';

type TopbarProps = {
  onSearch: (query: string) => void;
};

const Topbar = ({ onSearch }: TopbarProps) => {
  const theme = useMantineTheme();
  const [photosChecked, setPhotosChecked] = useState(false);
  const [foodChecked, setFoodChecked] = useState(false);
  const [newsChecked, setNewsChecked] = useState(false);
  const [radioChecked, setRadioChecked] = useState(false);

  console.log(photosChecked, 'photos checked state in Topbar');
  console.log(foodChecked, 'food checked state in Topbar');

  return (
    <Flex
      h={'6rem'}
      w={'100%'}
      bg={theme.colors.gray[9]}
      align={'center'}
      gap={32}
      p={40}
    >
      <Tooltip
        c={theme.colors.gray[9]}
        label="See Bucket List"
        color={theme.colors.indigo[3]}
        withArrow
        zIndex={1000}
      >
        <img
          src="/bucket.svg"
          alt="Bucket Icon"
          height={50}
          className={styles.bucket}
        />
      </Tooltip>
      <Flex justify={'space-between'} align={'center'} pl={16} gap={48}>
        <Badge
          type={'input'}
          label={
            'Click somewhere on the map or type a location or landmark here:'
          }
          hasInput={true}
          onSearch={onSearch}
        />

        <Switch
          label="Photos"
          onCheckChange={(prev) => setPhotosChecked(!photosChecked)}
        />
        <Switch
          label="Food"
          onCheckChange={(prev) => setFoodChecked(!foodChecked)}
        />
        <Switch
          label="News"
          onCheckChange={(prev) => setNewsChecked(!newsChecked)}
        />
        <Switch
          label="Radio"
          onCheckChange={(prev) => setRadioChecked(!radioChecked)}
        />
      </Flex>
    </Flex>
  );
};

export default Topbar;
