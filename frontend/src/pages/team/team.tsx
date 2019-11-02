import React, { Component } from "react";
import "./team.css";
import { Header } from "../../components/header/header";
import { TeamMember as TeamMemberModel } from "../../config/types";
import { API_URL } from "../../config/api";
import { Locations } from "../../config/enums";
import Loader from "../../components/loader/loader";
import TeamMember from "./team-member/team-member";
import Filter from "../../components/filter/filter";

type TeamState = {
  teamMembers: TeamMemberModel[];
  locations: Locations[];
  isLoading: boolean;
  error: null | Error;
  selectedLocation: string;
};

export class Team extends Component<{}, TeamState> {
  constructor(props: any) {
    super(props);

    this.state = {
      teamMembers: [],
      locations: Object.values(Locations),
      isLoading: false,
      error: null,
      selectedLocation: "All"
    };
  }

  componentDidMount(): void {
    this.getTeamMembers();
  }

  getTeamMembers = async () => {
    this.setState({ isLoading: true });

    await fetch(API_URL.GET_TEAM_MEMBERS)
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

    this.addHiringMember();
  };

  addHiringMember = () => {
    const yourName: TeamMemberModel = {
      name: "Your name",
      role: "We're hiring",
      tags: ["perspective", "grow"],
      location: "Your name",
      image: "plusIcon"
    };
    this.setState((prevState: TeamState) => ({
      teamMembers: prevState.teamMembers.concat(yourName)
    }));
  };

  onFilterAction = (selectedLocation: string) => {
    this.setState({ selectedLocation: selectedLocation });
  };

  teamMembersFiltered = () => {
    const { selectedLocation, teamMembers } = this.state;
    if (selectedLocation !== "All") {

      return this.state.teamMembers.filter(
        (teamMember: TeamMemberModel) =>
          teamMember.location === selectedLocation.toLowerCase()
      );
    } else {
      return this.state.teamMembers;
    }
  };

  render() {
    const { isLoading, error, locations } = this.state;
    const teamMembersFiltered = this.teamMembersFiltered();

    return (
      <div className="team">
        <Header title="Team" />
        <Filter options={locations} callbackFunction={this.onFilterAction} />
        {isLoading ? ( //Check if isLoading state is true, show loader if true
          <Loader />
        ) : error ? ( // isLoading state is false, check if an error was thrown
          <div>{error.message}</div>
        ) : (
          // all is well, nice! show team members then
          <div className="team__grid">
            {teamMembersFiltered.map(
              (teamMember: TeamMemberModel, index: number) => (
                <div className="team__item" key={`team-member-${index}`}>
                  <TeamMember teamMember={teamMember} />
                </div>
              )
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Team;
