import { Schema, model } from "mongoose";

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            default: "",
            trim: true
        },
        tag: {
            type: String,
            default: "Todo",
            enum: ["Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important", "Todo"]
        },
    },
    {
        timestamps: true,
    }
);

noteSchema.index({
  title: 1,
  content: 1,
  tag: 1,
});

export const Note = model("Note", noteSchema);