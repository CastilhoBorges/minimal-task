import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { BaseException } from '../../../exceptions/base.exception';
import { GlobalExceptionFilter } from '../../global-exception.filter';

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;
  let mockResponse: Partial<Response>;
  let mockHttpArgumentsHost: Partial<HttpArgumentsHost>;
  let mockHost: Partial<ArgumentsHost>;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockHttpArgumentsHost = {
      getResponse: jest.fn().mockReturnValue(mockResponse),
      getRequest: jest.fn(),
      getNext: jest.fn(),
    };
    mockHost = {
      switchToHttp: jest.fn(() => mockHttpArgumentsHost as HttpArgumentsHost),
    };
  });

  it('should handle a BaseException and match snapshot', () => {
    const exception = new BaseException({
      name: 'BusinessException',
      message: 'Business logic error',
      statusCode: HttpStatus.BAD_REQUEST,
      metadata: { code: 'INVALID_ACTION' },
      stack: 'stack_trace_here',
    });

    filter.catch(exception, mockHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
    expect(mockResponse.json).toMatchSnapshot();
  });

  it('should handle an HttpException and match snapshot', () => {
    const exception = new HttpException(
      'Unauthorized access',
      HttpStatus.UNAUTHORIZED,
    );

    filter.catch(exception, mockHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
    expect(mockResponse.json).toMatchSnapshot();
  });

  it('should handle a generic Error and match snapshot', () => {
    const exception = new Error('Unexpected server failure');

    filter.catch(exception, mockHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
    expect(mockResponse.json).toMatchSnapshot();
  });

  it('should handle an unknown exception and match snapshot', () => {
    const exception = { unknown: 'Unknown exception' };

    filter.catch(exception, mockHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
    expect(mockResponse.json).toMatchSnapshot();
  });
});
