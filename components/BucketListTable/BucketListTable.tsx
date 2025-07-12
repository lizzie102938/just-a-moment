'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Flex, Table, Text, useMantineTheme } from '@mantine/core';
import {
  Button,
  Toast,
  Tooltip,
  BackArrow,
  PhotoPanel,
  FoodPanel,
  RadioPanel,
  Loader,
} from '@/components';

import classes from './BucketListTable.module.scss';
import {
  AlertType,
  BucketListType,
  PhotoPanelInfoType,
  FoodPanelInfoType,
  RadioPanelInfoType,
  PanelInfoType,
} from '@/types';
import { useSession } from 'next-auth/react';
import {
  fetchFoodByCoords,
  fetchPhotosByCoords,
  fetchRadioByCoords,
  fetchBucketList,
  deleteBucketListItem,
} from '@/utils/fetchFunctions';
import Link from 'next/link';

const basePanelInitialInfo: PanelInfoType = {
  opened: false,
  reason: '',
  country: '',
  place_name: '',
  longitude: 0,
  latitude: 0,
};

export default function BucketListTable() {
  const theme = useMantineTheme();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [alert, setAlert] = useState<AlertType | null>(null);
  const showSuccess = (message: string) =>
    setAlert({ type: 'success', message });
  const showError = (message: string) => setAlert({ type: 'error', message });
  const [bucketList, setBucketList] = useState<BucketListType[]>([]);
  const [photoPanelInfo, setPhotoPanelInfo] = useState<PhotoPanelInfoType>({
    ...basePanelInitialInfo,
    place_name: '',
    photos: [],
  });

  const [foodPanelInfo, setFoodPanelInfo] = useState<FoodPanelInfoType>({
    ...basePanelInitialInfo,
    meals: [],
  });

  const [radioPanelInfo, setRadioPanelInfo] = useState<RadioPanelInfoType>({
    ...basePanelInitialInfo,
    radioStations: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBucketList();
      setBucketList(data);
      setHasLoaded(true);
    };

    loadData();
  }, []);

  const handleHereClick = async (
    reason: string,
    country: string,
    longitude: number,
    latitude: number,
    place_name?: string
  ) => {
    setIsLoading(true);
    if (!session?.user.id) return;

    const coordsValid =
      typeof latitude === 'number' && typeof longitude === 'number';
    if (!coordsValid) {
      showError('Missing coordinates for search');
      return;
    }

    const baseInfo = {
      opened: true,
      reason,
      country,
      longitude,
      latitude,
    };

    try {
      if (reason === 'Photos') {
        const { photos } = await fetchPhotosByCoords(latitude, longitude);
        setPhotoPanelInfo({
          ...baseInfo,
          place_name: place_name ?? '',
          photos,
        });
      } else if (reason === 'Food') {
        const { meals } = await fetchFoodByCoords(latitude, longitude);
        setFoodPanelInfo({
          ...baseInfo,
          meals,
        });
      } else if (reason === 'Radio') {
        const { radioStations } = await fetchRadioByCoords(latitude, longitude);
        setRadioPanelInfo({
          ...baseInfo,
          radioStations,
        });
      } else {
        showError('Unsupported reason for search');
      }
    } catch (error) {
      showError('Failed to fetch data');
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <BackArrow />
      <Flex className={classes.container}>
        <Box className={classes.leftPanel}>
          <Image
            src={'/desert-compressed.webp'}
            alt={''}
            fill
            sizes={'(max-width: 768px) 100vw, 50vw'}
            priority
            className={classes.image}
            loading="eager"
            blurDataURL="/desert-compressed.webp"
          />
        </Box>
        {isLoading && <Loader />}
        <Box className={classes.rightPanel}>
          {alert && <Toast alert={alert} setAlert={setAlert} />}
          <Flex ta={'center'} mt={'md'} className={classes.bucketImage}>
            <img src="/bucket.svg" alt="Bucket Icon" height={70} />
          </Flex>
          {session?.user.id && hasLoaded && bucketList.length > 0 && (
            <Table className={classes.bucketTable} mt="md">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Region</th>
                  <th>Interest</th>
                  <th>Revisit Search Results</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bucketList.map(
                  ({
                    country,
                    reason,
                    id,
                    place_name,
                    longitude,
                    latitude,
                  }) => (
                    <tr key={`${country}-${id}`}>
                      <td>{country}</td>
                      <td>{place_name}</td>
                      <td>{reason}</td>
                      <td>
                        {typeof longitude === 'number' &&
                        typeof latitude === 'number' ? (
                          <Button
                            onClick={() =>
                              handleHereClick(
                                reason,
                                country,
                                longitude,
                                latitude,
                                place_name
                              )
                            }
                            label={'Here'}
                          />
                        ) : (
                          <Text c={'gray'}></Text>
                        )}
                      </td>
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
                  )
                )}
              </tbody>
            </Table>
          )}

          {session?.user.id && hasLoaded && bucketList.length === 0 && (
            <Flex className={classes.pleaseLoginContainer}>
              <Text
                c={'white'}
                fz={'22'}
                p={'xl'}
                bg={theme.colors.gray[7]}
                className={classes.pleaseLogin}
              >
                You have nothing in your bucket list yet.
              </Text>
            </Flex>
          )}

          {!session?.user.id && (
            <Flex className={classes.pleaseLoginContainer}>
              <Text
                c={'white'}
                fz={'22'}
                p={'xl'}
                bg={theme.colors.gray[7]}
                className={classes.pleaseLogin}
              >
                <Link href="/login" passHref className={classes.loginLink}>
                  Please log in to see your bucket list
                </Link>
              </Text>
            </Flex>
          )}
          {photoPanelInfo.opened && (
            <PhotoPanel
              opened={photoPanelInfo.opened}
              onClose={() =>
                setPhotoPanelInfo((prev) => ({ ...prev, opened: false }))
              }
              country={photoPanelInfo.country}
              placeName={photoPanelInfo.place_name}
              location={{
                lat: photoPanelInfo.latitude,
                lng: photoPanelInfo.longitude,
              }}
              photos={photoPanelInfo.photos}
            />
          )}
          {foodPanelInfo.opened && (
            <FoodPanel
              opened={foodPanelInfo.opened}
              onClose={() =>
                setFoodPanelInfo((prev) => ({ ...prev, opened: false }))
              }
              country={foodPanelInfo.country}
              meals={foodPanelInfo.meals}
              location={{
                lat: photoPanelInfo.latitude,
                lng: photoPanelInfo.longitude,
              }}
            />
          )}
          {radioPanelInfo.opened && (
            <RadioPanel
              opened={radioPanelInfo.opened}
              onClose={() =>
                setRadioPanelInfo((prev) => ({ ...prev, opened: false }))
              }
              country={radioPanelInfo.country}
              radioStations={radioPanelInfo.radioStations}
              location={{
                lat: photoPanelInfo.latitude,
                lng: photoPanelInfo.longitude,
              }}
            />
          )}
        </Box>
      </Flex>
    </>
  );
}
