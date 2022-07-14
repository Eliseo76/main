import { useRouter } from "next/router";
import Button from "../ui/button";
import classes from "./eventItem.module.css";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";

const EventItem = (props) => {
  const { title, image, date, location, id } = props;
  console.log("line 10", location);
  const humanReadableDate = new Date(date).toLocaleDateString(`en-US`, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(",", "\n");
  const router = useRouter();

  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={`${title}`} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div style={{ marginLeft: "0" }} className={classes.icon}>
            <AddressIcon />

            <div className={classes.address}>
              <address style={{ marginLeft: "10px" }}>
                {formattedAddress}
              </address>
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};
export default EventItem;
