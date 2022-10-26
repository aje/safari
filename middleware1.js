// export { default } from "next-auth/middleware"
//
// import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import {getSession} from "next-auth/react";

// const availablePathNames = ["/about", "/contact" , "/intro", ]

// export async function middleware(req) {
//     const url = req.nextUrl.clone()s
//
//     // fetch here requires an absolute URL to the auth API route
//
//
//     // we patch the callback to send the user back to where auth was required
//     url.search = new URLSearchParams(`callbackUrl=${url}`).toString()
//     url.pathname = `/api/auth/signin`
//
//     return !auth ? NextResponse.redirect(url) : NextResponse.next()
//
//     //
//     // // const token = await getToken({ req, secret: process.env.JWT_SECRET });
//     // const { pathname } = req.nextUrl;
//     //
//     // if (pathname.includes("/api/auth") || pathname.includes("/_next")) {
//     //     return NextResponse.next();
//     // }
//     //
//     // // console.log(token, pathname)
//     //
//     // const url = req.nextUrl.clone()
//     // url.pathname = '/login'
//     // if (!token && pathname !== "/login"  && !availablePathNames.includes(pathname)) {
//     //     console.log(pathname, token, "Redirect")
//     //     return NextResponse.redirect(url);
//     // } else {
//     //     console.log(pathname,token,  "NO")
//     // }
// }
// export const config = { matcher: ["/profile", "/trips", "/profile/:path*"] }