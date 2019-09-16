//请求Nodejs提供的path模块
//path有一个方法：resolve（参数1，参数2）
//参数1：__dirname表示当前目录的路径
//参数2：需要追加的目录名，不用写/,resolve方法会帮我们自动追加/
var path = require('path');
var ExtractTextplugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var getHtmlConfig =function(name){

	return{
			template:'./src/view/'+name+'.html',
			filename:'view/'+name+'.html',
			inject:true,
			hash:true,
			chunks:['common',name]
		}
}

var config = {
	entry: {
		'common':['./src/page/common/index.js'],
		'index':'./src/page/index/index.js',
		'user-login':'./src/page/user-login/index.js'

	},
    output: {
    	path:path.resolve(__dirname,'dist'),
    	publicPath:'/dist',
		filename: 'js/[name].js'
	},
	externals:{
		'jquery':'window.jQuery'
	},
	/*optimization:{
		//抽取公共模块的对象
		splitChunks: {
			//缓存组
			cacheGroups: {
				//commons表示公共都的模块
				commons: {
					//即会生产独立通用模块base.js文件
					name:'base',
					chunks:'initial',
					//最小2个文件有公共内容才提取
					minChunks:2,
					 //SplitChunksPlugin默认地只会分离大于30Kb的文件
       				 //我们的公共文件并没有大于30Kb，所以改为0之后就完美了
					minSize:0
				}
			}
		}
	},*/
	module:{
		rules:[
		{
			test:/\.css$/,
		loader:ExtractTextplugin.extract({
			fallback:"style-loader",
			use:"css-loader"
		})
		//loader:"style-loader!css-loader"
		},
		{
			test:/\.(gif|png|jpg|woff|svg|eot|ttf).??.*$/,
			loader:'url-loader?limit=100&name=resource/[name].[ext]'
		}
	  ]
	},
	plugins:[
		new ExtractTextplugin('css/[name].css'),
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login'))
	]
}

if ('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}

module.exports = config;