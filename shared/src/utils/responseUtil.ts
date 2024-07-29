/**
 * @fileoverview
 * @version 1.0.0
 * @module responseUtil
 */
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { systemLogger } from './';

export default class ResponseUtil {
  private _unprocessableErrorMsg = 'Sorry, no payload data.';
  moduleName: string;

  unprocessableEntity(res: Response, errorMessage: string) {
    res
      .status(HttpStatusCode.UnprocessableEntity)
      .json(
        this._formatResponse(
          HttpStatusCode.UnprocessableEntity,
          errorMessage ? errorMessage : this._unprocessableErrorMsg
        )
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(res: Response, error: any) {
    if (error?.statusCode > 499) {
      systemLogger.error(error);
    } else {
      systemLogger.warn(error);
    }

    this.error(res, error?.statusCode, error?.error?.message);
  }

  response(res: Response, code: HttpStatusCode, payload: unknown) {
    res.status(code).json(this._formatResponse(code, payload));
  }

  error(res: Response, code: HttpStatusCode, message: string) {
    res.status(code).json({
      code: code,
      payload: {
        error: {
          message: message,
          type: this.moduleName,
        },
      },
    });
  }

  private _formatResponse(code: HttpStatusCode, payload: unknown) {
    return {
      code: code,
      payload: payload,
    };
  }
}
