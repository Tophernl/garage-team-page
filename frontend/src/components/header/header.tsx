import React from "react";
import "./header.css";

type HeaderProps = {
  title: String;
};

export class Header extends React.Component<HeaderProps> {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}
