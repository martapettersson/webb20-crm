import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ButtonStyled } from "../components/ButtonStyled";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
	const { getCustomerList, getUser, setLoginAlert } = useContext(UserContext);
	const [formData, setFormData] = useState({
		email: "Marta.Pettersson@yh.nackademin.se",
		password: "reactjsrules",
	});
	const history = useHistory();

	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleOnSubmit = (e) => {
		e.preventDefault();
		const url = "https://frebi.willandskill.eu/api-token-auth/";
		const payload = {
			email: formData.email,
			password: formData.password,
		};
		fetch(url, {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				localStorage.setItem("MARTA_WEBB20", data.token);
				setLoginAlert("login");
				getCustomerList();
				console.log("1 anrop");
				getUser();
				history.push("/home");
			});
	};

	return (
		<div>
			<h2>Welcome to CRM by Marta Pettersson</h2>
			<h4>Log in</h4>
			<form onSubmit={handleOnSubmit}>
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						name="email"
						value={formData.email}
						onChange={handleOnChange}
						type="text"
						className="form-control"
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						name="password"
						value={formData.password}
						onChange={handleOnChange}
						type="text"
						className="form-control"
					/>
				</div>
				<ButtonStyled type="submit">Log in</ButtonStyled>
			</form>
		</div>
	);
}
