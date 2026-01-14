import { useEffect, useState } from "react";
import http from "../services/http";
import AdminLogin from "./AdminLogin";

export default function Admin() {
  const token = localStorage.getItem("adminToken");

  const AUTO_LOGOUT_TIME = 30 * 60 * 1000;

  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("adminToken");
        window.location.reload();
      }, AUTO_LOGOUT_TIME);
    };

    // User activity events
    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach(event => {
      window.addEventListener(event, resetTimer)
    });

    // Start timer immediately
    resetTimer();

    return () => {
      clearTimeout(logoutTimer);
      events.forEach(event => 
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);

  const [deals, setDeals] = useState([]);
  const [fuel, setFuel] = useState({ regular: "", diesel: "" });

  const [form, setForm] = useState({
    product: "",
    size: "",
    dealPrice: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  /* 🔐 LOCK ADMIN */
  if (!token) {
    return <AdminLogin onLogin={() => window.location.reload()} />;
  }

  /* AUTH HEADER */
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  /* FETCH DEALS */
  const loadDeals = async () => {
    const res = await http.get("/deals", auth);
    setDeals(res.data); // ✅ FIXED
  };

  /* FETCH FUEL */
  const loadFuel = async () => {
    const res = await http.get("/fuel", auth);
    setFuel(res.data);
  };

  useEffect(() => {
    loadDeals();
    loadFuel();
    loadReviews();
  }, []);

  /* SAVE FUEL */
  const saveFuel = async () => {
    await http.post(
      "/fuel",
      { regular: fuel.regular, diesel: fuel.diesel },
      auth
    );
    alert("Fuel prices updated");
  };

  /* INPUT HANDLER */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ADD / UPDATE DEAL */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("product", form.product);
      data.append("size", form.size);
      data.append("dealPrice", form.dealPrice);
      if (form.image) data.append("image", form.image);

      if (editingId) {
        await http.put(`/deals/${editingId}`, data, auth);
      } else {
        await http.post("/deals", data, auth);
      }

      resetForm();
      await loadDeals();
    } catch (err) {
      console.error(err);
      alert("Failed to save deal");
    } finally {
      setLoading(false);
    }
  };

  /* EDIT DEAL */
  const startEdit = (deal) => {
    setEditingId(deal._id);
    setForm({
      product: deal.product,
      size: deal.size || "",
      dealPrice: deal.dealPrice,
      image: null,
    });
    setPreview(deal.imageUrl || null);
  };

  /* DELETE DEAL */
  const deleteDeal = async (id) => {
    if (!window.confirm("Delete this deal?")) return;
    await http.delete(`/deals/${id}`, auth);
    await loadDeals();
  };

  /* RESET FORM */
  const resetForm = () => {
    setEditingId(null);
    setForm({ product: "", size: "", dealPrice: "", image: null });
    setPreview(null);
  };

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  };

  /* Fetch Reviews */
  const loadReviews = async () => {
    const res = await http.get("/reviews", auth);
    setReviews(res.data);
  };

  /* Delete Review */
  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await http.delete(`/reviews/${id}`, auth);
      setReviews(reviews.filter((r) => r._id !== id));
    }
    catch {
      alert("Failed to delete review")
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={logout} className="text-red-600 text-sm">
            Logout
          </button>
        </div>

        {/* ADD / EDIT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-10"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Deal" : "Add New Deal"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="product"
              placeholder="Product *"
              value={form.product}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              name="size"
              placeholder="Size (optional)"
              value={form.size}
              onChange={handleChange}
              className="input"
            />
            <input
              name="dealPrice"
              placeholder="Deal Price *"
              value={form.dealPrice}
              onChange={handleChange}
              required
              className="input md:col-span-2"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="md:col-span-2"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 w-40 h-40 object-cover rounded"
            />
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              {loading ? "Saving..." : editingId ? "Update Deal" : "Add Deal"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* FUEL PRICES */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Fuel Prices</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="Regular Price"
              value={fuel.regular}
              onChange={(e) =>
                setFuel({ ...fuel, regular: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Diesel Price"
              value={fuel.diesel}
              onChange={(e) =>
                setFuel({ ...fuel, diesel: e.target.value })
              }
            />
          </div>

          <button
            onClick={saveFuel}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
          >
            Update Fuel Prices
          </button>
        </div>

        {/* DEAL LIST */}
        <h2 className="text-2xl font-semibold mb-4">Existing Deals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div key={deal._id} className="bg-white p-4 rounded-xl shadow">
              {deal.imageUrl && (
                <img
                  src={deal.imageUrl}
                  alt={deal.product}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              <h3 className="font-semibold">{deal.product}</h3>
              {deal.size && <p className="text-sm">{deal.size}</p>}
              <p className="font-bold text-blue-600 mt-1">
                {deal.dealPrice}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => startEdit(deal)}
                  className="text-sm bg-gray-200 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteDeal(deal._id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Review Moderation */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            🛡️ Review Moderation
          </h2>

          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white p-5 rounded-xl shadow border"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">
                      {r.name}
                      {r.location && (
                        <span className="text-sm text-gray-500">
                          {" "}• {r.location}
                        </span>
                      )}
                    </p>

                    {/* Star Rating */}
                    <div className="text-yellow-400 text-lg">
                      {[...Array(r.rating || 0)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteReview(r._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-3 text-gray-700">
                  {r.message}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
