import imageKit from "../config/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs/promises"; // <-- use promises API


/* ================================
   Change User Role → Owner
   ================================ */
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user; // user comes from auth middleware

        // Update role to 'owner'
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { role: "owner" },
            { new: true, select: "-password" } // return updated doc, exclude password
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Role updated successfully. You can now list cars.",
            user: updatedUser,
        });
    } catch (error) {
        console.log("ChangeRole Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};


/* ================================
   List Your Car (Add Car)
   - Expects multipart/form-data with:
     - carData: JSON string of car fields
     - file: image file (handled by multer as req.file)
   ================================ */
export const addCar = async (req, res) => {
  let tempFilePath = null;

  try {
    const { _id } = req.user;

    if (!req.body?.carData) {
      return res.status(400).json({ success: false, message: "carData is required." });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Car image is required." });
    }

    // parse JSON safely
    let carPayload;
    try {
      carPayload = JSON.parse(req.body.carData);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid carData JSON." });
    }

    // read file buffer (multer diskStorage)
    const imageFile = req.file;
    tempFilePath = imageFile.path;
    const fileBuffer = await fs.readFile(tempFilePath); // <-- works with fs/promises

    // upload via ImageKit (wrap callback into a Promise)
    const uploadRes = await new Promise((resolve, reject) => {
      imageKit.upload(
        {
          file: fileBuffer,
          fileName: imageFile.originalname, // correct multer field
          folder: "/cars",
        },
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });

    // optimized delivery URL
    const optimizedImageURL = imageKit.url({
      path: uploadRes.filePath,
      transformation: [{ width: 1280 }, { quality: "auto" }, { format: "webp" }],
    });

    await Car.create({ ...carPayload, owner: _id, image: optimizedImageURL });

    return res.status(201).json({ success: true, message: "Car added." });
  } catch (error) {
    console.log("Add Car Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  } finally {
    // cleanup temp file quietly
    if (tempFilePath) {
      try { await fs.unlink(tempFilePath); } catch {}
    }
  }
};
