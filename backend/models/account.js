import mongoose from "mongoose";

const accoutSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	balance: {
		type: Number,
		required: true,
	},
});

const Account = mongoose.model("account", accoutSchema);

export default Account;
