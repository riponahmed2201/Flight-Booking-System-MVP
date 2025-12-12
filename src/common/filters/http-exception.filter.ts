import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error = 'InternalServerError';

        // Handle HTTP exceptions
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (typeof exceptionResponse === 'object') {
                message =
                    (exceptionResponse as any).message || exception.message;
                error = (exceptionResponse as any).error || exception.name;
            }
        }
        // Handle TypeORM query errors
        else if (exception instanceof QueryFailedError) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Database query failed';
            error = 'QueryFailedError';

            // Handle unique constraint violations
            if ((exception as any).code === '23505') {
                status = HttpStatus.CONFLICT;
                message = 'Resource already exists';
                error = 'ConflictError';
            }
        }
        // Handle unknown errors
        else if (exception instanceof Error) {
            message = exception.message;
            error = exception.name;
        }

        // Log the error
        this.logger.error(
            `${request.method} ${request.url}`,
            exception instanceof Error ? exception.stack : exception,
        );

        // Send response
        const errorResponse = {
            statusCode: status,
            message,
            error,
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        // In development, include stack trace
        if (process.env.NODE_ENV === 'development' && exception instanceof Error) {
            (errorResponse as any).stack = exception.stack;
        }

        response.status(status).json(errorResponse);
    }
}
