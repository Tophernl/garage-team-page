import React, { Component } from "react";
import "./team-member.css";
import { TeamMember as TeamMemberModel } from "../../../config/types";
import { Tag } from "./tag/tag";
import Loader from "../../../components/loader/loader";
import PlusIcon from "../../../assets/images/plus-icon.svg";

type TeamMemberProps = {
  teamMember: TeamMemberModel;
};

type TeamMemberState = {
  image: null | HTMLImageElement;
  isLoading: boolean;
  error: null | Error;
};

export class TeamMember extends Component<TeamMemberProps, TeamMemberState> {
  constructor(props: any) {
    super(props);

    this.state = {
      image: null,
      isLoading: false,
      error: null
    };
  }

  componentDidMount(): void {
    this.getImage();
  }

  getImage = () => {
    const { image, name } = this.props.teamMember;
    this.setState({ isLoading: true });

    const localImage = new Image();
    let imageUrl: string = image;

    // Add random value to trigger unique image
    if (image.includes("https://loremflickr.com")) {
      imageUrl = `${image}?random=${name}`;
    }

    //exception for plus icon image
    if (image.includes("plusIcon")) {
      imageUrl = PlusIcon;
    }

    localImage.src = imageUrl;
    localImage.onload = () => this.handleImageLoaded(localImage);
    localImage.onerror = () => this.handleImageError(localImage);
  };

  handleImageLoaded = (localImage: HTMLImageElement) => {
    this.setState({ isLoading: false, image: localImage });
  };

  handleImageError = (localImage: HTMLImageElement) => {
    this.setState({ isLoading: false });
    console.log("error getting image: ", localImage);
  };

  render() {
    const { name, role, location, tags } = this.props.teamMember;
    const imageUrl = this.state.image ? this.state.image.src : this.state.image;
    const style = {
      backgroundImage: `url(${imageUrl})`
    };

    return (
      <div className="team-member">
        <div className="team-member__picture">
          {this.state.isLoading ? (
            <div className="team-member__loader">
              <Loader />
            </div>
          ) : (
            <div style={style} title={`Photo of ${name}`}></div>
          )}

          <div className="team-member__name">
            <div>{name}</div>
          </div>
        </div>
        <div className="team-member__details">
          <div className="team-member__location">{location}</div>
          <div className="team-member__role">{role}</div>
          <div className="team-member__tags">
            {tags.map((tag: string, index: number) => (
              <Tag tag={tag} key={`${name}-tag-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TeamMember;
