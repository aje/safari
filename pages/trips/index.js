import React from 'react';
import PageTitle from "../../components/PageTitle";
import Link from "next/link";
import {Card} from "@nextui-org/react"

const Index = ({trips}) => {
    // useEffect(()=>{
    //     axios.get(`/posts`).then(r => {
    //         console.log(r.data);
    //     })
    // }, []);
    return (<>
        <PageTitle title={"Trips"}/>
        <div className={"px-5 pt-10 pb-28"}>
        <Card>
            <Card.Body>
                <Link href={"/trips/trip/id"}>GO TO ID</Link>
            </Card.Body>
        </Card>
        </div>
        </>);
};

export default Index;
//
// export async function getStaticProps() {
//     const res = await fetch(`http://127.0.0.1:3000/api/posts`);
//     const trips = await res.json();
//
//     // if (!trips) {
//     //     return {
//     //         notFound: true,
//     //     };
//     // }
//
//     return {
//         props: { trips: [] }, // will be passed to the page component as props
//     };
// }
