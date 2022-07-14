import { useRouter } from "next/router";
import EventItem from "./eventItem";
import classes from "./eventlist.module.css";
const Eventlist = (props) => {
  const { items } = props;
  // console.log("eventlist line 6", items);

  //expecting const {title, image, date, location,id} = props
  // console.log(items.location);
  return (
    <ul className={classes.list}>
      {items.map((item) => {
        return (
          <EventItem
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.date}
            location={item.location}
            image={item.image}
          />
        );
      })}
    </ul>
  );
};
export default Eventlist;
