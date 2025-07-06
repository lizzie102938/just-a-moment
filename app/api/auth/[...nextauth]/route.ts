import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
      name?: string | null;
    };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
