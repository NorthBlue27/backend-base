import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export const handlerExceptions = (error: any) => {
  switch (error.parent.code) {
    case '23505':
      throw new BadRequestException(error.parent.detail);
    default:
      console.log(error.parent);
      throw new InternalServerErrorException(
        'Ha ocurrido un error, vea la consola',
      );
  }
};
