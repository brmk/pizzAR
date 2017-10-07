import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";
import {_} from 'lodash';
import {createContainer} from 'meteor/react-meteor-data';

import {FlowRouter} from "meteor/kadira:flow-router";
import Game from "./Game";



class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    const {exitActivity, name} = this.props;
    return (
      <Game
        name={name}
        exitActivity={exitActivity}
      />
    );
  };
};


export default createContainer(params => {
  return {};
}, GameContainer);
