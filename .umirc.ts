import { defineConfig } from 'umi';
import routes from './src/routes';
import theme from './src/theme';

export default defineConfig({
  routes,
  theme,
  favicon: 'favicon.ico',
  sass: {},
  tailwindcss: {
    // tailwindCssFilePath: '@/tailwind.css',
    // tailwindConfigFilePath: 'tailwind-custom.config.js', // 默认取值 tailwindConfigFilePath || join(process.env.APP_ROOT || api.cwd, 'tailwind.config.js'),
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
});
