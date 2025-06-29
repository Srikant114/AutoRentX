import React from 'react';
import Title from './Title';
import { assets } from '../assets/assets';

const Testimonial = () => {
  // ---------- Dummy Testimonials ----------
  const testimonials = [
    {
      name: "Rajesh Sharma",
      location: "Delhi, India",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial: "AutoRentX made my business trip stress-free. Their cars are always clean and ready on time."
    },
    {
      name: "Priya Menon",
      location: "Bangalore, India",
      image: assets.testimonial_image_2,
      rating: 4,
      testimonial: "I booked a Creta for the weekend, and the process was so smooth! Will definitely use again."
    },
    {
      name: "Aniket Joshi",
      location: "Mumbai, India",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial: "The best rental experience I’ve had in India. Transparent pricing and amazing car condition."
    },
    {
      name: "Meera Iyer",
      location: "Chennai, India",
      image: assets.testimonial_image_2,
      rating: 4,
      testimonial: "Customer service was quick to respond. I loved the Mahindra Thar – perfect for the hills!"
    }
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 bg-light">
      {/* ---------- Section Title ---------- */}
      <Title
        title="What Our Customers Say"
        subTitle="Hear real stories from people who’ve experienced the comfort, style, and ease of AutoRentX."
      />

      {/* ---------- Testimonials Grid ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1.5 transition-all duration-500"
          >
            {/* ---------- Customer Info ---------- */}
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-lg font-medium text-text-primary">{testimonial.name}</p>
                <p className="text-sm text-text-secondary">{testimonial.location}</p>
              </div>
            </div>

            {/* ---------- Star Ratings ---------- */}
            <div className="flex items-center gap-1 mt-4">
              {Array(testimonial.rating).fill(0).map((_, index) => (
                <img key={index} src={assets.star_icon} alt="rating" />
              ))}
              {/* Static 5-star example (previous approach) */}
              {/* {Array(5).fill(0).map((_, index) => (
                <img key={index} src={assets.star_icon} alt='rating'/>
              ))} */}
            </div>

            {/* ---------- Testimonial Content ---------- */}
            <p className="text-sm text-text-secondary max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
