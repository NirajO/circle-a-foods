import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold">Circle A Foods</div>

      <div className="space-x-6">
        <Link to="/" className="hover:text-accent">Home</Link>
        <Link to="/deli" className="hover:text-accent">Deli</Link>
        <Link to="/deals" className="hover:text-accent">Deals</Link>
      </div>
    </nav>
  );
}
