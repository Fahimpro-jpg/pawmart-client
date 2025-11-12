// src/pages/MyOrders/MyOrders.jsx
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import toast, { Toaster } from "react-hot-toast";

const MyOrders = () => {
  const { user } = use(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch only user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders");
        const data = await res.json();

        // Filter orders for logged-in user
        const userOrders = data.filter(
          (order) => order.buyerEmail === user?.email
        );

        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchOrders();
    }
  }, [user?.email]);

  // ✅ Download PDF report
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("My Orders Report", 14, 16);
    doc.setFontSize(11);
    doc.text(`User: ${user?.displayName || "N/A"} (${user?.email})`, 14, 24);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 32);

    const tableColumn = [
      "Product Name",
      "Buyer Name",
      "Price",
      "Quantity",
      "Address",
      "Date",
      "Phone",
    ];

    const tableRows = orders.map((order) => [
      order.productName,
      order.buyerName,
      `$${order.price}`,
      order.quantity,
      order.address,
      order.date,
      order.phone,
    ]);

    doc.autoTable({
      startY: 38,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });

    doc.save("MyOrders_Report.pdf");
    toast.success("Report downloaded successfully!");
  };

  if (loading)
    return <p className="text-center text-lg mt-10">Loading your orders...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        {orders.length > 0 && (
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Download Report
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found 😢</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>Product Name</th>
                <th>Buyer Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Date</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="text-gray-700 hover:bg-gray-50 transition"
                >
                  <td>{order.productName}</td>
                  <td>{order.buyerName}</td>
                  <td>${order.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.address}</td>
                  <td>{order.date}</td>
                  <td>{order.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
