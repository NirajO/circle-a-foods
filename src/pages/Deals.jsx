import { useEffect, useState } from "react";
import http from "../services/http";

export default function Deals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    http.get("/deals").then((res) => {
      setDeals(res.data);
    });
  }, []);

  return (
    <div style={{padding: "24px"}}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px"}}>
        Current Deals
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {deals.map((deal) => (
          <div  
            key={deal._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              background: "#fff",
            }}
          >

            {deal.imageUrl && (
              <img 
                src={deal.imageUrl}
                alt={deal.product}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "contain",
                  marginBottom: "12px",
                }}
              />
            )}
            
            <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
              {deal.product}
            </h3>

            {deal.size && (
              <p style={{ color: "#555", marginTop: "4px"}}>
                {deal.size}
              </p>
            )}

            <p 
              style={{
                marginTop: "12px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#0057b8",
              }}
            >
              {deal.dealPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}