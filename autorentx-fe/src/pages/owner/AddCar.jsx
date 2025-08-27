import React, { useRef, useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

/* Location options */
const stateCapitals = [
  { state: "Andhra Pradesh", capital: "Amaravati" },
  { state: "Arunachal Pradesh", capital: "Itanagar" },
  { state: "Assam", capital: "Dispur" },
  { state: "Bihar", capital: "Patna" },
  { state: "Chhattisgarh", capital: "Raipur" },
  { state: "Goa", capital: "Panaji" },
  { state: "Gujarat", capital: "Gandhinagar" },
  { state: "Haryana", capital: "Chandigarh" },
  { state: "Himachal Pradesh", capital: "Shimla" },
  { state: "Jharkhand", capital: "Ranchi" },
  { state: "Karnataka", capital: "Bengaluru" },
  { state: "Kerala", capital: "Thiruvananthapuram" },
  { state: "Madhya Pradesh", capital: "Bhopal" },
  { state: "Maharashtra", capital: "Mumbai" },
  { state: "Manipur", capital: "Imphal" },
  { state: "Meghalaya", capital: "Shillong" },
  { state: "Mizoram", capital: "Aizawl" },
  { state: "Nagaland", capital: "Kohima" },
  { state: "Odisha", capital: "Bhubaneswar" },
  { state: "Punjab", capital: "Chandigarh" },
  { state: "Rajasthan", capital: "Jaipur" },
  { state: "Sikkim", capital: "Gangtok" },
  { state: "Tamil Nadu", capital: "Chennai" },
  { state: "Telangana", capital: "Hyderabad" },
  { state: "Tripura", capital: "Agartala" },
  { state: "Uttar Pradesh", capital: "Lucknow" },
  { state: "Uttarakhand", capital: "Dehradun" },
  { state: "West Bengal", capital: "Kolkata" },
];

/* Select data */
const CAR_CATEGORIES = ["Sedan", "SUV", "Hatchback", "Van", "MUV"];
const TRANSMISSIONS = ["Automatic", "Manual", "Semi-Automatic"];
const FUEL_TYPES = ["Petrol", "Diesel", "Gas", "Electric", "Hybrid"];

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });

  // ---- Refs for smooth scroll to invalid field ----
  const refs = {
    image: useRef(null),
    brand: useRef(null),
    model: useRef(null),
    year: useRef(null),
    pricePerDay: useRef(null),
    category: useRef(null),
    transmission: useRef(null),
    fuel_type: useRef(null),
    seating_capacity: useRef(null),
    location: useRef(null),
    description: useRef(null),
  };

  const scrollToError = (key) => {
    const node = refs[key]?.current;
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
      // focus input inside (or the node itself)
      if (node.focus) node.focus();
      const input = node.querySelector?.("input, select, textarea");
      if (input) input.focus();
    }
  };

  const resetForm = () => {
    setImage(null);
    setCar({
      brand: "",
      model: "",
      year: "",
      pricePerDay: "",
      category: "",
      transmission: "",
      fuel_type: "",
      seating_capacity: "",
      location: "",
      description: "",
    });
  };

  const getErrMsg = (err) =>
    err?.response?.data?.message || err?.message || "Request failed";

  // Simple client-side validation — returns { message, field }
  const validate = () => {
    if (!image) return { message: "Please upload a car image.", field: "image" };
    if (!image.type?.startsWith("image/"))
      return { message: "Only image files are allowed.", field: "image" };

    if (!car.brand.trim()) return { message: "Brand is required.", field: "brand" };
    if (!car.model.trim()) return { message: "Model is required.", field: "model" };

    const yearNum = Number(car.year);
    const currentYear = new Date().getFullYear() + 1;
    if (!yearNum || yearNum < 1980 || yearNum > currentYear)
      return { message: `Year must be between 1980 and ${currentYear}.`, field: "year" };

    const priceNum = Number(car.pricePerDay);
    if (!priceNum || priceNum <= 0)
      return { message: "Daily price must be greater than 0.", field: "pricePerDay" };

    if (!car.category) return { message: "Please select a category.", field: "category" };
    if (!car.transmission)
      return { message: "Please select a transmission.", field: "transmission" };
    if (!car.fuel_type)
      return { message: "Please select a fuel type.", field: "fuel_type" };

    const seats = Number(car.seating_capacity);
    if (!seats || seats <= 0)
      return { message: "Seating capacity must be greater than 0.", field: "seating_capacity" };

    if (!car.location) return { message: "Please select a location.", field: "location" };

    if (!car.description.trim() || car.description.trim().length < 10)
      return { message: "Description should be at least 10 characters.", field: "description" };

    return null;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const error = validate();
    if (error) {
      toast.error(error.message);
      scrollToError(error.field);
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append(
        "carData",
        JSON.stringify({
          ...car,
          year: Number(car.year),
          pricePerDay: Number(car.pricePerDay),
          seating_capacity: Number(car.seating_capacity),
        })
      );

      const res = await axios.post("/api/owner/add-car", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const ok = (res.status === 201 || res.status === 200) && res.data?.success;
      if (!ok) {
        toast.error(res.data?.message || "Failed to add car.");
        return;
      }

      toast.success(res.data?.message || "Car added.");
      resetForm();
      // optionally scroll back to top of form after success
      refs.image.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      toast.error(getErrMsg(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications"
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-sm mt-6 max-w-xl text-[var(--color-text-secondary)]"
      >
        {/* Car Image */}
        <div className="flex items-center gap-2 w-full" ref={refs.image}>
          <label htmlFor="car-image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Upload Car"
              className="h-14 rounded"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </label>
          <p className="text-sm">Upload a picture of your car</p>
        </div>

        {/* Brand / Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Brand</label>
            <input
              ref={refs.brand}
              type="text"
              placeholder="e.g. Hyundai, Tata Motors, Maruti Suzuki..."
              required
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Model</label>
            <input
              ref={refs.model}
              type="text"
              placeholder="e.g. i20, Scorpio, Thar..."
              required
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Year / Price / Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Year</label>
            <input
              ref={refs.year}
              type="number"
              placeholder="2025"
              required
              min="1980"
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">
              Daily Price ({currency})
            </label>
            <input
              ref={refs.pricePerDay}
              type="number"
              placeholder="1200"
              required
              min="1"
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Category</label>
            <select
              ref={refs.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
            >
              <option value="">Select a Category</option>
              {CAR_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Transmission / Fuel / Seats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Transmission</label>
            <select
              ref={refs.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
            >
              <option value="">Select a Transmission</option>
              {TRANSMISSIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Fuel Type</label>
            <select
              ref={refs.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
            >
              <option value="">Select a fuel-type</option>
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Seating Capacity</label>
            <input
              ref={refs.seating_capacity}
              type="number"
              placeholder="04"
              required
              min="1"
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col w-full">
          <label className="text-[var(--color-text-primary)]">Location</label>
          <select
            ref={refs.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
          >
            <option value="">Select a Location</option>
            {stateCapitals.map((item) => (
              <option key={item.capital} value={item.capital}>
                {item.capital} ({item.state})
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col w-full">
          <label className="text-[var(--color-text-primary)]">Description</label>
          <textarea
            ref={refs.description}
            rows={5}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine"
            required
            className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-[var(--color-primary)] text-white rounded-md font-medium w-max cursor-pointer disabled:opacity-60"
        >
          <img src={assets.tick_icon} alt="Confirm" />
          {isLoading ? "Listing..." : "List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
