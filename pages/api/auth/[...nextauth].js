import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "../../../services/mongodb";
import dbConnect from "../../../services/dbconnect";
import User from "../../../models/User"
import Driver from "../../../models/Driver";

export const authOptions = {
    pages: {
        signIn: '/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/profile/edit?firstUser=true' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),

        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        // async jwt({ token, account, user }) {
        //     // initial signin
        //     if (account && user) {
        //         return {
        //             ...token,
        //         };
        //     }
        //         return token;
        // },
        async signIn({ user, account, profile, email, credentials }) {
            // console.log(user.id);
            await dbConnect();
            try {
                const driverFromDB = await Driver.findOne({user: user.id});
                if(driverFromDB) {
                    // console.log("IT's Already a driver",driverFromDB);
                    // todo check the driverFromDB.lastSignIn and if it's the same day don't update the xp
                    driverFromDB.xp  += 100;
                    driverFromDB.save();
                    // const driver  = new Driver({user: user.id, xp: 100});
                } else {
                    const driver  = new Driver({user: user.id, xp: 100});
                    driver.save();
                }
            } catch (e) {
                console.log(e);
            }

            // console.log(driver);
            return true
        },
        async session(session, token) {
            await dbConnect();
            const result = await User.findOne({ email: session.user.email });
            if (result) {
                session.user = result;
            }
            return session;
        },
    },
};

export default NextAuth(authOptions)
