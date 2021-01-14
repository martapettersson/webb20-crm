import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
	const { setCustomerList, setUser } = useContext(UserContext);
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
				getCustomerList();
				getUser();
				history.push("/home");
			});
	};

	useEffect(() => {
		console.log("anrop");
	}, []);

	//Get Customer List from the backend, since we have a verified token when we login
	const getCustomerList = () => {
		const url = "https://frebi.willandskill.eu/api/v1/customers/";
		const token = localStorage.getItem("MARTA_WEBB20");
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setCustomerList(data.results));
	};

	// Retrieve data from the backend about the user
	const getUser = () => {
		const url = "https://frebi.willandskill.eu/api/v1/me/";
		const token = localStorage.getItem("MARTA_WEBB20");
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setUser(data));
	};

	return (
		<div>
			<form onSubmit={handleOnSubmit}>
				<label>Email</label>
				<input
					name="email"
					value={formData.email}
					onChange={handleOnChange}
					type="text"
				/>
				<label>Password</label>
				<input
					name="password"
					value={formData.password}
					onChange={handleOnChange}
					type="text"
				/>
				<button type="submit">Log in</button>
			</form>
		</div>
	);
}
