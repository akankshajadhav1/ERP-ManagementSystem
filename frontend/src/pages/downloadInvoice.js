import jsPDF from "jspdf";

const downloadInvoice = () => {
  const pdf = new jsPDF();

  pdf.text("ERP Invoice", 20, 20);
  pdf.text("Customer: John", 20, 40);
  pdf.text("Total: ₹5000", 20, 60);

  pdf.save("invoice.pdf");


<button onClick={downloadInvoice}>
Download Invoice
</button>


};

export default downloadInvoice;
