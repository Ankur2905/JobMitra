import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "6-month-intern", "2-month-intern"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "Bangalore",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
