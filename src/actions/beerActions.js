export const UPDATE_OUT_OF_STOCK_REQUEST = 'UPDATE_OUT_OF_STOCK_REQUEST';
export const UPDATE_OUT_OF_STOCK_SUCCESS = 'UPDATE_OUT_OF_STOCK_SUCCESS';
export const UPDATE_OUT_OF_STOCK_FAILURE = 'UPDATE_OUT_OF_STOCK_FAILURE';

export const updateOutOfStockRequest = (id, outOfStock) => ({
  type: UPDATE_OUT_OF_STOCK_REQUEST,
  payload: { id, outOfStock },
});

export const updateOutOfStockSuccess = (id, outOfStock) => ({
  type: UPDATE_OUT_OF_STOCK_SUCCESS,
  payload: { id, outOfStock },
});

export const updateOutOfStockFailure = (error) => ({
  type: UPDATE_OUT_OF_STOCK_FAILURE,
  payload: error,
});
