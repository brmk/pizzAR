import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";
import {_} from 'lodash';
import {createContainer} from 'meteor/react-meteor-data';

import {FlowRouter} from "meteor/kadira:flow-router";
import Book from "./Book";



class BookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPage: props.data.page || 1,
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.data.page){
      this.setState({
        mainPage: nextProps.data.page
      })
    }
    
  }

  turnPage(isForward){
    const {roomId, data={}} = this.props;
    const {pagesCount} = data; 
    const {mainPage} = this.state;

    let nextPage = mainPage;
    if(isForward && nextPage+1<=pagesCount){
      nextPage++;
    } else if(!isForward && mainPage>1){
      nextPage--;
    }

    Meteor.call('rooms.updateState', {roomId, state:{"state.data.page": nextPage}}, (err, res)=>{
      if(err){
        console.log(err)
      } else{

      }
    })
  }

  render() {
    const {exitActivity, data} = this.props;
    return (
      <Book
        data={data}
        exitActivity={exitActivity}
        turnPage={this.turnPage.bind(this)}
        {...this.state}
      />
    );
  };
};


export default createContainer(params => {
  let subscriptions = []

  return {};
}, BookContainer);
