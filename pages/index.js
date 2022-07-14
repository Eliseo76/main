import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-utils";
import Eventlist from "../components/events/eventlist";

const HomePage = (props) => {
  const { data } = props;
  console.log("9", data);
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name={"description"}
          content={"find cool stuff to do with NextJS"}
        />
      </Head>
      <h1>HomePage</h1>
      <Eventlist items={data} />
    </div>
  );
};
/*This is a pre-rendered page because of get static props  */
export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();
  // const data = await axios
  //   .get("https://clone-b409c.firebaseio.com/events.json")
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((e) => console.log(e));
  //
  // const newData = Object.values(data);
  //
  // const featuredEvents = newData.filter((event) => event.isFeatured === true);
  return {
    props: {
      data: featuredEvents,
    },
    revalidate: 1800,
  };
  // will be passed to the page component as props
}

export default HomePage;
