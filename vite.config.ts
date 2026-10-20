import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// VITE_BASE is "/<repo-name>/" on GitHub Pages project sites (set in the workflow).
// Use "/" for a user site (repo named <username>.github.io) or a custom domain.
export default defineConfig({ plugins: [react()], base: process.env.VITE_BASE ?? "/" });
