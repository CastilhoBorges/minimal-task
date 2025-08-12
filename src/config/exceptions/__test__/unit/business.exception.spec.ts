import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../../business.exception';

describe('BusinessException', () => {
  it('should create an instance of BusinessException with correct properties', () => {
    const message = 'Invalid business logic';
    const metadata = { code: 'INVALID_ACTION' };

    const exception = new BusinessException(message, metadata);

    expect(exception).toBeInstanceOf(BusinessException);
    expect(exception.getResponse()).toEqual({
      name: 'BusinessException',
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      metadata,
      stack: undefined,
    });
    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toMatchSnapshot();
  });

  it('should create an instance with only message', () => {
    const message = 'Invalid business logic';

    const exception = new BusinessException(message);

    expect(exception).toBeInstanceOf(BusinessException);
    expect(exception.getResponse()).toEqual({
      name: 'BusinessException',
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      metadata: undefined,
      stack: undefined,
    });
    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toMatchSnapshot();
  });
});
