"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const error_1 = __importDefault(require("./middleware/error"));
const cors_1 = __importDefault(require("cors"));
const api_1 = require("./routes/api");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/api/products", api_1.products);
app.use("/api/contacts", api_1.contacts);
app.use("/api/auth", api_1.auth);
app.use("/api/users", api_1.users);
app.use("/api/cart", api_1.cart);
app.use("/api/orders", api_1.orders);
app.use("/api/checkout", api_1.stripe);
app.use(error_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static("client/build"));
    app.get("*", (_, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
//# sourceMappingURL=server.js.map