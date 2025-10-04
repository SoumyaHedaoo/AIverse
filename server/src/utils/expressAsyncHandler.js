/**
 * A higher-order function wrapper that returns an executable async function wrapped in try-catch.
 * 
 * @param {Function} fn - The async route handler to wrap
 * @returns {Function} Express middleware with built-in error handling
 */

const expressAsyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      const red = '\x1b[31m';
      const yellow = '\x1b[33m';
      const reset = '\x1b[0m';

      console.log(`${red}⛔ EXPRESS ASYNC HANDLER ERROR ⛔${reset}`);
      console.log(`${yellow}→ Route: ${req.method} ${req.originalUrl}${reset}`);
      console.log(`${red}→ Message: ${error.message}${reset}`);
      console.log(`${red}→ Stack Trace:${reset}\n`, error.stack);

      next(error); // Pass to Express error handling middleware
    }
  };
};

export { expressAsyncHandler };
