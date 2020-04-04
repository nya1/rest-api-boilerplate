import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { injectable, inject, named } from 'inversify';
import { AppLogger } from '@src/util/logger';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { AppConfig } from '@src/util/config';

/**
 * HttpError if is thrown by a validation error (class-validator)
 * should contain the `errors` field, this type is not provided by
 * routing-controllers
 */
export type HttpErrorWithValidation = HttpError & { errors?: ValidationError[] };

/**
 * standard error response
 */
interface JsonErrorResponse {
  success: false;
  message: string;
  errors: object[] | [];
  stack?: string | undefined; // stack is present only in dev/staging
}

@Middleware({ type: 'after' })
@injectable()
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  constructor(
    @inject(AppConfig) private config: AppConfig,
    @inject(AppLogger) @named('ErrHandler') private logger: AppLogger,
  ) {}

  error(error: HttpErrorWithValidation, request: Request, response: Response) {
    const logLevel = error.httpCode === 500 ? 'error' : 'warn';
    this.logger.log(logLevel, `${error.name} error`, { error, stack: error.stack });

    const jsonResponse: JsonErrorResponse = {
      success: false,
      message: error.message,
      errors: error.errors ? error.errors : [], // validation errors
    };

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
      jsonResponse.message = prettyErrors;
    }

    const statusCode = error.httpCode || 500;

    if (statusCode === 500) {
      jsonResponse.message = 'Internal server error, please try again';
    }

    // set stack only if is dev/staging
    if (!this.config.isProd) {
      jsonResponse.stack = error.stack;
    }

    response.status(statusCode).json(jsonResponse);
  }
}
