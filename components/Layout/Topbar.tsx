import { Flex, useMantineTheme, Tooltip, Box } from '@mantine/core';
import Switch from '@/components/Switch/Switch';
import Badge from '@/components/Badge/Badge';
import classes from './Topbar.module.scss';
import { useState } from 'react';
import Link from 'next/link';

type TopbarProps = {
  onSearch: (query: string) => void;
  activeSwitch: string | null;
  setActiveSwitch: (value: string | null) => void;
};

const Topbar = ({ onSearch, activeSwitch, setActiveSwitch }: TopbarProps) => {
  const theme = useMantineTheme();
  // const [activeSwitch, setActiveSwitch] = useState<string | null>(null);

  return (
    <Flex
      h={'6rem'}
      w={'100%'}
      className={classes.topbar}
      align={'center'}
      gap={32}
      p={40}
    >
      <Tooltip
        c={theme.colors.gray[7]}
        fw={600}
        fz={12}
        label="See Bucket List"
        color={theme.colors.indigo[2]}
        withArrow
        zIndex={1001}
        radius={0}
      >
        <Link href="/bucket-list" passHref className={classes.bucketLink}>
          <img
            src="/bucket.svg"
            alt="Bucket Icon"
            height={50}
            className={classes.bucket}
          />
        </Link>
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
          checked={activeSwitch === 'photos'}
          onChange={() =>
            setActiveSwitch(activeSwitch === 'photos' ? null : 'photos')
          }
        />

        <Switch
          label="Food"
          checked={activeSwitch === 'food'}
          onChange={() =>
            setActiveSwitch(activeSwitch === 'food' ? null : 'food')
          }
        />

        <Switch
          label="News"
          checked={activeSwitch === 'news'}
          onChange={() =>
            setActiveSwitch(activeSwitch === 'news' ? null : 'news')
          }
        />

        <Switch
          label="Radio"
          checked={activeSwitch === 'radio'}
          onChange={() =>
            setActiveSwitch(activeSwitch === 'radio' ? null : 'radio')
          }
        />
      </Flex>
    </Flex>
  );
};

export default Topbar;
