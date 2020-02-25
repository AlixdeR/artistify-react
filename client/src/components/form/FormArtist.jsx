import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// custom tools
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import APIHandler from "../../api/APIHandler";


class FormArtist extends Component {
      state = {
        msg: "",
        name: "",
        isBand: false,
        description: "",
        rates: [],
        style: "",
        styles: [],
        createdAt: Date.now(),
        updatedAt: ""
    }

    componentDidMount = () => {
      APIHandler.get("/styles")
      .then(apiRes => {
      console.log(apiRes.data.styles);
      this.setState({styles: apiRes.data.styles})
      })
      .catch(apiErr => this.setState(apiErr));
    
    APIHandler.get(`/artists/${this.props._id}`)
    .then(artist => {
      console.log(artist.data)
      this.setState({name: artist.data.name, description: artist.data.description, isBand: artist.data.isBand, style: artist.data.style })
    })
    .catch(apiErr => this.setState(apiErr));
    }

    handleState = e => {
      e.preventDefault();
      console.log(e.target.value);
      this.setState({ [e.target.name]: e.target.value });
    }

    // handleSelect = e => {
    //   e.preventDefault();
    //   console.log(e.target.value);
    //   this.setState({ style: e.target.value });
    // }

    handleCheckbox = e => {
      this.state.isBand = !this.state.isBand
      this.setState({isBand: e.target.checked})
    }

    submitForm = e => {
      e.preventDefault();
      APIHandler.post("/artists/", {
        name: this.state.name,
        description: this.state.description,
        isBand: this.state.isBand,
        style: this.state.style
      })
     .then(apiRes => {
        this.setState({msg: <div className="msg-ok">The artist was successfully created!</div>})
      })
      .catch(apiErr =>this.setState({msg: <div className="msg-fail">An error occured, try again!</div>}));
    };

    submitEditForm = e => {
      e.preventDefault();
      APIHandler.patch(`/artists/${this.props._id}`, {
        name: this.state.name,
        description: this.state.description,
        isBand: this.state.isBand,
        style: this.state.style
      })
     .then(apiRes => {
        this.setState({msg: <div className="msg-ok">The artist was successfully updated!</div>})
      })
      .catch(apiErr =>this.setState({msg: <div className="msg-fail">An error occured, try again!</div>}));
    };


    render() {

        return (

            <div>

                {this.state.msg && this.state.msg}
                
                {this.props.mode === "create" ? (
                <form className="form" onSubmit={this.submitForm} onChange={this.handleState}>
                    <label className="label">Name</label>
                    <input className="input" type="text" name="name"/>
    
                    <label className="label">Description</label>
                    <textarea className="input" name="description"></textarea>

                    <label className="label">Style</label>
                    <select className="input" name="style">
                    <option disabled>Choose Style</option>
                      {this.state.styles.map((s,i) => (<option key={i} value={s._id}>{s.name}</option>))};
                    </select>

                    <label className="label">Is band?</label>
                    <input className="input" type="checkbox" name="isBand" value={this.state.isBand} onClick={this.handleCheckbox}/>
            
                    <button className="btn" type="submit">Create Artist</button>

                </form>

                ) : (

                  <form className="form" onSubmit={this.submitEditForm} onChange={this.handleState}>
                    <label className="label">Name</label>
                    <input className="input" type="text" name="name" value={this.state.name}/>
    
                    <label className="label">Description</label>
                    <textarea className="input" name="description" value={this.state.description}></textarea>

                    <label className="label">Style</label>
                    <select className="input" name="style" value={this.state.style}>
                      {this.state.styles.map((s,i) => (<option key={i} value={s._id}>{s.name}</option>))};
                    </select>

                    <label className="label">Is band?</label>
                    <input className="input" type="checkbox" name="isBand" value={this.state.isBand} onClick={this.handleCheckbox}/>
            
                    <button className="btn" type="submit">Edit Artist</button>

                </form>
                )}
                
            </div>
    );
  }}


export default withRouter(FormArtist);
