export interface HttpSuccessResponse<T> {
  readonly data: T;
}

export interface HttpFailResponse {
  readonly error: {
    readonly message: string;
    readonly code: number;
  };
}
