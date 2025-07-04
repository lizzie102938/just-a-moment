'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Flex } from '@mantine/core';
import { Switch, Tooltip, Badge } from '@/components';

import classes from './Topbar.module.scss';

type TopbarProps = {
  onSearch: (query: string) => void;
  activeSwitch: string | null;
  setActiveSwitch: (value: string | null) => void;
};

const Topbar = ({ onSearch, activeSwitch, setActiveSwitch }: TopbarProps) => {
  const { data: session } = useSession();

  return (
    <Flex
      w={'100%'}
      className={classes.topbar}
      align={'center'}
      justify={'space-between'}
      px={'lg'}
      py={'sm'}
      gap={'md'}
      wrap={'wrap'}
    >
      <Flex gap={'md'} className={classes.iconGroup}>
        {' '}
        <Tooltip label={'Home'}>
          <Link href="/" passHref>
            <img
              src={'/home.svg'}
              width={40}
              alt={'home'}
              className={classes.icon}
            />
          </Link>
        </Tooltip>
        <Flex align={'center'}>
          {!session?.user ? (
            <Tooltip label={'Log in / Register'}>
              <Link href="/login" passHref>
                <img
                  src="/user.svg"
                  alt="User Icon"
                  height={36}
                  className={classes.icon}
                />
              </Link>
            </Tooltip>
          ) : (
            <Tooltip label={'Logout'}>
              <img
                onClick={() => signOut({ callbackUrl: '/' })}
                src="/user.svg"
                alt="User Icon"
                height={36}
                className={classes.logoutIcon}
              />
            </Tooltip>
          )}
        </Flex>
        <Flex align="center">
          <Tooltip label={'See Bucket List'}>
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
      </Flex>

      <Flex
        wrap={'wrap'}
        align={'center'}
        justify={'space-around'}
        gap={'lg'}
        style={{ flexGrow: 1 }}
      >
        <Badge
          type={'input'}
          label={
            <span className={classes.hideOnMobile}>
              Click somewhere on the map or type a location or landmark here:
            </span>
          }
          hasInput={true}
          onSearch={onSearch}
        />
        <Flex gap={'lg'} align={'center'}>
          {['Photos', 'Food', 'Radio'].map((label) => (
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
    </Flex>
  );
};

export default Topbar;
