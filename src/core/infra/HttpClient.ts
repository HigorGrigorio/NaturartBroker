export interface HttpClientConfig {
    baseURL: String;
}

export interface IHttpClient {
    get<T>(url: string): Promise<T>;

    post<T, U>(url: string, data: U): Promise<T>;

    put<T, U>(url: string, data: U): Promise<T>;

    delete<T>(url: string): Promise<T>;
}
