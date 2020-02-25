import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

import APIHandler from "../../api/APIHandler";


class FormAlbum extends Component {

    state = {
      msg: "",
      title: "",
      artist: "",
      artists: [],
      description: "",
      label: "",
      labels: [],
      releaseDate: "",
      cover: ""
  }

  componentDidMount = () => {
    APIHandler.get("/artists")
    .then(apiRes => {
    console.log(apiRes.data);
    this.setState({ artists: apiRes.data.artists})
    })
    .catch(apiErr => this.setState(apiErr));

    APIHandler.get("/labels")
    .then(apiRes => {
    console.log(apiRes.data);
    this.setState({ labels: apiRes.data.labels })
    })
    .catch(apiErr => this.setState(apiErr));


  };

  handleState = e => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm = e => {
    e.preventDefault();
    APIHandler.post("/albums", {
      title: this.state.title,
      description: this.state.description,
      releaseDate: this.state.releaseDate,
      artist: this.state.artist,
      label: this.state.label
    })
  .then(apiRes => {
      this.setState({msg: <div className="msg-ok">The album was successfully created!</div>})
    })
    .catch(apiErr =>this.setState({msg: <div className="msg-fail">An error occured, try again!</div>}));
  };

  render() {
    return (
         <div>

          {this.state.msg && this.state.msg}
 
          <form className="form" onSubmit={this.submitForm} onChange={this.handleState}>
              <label className="label">Title</label>
              <input className="input" type="text" name="title"/>

              <label className="label">Artist</label>
              <select className="input" name="artist">
                <option disabled>Choose Artist</option> 
                {this.state.artists.map((artist,i) => (<option key={i} value={artist._id}>{artist.name}</option>))};
              </select>

              <label className="label">Label</label>
              <select className="input" name="label">
                <option disabled>Choose Label</option>
                {this.state.labels.map((label,i) => (<option key={i} value={label._id}>{label.name}</option>))};
              </select>

              <label className="label">Release date</label>
              <input type="date" className="input" name="releaseDate"/>

              <label className="label">Description</label>
              <textarea className="input" name="description"></textarea>

              <button className="btn" type="submit">Create Album</button>

          </form>

          </div>
    );
  }
}

export default withRouter(FormAlbum);
