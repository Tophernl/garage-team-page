import React, { Component } from "react";
import "./filter-option.css";

type FilterOptionProps = {
  name: string;
  active: boolean;
  callbackFunction: (filterOptionName: string) => void;
};

export default class FilterOption extends Component<FilterOptionProps> {
  render() {
    const { name, active } = this.props;
    return (
      <div
        className={"option " + (active ? "option--active" : "option--inactive")}
        onClick={() => this.props.callbackFunction(name)}
      >
        {name}
      </div>
    );
  }
}
