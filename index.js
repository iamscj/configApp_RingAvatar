import express from "express";
import cors from "cors";

const app = express();

// In-memory variable to act as a key-value store
let keyValueStore = {
    selectedModel: "GIRL",
};

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());

// API endpoint to read a value by key
app.get("/get/:key", (req, res) => {
    const { key } = req.params;
    const value = keyValueStore[key];

    if (value !== undefined) {
        res.json({ key, value });
    } else {
        res.status(404).json({ error: "Key not found" });
    }
});

// API endpoint to write a value for a given key
app.post("/set/:key", (req, res) => {
    const { key } = req.params;
    const { value } = req.body;

    keyValueStore[key] = value;
    res.json({ message: "Key-value pair saved", key, value });
});

// API endpoint to delete a key-value pair
app.delete("/delete/:key", (req, res) => {
    const { key } = req.params;

    if (keyValueStore[key] !== undefined) {
        delete keyValueStore[key];
        res.json({ message: "Key deleted", key });
    } else {
        res.status(404).json({ error: "Key not found" });
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT ${PORT}`);
});
