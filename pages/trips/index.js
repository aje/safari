import React from 'react';
import PageTitle from "../../components/PageTitle";
import Empty from "../../components/Empty";
import ListItem from "../../components/trip/ListItem";
import {getTrips} from "../../services/api_utils";

const Index = ({trips}) => {
    // useEffect(()=>{
    //     axios.get(`/posts`).then(r => {
    //         console.log(r.data);
    //     })
    // }, []);
    return (<>
        <PageTitle title={"Trips"}/>
        <div  className={"px-5 pb-28 relative z-10"}>
        <div className="mt-8">
            {/*<Text h4>Trips</Text>*/}
            {trips?.length === 0 && <Empty/>}
            {!!trips && trips.map((item, i) =>  <ListItem key={i} item={item} />)}
        </div>
        </div>
        </>);
};

export default Index;

export async function getServerSideProps() {
    const trips = await getTrips();
    return {
        props: { trips : JSON.parse(JSON.stringify(trips))},
    };
}
