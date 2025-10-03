
import "dotenv/config";
import { app } from "./app.js";
import { connectNeonDb } from "./db/index.js";

const reset = '\x1b[0m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const red = '\x1b[31m';
const blue = '\x1b[34m';
const magenta = '\x1b[35m';
const bold = '\x1b[1m';
const underline = '\x1b[4m';

function printRoutes(app) {
  console.log(); // Add space
  console.log(`${magenta}${bold}🌐 Available Endpoints:${reset}`);
  console.log(`${yellow}-------------------------${reset}`);
  console.log(); // Add space
  
  const routes = [];
  if (app._router && app._router.stack) {
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        // Routes registered directly on the app
        routes.push(middleware.route);
      } else if (middleware.handle && middleware.handle.stack) {
        // Router middleware
        middleware.handle.stack.forEach((handler) => {
          if (handler.route) {
            routes.push(handler.route);
          }
        });
      }
    });
  }

  if (routes.length === 0) {
    console.log(`${yellow}⚠️ No routes registered yet.${reset}`);
  } else {
    routes.forEach((route) => {
      const method = Object.keys(route.methods)[0].toUpperCase();
      console.log(`${blue}${bold}${method}${reset} ${green}${underline}${route.path}${reset}`);
    });
  }
  console.log(`${yellow}-------------------------${reset}`);
  console.log(); // Add space
}

connectNeonDb()
  .then(() => {
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
      console.log(); // Add space
      console.log(`${yellow}${bold}🚀 Server is up and running on port: ${green}${port}${reset}`);
      console.log(); // Add space
      printRoutes(app);
    });

    server.on("error", (error) => {
      console.log(); // Add space
      console.error(`${red}${bold}===========================${reset}`);
      console.error(`${red}${bold}❌ ERROR: Server connection failed${reset}`);
      console.error(`${red}Details: ${error.message || error}${reset}`);
      if (error.stack) {
        console.error(`${red}${underline}Stack Trace:${reset}`);
        console.error(error.stack.replace(/^/gm, `${red}  ${reset}`)); // Indent stack for readability
      }
      console.error(`${red}${bold}===========================${reset}`);
      console.log(); // Add space
      process.exit(1);
    });
  })
  .catch((err) => {
    console.log(); // Add space
    console.error(`${red}${bold}===========================${reset}`);
    console.error(`${red}${bold}❌ ERROR: Neon DB connection failed${reset}`);
    console.error(`${red}Details: ${err.message || err}${reset}`);
    if (err.stack) {
      console.error(`${red}${underline}Stack Trace:${reset}`);
      console.error(err.stack.replace(/^/gm, `${red}  ${reset}`)); // Indent stack for readability
    }
    console.error(`${red}${bold}===========================${reset}`);
    console.log(); // Add space
    process.exit(1);
  });