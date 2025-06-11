export interface PageList<T> {
    elements: T[],
    page: number,
    sizePage: number,
    totalAmount: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
}