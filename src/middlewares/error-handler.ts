import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { injectable, inject, named } from 'inversify';
import { AppLogger } from '@src/util/logger';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

export type HttpErrorWithValidation = HttpError & { errors?: ValidationError[] };

@Middleware({ type: 'after' })
@injectable()
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  constructor(@inject(AppLogger) @named('ErrHandler') private logger: AppLogger) {}

  error(error: HttpErrorWithValidation, request: Request, response: Response) {
    this.logger.error('catched error', error);
    let message = error.message;

    // if any validation errors customize message
    if (error.errors && error.errors.length > 0) {
      const validationErrors = error.errors;
      // concatenate validation errors (prettify errors)
      let prettyErrors = '';
      for (const [index, validateErrorObject] of validationErrors.entries()) {
        const constraints = Object.keys(validateErrorObject.constraints);
        prettyErrors += constraints
          .map((inner) => validateErrorObject.constraints[inner])
          .join(', ');
        if (index !== validationErrors.length - 1) {
          prettyErrors += ', ';
        }
      }

      // update message
      message = prettyErrors;
    }

    response.status(error.httpCode || 500);
    response.json({
      success: false,
      name: error.name,
      message,
      errors: error.errors ? error.errors : [],
    });
  }
}
