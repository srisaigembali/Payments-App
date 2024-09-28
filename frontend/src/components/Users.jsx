import React, { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

const Users = () => {
	const [users, setUsers] = useState([
		{
			firstName: "harkirat",
			lastName: "singh",
			_id: 1,
		},
	]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
			.then((response) => {
				setUsers(response.data.users);
			});
	}, [filter]);

	return (
		<>
			<div className='font-bold mt-6 text-lg'>Users</div>
			<div className='my-2'>
				<input
					type='text'
					placeholder='Search users...'
					className='w-full px-2 py-1 border rounded border-slate-200'
					onChange={(e) => setFilter(e.target.value)}
				></input>
			</div>
			<div>
				{users?.map((user, index) => (
					<User
						user={user}
						key={index}
					/>
				))}
			</div>
		</>
	);
};

export default Users;
