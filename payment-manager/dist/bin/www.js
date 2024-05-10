"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
const PORT = process.env.PORT || 3001;
index_1.default.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
