import React from "react";

export default function Container(props) {
  return (
    <div
      className={` p-5 mx-auto xl:px-[120px] ${props.className ? props.className : ""
        }`}
    >
      {props.children}
    </div>
  );
}
