import axios from "axios";
import Eventlist from "../../components/events/eventlist";
import EventsSearch from "../../components/events/eventsSearch";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const AllEventsPage = ({ data }) => {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  }

  console.log("events/index l.16", data);

  return (
    <Fragment>
      <Head>
        <title>All NextJS Events</title>
        <meta
          name={"description"}
          content={"find cool stuff to do with NextJS"}
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <Eventlist items={data} />
    </Fragment>
  );
};
export default AllEventsPage;

export async function getStaticProps(context) {
  const axData = await axios
    .get("https://clone-b409c.firebaseio.com/events.json")
    .then((res) => res.data)
    .catch((e) => console.log(e));
  console.log("event/index l.30", axData);
  const newData = Object.values(axData);
  return {
    props: {
      data: newData,
    }, // will be passed to the page component as props
    revalidate: 60,
  };
}
