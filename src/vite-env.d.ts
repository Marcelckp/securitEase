/// <reference types="vite/client" />
/// <reference types="vitest" />

type ErrorResponse = {
  message: string;
  status?: number;
};

// TypeScript declaration for CSS modules
// Allows importing .module.css files without type errors
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
