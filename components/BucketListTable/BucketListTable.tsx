'use client';
import React, { useEffect, useState } from 'react';
import { Box, Flex, Table } from '@mantine/core';
import Tooltip from '@/components/Tooltip/Tooltip';
import BackArrow from '@/components/BackArrow/BackArrow';
import classes from './BucketListTable.module.scss';
import { isNotEmpty } from '@mantine/form';

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
  const [bucketList, setBucketList] = useState<
    { country: string; reason: string; id: number }[]
  >([]);

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
      <Flex className={classes.leftHandImage}>
        <Box className={classes.leftPanel}>
          {' '}
          <Box ta={'center'} mt={'md'}>
            <img src="/bucket.svg" alt="Bucket Icon" height={70} />
          </Box>
        </Box>

        <Box className={classes.rightPanel}>
          <Table className={classes.bucketTable} mt="md">
            <thead>
              <tr>
                <th>Country</th>
                <th>Because of the ...</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bucketList.map(({ country, reason, id }) => (
                <tr key={country}>
                  <td>{country}</td>
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
                            if (result) {
                              setBucketList((prev) =>
                                prev.filter((item) => item.id !== id)
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
        </Box>
      </Flex>
    </>
  );
}
