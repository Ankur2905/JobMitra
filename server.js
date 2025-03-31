import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "Amazon", position: "SDE" },
  { id: nanoid(), company: "Google", position: "Frontend Developer" },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello There...");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

// Get All Jobs
app.get("/api/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

// Create Job
app.post("/api/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: "Please provide all details" });
    return;
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
});

// Get Single Job
app.get("/api/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `No job with ID ${id}` });
    return;
  }
  res.status(200).json({ job });
});

// Edit Job
app.patch("/api/jobs/:id", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: "Please provide all details" });
    return;
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `No job with ID ${id}` });
    return;
  }
  job.company = company;
  job.position = position;

  res.status(200).json({ msg: "job modified", job });
});

// Delete Job
app.delete("/api/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `No job with ID ${id}` });
    return;
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: "Job deleted" });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on PORT ${port}...`);
});
