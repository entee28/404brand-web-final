"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ContactForm_1 = __importDefault(require("../../models/ContactForm"));
const router = express_1.default.Router();
router.get("/", (_, res) => {
    ContactForm_1.default.find()
        .then((forms) => res.json(forms))
        .catch(() => res.status(500).json({ message: "Server error" }));
});
router.post("/", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    const newForm = new ContactForm_1.default({
        name,
        email,
        subject,
        message,
    });
    newForm.save().then((form) => res.json(form));
    return;
});
exports.default = router;
//# sourceMappingURL=contacts.js.map