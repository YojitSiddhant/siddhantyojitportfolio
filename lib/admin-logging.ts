import "server-only";

type AdminErrorLogInput = {
  source: string;
  error: unknown;
  extra?: Record<string, unknown>;
};

function toErrorLike(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    };
  }

  return {
    message: typeof error === "string" ? error : "Unknown error",
    stack: undefined,
    cause: undefined,
  };
}

export function logAdminError({ source, error, extra }: AdminErrorLogInput) {
  const errorLike = toErrorLike(error);
  console.error({
    source,
    message: errorLike.message,
    stack: errorLike.stack,
    cause: errorLike.cause,
    ...extra,
  });
}

