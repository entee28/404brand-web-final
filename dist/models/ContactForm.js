"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContactFormSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
});
const ContactForm = (0, mongoose_1.model)("contact", ContactFormSchema);
exports.default = ContactForm;
//# sourceMappingURL=ContactForm.js.map