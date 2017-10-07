import React from "react";
import { PropTypes } from "prop-types";
import { FlowRouter } from "meteor/kadira:flow-router";

import Book from "/imports/ui/components/Book";
import Game from "/imports/ui/components/Game";

const Room = props => {
	const {removeRoom, launchActivity, exitActivity, isLaunchedActivity, activity, roomState, roomId, books} = props
	return (
		<div className="room container-fluid">
			<div className="row">
				<div id="video-container" className="col-xs-4">
					<div className="row">
						<div className="video-wrapper">
							<video id='caller' autoPlay></video>
						</div>
					</div>

					<div className="row">
						<div id="target" className="video-wrapper"></div>
					</div>

	        <button className="btn" onClick={removeRoom}>Remove room</button>
	      </div>
				<div className="col-xs-8 row activities-list">
					{roomState?
						roomState.type =="game"?
							<Game
								roomId={roomId}
								exitActivity={exitActivity}
								data={roomState.data}
							/>
						:
							<Book
								roomId={roomId}
								exitActivity={exitActivity}
								data={roomState.data}
							/>
					:
						<div>
							<div className="col-xs-6 text-center">
								<h3>Games:</h3>
								<ul className="list-group">
									<li className="list-group-item" onClick={()=>{launchActivity("game", "Game 1")}}>Game 1</li>
								</ul>
							</div>
							<div className="col-xs-6 text-center">
								<h3>Books:</h3>
								<ul className="list-group">
									{books.map((book)=>{
										return (
											<li key={book._id} className="list-group-item" onClick={()=>{launchActivity("book", book)}}>{book.name}</li>
										)
									})}
									
								</ul>
							</div>
						</div>
					}
					
				</div>
			</div>
		</div>
	);
};

export default Room;














