import React from "react";

export const Tag = (props: { tag: string }) => (
  <span>
    <b>{`#${props.tag} `}</b>
  </span>
);
