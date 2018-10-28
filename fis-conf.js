fis.hook('commonjs');
fis.set('project.ignore', ['new-atf/**', 'output/**', 'fis-conf.js']); // set 为覆盖不是叠加

fis.match('/static/**.{js,scss,png,jpg,map,css,gif,PNG}', {
	useHash: true,
	release: '/public/$0'
});

fis.match('/lib/*.js', {
	useHash: true,
	release: '/public/$0'
});

fis.match('**.{eot,svg,ttf,woff,woff2,eot@,wd3,WD3}', {
	release: '/public/$0'
});

// sass解析
fis.match('*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass'),
    optimizer: fis.plugin('clean-css')
});



fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌
    })
});

// fis.match('/static/modules/*.js', {
//     isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
//     release: '../public/$0'
// });

// fis.media('debug').match('*.{js,scss,png}', {
// 	useHash: false,
// 	useSprite: false,
// 	optimizer: null
// });


// 发布命令 fis3 release push
// 输出为php
fis.media('push').match('/views/**', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://101.200.150.167:3004/receiver.php',
    //远端目录
    to: '/var/www/RO_DZ'
  })
}).match('*.html', {
	rExt: '.php',
	release: '/resources/$0'
});
//输出静态资源
fis.media('push').match('{/static/**,/lib/**}', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://101.200.150.167:3004/receiver.php',
    //远端目录
    to: '/var/www/RO_DZ/public'
  })
});

fis.set('project.fileType.text', 'es');
fis.match('*.es.js', {
    // parser: fis.plugin('babel-6.x', {
    parser: fis.plugin('babel-6.x', {
        // presets: [
        // 注意一旦这里在这里添加了 presets 配置，则会覆盖默认加载的 preset-2015 等插件，因此需要自行添加所有需要使用的 presets
        // ]
    }),
    rExt: 'js'
});
// 压缩js
fis.match('/static/*.js', {
	optimizer: fis.plugin('uglify-js')
});
