export interface Pagination {
    pageNumber: number,
    pageSize: number,
    pagesCount: number,
    itemsCount: number
}

export class PaginationResult<T> {
    result: T;
    pagination: Pagination;
}