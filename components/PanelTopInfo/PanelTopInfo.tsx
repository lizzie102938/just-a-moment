'use client';

import React from 'react';
// import { useRouter } from 'next/router';
import { useRouter, usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';
import { Box, Flex } from '@mantine/core';
import { Button, Tooltip } from '@/components';
// import handleAddToBucketList from '@/utils/handleAddToBucketList';

import classes from './PanelTopInfo.module.scss';
import useAddToBucketList from '@/hooks/useHandleAddToBucketList';

interface PanelTopInfoProps {
  reason: string;
  onClose: () => void;
  location: { lat?: number; lng?: number } | null;
  placeName?: string | null;
  country?: string | null;
  onSuccess?: () => void;
  onError?: () => void;
}

const PanelTopInfo = ({
  reason,
  onClose,
  location,
  placeName,
  country,
  onSuccess,
  onError,
}: PanelTopInfoProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { addToBucketList } = useAddToBucketList();

  const onBucketListPage = pathname.includes('/bucket-list');

  return (
    <Box className={classes.topInfo}>
      {!onBucketListPage && !session?.user.id && (
        <Flex gap={'md'}>
          <Tooltip label={'You must be logged in to add to your bucket list.'}>
            <Box>
              <Button
                disabled
                onClick={() => ''}
                label={'Add to Bucket List'}
              />
            </Box>
          </Tooltip>
          {!session?.user.id && (
            <Button onClick={() => router.push('/login')} label={'Login'} />
          )}
        </Flex>
      )}
      {!onBucketListPage && session?.user.id && (
        <Button
          onClick={() =>
            addToBucketList(
              reason,
              country ?? '',
              location,
              onClose,
              placeName,
              onSuccess,
              onError
            )
          }
          label={'Add to Bucket List'}
        />
      )}
    </Box>
  );
};

export default PanelTopInfo;
