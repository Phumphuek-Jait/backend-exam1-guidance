import httpStatus from 'http-status';

// Signature matches api-response.js in the midterm template.
export async function apiResponse(
  res,
  data,
  pagination = null,
  status = httpStatus.OK,
) {
  const statusCode = status.valueOf?.() ?? status;

  if (statusCode === httpStatus.NO_CONTENT) {
    return res.status(statusCode).end();
  }

  if (!pagination) {
    return res.status(statusCode).json({ success: true, data });
  }

  const { page, limit } = pagination;
  const total = Number(data.totalItems ?? 0);
  const totalPages = Math.ceil(total / limit);

  return res.status(statusCode).json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  });
}
