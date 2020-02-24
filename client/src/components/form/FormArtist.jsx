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
        style: [],
        createdAt: Date.now(),
        updatedAt: ""
    }

    handleState = e => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
    }

    handleCheckbox = e => {
      this.state.isBand = !this.state.isBand
      this.setState({isBand: e.target.checked})
    }

    submitForm = e => {
      e.preventDefault();
      APIHandler.post("/artists", {
        name: this.state.name,
        description: this.state.description,
        isBand: this.state.isBand
      })
      .then(apiRes => {
        this.setState({msg: <div className="msg-ok">The artist was successfully created!</div>})
      })
      .catch(apiErr =>this.setState({msg: <div className="msg-fail">An error occured, try again!</div>}));
    };

    render() {
        return (
            <div>

                {this.state.msg && this.state.msg}
                
                <form className="form" onSubmit={this.submitForm} onChange={this.handleState}>
                    <label className="label">Name</label>
                    <input className="input" type="text" name="name"/>
    
                    <label className="label">Description</label>
                    <textarea className="input" name="description"></textarea>

                    {/* <label className="label">Style</label>
                    <input className="input" type="select" name="style" value={this.state.style.name}/> */}

                    <label className="label">Is band?</label>
                    <input className="input" type="checkbox" name="isBand" value={this.state.isBand} onClick={this.handleCheckbox}/>
            
                    <button className="btn" type="submit">Create Artist</button>

                </form>
                
            </div>
    );
  }}


export default withRouter(FormArtist);
