import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";

export default function CustomerEditPage(props) {
	const customerId = props.match.params.id;
	const [formData, setFormData] = useState({});
	const { customerList, setCustomerList } = useContext(UserContext);
	const customerItem = customerList.filter(
		(customer) => customer.id == customerId
	)[0];
	const history = useHistory();

	useEffect(() => {
		if (customerList.length < 1) {
			history.push(`/home/${customerId}/`);
		} else {
			setFormData(customerItem);
		}
	}, []);

	const handleOnChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`;
		const token = localStorage.getItem("MARTA_WEBB20");
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				const newCustomerList = customerList.filter(
					(customer) => customer.id != customerId
				);
				newCustomerList.push(data);
				setCustomerList(newCustomerList);
				history.push(`/home/${customerId}/`);
			});
	};

	const renderInput = (name, label, type) => {
		return (
			<div className="mb-3 form-group row">
				<label className="col-sm-2 col-form-label">{label}</label>
				<div className="col-sm-10">
					<input
						type={type || "text"}
						name={name}
						onChange={handleOnChange}
						value={formData[name] || ""}
						className="form-control "
					/>
				</div>
			</div>
		);
	};

	return (
		<div>
			<NavBar />
			<h1>Edit Customer</h1>
			{customerList ? (
				<div>
					<form onSubmit={handleOnSubmit}>
						{renderInput("name", "Customer Name")}
						{renderInput("email", "Customer Email", "email")}
						{renderInput("organisationNr", "Organisation Nr")}
						{renderInput("paymentTerm", "Payment Term", "number")}
						{renderInput("phoneNumber", "Phone Nr", "tel")}
						{renderInput("reference", "Reference")}
						{renderInput("vatNr", "VAT Nr")}
						{renderInput("website", "Website", "url")}
						<button className="btn btn-secondary" type="submit">
							Update Customer
						</button>
					</form>
					<Link className="btn btn-secondary" to="/home">
						Back
					</Link>
				</div>
			) : (
				<p>Loading data...</p>
			)}
			<Footer />
		</div>
	);
}
