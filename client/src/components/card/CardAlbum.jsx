import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  return <div>
  {data.title}
  <img className="cover" src={data.cover} alt="album"/>
  <IconFav/>
  </div>;
}
