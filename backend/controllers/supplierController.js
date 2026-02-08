const Supplier = require("../models/supplierModel");

// Create Supplier
exports.createSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json(supplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get All Suppliers
exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Supplier
exports.updateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(supplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete Supplier
exports.deleteSupplier = async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.json({ message: "Supplier deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
