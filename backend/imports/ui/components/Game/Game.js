import React from "react";
import { PropTypes } from "prop-types";
import { FlowRouter } from "meteor/kadira:flow-router";

const Game = props => {
	const {exitActivity, name} = props;
	return (
		<div className="game container-fluid">
			<button className="btn" onClick={()=>{exitActivity()}}>Exit Activity</button>
			<h3>Game: {name}</h3>
			<div style={{width: "100%", height:"500px", backgroundColor: "grey"}}>
			</div>
		</div>
	);
};

export default Game;