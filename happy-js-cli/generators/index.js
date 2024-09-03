import react from './react/index.js';
import playwright from './playwright/index.js';
import nextjs from './nextjs/index.js';
import nestjs from './nestjs/index.js';
import node from './node/index.js';
import tailwind from './tailwind/index.js';
import electron from './electron/index.js';
import expo from './expo/index.js';
import mui from './mui/index.js';
import chakra from './chakra/index.js';

export default function getGenerators() {
  return {
    nextjs: nextjs(),
    react: react(),
    // playwright: playwright(),
    nestjs: nestjs(),
    node: node(),
    tailwind: tailwind(),
    electron: electron(),
    expo: expo(),
    mui: mui(),
    chakra: chakra(),
  };
}
