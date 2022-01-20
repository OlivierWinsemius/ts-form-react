"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransformFormMethods = void 0;
const react_1 = require("react");
const listeners = {};
const getField = (id, form) => {
    return (field) => {
        const [value, setValue] = (0, react_1.useState)(form._getField(field));
        (0, react_1.useEffect)(() => {
            listeners[`${id}_${field}`].push(() => setValue(form._getField(field)));
        }, []);
        return value;
    };
};
const getBoolean = (id, method) => () => {
    const [value, setValue] = (0, react_1.useState)(method());
    (0, react_1.useEffect)(() => {
        listeners[id].push(() => setValue(method()));
    }, []);
    return value;
};
let id = 0;
const useTransformFormMethods = (form) => {
    const [isReady, setIsReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const uniqueId = ++id;
        const submittingId = `isSubmitting_${uniqueId}`;
        const touchedId = `isTouched_${uniqueId}`;
        const fieldId = `getField_${uniqueId}`;
        const validId = `isValid_${uniqueId}`;
        const fieldIds = form._fieldNames.map((field) => `${fieldId}_${field}`);
        form._setGetField(getField(fieldId, form));
        form._setGetIsValid(getBoolean(validId, form._getIsValid));
        form._setGetIsTouched(getBoolean(touchedId, form._getIsTouched));
        form._setGetIsSubmitting(getBoolean(submittingId, form._getIsSubmitting));
        listeners[submittingId] = [];
        listeners[touchedId] = [];
        listeners[validId] = [];
        fieldIds.forEach((id) => (listeners[id] = []));
        const updateIsSubmitting = () => listeners[submittingId].forEach((f) => f());
        const updateIsTouched = () => listeners[touchedId].forEach((f) => f());
        const updateIsValid = () => listeners[validId].forEach((f) => f());
        const updateField = (f) => listeners[`${fieldId}_${f}`].forEach((f) => f());
        const updateAllFields = () => form._fieldNames.forEach(updateField);
        form._setAfterSubmit(updateIsSubmitting);
        form._setBeforeSubmit(() => {
            updateIsSubmitting();
            updateIsValid();
        });
        form._setAfterReset(() => {
            updateAllFields();
            updateIsTouched();
            updateIsValid();
        });
        form._setAfterValidate((field) => {
            updateField(field);
            updateIsTouched();
            updateIsValid();
        });
        setIsReady(true);
    }, [form]);
    return { isReady };
};
exports.useTransformFormMethods = useTransformFormMethods;
