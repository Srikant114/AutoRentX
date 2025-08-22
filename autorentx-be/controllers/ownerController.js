import imageKit from "../config/imageKit.js";
import Booking from "../models/Booking.js";
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

/* ================================
   Get Car Details → Owner
   ================================ */
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user; // user id from auth middleware

    // Fetch all cars owned by this user
    const cars = await Car.find({ owner: _id });

    return res.status(200).json({
      success: true,
      count: cars.length,
      cars,
    });
  } catch (error) {
    console.log("GetOwnerCars Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

/* ================================
   Toggle Avaibility → Owner
   ================================ */
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    // Validate input
    if (!carId) {
      return res.status(400).json({ success: false, message: "carId is required." });
    }

    // Find car
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found." });
    }

    // Ensure the car belongs to the requesting user
    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }

    // Toggle availability
    car.isAvailable = !car.isAvailable;
    await car.save();

    return res.status(200).json({
      success: true,
      message: `Car is now ${car.isAvailable ? "available" : "unavailable"}.`,
      isAvailable: car.isAvailable,
    });
  } catch (error) {
    console.log("ToggleCarAvailability Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/* ================================
   Delete Car → Owner
   ================================ */
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;   // from auth middleware
    const { carId } = req.body; // expects { carId }

    // Validate input
    if (!carId) {
      return res.status(400).json({ success: false, message: "carId is required." });
    }

    // Find the car
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found." });
    }

    // Ownership check
    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }

    // Delete the car document
    await Car.deleteOne({ _id: carId });

    return res.status(200).json({
      success: true,
      message: "Car deleted successfully.",
      deletedId: carId,
    });
  } catch (error) {
    console.log("DeleteCar Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


/* ================================
   Dashboard Data → Owner
   ================================ */
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Fetch cars and bookings
    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    // Count statuses
    const pendingBookings = bookings.filter(b => b.status === "pending");
    const confirmedBookings = bookings.filter(b => b.status === "confirmed");

    // Calculate revenue from confirmed bookings
    const monthlyRevenue = confirmedBookings.reduce((sum, b) => sum + b.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: confirmedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      dashboardData,
    });
  } catch (error) {
    console.log("GetDashboardData Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


export const updateUserImage = async (req, res) => {
  let tempFilePath = null;

  try {
    const { _id } = req.user;

    // Validate file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required.",
      });
    }

    const imageFile = req.file;
    tempFilePath = imageFile.path;

    // Read uploaded file
    const fileBuffer = await fs.readFile(tempFilePath);

    // Upload to ImageKit (wrap callback for Promise)
    const uploadRes = await new Promise((resolve, reject) => {
      imageKit.upload(
        {
          file: fileBuffer,
          fileName: imageFile.originalname,
          folder: "/users",
        },
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });

    // Build optimized URL
    const optimizedImageURL = imageKit.url({
      path: uploadRes.filePath,
      transformation: [
        { width: 400 },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    // Update user document
    await User.findByIdAndUpdate(_id, { image: optimizedImageURL });

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully.",
      image: optimizedImageURL,
    });
  } catch (error) {
    console.log("UpdateUserImage Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  } finally {
    // Clean up temporary file if exists
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch {
        // Ignore cleanup errors
      }
    }
  }
};

