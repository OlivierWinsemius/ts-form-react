"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactFormProvider = void 0;
const react_1 = __importDefault(require("react"));
const react_form_provider_hooks_1 = require("./react-form-provider.hooks");
const ReactFormProvider = ({ form, Context, children, }) => {
    const { isReady } = (0, react_form_provider_hooks_1.useTransformFormMethods)(form);
    if (!isReady) {
        return null;
    }
    return react_1.default.createElement(Context.Provider, { value: form }, children);
};
exports.ReactFormProvider = ReactFormProvider;
