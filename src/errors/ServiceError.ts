export const enum ServiceErrorType {
  BAD_REQUEST = 'BadRequest', // 400 - The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
  FORBIDDEN = 'Forbidden', // 403 - The server understood the request but refuses to authorize it, likely due to insufficient authentication credentials.
  NOT_FOUND = 'NotFound', // 404 The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.
  NOT_ACCEPTABLE = 'NotAcceptable', // 406 - The target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation.
  REQUEST_TIMEOUT = 'RequestTimeout', // 408 - The server did not receive a complete request message within the time that it was prepared to wait. 
  CONFLICT = 'Conflict', // 409 - The request could not be completed due to a conflict with the current state of the target resource. This code is used in situations where the user might be able to resolve the conflict and resubmit the request. 
  TEAPOT = 'Teapot', // 418 - I'm a teapot.
  LOCKED = 'Locked', // 423 - The source or destination resource of a method is locked.
  TOO_MANY_REQUESTS = 'TooManyRequests', // 429 - The user has sent too many request in a given amount of time ("rate limiting").
  DYNAMO_QUERY_ERROR = 'UnexpectedDynamoQueryResponse', // 500
  INTERNAL_SERVER_ERROR = 'InternalServerError' // 500 - The server encountered an unexpected condition that prevented it from fulfilling the request.
};

export class ServiceError extends Error {

  public name: ServiceErrorType;

  constructor(name: ServiceErrorType, message: string) {
    super(message);
    this.name = name;
  };
};