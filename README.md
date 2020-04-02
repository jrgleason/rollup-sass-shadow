# Rollup Plugin for ShadowDom Sass
## rollup-sass-shadow

Simple plugin to allow for inline Sass from dart sass. This allows for things like styles to be injected into ShadowDom

# Example

## Install

    npm install -D @jrg/rollup-sass-shadow
    
## Use

    // Rollup config
    import SassShadow from '@jrg/rollup-sass-shadow';
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const shadow = new SassShadow(__dirname);
    
    // index.mjs
    import style from './index.style.scss';
    
    //index.style.scss
    @use "@material/top-app-bar/variables" as top-bar;
    :host{]
        height: calc( 100% - #{top-bar.$row-height} );
    }