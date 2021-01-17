import styled from "styled-components";

export const ButtonStyled = styled.button`
	margin-right: 0.5rem;
	padding: 0.5rem;
	box-shadow: inset 0px 1px 0px 0px #ffffff;
	background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
	background-color: #ededed;
	border-radius: 6px;
	border: 1px solid #dcdcdc;
	display: inline-block;
	cursor: pointer;
	color: #777777;
	font-family: Arial;
	font-size: 1rem;
	font-weight: bold;
	text-decoration: none;
	text-shadow: 0px 1px 0px #ffffff;
	text-transform: uppercase;
	&:hover,
	&:focus {
		background: linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
		background-color: #dfdfdf;
		outline-color: #dcdcdc;
	}
	&:active {
		position: relative;
		top: 1px;
	}
`;

export const ButtonEditStyled = styled(ButtonStyled)`
	box-shadow: inset 0px 1px 0px 0px #d9fbbe;
	background: linear-gradient(to bottom, #b8e356 5%, #a5cc52 100%);
	background-color: #b8e356;
	border: 1px solid #83c41a;
	color: #ffffff;
	text-shadow: 0px 1px 0px #86ae47;
	&:hover,
	&:focus {
		background: linear-gradient(to bottom, #a5cc52 5%, #b8e356 100%);
		background-color: #a5cc52;
	}
`;

export const ButtonDeleteStyled = styled(ButtonStyled)`
	box-shadow: inset 0px 1px 0px 0px #f5978e;
	background: linear-gradient(to bottom, #f24537 5%, #c62d1f 100%);
	background-color: #f24537;
	color: #ffffff;
	border: 1px solid #d02718;
	text-shadow: 0px 1px 0px #810e05;
	&:hover,
	&:focus {
		background: linear-gradient(to bottom, #c62d1f 5%, #f24537 100%);
		background-color: #c62d1f;
	}
`;

// font-size: ${(props) => 10 + props.counter}px;
// 	padding: 1rem 1.6rem;
// 	background: ${(props) => (props.sweden ? "blue" : "black")};
// 	color: ${(props) => (props.sweden ? "yellow" : "white")};
// 	font-weight: bold;
// 	font-family: "Courier New", Courier, monospace;
// 	&:hover {
// 		background: white;
// 		color: black;
