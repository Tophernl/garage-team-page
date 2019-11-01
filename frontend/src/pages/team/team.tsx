import React, { Component } from "react";
import { Header } from "../../components/header/header";
import { TeamMember } from "../../config/types";
import { API_URL } from "../../config/api";
import { Locations } from "../../config/enums";
import Loader from "../../components/loader/loader";

type TeamState = {
  teamMembers: TeamMember[];
  locations: string[];
  isLoading: boolean;
  error: null | Error;
};

export class Team extends Component<{}, TeamState> {
  constructor(props: any) {
    super(props);

    this.state = {
      teamMembers: [],
      locations: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount(): void {
    this.getTeamMembers();
    this.getLocations();
  }

  getTeamMembers = () => {
    this.setState({ isLoading: true });

    fetch(API_URL.GET_TEAM_MEMBERS)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Uh oh! Could not read team data, please try again ..."
          );
        }
      })
      .then(data => this.setState({ teamMembers: data, isLoading: false }))
      .catch(error => this.setState({ error: error, isLoading: false }));
  };

  getLocations = () => {
    const locations = Object.values(Locations);
    this.setState({ locations: locations });
  };

  render() {
    const { teamMembers, isLoading, error } = this.state;

    return (
      <div className="team">
        <Header title="Team" />

        {isLoading ? ( //Check if isLoading state is true, show loader if true
          <Loader />
        ) : error ? ( // isLoading state is false, check if an error was thrown
          <div>{error.message}</div>
        ) : (
          // all is well, nice! show team members then
          <div>
            {teamMembers.map((teamMember: TeamMember, index: number) => (
              <div key={`member-${index}`}>{teamMember.name}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Team;
