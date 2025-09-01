// controllers/availabilityController.js
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// In carController.js
export const getAvailableLocations = async (req, res) => {
  try {
    const locations = await Car.distinct('location', { isAvailable: true });
    res.status(200).json({
      success: true,
      locations: locations.sort()
    });
  } catch (error) {
    console.log("GetLocations Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

/* ================================
   Helper: checkAvailability
   Returns true if no overlapping bookings exist
   ================================ */
export const checkAvailability = async (carId, pickupDate, returnDate) => {
  // Any overlap: existing.pickupDate < returnDate AND existing.returnDate > pickupDate
  const overlap = await Booking.exists({
    car: carId,
    pickupDate: { $lt: returnDate },
    returnDate: { $gt: pickupDate },
  });

  return !overlap; // true means available
};
/* ================================
   Check availability of cars for a location & date range
   ================================ */
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body || {};

    // Basic validation
    if (!location || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "location, pickupDate, and returnDate are required.",
      });
    }

    // Convert dd/mm/yyyy to Date object
    const convertToDate = (dateStr) => {
      const [day, month, year] = dateStr.split('/');
      return new Date(`${year}-${month}-${day}`);
    };

    const from = convertToDate(pickupDate);
    const to = convertToDate(returnDate);
    
    if (isNaN(from) || isNaN(to) || from >= to) {
      return res.status(400).json({
        success: false,
        message: "Invalid date range provided.",
      });
    }

    // Fetch cars in location that are marked available
    const cars = await Car.find({ location, isAvailable: true }).lean();

    if (!cars.length) {
      return res.status(200).json({
        success: true,
        message: `No cars found in ${location}.`,
        availableCars: [],
      });
    }

    // Check each car for date overlap
    const checks = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, from, to);
      return isAvailable ? car : null;
    });

    const results = await Promise.all(checks);
    const availableCars = results.filter(Boolean);

    if (!availableCars.length) {
      return res.status(200).json({
        success: true,
        message: `No cars available in ${location} for the given dates.`,
        availableCars: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: `${availableCars.length} car(s) available in ${location} for the selected dates.`,
      count: availableCars.length,
      availableCars,
    });
  } catch (error) {
    console.log("CheckAvailability Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

/* ================================
   Create Booking
   ================================ */
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user; // from auth middleware
    const { car, pickupDate, returnDate } = req.body || {};

    // Basic input validation
    if (!car || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "car, pickupDate, and returnDate are required.",
      });
    }

    // Parse and validate dates
    const from = new Date(pickupDate);
    const to = new Date(returnDate);

    if (isNaN(from) || isNaN(to)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pickupDate or returnDate.",
      });
    }
    if (from >= to) {
      return res.status(400).json({
        success: false,
        message: "returnDate must be after pickupDate.",
      });
    }

    // Ensure car exists and is generally available
    const carData = await Car.findById(car).lean();
    if (!carData) {
      return res.status(404).json({
        success: false,
        message: "Car not found.",
      });
    }
    if (!carData.isAvailable) {
      return res.status(409).json({
        success: false,
        message: "Car is currently unavailable.",
      });
    }

    // Date-range availability check (overlap-aware)
    const isAvailable = await checkAvailability(car, from, to);
    if (!isAvailable) {
      return res.status(409).json({
        success: false,
        message: "Car is not available for the selected dates.",
      });
    }

    // Calculate number of days (ceiling to next full day)
    const msPerDay = 1000 * 60 * 60 * 24;
    const noOfDays = Math.ceil((to - from) / msPerDay);
    const price = carData.pricePerDay * noOfDays;

    // Create booking
    const booking = await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate: from,
      returnDate: to,
      price,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      bookingId: booking._id,
      price,
      days: noOfDays,
    });
  } catch (error) {
    console.log("CreateBooking Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

/* ================================
   getUserBookings
   ================================ */
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user; // set by auth middleware

    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 })
      .lean();

    if (!bookings.length) {
      return res.status(200).json({
        success: true,
        message: "You have no bookings yet.",
        count: 0,
        bookings: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: `${bookings.length} booking(s) found.`,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log("GetUserBookings Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

/* ================================
   Get all bookings for current owner
   ================================ */
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user?.role !== "owner") {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }

    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car")
      .populate({ path: "user", select: "-password" })
      .sort({ createdAt: -1 })
      .lean();

    if (!bookings.length) {
      return res.status(200).json({
        success: true,
        message: "No bookings found for this owner.",
        count: 0,
        bookings: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: `${bookings.length} booking(s) found.`,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log("GetOwnerBookings Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error. Please try again later." });
  }
};

/* ================================
   Change booking status (owner-only)
   Body: { bookingId, status }
   ================================ */
const ALLOWED_STATUSES = ["pending", "cancelled", "confirmed"];

export const changeBookingStatus = async (req, res) => {
  try {
    const ownerId = req.user?._id;
    const { bookingId, status } = req.body || {};

    // Basic validation
    if (!bookingId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "bookingId and status are required." });
    }
    if (!ALLOWED_STATUSES.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value." });
    }

    // Find booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }

    // Ownership check
    if (booking.owner.toString() !== ownerId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }

    // No-op check
    if (booking.status === status) {
      return res.status(200).json({
        success: true,
        message: `Status is already '${status}'.`,
        status: booking.status,
      });
    }

    // Update & save
    booking.status = status;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: `Booking status updated to '${status}'.`,
      status: booking.status,
      bookingId: booking._id,
    });
  } catch (error) {
    console.log("ChangeBookingStatus Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error. Please try again later." });
  }
};


