export class SassShadow{
    constructor(config){
        // TODO
    }
    get plugin(){
        return {
            name: 'string-sass', // this name will show up in warnings and errors
            load(id) {
                if(id.endsWith('.scss')){
                    const a = execSync(`sass ${id} --load-path=node_modules`);
                    return {
                        code: `export default \`${a.toString('utf8')}\``,
                        map: null
                    }
                }
                else{
                    return null;
                }
            },
            resolveFileUrl({ chunkId, fileName, format, moduleId, referenceId, relativePath }) {
                console.log(`Rendering chunk ${fileName}`);
            }
        };
    }
}