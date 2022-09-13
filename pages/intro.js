import React, {useState, useEffect} from 'react';
import SplashScreenCard from "../components/SplashScreenCard";
import {Button, Link} from "@nextui-org/react";
import clsx from "clsx";
import {useRouter} from "next/router";
import image from "../public/background.jpg";
import Image from "next/image";

const slides = [
    {
        image: "/intro1.png",
        title: "Attract customers",
        subtitle:"Gain People's attention to your old trips and gain their trust",
        color: "text-pink-300"
    },
    {
        image: "/intro3.png",
        title: "Get foreigners",
        subtitle:"Gain People's attention to your old trips and gain their trust",
        color: "text-yellow-500"
    },
    {
        image: "/intro2.png",
        title: "Get travellers",
        subtitle:"Gain People's attention to your old trips and gain their trust",
        color: "text-cyan-500"
    },
    {
        image: "/intro4.png",
        title: "Share your trips",
        subtitle:"Gain People's attention to your old trips and gain their trust",
        color: "text-yellow-500"
    },
    {
        image: "/intro5.png",
        title: "Be perfect",
        subtitle:"Gain People's attention to your old trips and gain their trust",
        color: "text-purple-800"
    },
];

const Intro = () => {
    const [step , setStep] = useState(0);
    const router = useRouter();

    const [height, setHeight] = useState(0);
    useEffect(() => {
        setHeight(window.innerHeight);
    });
    const onChangeStep = () => {
        if(step < slides.length -1) {
            setStep( step+1)
        } else {
            router.push('/signin')
        }
    };
    return (<>
            <div className={"fixed overflow-hidden  w-screen h-screen"}>
                <Image
                    alt="Mountains"
                    src="/background.jpg"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
            <div className={"flex flex-col z-10 "} style={{height}}>

            {slides.map((item, i) => i === step &&
                <SplashScreenCard slides={slides} changeStep={onChangeStep} {...item} />)}
            <div className="flex items-center w-full justify-between p-3">
                <Button as={Link} href={"/"} rounded light auto>Skip</Button>
                <div className="flex items-center">
                    {slides.map((item, i) => <Button auto onPress={()=>setStep(i)} key={i} className={clsx("w-2 h-2 bg-primary/20 mx-2 rounded-full", step === i && "bg-primary/100" )}/>)}
                </div>
                <Button color={"primary"} auto rounded onPress={onChangeStep}>{step === slides.length -1 ? "SignIn" :  "Next"}</Button>
            </div>
        </div>
        </>
    );
};

export default Intro;
