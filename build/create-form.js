"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForm = void 0;
const react_1 = __importDefault(require("react"));
const react_form_provider_1 = require("./react-form-provider");
const react_form_provider_2 = require("./react-form-provider");
const createForm = (formProperties) => {
  const form = new react_form_provider_2.ReactForm(formProperties);
  const FormContext = react_1.default.createContext(form);
  const useForm = () => react_1.default.useContext(FormContext);
  const FormProvider = ({ children }) =>
    react_1.default.createElement(
      react_form_provider_1.ReactFormProvider,
      { Context: FormContext, form: form },
      children
    );
  return {
    useForm,
    FormProvider,
  };
};
exports.createForm = createForm;
