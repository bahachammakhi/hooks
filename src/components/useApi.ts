import { useReducer } from "react";

export interface IApiState<T> {
  fetching: boolean;
  error: string;
  data: T;
  errors: any[];
}
export interface useApiRequest {
  state: IApiState<any>;
  call: () => void;
}

function useApiState<Fn extends (...args: any[]) => Promise<any>, T = any>(
  fn: Fn
) {
  const INITIAL_STATE: IApiState<T> = {
    fetching: false,
    error: "",
    data: {},
    success: null,
    errors: [],
  } as any;

  const fetching = (state: any) => ({
    ...state,
    fetching: true,
    success: null,
    error: "",
  });
  const success = (state: any, { data }: any) => ({
    ...state,
    data,
    success: true,
    fetching: false,
  });
  const failure = (state: any, { error, errors }: any) => ({
    ...state,
    error,
    errors,
    success: false,
    fetching: false,
  });
  const reducer = (state: any, action: any) => {
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
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  async function call(...params: any) {
    try {
      const apiParams = params.map((param: any) => {
        // if (typeof param === 'object') {
        //   return pickBy(param, val => val !== undefined);
        // }
        return param;
      });
      dispatch({ type: "fetching" });
      const response = await fn(...apiParams);
      if (
        (response.code >= 200 && response.code < 400 && response.data) ||
        (response.status >= 200 && response.status < 400)
      ) {
        dispatch({ type: "success", payload: { data: response.data } });
      } else if (response.code === 401) {
        dispatch({ type: "failure", payload: { error: "UNAUTHORIZED" } });
      } else {
        // const errors = {};
        dispatch({
          type: "failure",
          payload: { error: "Duplicated Suspect", errors: response },
        });
      }
    } catch (e) {
      dispatch({
        type: "failure",
        payload: { error: "Please check your connection" },
      });
    }
  }
  return { ...state, call };
}

function useApi(requests: any) {
  const calls = {};
  const callsnames = Object.keys(requests);
  const { length } = callsnames;

  for (let i = 0; i < length; i += 1) {
    const key = callsnames[i];
    // eslint-disable-next-line
    calls[key] = useApiState(requests[key]);
  }

  return { ...calls };
}

export default useApi;
