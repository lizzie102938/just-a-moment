// import { useSession } from 'next-auth/react';

// const handleAddToBucketList = (
//   reason: string,
//   country: string | null,
//   location: { lat?: number; lng?: number } | null,
//   onClose: () => void,
//   placeName?: string | null,
//   onSuccess?: () => void,
//   onError?: () => void
// ) => {
//   const { data: session } = useSession();

//   if (!country || !session) {
//     return;
//   }

//   const userId = session?.user.id;

//   const lat = location?.lat;

//   const lng = location?.lng;

//   fetch('/api/bucket-list', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       user_id: userId,
//       country,
//       latitude: lat,
//       longitude: lng,
//       place_name: placeName ?? '',
//       reason: reason,
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to add country to bucket list');
//       }

//       return response.json();
//     })
//     .then((data) => {
//       onSuccess?.();
//       onClose();
//     })
//     .catch((error) => {
//       onError?.();
//     });
// };

// export default handleAddToBucketList;
