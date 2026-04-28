import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    imageUrl: { type: String },
    sampleImages: [
      {
        heading: { type: String, trim: true, default: '' },
        url: { type: String, required: true, trim: true },
      },
    ],
    liveUrl: { type: String },
    githubUrl: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
