"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForm = void 0;
const react_1 = __importDefault(require("react"));
const react_form_1 = require("./react-form");
const react_form_provider_1 = require("./react-form-provider");
const createForm = (formProperties) => {
    const reactForm = new react_form_1.ReactForm(formProperties);
    const form = reactForm;
    const FormContext = react_1.default.createContext(reactForm);
    const useForm = () => react_1.default.useContext(FormContext);
    const useField = (field) => react_1.default.useContext(FormContext).useField(field);
    const FormProvider = ({ children }) => (react_1.default.createElement(react_form_provider_1.ReactFormProvider, { Context: FormContext, form: reactForm }, children));
    return { form, useForm, useField, FormProvider };
};
exports.createForm = createForm;
