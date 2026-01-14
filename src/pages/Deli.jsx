import Lottie from "lottie-react";

import pizzaAnim from "../assets/animations/pizza.json";
import gamingAnim from "../assets/animations/gaming.json";
import diningAnim from "../assets/animations/dining.json";

// 📸 REAL PHOTOS
import diningImg from "../assets/deli/dining.jpeg";
import gamingImg1 from "../assets/deli/gaming1.jpeg";
import gamingImg2 from "../assets/deli/gaming2.jpeg";
import menuImg from "../assets/deli/menu.webp";

export default function Deli() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="bg-blue-700 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mr A's Deli
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Hot food, comfortable dining, and entertainment.
          </p>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* PIZZA */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
            <Lottie animationData={pizzaAnim} loop className="h-40 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-3">
              🍕 Hunt Brothers® Pizza
            </h2>
            <p className="text-gray-700">
              Fresh, hot, and made to order. Perfect for lunch, dinner,
              or a late-night craving.
            </p>
            <p className="mt-4 font-semibold text-red-600">
              Always hot. Always delicious.
            </p>
          </div>

          {/* DINING */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
            <Lottie animationData={diningAnim} loop className="h-40 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-3">
              🍽️ Dine In Comfort
            </h2>
            <p className="text-gray-700">
              Sit down, relax, and enjoy your meal in our clean and
              welcoming deli.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Clean • Comfortable • Convenient
            </p>
          </div>

          {/* GAMING */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
            <Lottie animationData={gamingAnim} loop className="h-40 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-3">
              🎰 Louisiana Video Gaming
            </h2>
            <p className="text-gray-700">
              Enjoy Louisiana Video Gaming right inside our deli.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Must be 21+. Please play responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ORDER */}
      <section className="bg-red-600 text-white py-16 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          📞 Call to Order
        </h2>
        <p className="text-lg mb-6">
          Order fresh pizza, wings, and bites today
        </p>
        <a
          href="tel:13377624150"
          className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl text-xl font-bold shadow hover:bg-gray-100 transition"
        >
          (337) 762-4150
        </a>

        <p className="mt-4 text-sm text-red-100">
          Deli Hours: 8 AM - 8 PM · Open 7 Days a Week
        </p>
      </section>

      {/* MENU */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto">

          <img
            src={menuImg}
            alt="Hunt Brothers Pizza Menu"
            className="w-full rounded-2xl shadow-lg mb-10"
          />
          
          <h2 className="text-3xl font-bold mb-8 text-center">
            🍕 Deli Menu
          </h2>

          {/* PIZZA MENU */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
              Pizza
            </h3>
            <ul className="space-y-3 text-lg">
              <li className="flex justify-between"><span>12” Whole Pizza</span><span>$11.99</span></li>
              <li className="flex justify-between"><span>Thin Crust Pizza</span><span>$11.99</span></li>
              <li className="flex justify-between"><span>Breakfast Pizza (12”)</span><span>$12.99</span></li>
              <li className="flex justify-between"><span>2nd Pizza (Same Order)</span><span>$10.99</span></li>
              <li className="flex justify-between"><span>Add Extra Cheese</span><span>$2.19</span></li>
            </ul>
          </div>

          {/* WINGS */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
              Wings & Bites
            </h3>
            <ul className="space-y-3 text-lg">
              <li className="flex justify-between"><span>WingBites – Single</span><span>$3.39</span></li>
              <li className="flex justify-between"><span>WingBites – Double</span><span>$6.19</span></li>
              <li className="flex justify-between"><span>WingBites – Party Size</span><span>$14.99</span></li>
              <li className="flex justify-between"><span>Bone-In Wings – Single</span><span>$4.99</span></li>
              <li className="flex justify-between"><span>Bone-In Wings – Double</span><span>$9.19</span></li>
              <li className="flex justify-between"><span>Bone-In Wings – Party Size</span><span>$22.49</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 📸 DINING PHOTOS */}
      <section className="py-20 px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            🍽️ Deli Dining Area
          </h2>
          <img
            src={diningImg}
            alt="Deli Dining Area"
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* 📸 VIDEO GAMING PHOTOS */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            🎰 Louisiana Video Gaming
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <img
              src={gamingImg1}
              alt="Video Gaming Machine"
              className="w-full rounded-2xl shadow-lg"
            />
            <img
              src={gamingImg2}
              alt="Video Gaming Area"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Must be 21+. Please play responsibly.
          </p>
        </div>
      </section>
    </div>
  );
}
