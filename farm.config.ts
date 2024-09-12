import { defineConfig } from "@farmfe/core";
import farmPluginPostcss from "@farmfe/js-plugin-postcss";
import { join } from "node:path";

export default defineConfig({
	plugins: ["@farmfe/plugin-react", farmPluginPostcss()],
	compilation: {
		resolve: {
			alias: {
				"@/": join(process.cwd(), "src"),
			},
		},
	},
});
