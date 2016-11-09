var config = {
    // debug 为 true 时，用于本地调试
    debug: true,
    //html压缩开启
    pretty:false,
    name: '螺主', // 社区名字
    description: '螺主螺主', // 社区的描述
    keywords: 'nodejs, node, express, connect, socket.io，html5,移动端技术',
    // 社区的域名
    host: 'http://www.luozhu.co',

    //mongodb配置
    db: 'mongodb://localhost:27017/luozhu',
    // 程序运行的端口
    port: 3000,
    upload: {
        url: '/public/upload/'
    }
}

module.exports = config;