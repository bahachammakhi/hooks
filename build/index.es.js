import { useReducer } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
                            // const errors = {};
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

export { useApi };
//# sourceMappingURL=index.es.js.map
