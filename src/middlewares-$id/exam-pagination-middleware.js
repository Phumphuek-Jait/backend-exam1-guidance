// Query keys follow the supplied template: page and limit.
// There is no min/max cap: any positive integer limit is accepted.
export const queryParser = ({ defaultLimit = 20, invalid = 'default' } = {}) => {
  return (req, res, next) => {
    const query = req.query ?? {};

    // Preserve template behavior: pagination activates when both keys exist.
    if (query.page === undefined || query.limit === undefined) {
      req.pagination = null;
      return next();
    }

    const page = Number(query.page);
    const limit = Number(query.limit);
    const valid = Number.isSafeInteger(page)
      && page > 0
      && Number.isSafeInteger(limit)
      && limit > 0;

    if (!valid && invalid === 'error') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_PAGINATION',
          message: 'page and limit must be positive integers',
        },
      });
    }

    const safePage = valid ? page : 1;
    const safeLimit = valid ? limit : defaultLimit;

    req.pagination = {
      page: safePage,
      limit: safeLimit,
      offset: (safePage - 1) * safeLimit,
    };

    return next();
  };
};
