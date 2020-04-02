import child from 'child_process';
import nodePath from 'path';
import rollupPlugin from 'rollup-pluginutils';


const { createFilter } = rollupPlugin;
const __dirname = nodePath.dirname(new URL(import.meta.url).pathname);

class SassShadow{
    constructor(path=".", config = {}){
        const {
            include = [ '**/*.sass', '**/*.scss' ],
            exclude = 'node_modules/**'
        } = config;
        Object.assign(this, config)
        this.loadPath = this.loadPath || `${path}/node_modules/`;
        this.filter = createFilter(include, exclude);
    }
    get plugin(){
        // TODO: This context is lost in load

        let loadPath = this.loadPath;
        let filter = this.filter;
        return {
            name: 'sass-shadow', // this name will show up in warnings and errors
            async load(id) {
                if (!filter(id)) return;
                const a = child.execSync(`sass ${id} --load-path=${loadPath}`);
                // TODO: Handle all encodings
                // TODO: Add source Map
                return {
                    code: `export default \`${a.toString('utf8')}\``,
                    map: null
                }
            }
        };
    }
}
export default SassShadow