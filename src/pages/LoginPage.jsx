import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
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
				history.push("/home");
			});
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
