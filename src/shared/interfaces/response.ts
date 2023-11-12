export interface HttpSuccessResponse<T> {
  readonly data: T;
}

export interface FailResponse {
  readonly code: number;
  readonly message: string;
}

export interface HttpFailResponse {
  readonly error: FailResponse;
}
