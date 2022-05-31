import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgrPlugin from 'vite-plugin-svgr'
import { resolve } from "path";
import { compilerOptions } from "./tsconfig.json";

const alias = Object.entries(compilerOptions.paths).reduce((acc, [key, [value]]) => {
	const aliasKey = key.substring(0, key.length - 2);
	const path = value.substring(0, value.length - 2);
	return {
		...acc,
		[aliasKey]: resolve(__dirname, path),
	};
}, {});

// https://vitejs.dev/config/
export default defineConfig({
	// This changes the out put dir from dist to build
	// comment this out if that isn't relevant for your project
	build: {
		outDir: "build",
	},
	plugins: [
		reactRefresh(),
		svgrPlugin({
			svgrOptions: {
				icon: true,
				// ...svgr options (https://react-svgr.com/docs/options/)
			},
		}),
	],
	resolve: {
		alias,
	},
});