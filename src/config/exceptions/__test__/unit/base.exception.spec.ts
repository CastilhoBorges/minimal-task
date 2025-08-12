import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../base.exception';

describe('BaseException', () => {
  it('should create an instance with required parameters', () => {
    const exception = new BaseException({
      name: 'TestError',
      message: 'This is a test error',
      statusCode: HttpStatus.BAD_REQUEST,
    });

    expect(exception).toBeInstanceOf(BaseException);
    expect(exception.getResponse()).toEqual({
      name: 'TestError',
      message: 'This is a test error',
      statusCode: HttpStatus.BAD_REQUEST,
      metadata: undefined,
      stack: undefined,
    });
    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toMatchSnapshot();
  });

  it('should create an instance with stack trace', () => {
    const stackTrace = 'Error: Something went wrong\n at someFile.ts:10:5';
    const exception = new BaseException({
      name: 'TestError',
      message: 'This is a test error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      metadata: undefined,
      stack: stackTrace,
    });

    expect(exception.getResponse()).toEqual({
      name: 'TestError',
      message: 'This is a test error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      metadata: undefined,
      stack: stackTrace,
    });
    expect(exception.getResponse()).toMatchSnapshot();
  });

  it('should create an instance with metadata', () => {
    const metadata = { key: 'value', errorCode: 1234 };
    const exception = new BaseException({
      name: 'TestError',
      message: 'This is a test error',
      statusCode: HttpStatus.NOT_FOUND,
      metadata: metadata,
      stack: undefined,
    });

    expect(exception.getResponse()).toEqual({
      name: 'TestError',
      message: 'This is a test error',
      statusCode: HttpStatus.NOT_FOUND,
      metadata,
      stack: undefined,
    });
    expect(exception.getResponse()).toMatchSnapshot();
  });

  it('should create an instance with all parameters', () => {
    const stackTrace = 'Error: Something went wrong\n at someFile.ts:10:5';
    const metadata = { debug: true };

    const exception = new BaseException({
      name: 'ComplexError',
      message: 'This is a complex error',
      statusCode: HttpStatus.FORBIDDEN,
      metadata: metadata,
      stack: stackTrace,
    });

    expect(exception.getResponse()).toEqual({
      name: 'ComplexError',
      message: 'This is a complex error',
      statusCode: HttpStatus.FORBIDDEN,
      metadata,
      stack: stackTrace,
    });
    expect(exception.getResponse()).toMatchSnapshot();
  });
});
