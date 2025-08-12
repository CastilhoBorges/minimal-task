import { HttpStatus } from '@nestjs/common';
import { NotFoundException } from '../../not-found.exception';

describe('NotFoundException', () => {
  it('should create an instance of NotFoundException with correct properties', () => {
    const message = 'The requested resource could not be found';
    const metadata = { code: 'RESOURCE_NOT_FOUND' };

    const exception = new NotFoundException(message, metadata);

    expect(exception).toBeInstanceOf(NotFoundException);
    expect(exception.getResponse()).toEqual({
      name: 'NotFoundException',
      message,
      statusCode: HttpStatus.NOT_FOUND,
      metadata,
      stack: undefined,
    });
    expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
    expect(exception.getResponse()).toMatchSnapshot();
  });

  it('should create an instance with only message', () => {
    const message = 'The requested resource could not be found';

    const exception = new NotFoundException(message);

    expect(exception).toBeInstanceOf(NotFoundException);
    expect(exception.getResponse()).toEqual({
      name: 'NotFoundException',
      message,
      statusCode: HttpStatus.NOT_FOUND,
      metadata: undefined,
      stack: undefined,
    });
    expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
    expect(exception.getResponse()).toMatchSnapshot();
  });
});
