import React, { Component } from "react";
import "./filter.css";

type FilterProps = {
  options: string[];
  callbackFunction: (selectedOption: string) => void;
};

type FilterState = {
  selected: string;
  selectedIndex: number;
};

export class Filter extends Component<FilterProps, FilterState> {
  constructor(props: any) {
    super(props);

    this.state = {
      selected: this.props.options[0],
      selectedIndex: 0
    };
  }

  onFilterOptionclick = (filterOptionName: string, index: number) => {
    this.setState({ selected: filterOptionName, selectedIndex: index });
    this.props.callbackFunction(filterOptionName);
  };

  render() {
    const { options } = this.props;
    const { selected, selectedIndex } = this.state;

    return (
      <div className="filter">
        <div className="filter__items">
          {options.map((option: string, index: number) => (
            <span
              className={
                "filter__item " +
                (option === selected
                  ? "filter__item--active"
                  : "filter__item--inactive")
              }
              key={`filter-option-${index}`}
              onClick={() => this.onFilterOptionclick(option, index)}
            >
              {option}
            </span>
          ))}
          <div
            className="filter__indicator"
            style={{ transform: `translateX(${selectedIndex * 101}%)` }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Filter;
