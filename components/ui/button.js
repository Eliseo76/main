import { useRouter } from "next/router";
import classes from "./button.module.css";
import Link from "next/link";
const Button = (props) => {
  const router = useRouter();
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }
  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
export default Button;
