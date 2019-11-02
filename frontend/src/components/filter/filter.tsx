import React, { Component } from "react";
import "./filter.css";
import FilterOption from "./filter-option/filter-option";

type FilterProps = {
  options: string[];
  callbackFunction: (selectedOption: string) => void;
};

type FilterState = {
  selected: string;
};

export class Filter extends Component<FilterProps, FilterState> {
  constructor(props: any) {
    super(props);

    this.state = {
      selected: this.props.options[0]
    };
  }

  onFilterOptionclick = (filterOptionName: string) => {
    this.setState({ selected: filterOptionName });
    this.props.callbackFunction(filterOptionName);
  };

  render() {
    const { options } = this.props;
    const { selected } = this.state;

    return (
      <div className="filter">
        {options.map((option: string, index: number) => (
          <div className="filter__item" key={`filter-option-${index}`}>
            <FilterOption
              name={option}
              active={option === selected}
              callbackFunction={this.onFilterOptionclick}
            ></FilterOption>
          </div>
        ))}
      </div>
    );
  }
}

export default Filter;
