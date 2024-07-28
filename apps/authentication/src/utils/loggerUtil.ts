/**
 * @fileoverview
 * @module
 * @version
 */
import { getLoggerFor } from '@job-finder/utils';
import { loggerConfig } from '@job-finder/configs';

export const authLogger = getLoggerFor(loggerConfig?.authentication);
