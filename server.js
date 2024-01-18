const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
const username = encodeURIComponent("user");
const password = encodeURIComponent("user1234");

// MongoDB connection string (Replace placeholders with your MongoDB Atlas credentials)
const uri = `mongodb+srv://${username}:${password}@cluster0.dtzreev.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

app.use(cors());

// Connect to MongoDB
async function connectToMongo() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}

connectToMongo();

// Express routes

// Get all family members
app.get("/members", async (req, res) => {
	const db = client.db("familytree");
	const familyMembers = await db.collection("familymember").find({}).toArray();
	res.json(familyMembers);
});

// Add a new family member
app.post("/new-member", express.json(), async (req, res) => {
	const db = client.db("familytree");
	const newFamilyMember = req.body; // Assuming you send JSON body with relevant family member details
	await db.collection("familymember").insertOne(newFamilyMember);
	res.status(201).json(newFamilyMember);
});

app.put("/update-member/:id", express.json(), async (req, res) => {
	const db = client.db("familytree");
	const id = req.params.id;
	const updatedMember = req.body;
	await db
		.collection("familymember")
		.updateOne({ id: id }, { $set: updatedMember });
	res.sendStatus(204);
});

app.delete("/delete-member/:id", async (req, res) => {
	const db = client.db("familytree");
	const id = req.params.id;
	await db.collection("familymember").deleteOne({ id: id });
	res.sendStatus(204);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
