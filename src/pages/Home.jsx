import { useEffect, useState } from "react";
import http from "../services/http";
import Lottie from "lottie-react";
import gasAnim from "../assets/animations/gasoline.json";
import reviewSentAnim from "../assets/animations/reviewSent.json";

import store1 from "../assets/store/hotbox.jpeg";
import store2 from "../assets/store/fishing.jpeg";
import store3 from "../assets/store/gator.jpeg";
import store4 from "../assets/store/alley1.jpeg";
import store5 from "../assets/store/alley2.jpeg";
import store6 from "../assets/store/cigs.jpeg";
import store7 from "../assets/store/liquor.jpeg";
import store8 from "../assets/store/pump.jpeg";
import storefrontImg from "../assets/store/storefront.jpeg";

export default function Home() {
  const [fuel, setFuel] = useState(null);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showMailAnim, setShowMailAnim] = useState(false);

  const [form, setForm] = useState({
    name: "",
    location: "",
    message: "",
  });

  const images = [
    store1,
    store2,
    store3,
    store4,
    store5,
    store6,
    store7,
    store8,
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

  const submitReview = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a star rating");
      return;
    }

    setSubmitting(true);
    setShowMailAnim(true);

    try {
      const res = await http.post("/reviews", {
        ...form,
        rating,
      });

      const updatedReviews = [res.data, ...reviews];
      setReviews(updatedReviews);

      // show the newly submitted review first in slideshow
      setCurrentReview(0);

      setForm({ name: "", location: "", message: "" });
      setRating(0);

      setTimeout(() => {
        setShowMailAnim(false);
      }, 4000);
    } catch {
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    Promise.all([http.get("/fuel"), http.get("/reviews")])
      .then(([fuelRes, reviewsRes]) => {
        setFuel(fuelRes.data);
        setReviews(reviewsRes.data);
      })
      .catch(() => setError(true));
  }, []);

  // auto slideshow timer
  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentReview((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <>
      {/* HERO */}
      <section className="bg-blue-700 text-white py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 justify-between">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to Circle A Foods</h1>
            <p className="text-blue-100 text-lg mb-8">
              Your local convenience store and gas station — fast, friendly, and always stocked. We also do fishing license.
            </p>

            <div className="flex gap-4">
              <a
                href="/deli"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow"
              >
                Deli
              </a>
              <a
                href="/deals"
                className="bg-red-600 px-6 py-3 rounded-lg font-semibold shadow"
              >
                Today’s Deals
              </a>
            </div>
          </div>

          {/* GAS */}
          <div className="bg-black/60 backdrop-blur p-6 rounded-2xl flex gap-6 shadow-2xl max-w-md w-full">
            <Lottie animationData={gasAnim} loop className="w-32 h-32" />

            <div className="flex-1">
              <span className="bg-yellow-500 text-black px-4 py-1 text-sm font-bold rounded">
                GAS
              </span>

              {!fuel && !error && <p className="text-gray-300 mt-4">Loading...</p>}
              {error && <p className="text-red-400 mt-4">Unable to load prices</p>}

              {fuel && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-red-400">UNLEADED</span>
                    <span className="text-red-400 text-3xl font-mono font-bold">
                      ${Number(fuel.regular).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-green-300">DIESEL</span>
                    <span className="text-green-300 text-3xl font-mono font-bold">
                      ${Number(fuel.diesel).toFixed(2)}
                    </span>
                  </div>

                  {fuel.updatedAt && (
                    <p className="text-xs text-gray-300">
                      Updated {new Date(fuel.updatedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STOREFRONT */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <img
            src={storefrontImg}
            alt="Circle A Foods"
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* SLIDESHOW */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Inside the Store</h2>
        <p className="text-gray-600 mb-8">
          Snacks, drinks, fishing gear, and more — all under one roof.
        </p>

        <div className="relative max-w-6xl mx-auto">
          <img
            src={images[currentImage]}
            alt="Inside Store"
            className="w-full max-h-[500px] object-cover rounded-xl shadow-lg"
          />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 bg-black/60 text-white px-4 py-2 rounded-full"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 bg-black/60 text-white px-4 py-2 rounded-full"
          >
            ▶
          </button>

          <p className="mt-4 text-sm text-gray-500">
            {currentImage + 1} / {images.length}
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-gray-100 py-20 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">📍 Contact & Location</h2>
            <p>
              <strong>Address:</strong>
              <br />
              905 Main Street
              <br />
              Hackberry, LA 70645
            </p>
            <p className="mt-4">
              <strong>Hours:</strong>
              <br />
              Daily • 7 AM – 9 PM
            </p>
            <p className="mt-4">
              <strong>Phone:</strong>
              <br />
              (337) 762-4150
            </p>
          </div>

          <div className="h-80 rounded-xl overflow-hidden shadow flex items-center justify-center">
            {isIOS() ? (
              <a
                href="https://maps.apple.com/?q=905+Main+Street+Hackberry+LA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-lg"
              >
                Open in Apple Maps
              </a>
            ) : (
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=905+Main+Street+Hackberry+LA&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">⭐ Give Us a Review</h2>

          {showMailAnim && (
            <div className="flex flex-col items-center mb-6">
              <Lottie animationData={reviewSentAnim} loop={false} className="w-40 h-40" />
              <p className="text-green-600 font-semibold mt-2">Review sent successfully!</p>
            </div>
          )}

          <form onSubmit={submitReview} className="bg-gray-100 p-6 rounded-xl shadow space-y-4">
            <input
              placeholder="Your Name *"
              className="w-full p-3 rounded border"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              placeholder="Where are you from? (Optional)"
              className="w-full p-3 rounded border"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            {/* STARS */}
            <div>
              <label className="block mb-2 font-semibold">Rate Us</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className={`text-3xl transition ${
                      s <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                    }`}
                    aria-label={`${s} star`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {rating === 0 && (
                <p className="text-sm text-gray-500 mt-1">Click to rate (1–5 stars)</p>
              )}
            </div>

            <textarea
              placeholder="Your review..."
              className="w-full p-3 rounded border h-32"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />

            <button
              disabled={submitting}
              className={`px-6 py-3 rounded font-semibold text-white transition ${
                submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>

          {/* ✅ ONLY SLIDESHOW (no list) */}
          {reviews.length > 0 && (
            <div className="mt-10 bg-gray-100 rounded-2xl p-8 shadow text-center">
              <h2 className="text-3xl font-bold mb-8 text-center">What Customers are Saying About US</h2>
              <p className="text-xl font-semibold mb-2">
                {reviews[currentReview].name}
                {reviews[currentReview].location && (
                  <span className="text-sm text-gray-500">
                    {" "}
                    • {reviews[currentReview].location}
                  </span>
                )}
              </p>

              <div className="flex justify-center text-yellow-400 text-2xl mb-4">
                {[...Array(reviews[currentReview].rating || 5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                “{reviews[currentReview].message}”
              </p>

              {reviews.length > 1 && (
                <div className="flex justify-center gap-6 mt-6">
                  <button
                    onClick={() =>
                      setCurrentReview(
                        currentReview === 0 ? reviews.length - 1 : currentReview - 1
                      )
                    }
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    ◀
                  </button>

                  <button
                    onClick={() =>
                      setCurrentReview(
                        currentReview === reviews.length - 1 ? 0 : currentReview + 1
                      )
                    }
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    ▶
                  </button>
                </div>
              )}

              {reviews.length > 1 && (
                <p className="text-xs text-gray-500 mt-4">
                  {currentReview + 1} / {reviews.length}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        © {new Date().getFullYear()} Circle A Foods. All rights reserved.
      </footer>
    </>
  );
}
