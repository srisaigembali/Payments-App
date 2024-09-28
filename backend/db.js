import { connect } from "mongoose";

const Connection = async (url) => {
	try {
		await connect(url);
		console.log("Database connected successfully...");
	} catch (error) {
		console.log("Error while connecting with the database ", error);
	}
};

export default Connection;
