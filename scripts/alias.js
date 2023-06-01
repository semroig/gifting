import * as fs from "fs";
import * as path from "path";

const alias = [];
const srcPath = path.join(__dirname, "../src");

fs.readdirSync(srcPath).map((dir) => {
    const dirPath = path.join(srcPath, dir);

    if (fs.lstatSync(dirPath).isDirectory()) {
      alias.push({
        name: dir,
        path: path.join(srcPath, dir),
      });
    }
  });

export const viteAlias = alias.map((currentAlias) => ({
    find: currentAlias.name,
    replacement: currentAlias.path,
}));