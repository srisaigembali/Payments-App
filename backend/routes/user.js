import express from "express";
import zod from "zod";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth.js";
import Account from "../models/account.js";

const router = express.Router();

const signupBody = zod.object({
	username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string(),
});

router.post("/signup", async (req, res) => {
	const { success } = signupBody.safeParse(req.body);
	if (!success) {
		return res.status(411).json({
			message: "Email already taken / Incorrect inputs",
		});
	}

	const { username, password, firstName, lastName } = req.body;

	const existingUser = await User.findOne({
		username,
	});

	if (existingUser) {
		return res.status(411).json({
			message: "Email already taken/Incorrect inputs",
		});
	}

	const user = await User.create({
		username,
		password,
		firstName,
		lastName,
	});

	// create new account for the user with some initial balance
	const userId = user._id;
	const balance = 1 + Math.random() * 10000;

	await Account.create({
		userId,
		balance: balance.toFixed(2),
	});

	const token = jwt.sign(
		{
			userId,
		},
		process.env.JWT_SECRET
	);

	res.json({
		message: "User created successfully",
		token: "Bearer " + token,
	});
});

const signinBody = zod.object({
	username: zod.string().email(),
	password: zod.string(),
});

router.post("/signin", async (req, res) => {
	const { success } = signinBody.safeParse(req.body);
	if (!success) {
		return res.status(411).json({
			message: "Email already taken / Incorrect inputs",
		});
	}

	const user = await User.findOne({
		username: req.body.username,
		password: req.body.password,
	});

	if (user) {
		const token = jwt.sign(
			{
				userId: user._id,
			},
			process.env.JWT_SECRET
		);

		res.json({
			token: "Bearer " + token,
		});
		return;
	}

	res.status(411).json({
		message: "Error while logging in",
	});
});

const updateBody = zod.object({
	password: zod.string().optional(),
	firstName: zod.string().optional(),
	lastName: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
	const { success } = updateBody.safeParse(req.body);
	if (!success) {
		res.status(411).json({
			message: "Error while updating information",
		});
	}

	await User.updateOne({ _id: req.userId }, req.body);

	res.json({
		message: "Updated successfully",
	});
});

router.get("/bulk", async (req, res) => {
	const filter = req.query.filter;
	const users = await User.find({
		$or: [
			{
				firstName: {
					$regex: filter,
				},
			},
			{
				lastName: {
					$regex: filter,
				},
			},
		],
	});

	if (!users) {
		res.status(411).json({
			message: "Error while getting users",
		});
	}

	res.json({
		users: users.map((user) => ({
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			_id: user._id,
		})),
	});
});

export { router };
