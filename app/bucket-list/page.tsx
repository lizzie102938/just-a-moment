'use client';

import { Box, Flex, Table, Tooltip, useMantineTheme } from '@mantine/core';
import classes from './BucketList.module.scss';

export default function BucketListPage() {
  const theme = useMantineTheme();

  const trashIcon = <img src="/trash.svg" alt="Delete Icon" width={30} />;

  const elements = [
    {
      country: 'Spain',
      reason: 'Food',
      action: trashIcon,
    },
    {
      country: 'France',
      reason: 'Photos',
      action: trashIcon,
    },
    {
      country: 'Japan',
      reason: 'News',
      action: trashIcon,
    },
    {
      country: 'Canada',
      reason: 'Food',
      action: trashIcon,
    },
    {
      country: 'Bangladesh',
      reason: 'Radio',
      action: trashIcon,
    },
  ];

  return (
    <Flex style={{ minHeight: '100vh' }}>
      {/* Left Side: Desert strip + back arrow */}

      <Box className={classes.leftPanel}>
        <Tooltip
          label={'Go back'}
          withArrow
          position="bottom"
          color={theme.colors.indigo[2]}
          c={theme.colors.gray[7]}
          fw={600}
          fz={12}
        >
          <img
            src="/back-arrow.svg"
            alt="Back Arrow"
            height={40}
            className={classes.backArrow}
            onClick={() => window.history.back()}
          />
        </Tooltip>
      </Box>

      {/* Right Side: Bucket + table */}
      <Box className={classes.rightPanel}>
        <img src="/bucket.svg" alt="Bucket Icon" height={70} />
        <Table className={classes.bucketTable} mt="md">
          <thead>
            <tr>
              <th>Country</th>
              <th>Because of the ...</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {elements.map(({ country, reason, action }) => (
              <tr key={country}>
                <td>{country}</td>
                <td>{reason}</td>
                <Tooltip
                  label="Delete from Bucket List"
                  withArrow
                  position="bottom"
                  color={theme.colors.indigo[2]}
                  c={theme.colors.gray[7]}
                >
                  <td>{action}</td>
                </Tooltip>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Flex>
  );
}
