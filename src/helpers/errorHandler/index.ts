type PotentialError = {
  error?: boolean;
  message?: string;
  status?: number;
};
export async function globalErrorHandler<T>(
  callback: () => Promise<T & PotentialError>
): Promise<{ data?: T; error?: ErrorResponse }> {
  try {
    const result = await callback();
    if (result.error)
      throw { message: result?.message, status: result?.status };
    return { data: result as T };
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number };
    const errorResponse: ErrorResponse = {
      message: err?.message || "An unexpected error occurred.",
      status: err?.status,
    };
    return { error: errorResponse };
  }
}

