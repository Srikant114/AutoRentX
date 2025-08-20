import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";

/* Common Indian state capitals for Location select */
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

/* Related data for simple selects (kept minimal) */
const CAR_CATEGORIES = ["Sedan", "SUV", "Hatchback", "Van", "MUV"];
const TRANSMISSIONS = ["Automatic", "Manual", "Semi-Automatic"];
const FUEL_TYPES = ["Petrol", "Diesel", "Gas", "Electric", "Hybrid"];

const AddCar = () => {
  // Currency symbol from env
  const currency = import.meta.env.VITE_CURRENCY;

  // Local state for image preview
  const [image, setImage] = useState(null);

  // Car form state (kept simple)
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });

  // Basic submit handler (no extra features)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // You can wire this to your API later
  };

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      {/* Page Title */}
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications"
      />

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-sm mt-6 max-w-xl text-[var(--color-text-secondary)]"
      >
        {/* Car Image */}
        <div className="flex items-center gap-2 w-full">
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
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm">
            Upload a picture of your car
          </p>
        </div>

        {/* Car Brand and Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Brand</label>
            <input
              type="text"
              placeholder="e.g. Hyundai, Tata Motors, Maruti Suzuki..."
              required
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
              value={car?.brand || ""}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Model</label>
            <input
              type="text"
              placeholder="e.g. i20, Scorpio, Thar..."
              required
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
              value={car?.model || ""}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Car Year, Price & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Year</label>
            <input
              type="number"
              placeholder="2025"
              required
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
              value={car?.year || ""}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">
              Daily Price ({currency})
            </label>
            <input
              type="number"
              placeholder="1200"
              required
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
              value={car?.pricePerDay || ""}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">Category</label>
            <select
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

        {/* Transmission, Fuel Type, Seating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="text-[var(--color-text-primary)]">
              Transmission
            </label>
            <select
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
            <label className="text-[var(--color-text-primary)]">
              Seating Capacity
            </label>
            <input
              type="number"
              placeholder="04"
              required
              className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
              value={car?.seating_capacity || ""}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Car Location */}
        <div className="flex flex-col w-full">
          <label className="text-[var(--color-text-primary)]">Location</label>
          <select
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

        {/* Car Description */}
        <div className="flex flex-col w-full">
          <label className="text-[var(--color-text-primary)]">Description</label>
          <textarea
            rows={5}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine"
            required
            className="px-3 py-2 mt-1 border border-[var(--color-borderColor)] rounded-md outline-none"
            value={car?.description || ""}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-[var(--color-primary)] text-white rounded-md font-medium w-max cursor-pointer"
        >
          <img src={assets.tick_icon} alt="Confirm" />
          List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
