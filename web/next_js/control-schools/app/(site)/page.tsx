import type { Metadata } from "next";
import HomeSitePage from "./home-site";

export const metadata: Metadata = {
  title: "Control School: Home",
  description: "",
};


export default function HomeSite() {
  return (
    <HomeSitePage />
  );
}
