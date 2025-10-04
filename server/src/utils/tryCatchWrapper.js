/**
 * A higher-order function to wrap any async function inside a try-catch block.
 * 
 * @param {Function} fn - The async function to wrap
 * @returns {Function} A wrapper function with improved error logging
 */

const asyncTCWrapper = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      const red = '\x1b[31m';
      const cyan = '\x1b[36m';
      const reset = '\x1b[0m';

      console.log(`${red}🚨 ASYNC TRY-CATCH WRAPPER ERROR 🚨${reset}`);
      console.log(`${cyan}→ Function: ${fn.name || 'anonymous'}${reset}`);
      console.log(`${red}→ Message: ${error.message}${reset}`);
      console.log(`${red}→ Stack Trace:${reset}\n`, error.stack);

      throw error;
    }
  };
};

export { asyncTCWrapper };
