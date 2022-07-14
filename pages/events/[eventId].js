import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

const EventDetailPage = ({ details }) => {
  // const details = getEventById(router.query.eventId);
  if (!details) {
    return (
      <div className={"center"}>
        <p>No Event Found</p>
      </div>
    );
  }
  console.log(details);

  return (
    <Fragment>
      <Head>
        <title>{details.title}</title>
        <meta
          name={"description"}
          content={"find cool stuff to do with NextJS"}
        />
      </Head>
      <EventSummary title={details.title} />
      <EventLogistics
        date={details.date}
        image={details.image}
        address={details.location}
        imageAlt={details.title}
      />
      <EventContent>
        <p>{details.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const response = await getEventById(eventId);

  return {
    props: {
      details: response,
    }, // will be passed to the page component as props
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const pages = await getFeaturedEvents();
  const paths = pages.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: "blocking", // false or 'blocking'
  };
}

export default EventDetailPage;
