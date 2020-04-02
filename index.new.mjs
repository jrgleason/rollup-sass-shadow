import child from 'child_process';
import path from 'path';
import { createFilter } from 'rollup-pluginutils';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default plugins(options = {}){
    const {
        include = [ '**/*.sass', '**/*.scss' ],
        exclude = 'node_modules/**',
    } = options;
    return {
        name: "shadow-sass",
        intro() {
            console.log("Intro");
        },
        async transform(code, id) {
            console.log("transform");
        }
    }
}

class SassShadow{
    constructor(path, config){
        console.log(`The path is ${path}`);
        if (config) {
            Object.assign(this, config)
        }
        path = path || '.';
        this.loadPath = this.loadPath || `${path}/node_modules/`;
    }
    get plugin(){
        // TODO: This context is lost in load
        const {
            include = [ '**/*.sass', '**/*.scss' ],
            exclude = 'node_modules/**',
        } = options;
        let loadPath = this.loadPath;
        return {
            name: 'sass-shadow', // this name will show up in warnings and errors
            load(id) {
                if(!id.endsWith('.scss')|| !id.endsWith('.sass')) return null;
                const a = child.execSync(`sass ${id} --load-path=${loadPath}`);
                // TODO: Handle all encodings
                // TODO: Add source Map
                return {
                    code: `export default \`${a.toString('utf8')}\``,
                    map: null
                }
            },
            resolveFileUrl({ chunkId, fileName, format, moduleId, referenceId, relativePath }) {
                console.log(`Rendering chunk ${fileName}`);
            }
        };
    }
}
export default SassShadow