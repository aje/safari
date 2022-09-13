import Image from "next/image";

const BackgroundGradient = () => {

    return (<>
        <div className={"fixed overflow-hidden  w-screen h-screen"}>
            <Image
                alt="Mountains"
                src="/background2.jpg"
                layout="fill"
                objectFit="cover"
                quality={100}
            />
        </div>
        </>);
};

export default BackgroundGradient;
