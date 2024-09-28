import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import ButtomWarning from "../components/BottomWarning";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleClick = async (e) => {
		e.preventDefault();
		const response = await axios.post(
			"http://localhost:3000/api/v1/user/signup",
			{
				username,
				password,
				firstName,
				lastName,
			}
		);
		localStorage.setItem("token", response.data.token);
		navigate("/dashboard");
		toast.success(response.data.message);
	};

	return (
		<div className='bg-slate-300 h-screen flex justify-center'>
			<div className='flex flex-col justify-center'>
				<div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
					<Heading label={"Sign up"} />
					<SubHeading label={"Enter your infromation to create an account"} />
					<InputBox
						placeholder='John'
						label={"First Name"}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<InputBox
						placeholder='Doe'
						label={"Last Name"}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<InputBox
						placeholder='harkirat@gmail.com'
						label={"Email"}
						onChange={(e) => setUserName(e.target.value)}
					/>
					<InputBox
						placeholder='123456'
						label={"Password"}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className='pt-4'>
						<Toaster richColors />
						<Button
							label={"Sign up"}
							onClick={handleClick}
						/>
					</div>
					<ButtomWarning
						label={"Already have an account?"}
						buttonText={"Sign in"}
						to={"/signin"}
					/>
				</div>
			</div>
		</div>
	);
};

export default Signup;
