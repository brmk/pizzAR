import React from "react";
import { PropTypes } from "prop-types";
import { FlowRouter } from "meteor/kadira:flow-router";

const SignIn = props => {
	const { handleLogin } = props;

	return (
		<div className="sign-in container">
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					<div className="login-box">
						<h3 className="text-center">Sign in</h3>
						<form
							id="login-form"
							onSubmit={e => {
								e.preventDefault();
								handleLogin(e.target);
							}}
						>
							<div className="form-group">
								<input
									name="email"
									className="form-control full-width"
									type="email"
									placeholder="Email address"
									required="true"
								/>
							</div>
							<div className="form-group">
								<input
									name="password"
									className="form-control full-width"
									type="password"
									placeholder="Password"
									required="true"
								/>
							</div>
							<div className="text-left">
								<button type="submit" className="btn">
									Sign in
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
