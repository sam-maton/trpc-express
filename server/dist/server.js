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
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@trpc/server");
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const zod_1 = require("zod");
const t = server_1.initTRPC.create();
const userList = [
    {
        id: '1',
        name: 'KATT',
    },
];
const appRouter = t.router({
    // Create procedure at path 'hello'
    hello: t.procedure
        // using zod schema to validate and infer input values
        .input(zod_1.z
        .object({
        text: zod_1.z.string().nullish(),
    })
        .nullish())
        .query(({ input }) => {
        var _a;
        return {
            greeting: `hello ${(_a = input === null || input === void 0 ? void 0 : input.text) !== null && _a !== void 0 ? _a : 'world'}`,
        };
    }),
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: appRouter
}));
app.listen(8000, () => {
    console.log(`[server]: Server is running at http://localhost: 8000`);
});
