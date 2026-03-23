export default function middleware(req, res, next) {
  console.log("Request received at:", Date.now());
  next();
}

// req (request object): Contains information about the client's request. You can read from or add data to this object for subsequent middleware functions or route handlers to use.
// res (response object): Used to send a response back to the client. Middleware can also modify the response headers or even end the request-response cycle itself.
// next (function): A function that, when called, executes the next middleware function in the stack. If you don't call next(), the request will "hang" and eventually time out, unless the middleware sends a response itself