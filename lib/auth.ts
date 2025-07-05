import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { JWT } from 'next-auth/jwt';
import { Session, User, SessionStrategy } from 'next-auth';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password required');
        }

        // Find user by email
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );

        // Verify password
        // const isValid = await bcrypt.compare(
        //   credentials.password,
        //   user.password_hash
        // );
        if (!isValid) {
          throw new Error('Invalid password');
        }

        // Return user object (without password_hash)
        return {
          id: user.id.toString(),
          email: user.email,
          // you can add more user info here if needed
        };
      },
    }),
  ],

  // Add session and jwt config if needed
  session: {
    strategy: 'jwt' as SessionStrategy,
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string; // token.id might be string|undefined
          session.user.email = token.email as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login', // optional: your custom login page
  },

  secret: process.env.NEXTAUTH_SECRET, // set this in your .env file
};
