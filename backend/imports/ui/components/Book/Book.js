import React from "react";
import { PropTypes } from "prop-types";
import { FlowRouter } from "meteor/kadira:flow-router";

const Book = props => {
	const {exitActivity, data, mainPage, turnPage } = props;
	// let rootUrl = "/books/"
  let {key,rootUrl='/books',name, fileRoot, fileExtension='jpg'} = data  
	return (
		<div className="book container-fluid">
			<button className="btn" onClick={()=>{exitActivity()}}>Exit Activity</button>
			<h3>Book: {name}</h3>
			<div className="row" style={{height: "90rem"}}>
				<div className="col-xs-6" onClick={()=>{turnPage(false)}} style={{
					backgroundImage: `url(${rootUrl}/${key}/${fileRoot}${mainPage}.${fileExtension})`,
					'backgroundPosition': 'center top',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'contain',
          'height': '100%',
          'cursor': 'pointer'
				}}></div>
				<div className="col-xs-6" onClick={()=>{turnPage(true)}} style={{
          backgroundImage: `url(${rootUrl}/${key}/${fileRoot}${mainPage+1}.${fileExtension})`,
					'backgroundPosition': 'center top',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'contain',
          'height': '100%',
          'cursor': 'pointer'
				}}></div>
			</div>
		</div>
	);
};

export default Book;