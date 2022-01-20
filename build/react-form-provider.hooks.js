"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransformFormMethods = void 0;
const react_1 = require("react");
const listeners = {};
const getField = (id, form) => (field) => {
    const [value, setValue] = (0, react_1.useState)(form._getField(field));
    (0, react_1.useEffect)(() => {
        listeners[`${id}_${field}`].push(() => setValue(form._getField(field)));
    }, []);
    return value;
};
const getBooleanValue = (id, method) => () => {
    const [value, setValue] = (0, react_1.useState)(method());
    (0, react_1.useEffect)(() => {
        listeners[id].push(() => setValue(method()));
    }, []);
    return value;
};
let formsAmount = 0;
const useTransformFormMethods = (form) => {
    const [isReady, setIsReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const formId = ++formsAmount;
        const submitId = `isSubmitting_${formId}`;
        const touchedId = `isTouched_${formId}`;
        const validId = `isValid_${formId}`;
        const fieldId = `getField_${formId}`;
        const fieldIds = form._fieldNames.map((field) => `${fieldId}_${field}`);
        form._setGetField(getField(fieldId, form));
        form._setGetIsValid(getBooleanValue(validId, form._getIsValid));
        form._setGetIsTouched(getBooleanValue(touchedId, form._getIsTouched));
        form._setGetIsSubmitting(getBooleanValue(submitId, form._getIsSubmitting));
        listeners[submitId] = [];
        listeners[touchedId] = [];
        listeners[validId] = [];
        fieldIds.forEach((id) => (listeners[id] = []));
        const updateIsSubmitting = () => listeners[submitId].forEach((f) => f());
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
