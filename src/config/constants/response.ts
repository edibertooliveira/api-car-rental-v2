export const SUCCESS_RESPONSE = 'This will be returned successfully';
export const NO_CONTENT_RESPONSE = 'This will be returned when no data';
export const BAD_REQUEST_RESPONSE =
  'This will be returned when has validation error';
export const UNAUTHORIZED_RESPONSE =
  'This will be return when client doesnt provide Authorization';
export const NOT_FOUND_RESPONSE =
  'This will be returned when the interest to be deleted does not exist';
export const UNPROCESSABLE_RESPONSE_ENTITY =
  'This will be returned when some fields did not came the way we needed';
export const FORBIDDEN_RESPONSE =
  'This will be returned when not have credencials to access the resource';
export const INTERNAL_SERVER_ERROR =
  'This will be returned when an unexpected error occurs';

export const conflictResponse = (resource: string): string => {
  return `This will be returned when the ${resource} is already in use`;
};
export const createdResponse = (resource: string): string => {
  return `${resource} successfully created`;
};
