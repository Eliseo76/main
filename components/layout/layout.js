import { useRouter } from "next/router";
import { Fragment } from "react";
import MainHeader from "./mainHeader";
const Layout = (props) => {
  const router = useRouter();
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
