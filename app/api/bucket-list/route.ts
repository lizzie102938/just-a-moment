import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const bucketlist_items = await prisma.bucketlist_items.findMany();
  return NextResponse.json(bucketlist_items);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, country, reason } = body;

  try {
    const newEntry = await prisma.bucketlist_items.create({
      data: {
        user_id: Number(userId),
        country,
        reason,
        place_name: country,
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
