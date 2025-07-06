'use client';

import { useSession } from 'next-auth/react';

const useAddToBucketList = () => {
  const { data: session } = useSession();

  const addToBucketList = async (
    reason: string,
    country: string | null,
    location: { lat?: number; lng?: number } | null,
    onClose: () => void,
    placeName?: string | null,
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    if (!country || !session) return;

    try {
      const response = await fetch('/api/bucket-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: session.user.id,
          country,
          latitude: location?.lat,
          longitude: location?.lng,
          place_name: placeName ?? '',
          reason,
        }),
      });

      if (!response.ok) throw new Error('Failed');

      onSuccess?.();
      onClose();
    } catch {
      onError?.();
    }
  };

  return { addToBucketList };
};

export default useAddToBucketList;
