declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      JWT_SEC: string;
      STRIPE_KEY: string;
      PASS_SEC: string;
      EMAIL_SERVICE: string;
      EMAIL_USERNAME: string;
      EMAIL_PASSWORD: string;
      EMAIL_FROM: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
