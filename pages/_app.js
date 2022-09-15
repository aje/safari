import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import {createTheme, NextUIProvider} from '@nextui-org/react';
import Layout from "../components/Layout";
import { useRouter } from 'next/router';
import {useState, useEffect} from "react";
import LoadingPage from "../components/LoadingPage";

const fonts = {
    sans: "'Century Gothic',  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
    mono: "'Cinnabar';",
};
const theme = createTheme({
    type: "light", // it could be "light" or "dark"
    theme: {
        colors: {
            // brand colors
            primaryLight: '$green200',
            primaryLightHover: '$green300',
            primaryLightActive: '$green400',
            primaryLightContrast: '$green600',
            primary: '#8DCEBE',
            primaryBorder: '#77b5a5',
            primaryBorderHover: '$green600',
            primarySolidHover: '$green700',
            primarySolidContrast: '$white',
            primaryShadow: '$green500',

            gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
            link: '#648386',

        },
        space: {},
        fonts
    }
});


export default function App({Component,pageProps: { session, ...pageProps }}) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url, { shallow }) => {
            setLoading(true);
        };

        const handleStop = (url, { shallow }) => {
            setLoading(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        router.events.on('routeChangeError', handleStop);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
            router.events.off('routeChangeError', handleStop)
        }
    }, [router]);

    return (<>
        <NextUIProvider  theme={theme}>
            <SessionProvider session={session}>
                <Layout>
                    {loading ? <LoadingPage/> :
                    <Component {...pageProps} />}
                </Layout>
            </SessionProvider>
        </NextUIProvider>
        </>
    )
}
