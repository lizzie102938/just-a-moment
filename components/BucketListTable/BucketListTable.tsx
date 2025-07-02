'use client';
import React, { useEffect, useState } from 'react';
import { Box, Flex, Table, Text, useMantineTheme } from '@mantine/core';
import Toast from '@/components/Toast/Toast';
import Tooltip from '@/components/Tooltip/Tooltip';
import BackArrow from '@/components/BackArrow/BackArrow';
import classes from './BucketListTable.module.scss';
import { AlertType, BucketListType } from '@/types';
import { useSession } from 'next-auth/react';

const fetchBucketList = async () => {
  try {
    const response = await fetch('/api/bucket-list');
    if (!response.ok) {
      throw new Error('Failed to fetch bucket list');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching bucket list:', error);
    return [];
  }
};

const deleteBucketListItem = async (id: number) => {
  try {
    const response = await fetch('/api/bucket-list', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete bucket list item');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting bucket list item:', error);
  }
};

export default function BucketTable() {
  const theme = useMantineTheme();
  const { data: session, status } = useSession();
  const [alert, setAlert] = useState<AlertType | null>(null);
  const showSuccess = (message: string) =>
    setAlert({ type: 'success', message });
  const showError = (message: string) => setAlert({ type: 'error', message });
  const [bucketList, setBucketList] = useState<BucketListType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBucketList();
      setBucketList(data);
    };

    loadData();
  }, []);

  return (
    <>
      <BackArrow />
      <Flex className={classes.container}>
        <Box className={classes.leftPanel}></Box>

        <Box className={classes.rightPanel}>
          {alert && <Toast alert={alert} setAlert={setAlert} />}
          {session?.user.id ? (
            <>
              <Flex ta={'center'} mt={'md'}>
                <img src="/bucket.svg" alt="Bucket Icon" height={70} />
              </Flex>
              <Table className={classes.bucketTable} mt="md">
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Place name</th>
                    <th>Because of the ...</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bucketList.map(({ country, reason, id, place_name }) => (
                    <tr key={`${country}-${id}`}>
                      <td>{country}</td>
                      <td>{place_name}</td>
                      <td>{reason}</td>
                      <Tooltip label={'Delete from Bucket List'}>
                        <td>
                          {
                            <img
                              src="/trash.svg"
                              alt="Delete Icon"
                              width={30}
                              onClick={async () => {
                                const result = await deleteBucketListItem(id);
                                const error = result?.error;
                                if (result) {
                                  setBucketList((prev) =>
                                    prev.filter((item) => item.id !== id)
                                  );
                                  showSuccess(
                                    `Deleted ${country} from bucket list`
                                  );
                                }
                                if (error) {
                                  showError(
                                    'Failed to delete item from bucket list'
                                  );
                                }
                              }}
                            />
                          }
                        </td>
                      </Tooltip>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <>
              <Flex mt={'md'}>
                <img src="/bucket.svg" alt="Bucket Icon" height={70} />
              </Flex>
              <Flex className={classes.pleaseLoginContainer}>
                <Text
                  c={'white'}
                  fz={'22'}
                  p={'xl'}
                  bg={theme.colors.gray[7]}
                  className={classes.pleaseLogin}
                >
                  Please log in to see your bucket list
                </Text>
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}
