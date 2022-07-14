//If you have more than one segment after the folder route "/events/1354" but not 2 total segments
// than the route with the single segment will handle all but if more than one this route will assume handling the route
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-utils";
import Eventlist from "../../components/events/eventlist";
import ResultsTitle from "./results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

const RefinedEventPage = ({ events, date }) => {
  const router = useRouter();
  // const filteredData = router.query.slug;
  // if (!filteredData) {
  //   return <p className={"center"}>Loading</p>;
  // }

  const pageHeadData = (
    <Head>
      <title>Refined Events </title>
      <meta
        name={"description"}
        content={`All events for ${date.month}/${date.year}`}
      />
    </Head>
  );

  if (!events || events.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found.</p>
        </ErrorAlert>
        <div className={"center"}>
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const dates = new Date(date.year, date.month - 1);

  return (
    <Fragment>
      <Head>
        <title>Refined Events </title>
        <meta
          name={"description"}
          content={`All events for ${date.month}/${date.year}`}
        />
      </Head>
      <ResultsTitle date={dates} />
      <Eventlist items={events} />
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const filteredData = params.slug;
  const filterYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filterYear;
  const numMonth = +filteredMonth;
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      notFound: true,
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  console.log(filteredEvents);
  return {
    props: {
      events: filteredEvents,
      date: { year: numYear, month: numMonth },
    }, // will be passed to the page component as props
  };
}

export default RefinedEventPage;
