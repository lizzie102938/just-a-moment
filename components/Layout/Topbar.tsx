import { Flex, useMantineTheme, Tooltip } from '@mantine/core';
import Switch from '@/components/Switch';
import Badge from '@/components/Badge';
import styles from './Topbar.module.scss';

type TopbarProps = {
  onSearch: (query: string) => void;
};

const Topbar = ({ onSearch }: TopbarProps) => {
  const theme = useMantineTheme();

  return (
    <Flex
      h={'6rem'}
      w={'100%'}
      bg={theme.colors.gray[9]}
      align={'center'}
      gap={32}
      p={40}
    >
      {/* <BucketIcon w={24} h={24} /> */}
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

        <Switch label="Photos" />
        <Switch label="Food" />
      </Flex>
    </Flex>
  );
};

export default Topbar;
