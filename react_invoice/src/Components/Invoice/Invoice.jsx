import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Make sure this import is here

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({  
    invoiceNumber: "INV-2025-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: "2025-01-31",
    customer: {
      id: 134,
      firstName: "Vineet",
      lastName: "Sharma",
      email: "Vineetka@gmail.com",
      phone: "9146732156",
      pincode: "2411122",
    },
    items: [
      { description: "Product 1", quantity: 2, unitPrice: 500, total: 1000 },
      { description: "Product 2", quantity: 1, unitPrice: 1500, total: 1500 },
    ],
    total: 2500,
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("times", "normal");

    // Title
    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);

    // Invoice Details
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 20, 30);
    doc.text(`Date: ${invoiceData.date}`, 20, 40);
    doc.text(`Due Date: ${invoiceData.dueDate}`, 20, 50);

    // Customer Details
    doc.text(`Customer: ${invoiceData.customer.firstName} ${invoiceData.customer.lastName}`, 20, 60);
    doc.text(`Email: ${invoiceData.customer.email}`, 20, 70);
    doc.text(`Phone: ${invoiceData.customer.phone}`, 20, 80);
    doc.text(`Pincode: ${invoiceData.customer.pincode}`, 20, 90);

    // Adding Table with autoTable Plugin
    doc.autoTable({
      startY: 100, // Start position for table
      head: [['Description', 'Quantity', 'Unit Price', 'Total']],
      body: invoiceData.items.map(item => [
        item.description,
        item.quantity,
        `Rs ${item.unitPrice}`,
        `Rs ${item.total}`,
      ]),
      theme: 'grid', // Grid theme
      margin: { top: 10 },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 'auto' }
      },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 12 },
      bodyStyles: { fontSize: 10, textColor: 50 },
    });

    // Total
    doc.setFontSize(14);
    doc.text(`Total: Rs ${invoiceData.total}`, 140, doc.autoTable.previous.finalY + 10);

    // Save PDF
    doc.save("invoice.pdf");
  };

  return (
    <div className="container mt-5">
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h1 className="text-center">Invoice</h1>
      </div>
      <div className="card-body">
        <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
        <p><strong>Date:</strong> {invoiceData.date}</p>
        <p><strong>Due Date:</strong> {invoiceData.dueDate}</p>

        <h4 className="mt-4">Customer Details</h4>
        <p><strong>Name:</strong> {invoiceData.customer.firstName} {invoiceData.customer.lastName}</p>
        <p><strong>Email:</strong> {invoiceData.customer.email}</p>
        <p><strong>Phone:</strong> {invoiceData.customer.phone}</p>
        <p><strong>Pincode:</strong> {invoiceData.customer.pincode}</p>

        <h4 className="mt-4">Items</h4>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>₹{item.unitPrice}</td>
                <td>₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success mt-3" onClick={handleDownloadPDF}>
          Download Invoice as PDF
        </button>
      </div>
    </div>
  </div>
  );
};

export default Invoice;
