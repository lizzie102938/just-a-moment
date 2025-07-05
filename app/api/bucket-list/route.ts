import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const bucketlist_items = await prisma.bucketlist_items.findMany({
    where: {
      user_id: Number(session.user.id),
    },
  });

  return NextResponse.json(bucketlist_items);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { user_id, country, reason, place_name, latitude, longitude } = body;

  try {
    const newEntry = await prisma.bucketlist_items.create({
      data: {
        user_id: Number(user_id),
        country,
        reason,
        place_name,
        latitude,
        longitude,
      },
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to add to bucket list' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const deletedItem = await prisma.bucketlist_items.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedItem, { status: 200 });
  } catch (err) {
    console.error('DELETE error:', err);
    return NextResponse.json(
      { error: 'Failed to delete bucket list item' },
      { status: 500 }
    );
  }
}
