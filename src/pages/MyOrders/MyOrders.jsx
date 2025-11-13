// src/pages/MyOrders/MyOrders.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import toast, { Toaster } from "react-hot-toast";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Parse price safely
  const parsePrice = (price) => {
    if (!price) return 0;
    const cleaned = String(price).replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  // ✅ Fetch only logged-in user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://paw-mart-api-server.vercel.app/orders");
        const data = await res.json();

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

    if (user?.email) fetchOrders();
  }, [user?.email]);

  // ✅ Download PDF report
  const handleDownloadPDF = () => {
    if (!orders.length) {
      toast.error("No orders to download!");
      return;
    }

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
      `$${parsePrice(order.price).toFixed(2)}`,
      order.quantity,
      order.address,
      order.date,
      order.phone,
    ]);

    autoTable(doc, {
      startY: 38,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] },
    });

    const totalPrice = orders.reduce(
      (sum, order) => sum + parsePrice(order.price),
      0
    );
    doc.setFontSize(12);
    doc.text(
      `Total Price: $${totalPrice.toFixed(2)}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save("MyOrders_Report.pdf");
    toast.success("Report downloaded successfully!");
  };

  if (loading)
    return (
      <div className="flex justify-center mt-16">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div
      className="max-w-6xl mx-auto mt-10 p-6 rounded-lg shadow-md transition-all duration-300"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Orders</h2>

        {orders.length > 0 && (
          <button onClick={handleDownloadPDF} className="btn-custom">
            Download Report
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-center opacity-75">No orders found 😢</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300/30">
          <table className="table w-full">
            <thead
              style={{
                backgroundColor: "rgba(0,0,0,0.05)",
                color: "var(--text-color)",
              }}
            >
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
                  className="transition-all"
                  style={{
                    color: "var(--text-color)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(100, 100, 255, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <td>{order.productName}</td>
                  <td>{order.buyerName}</td>
                  <td>${parsePrice(order.price).toFixed(2)}</td>
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
