import fetchMock from 'jest-fetch-mock';
import { departmentsMock } from './mocks/departments.mock';
import { productListMock } from './mocks/productList.mock';
import { dealListMock } from './mocks/dealList.mock';
import { apiUrl } from '../shared/constants/constants';
fetchMock.enableMocks();

/*fetchMock.mockIf(apiUrl, req => {
  if (req.url.endsWith('/departments')) {
    return departmentsMock;
  } else if (req.url.endsWith('/products/?[a-zA-Z0-9_]*')) {
    return productListMock;
  } else if (req.url.endsWith('/deals/?[a-zA-Z0-9_]*')) {
    return dealListMock;
  } else {
    return {
      status: 404,
      body: 'Not Found',
    };
  }
});*/
