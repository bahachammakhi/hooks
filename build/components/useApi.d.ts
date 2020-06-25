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
declare function useApi(requests: any): {};
export default useApi;
