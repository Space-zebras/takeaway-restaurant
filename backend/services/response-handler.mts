interface Response {
  status: number;
  body: Record<string, unknown>;
}

const responses: Record<number, Response> = {
  200: {
    status: 200,
    body: { successful: true },
  },
  201: {
    status: 201,
    body: { successful: true, message: "Item was created successfully!" },
  },
  400: {
    status: 400,
    body: { successful: false, message: "Bad request." },
  },
  401: {
    status: 401,
    body: { successful: false, message: "You are unauthorized to perform the request." },
  },
  404: {
    status: 404,
    body: { successful: false, message: "The resource was not found" },
  },
  405: {
    status: 405,
    body: { successful: false, message: "The chosen method is not allowed." },
  },
  500: {
    status: 500,
    body: { successful: false, message: "Internal server error. Please try again." },
  },
};

export const responseHandler = (
  status: number, 
  data?: Record<string, unknown>,
  headers?: Record<string, string> ) => {
  const baseResponse = responses[status] || responses[500];

  return {
    statusCode: baseResponse.status,
    headers: {
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' https://trusted.cdn.com; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; object-src 'none'; img-src 'self' https://trusted.images.com;",
      ...(headers || {}),
    },
    body: JSON.stringify({ ...baseResponse.body, ...(data || {}) }),
  };
};
