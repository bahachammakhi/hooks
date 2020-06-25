import { useReducer, useState, useRef, useEffect } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function useApiState(fn) {
    var INITIAL_STATE = {
        fetching: false,
        error: "",
        data: {},
        success: null,
        errors: [],
    };
    var fetching = function (state) { return (__assign(__assign({}, state), { fetching: true, success: null, error: "" })); };
    var success = function (state, _a) {
        var data = _a.data;
        return (__assign(__assign({}, state), { data: data, success: true, fetching: false }));
    };
    var failure = function (state, _a) {
        var error = _a.error, errors = _a.errors;
        return (__assign(__assign({}, state), { error: error,
            errors: errors, success: false, fetching: false }));
    };
    var reducer = function (state, action) {
        switch (action.type) {
            case "fetching":
                return fetching(state);
            case "success":
                return success(state, action.payload);
            case "failure":
                return failure(state, action.payload);
            default:
                throw new Error();
        }
    };
    var _a = useReducer(reducer, INITIAL_STATE), state = _a[0], dispatch = _a[1];
    function call() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var apiParams, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        apiParams = params.map(function (param) {
                            // if (typeof param === 'object') {
                            //   return pickBy(param, val => val !== undefined);
                            // }
                            return param;
                        });
                        dispatch({ type: "fetching" });
                        return [4 /*yield*/, fn.apply(void 0, apiParams)];
                    case 1:
                        response = _a.sent();
                        if ((response.code >= 200 && response.code < 400 && response.data) ||
                            (response.status >= 200 && response.status < 400)) {
                            dispatch({ type: "success", payload: { data: response.data } });
                        }
                        else if (response.code === 401) {
                            dispatch({ type: "failure", payload: { error: "UNAUTHORIZED" } });
                        }
                        else {
                            dispatch({
                                type: "failure",
                                payload: { error: "Duplicated Suspect", errors: response },
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        dispatch({
                            type: "failure",
                            payload: { error: "Please check your connection" },
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    return __assign(__assign({}, state), { call: call });
}
function useApi(requests) {
    var calls = {};
    var callsnames = Object.keys(requests);
    var length = callsnames.length;
    for (var i = 0; i < length; i += 1) {
        var key = callsnames[i];
        // eslint-disable-next-line
        calls[key] = useApiState(requests[key]);
    }
    return __assign({}, calls);
}

var useForm = function (_a) {
    var handleSubmitCallback = _a.handleSubmitCallback, validateCallback = _a.validateCallback, initialValues = _a.initialValues;
    var _b = useState(initialValues), form = _b[0], setForm = _b[1]; //for holding initial form data
    var _c = useState({}), errors = _c[0], setErrors = _c[1]; //for validtion errors
    var _d = useState(false), success = _d[0], setSuccess = _d[1]; //set to true if form was submitted successfully
    var _e = useState(false), submitting = _e[0], setSubmitting = _e[1]; //set to true when first submitting the form to disable the submit button
    //below is a function that creates a touched variable from hte initial values of a form, setting all fields to false (not touched)
    var setInitialTouched = function (form) {
        var touchedInitial = {};
        //if the initial values aren't populated than return an empty object.
        if (!form)
            return {};
        //create a new object using the keys of the form object setting alll values to false.
        Object.keys(form).forEach(function (value) {
            touchedInitial[value] = false;
        });
        return touchedInitial;
    };
    var _f = useState(setInitialTouched(form)), touched = _f[0], setTouched = _f[1];
    var validate = function () {
        var e = validateCallback();
        setErrors(e);
        return e;
    };
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setForm(function (state) {
            var _a;
            return __assign(__assign({}, state), (_a = {}, _a[name] = value, _a));
        });
    };
    var handleBlur = function (e) {
        var name = e.target.name;
        setTouched(function (c) {
            var _a;
            return __assign(__assign({}, c), (_a = {}, _a[name] = true, _a));
        });
        validate();
    };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var touchedTrue, err, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setSubmitting(true);
                    touchedTrue = {};
                    Object.keys(form).forEach(function (value) {
                        touchedTrue[value] = true;
                    });
                    setTouched(touchedTrue);
                    err = validate();
                    if (!(Object.keys(err).length === 0)) return [3 /*break*/, 2];
                    //if there are no errors, set submitting=false and submit form.
                    setSubmitting(false);
                    console.log("no errors.");
                    _a = setSuccess;
                    return [4 /*yield*/, handleSubmitCallback()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    setSubmitting(false);
                    setSuccess(false);
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleReset = function () { return setForm(initialValues); };
    return {
        handleChange: handleChange,
        handleBlur: handleBlur,
        handleSubmit: handleSubmit,
        setForm: setForm,
        handleReset: handleReset,
        form: form,
        errors: errors,
        touched: touched,
        submitting: submitting,
        success: success,
    };
};

function useDidMount(fn) {
    var mounted = useRef(false);
    useEffect(function () {
        mounted.current = true;
        fn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return mounted.current;
}
function useDidUpdate(fn, deps) {
    var mounted = useRef(false);
    useEffect(function () {
        if (!mounted.current) {
            mounted.current = true;
        }
        else {
            fn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return mounted.current;
}
function useWillUnmount(fn) {
    useEffect(function () {
        return fn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

var getWidth = function () {
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
};
function useCurrentWitdh() {
    // save current window width in the state object
    var _a = useState(getWidth()), width = _a[0], setWidth = _a[1];
    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(function () {
        // timeoutId for debounce mechanism
        var timeoutId = null;
        var resizeListener = function () {
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId);
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(function () { return setWidth(getWidth()); }, 150);
        };
        // set resize listener
        window.addEventListener("resize", resizeListener);
        // clean up function
        return function () {
            // remove resize listener
            window.removeEventListener("resize", resizeListener);
        };
    }, []);
    return width;
}

export { useApi, useCurrentWitdh as useCurrentWidth, useDidMount, useDidUpdate, useForm, useWillUnmount };
//# sourceMappingURL=index.es.js.map
