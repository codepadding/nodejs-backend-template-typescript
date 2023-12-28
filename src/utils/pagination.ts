interface PageInfo {
  totalPage: number;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
}

interface Metadata {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  list: {
    total: number;
    limit: number;
  };
  page: PageInfo;
  paging: Array<{ active: boolean; page: number }>;
}

interface PaginationParams {
  page: number;
  pageSize?: number;
  model: any; // You can replace 'any' with the actual type of your model
  condition: any; // You can replace 'any' with the actual type of your condition
  pagingRange?: number;
}

const pagination = async ({
  page = 1,
  pageSize = 20,
  model,
  condition,
  pagingRange = 5,
}: PaginationParams): Promise<{
  limit: number;
  total: number;
  offset: number;
  metadata: Metadata;
}> => {
  const { offset, limit, pageNumber } = getPaginationOffset(page, pageSize);
  const total = await model.countDocuments(condition);

  const { totalPage, hasNextPage, hasPreviousPage, pageInfo } = doPagingPreData(
    total,
    limit,
    pageNumber
  );

  const paging = await doPaging(
    pageNumber,
    pagingRange,
    totalPage,
    pageNumber - 1 * limit
  );

  return {
    limit,
    total,
    offset,
    metadata: {
      hasNextPage,
      hasPreviousPage,
      list: {
        total,
        limit,
      },
      page: pageInfo,
      paging,
    },
  };
};

const getPaginationOffset = (
  page: number,
  pageSize: number
): { offset: number; limit: number; pageNumber: number } => {
  let limit = parseInt(pageSize.toString());
  let pageNumber = parseInt(page.toString());
  pageNumber === 0 ? (pageNumber = 1) : null;
  const offset = parseInt(
    ((pageNumber - 1) * parseInt(limit.toString())).toString()
  );
  return { offset, limit, pageNumber };
};

const doPagingPreData = (
  total: number,
  limit: number,
  pageNumber: number
): {
  totalPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageInfo: PageInfo;
} => {
  let totalPage = Math.ceil(total / limit);

  var hasNextPage = true;
  let nextPage = pageNumber + 1;
  var hasPreviousPage = false;
  let previousPage = pageNumber - 1;

  if (nextPage > totalPage) {
    hasNextPage = false;
  }

  if (pageNumber > 1) {
    hasPreviousPage = true;
  } else {
    hasPreviousPage = false;
  }

  const pageInfo: PageInfo = {
    totalPage,
    currentPage: pageNumber,
    nextPage: hasNextPage ? nextPage : null,
    previousPage: hasPreviousPage ? previousPage : null,
  };

  return {
    totalPage,
    hasNextPage,
    hasPreviousPage,
    pageInfo,
  };
};

const doPaging = async (
  currentPage: number,
  range: number,
  totalPages: number,
  start = 1
): Promise<Array<{ active: boolean; page: number }>> => {
  let paging: Array<{ active: boolean; page: number }> = [];

  range > totalPages ? (range = totalPages) : null;

  if (currentPage < range / 2 + 1) {
    start = 1;
  } else if (currentPage >= totalPages - range / 2) {
    start = Math.floor(totalPages - range + 1);
  } else {
    start = currentPage - Math.floor(range / 2);
  }

  for (let i = start; i <= start + range - 1; i++) {
    if (i == currentPage) {
      paging.push({
        active: true,
        page: i,
      });
    } else {
      paging.push({
        active: false,
        page: i,
      });
    }
  }
  return paging.length > 1 ? paging : [];
};

export { pagination, getPaginationOffset, doPagingPreData, doPaging };
