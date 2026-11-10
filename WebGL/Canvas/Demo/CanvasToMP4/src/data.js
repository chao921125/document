const data = {
    bgImage: '../static/img/bg.jpg',
    robot: '../static/img/2.png',
    map: [{
        id: 1,
        name: '岳麓山东大门',
        original: [493, 325],
        imgs: [{
            id: 'a1',
            src: '../static/img/a1.jpg',
            enter: ['left', 'top'],
            leave: ['right', 'bottom']
        }, {
            id: 'a2',
            src: '../static/img/a2.jpg',
            enter: ['left', 'center'],
            leave: ['right', 'center'],
        }, {
            id: 'a3',
            src: '../static/img/a3.jpg',
            enter: ['left', 'bottom'],
            leave: ['right', 'top'],
        }]
    }, {
        id: 2,
        name: '索道上站',
        original: [870 / 2, 305 / 2],
        imgs: [{
            id: 'b1',
            src: '../static/img/b1.jpeg',
            enter: ['left', 'top'],
            leave: ['right', 'bottom']
        }, {
            id: 'b2',
            src: '../static/img/b2.jpg',
            enter: ['left', 'center'],
            leave: ['right', 'center'],
        }, {
            id: 'b3',
            src: '../static/img/b3.jpg',
            enter: ['left', 'bottom'],
            leave: ['right', 'top'],
        }]
    }, {
        id: 3,
        name: '禹王牌',
        original: [730 / 2, 175 / 2]
    }, {
        id: 4,
        name: '爱晚亭',
        original: [577 / 2, 320 / 2]
    }, {
        id: 5,
        name: '岳麓书院',
        original: [600 / 2, 375 / 2]
    }, {
        id: 6,
        name: '湖南大学',
        original: [625 / 2, 470 / 2]
    }]
}



module.exports = data;