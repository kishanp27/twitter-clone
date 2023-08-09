import bcrypt from 'bcrypt';
// import NextAuth from 'next-auth/next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/libs/prismadb';
import { NextAuthOptions } from 'next-auth';

// export default NextAuth ({
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'email', type: 'text'},
//                 password: { label: 'password', type: 'text'}
//             },
//             async authorize(credentials) {
//                 if(!credentials?.email || !credentials?.password) {
//                     throw new Error('Invalid Credentials');
//                 }

//                 const user = await prisma.user.findUnique({
//                     where: {
//                         email: credentials.email
//                     }
//                 });

//                 if(!user || !user?.hashedPassword){
//                     throw new Error('Invalid credentials')
//                 }
                
//                 const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

//                 if(!isCorrectPassword){
//                     throw new Error('Invalid credentials')
//                 }

//                 return user;

//             }
//         })
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     session: {
//         strategy: 'jwt'
//     },
//     jwt: {
//         secret: process.env.JWT_SECRET
//     },
//     debug: process.env.NODE_ENV === 'development',
// })

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            
            credentials: {
                email: { label: 'email', type: 'text'},
                password: { label: 'password', type: 'text'}
            },
            async authorize(credentials) {
                console.log(credentials)
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials 1');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // const user2 = await prisma.User.findUnique({
                //     where: {
                //         email: credentials.email
                //     }
                // });

                // console.log(user)

                if(!user || !user.hashedPassword){
                    throw new Error('Invalid credentials 2')
                }
                
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

                if(!isCorrectPassword){
                    throw new Error('Invalid credentials 3')
                }

                return user;

            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };