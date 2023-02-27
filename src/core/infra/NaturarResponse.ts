
export interface NaturartResponse<T> {
    isError: Boolean;
    code: String;
    msg: String;
    data: T;
}
