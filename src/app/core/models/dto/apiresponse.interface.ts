export interface ApiResponse<T> {
  errors?     : string[];
  message?    : string;
  succeeded?  : boolean;

  data?: T;
}

export interface PaginationFilter{
  pageNumber? : number;
  pageSize?   : number;
}

export interface CustomPagedResponse<T> extends ApiResponse<T[]> {
  hasNextPage?      : boolean;
  hasPreviousPage?  : boolean;
  pageNumber?       : number;
  pageSize?         : number;
  totalItems?       : number;
  totalPages?       : number;
}
