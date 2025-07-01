import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function GET() {
  const users = await prisma.users.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password_hash,
      },
    });

    return NextResponse.json(newUser);
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'User creation failed', details: err },
      { status: 500 }
    );
  }
}
