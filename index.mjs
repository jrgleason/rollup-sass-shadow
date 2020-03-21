import { execSync } from 'child_process';
export class SassShadow{
    constructor(config){
        if (config) {
            Object.assign(this, config)
        }
        this.loadPath = this.loadPath || "node_modules"
    }
    get plugin(){
        // TODO: This context is lost in load
        const loadPath = this.loadPath;
        return {
            name: 'sass-shadow', // this name will show up in warnings and errors
            load(id) {
                if(!id.endsWith('.scss')) return null;
                const a = execSync(`sass ${id} --load-path=${loadPath}`);
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