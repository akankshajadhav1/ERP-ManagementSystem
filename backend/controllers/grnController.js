const GRN = require("../models/GRN");

exports.createGRN = async (req, res) => {
    const grn = await GRN.create(req.body);
    res.json(grn);
};
exports.getGRNs = async (req, res) => {
    const grns = await GRN.find().populate("purchaseOrderId");
    res.json(grns);
}
    ;
exports.updateGRNStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const grn = await GRN.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    res.json(grn);
}
    ;
exports.deleteGRN = async (req, res) => {
    await GRN.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
}
    ;
