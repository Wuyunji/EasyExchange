import React from "react";
import GoodsList from "../../../components/GoodsList";
import "./index.css";

export default function MyCollectList(props) {
  const { goods } = props;
  return <GoodsList goods={goods} />;
}
