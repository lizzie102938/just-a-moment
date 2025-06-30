import { Flex, useMantineTheme, Tooltip } from '@mantine/core';
import Switch from '@/components/Switch/Switch';
import Badge from '@/components/Badge/Badge';
import classes from './Topbar.module.scss';

import Link from 'next/link';

type TopbarProps = {
  onSearch: (query: string) => void;
  activeSwitch: string | null;
  setActiveSwitch: (value: string | null) => void;
};

const Topbar = ({ onSearch, activeSwitch, setActiveSwitch }: TopbarProps) => {
  const theme = useMantineTheme();

  return (
    <Flex
      w="100%"
      className={classes.topbar}
      align="center"
      justify="space-between"
      px="md"
      py="sm"
      wrap="wrap"
      style={{
        gap: '1rem',
        backgroundColor: theme.colors.gray[0],
        borderBottom: `1px solid ${theme.colors.gray[3]}`,
      }}
    >
      <Flex align="center">
        <Tooltip
          label="Log in / Register"
          color={theme.colors.indigo[2]}
          c={theme.colors.gray[7]}
          withArrow
          zIndex={1001}
          radius={0}
        >
          <Link href="/login" passHref>
            <img
              src="/user.svg"
              alt="User Icon"
              height={36}
              style={{ display: 'block' }}
            />
          </Link>
        </Tooltip>
      </Flex>

      <Flex align="center">
        <Tooltip
          label="See Bucket List"
          color={theme.colors.indigo[2]}
          c={theme.colors.gray[7]}
          withArrow
          zIndex={1001}
          radius={0}
        >
          <Link href="/bucket-list" passHref>
            <img
              src="/bucket.svg"
              alt="Bucket Icon"
              height={32}
              style={{ display: 'block' }}
            />
          </Link>
        </Tooltip>
      </Flex>

      {/* Controls Section */}
      <Flex
        wrap="wrap"
        align="center"
        justify="flex-start"
        gap="lg"
        style={{ flexGrow: 1 }}
      >
        <Badge
          type="input"
          label="Click somewhere on the map or type a location or landmark here:"
          hasInput={true}
          onSearch={onSearch}
        />

        {['Photos', 'Food', 'News', 'Radio'].map((label) => (
          <Switch
            key={label}
            label={label}
            checked={activeSwitch === label.toLowerCase()}
            onChange={() =>
              setActiveSwitch(
                activeSwitch === label.toLowerCase()
                  ? null
                  : label.toLowerCase()
              )
            }
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Topbar;
