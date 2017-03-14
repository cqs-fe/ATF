fis.hook('commonjs');

fis.match('*.{js,scss,png,jpg,css}', {
	useHash: true,
	release: '/public/$0'
});

fis.match('*.{eot,svg,ttf,woff,woff2}', {
	release: '/public/$0'
});

// sass解析
fis.match('*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass'),
    optimizer: fis.plugin('clean-css')
});

// 压缩js
fis.match('/static/*.js', {
	optimizer: fis.plugin('uglify-js')
});

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌
    })
});

fis.match('/static/modules/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    release: '/public/$0'
});

fis.media('debug').match('*.{js,scss,png}', {
	useHash: false,
	useSprite: false,
	optimizer: null
});


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

