import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("You're not logged in.");
        return;
      }

      try {
        const res = await fetch("https://brutus-food-backend.onrender.com/api/my-orders/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed: ${res.status} - ${errText}`);
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Error fetching orders. Please log in again.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>Order #{order.id}</strong> – ₹{order.total_amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
