import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
export default {
  input: './src/index.js',//打包入口文件 
  output: {
    file: 'dist/vue.js',
    format: 'umd',//该模式会在window上挂载一个Vue
    name: 'Vue',
    sourcemap: true
  },
  // babel用于转化高级语法，但对于node_modules下面的高级语法是不用排除的
  plugin: [
    babel({
      exclue:'node_modules/**'
    }),
    serve({
      port:3000,
      contentBase:'',
      openPage:'/index.html'
    })
  ]
}