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
    const updateBooleans = (0, react_1.useCallback)((f) => {
        setIsSubmitting(f.isSubmitting);
        setIsTouched(f.isTouched);
        setIsValid(f.isValid);
    }, []);
    (0, react_1.useEffect)(() => {
        const uniqueId = ++id;
        form._setAfterSubmit(updateBooleans);
        form._setAfterValidateForm(updateBooleans);
        form._setGetField(getField(uniqueId, form));
        form._setAfterValidateField((field, f) => {
            var _a;
            (_a = listeners[`getField_${field}_${uniqueId}`]) === null || _a === void 0 ? void 0 : _a.call(listeners);
            updateBooleans(f);
        });
        setIsReady(true);
    }, [form, updateBooleans]);
    if (!isReady) {
        return null;
    }
    return (react_1.default.createElement(Context.Provider, { value: Object.assign(Object.assign({}, form), { isSubmitting, isTouched, isValid }) }, children));
};
exports.ReactFormProvider = ReactFormProvider;
