import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { User } from "../models/user.js";
import createHttpError from "http-errors";

export const updateUserAvatar = async (req, res, next) => {
  // Перевірка наявності файлу
  if (!req.file) {
    return next(createHttpError(400, 'No file'));
  }

    try {
      const result = await saveFileToCloudinary(req.file.buffer, req.user._id);
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: result.secure_url },
    { returnDocument: "after" },
        );
    if (!updatedUser) {
    return next(createHttpError(404, 'User not found'));
    }
   res.status(200).json({ url: updatedUser.avatar });
    } catch (error) {
    next(error);
    }
};