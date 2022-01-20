"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactFormProvider = void 0;
const react_1 = __importStar(require("react"));
const listeners = {};
const getField = (id, form) => (field) => {
    const [update, setUpdate] = (0, react_1.useState)(id);
    listeners[`getField_${field}_${id}`] = () => setUpdate(update + 1);
    return (0, react_1.useMemo)(() => form._getField(field), [update]);
};
let id = 0;
const ReactFormProvider = ({ form, Context, children, }) => {
    const [isReady, setIsReady] = (0, react_1.useState)(false);
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(!!form.isSubmitting);
    const [isTouched, setIsTouched] = (0, react_1.useState)(!!form.isTouched);
    const [isValid, setIsValid] = (0, react_1.useState)(!form.isValid);
    (0, react_1.useEffect)(() => {
        let mounted = true;
        const updateBooleans = (f) => {
            if (mounted) {
                setIsSubmitting(f.isSubmitting);
                setIsTouched(f.isTouched);
                setIsValid(f.isValid);
            }
        };
        const uniqueId = ++id;
        form._setGetField(getField(uniqueId, form));
        form._setAfterSubmit(updateBooleans);
        form._setAfterValidateForm(updateBooleans);
        form._setAfterValidateField((field, f) => {
            listeners[`getField_${field}_${uniqueId}`]();
            updateBooleans(f);
        });
        setIsReady(true);
        return () => {
            mounted = false;
        };
    }, [form]);
    if (!isReady) {
        return null;
    }
    return (react_1.default.createElement(Context.Provider, { value: Object.assign(Object.assign({}, form), { isSubmitting, isTouched, isValid }) }, children));
};
exports.ReactFormProvider = ReactFormProvider;
