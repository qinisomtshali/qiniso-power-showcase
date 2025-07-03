import { defineConfig, UserConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(async ({ mode }: { mode: string }): Promise<UserConfig> => {
  const plugins: PluginOption[] = [react()];

  if (mode === "development") {
    const { componentTagger } = await import("lovable-tagger");
    plugins.push(componentTagger() as PluginOption);
  }

  return {
    base: mode === "production" ? "/qiniso-power-showcase/" : "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
