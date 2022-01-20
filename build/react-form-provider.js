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
    listeners[`${id}_${field}`] = () => setUpdate(update + 1);
    return (0, react_1.useMemo)(() => form._getField(field), [update]);
};
const getBoolean = (id, method) => () => {
    const [update, setUpdate] = (0, react_1.useState)(id);
    const value = (0, react_1.useMemo)(method, [update]);
    listeners[id] = () => value !== method() && setUpdate(update + 1);
    return value;
};
let id = 0;
const ReactFormProvider = ({ form, Context, children, }) => {
    const [isReady, setIsReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const uniqueId = ++id;
        const submittingId = `isSubmitting_${uniqueId}`;
        const touchedId = `isTouched_${uniqueId}`;
        const fieldId = `getField_${uniqueId}`;
        const validId = `isValid_${uniqueId}`;
        form._setAfterSubmit(() => {
            listeners[submittingId]();
        });
        form._setBeforeSubmit(() => {
            listeners[submittingId]();
            listeners[validId]();
        });
        form._setAfterReset(() => {
            listeners[touchedId]();
            listeners[validId]();
            for (const field of form._fieldNames) {
                listeners[`${fieldId}_${field}`]();
            }
        });
        form._setAfterValidate((field) => {
            listeners[`${fieldId}_${field}`]();
            listeners[touchedId]();
            listeners[validId]();
        });
        form._setGetField(getField(fieldId, form));
        form._setGetIsValid(getBoolean(validId, form._getIsValid));
        form._setGetIsTouched(getBoolean(touchedId, form._getIsTouched));
        form._setGetIsSubmitting(getBoolean(submittingId, form._getIsSubmitting));
        setIsReady(true);
    }, [form]);
    if (!isReady) {
        return null;
    }
    return react_1.default.createElement(Context.Provider, { value: form }, children);
};
exports.ReactFormProvider = ReactFormProvider;
