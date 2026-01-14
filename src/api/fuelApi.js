import http from "../services/http";

export async function getFuelPrices() {
  const response = await http.get("/fuel");
  return response;
}