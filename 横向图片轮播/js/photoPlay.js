window.onload = () => {
    // 设置元素样式
    setCss = (_this, cssOption) => {
        // 判断节点类型
        if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
            return;
        }
        for (var cs in cssOption) {
            _this.style[cs] = cssOption[cs];
        }
        return _this;
    }
    // 获取指定类型的节点
    getTypeElement = (es, type) => {
        var esLen = es.length, i = 0, eArr = [], esl = null;
        for (; i < esLen; i++) {
            esl = es[i];
            if (esl.nodeName.replace('#', '').toLocaleLowerCase() == type) {
                eArr.push(esl);
            }
        }
        return eArr;
    }
    horizontalShuffling = options => {
        var e = options.e;
        var child = getTypeElement(e.childNodes, 'li'), childLen = child.length, w = 30, _w = childLen * w;
        // 初始化样式
        this.setCss(e, {
            'width': _w
        });
        // 节点移动
        var move = (type, callback) => {
            var v = 0, _left = parseInt((e.style.left || e.offsetLeft), 10);
            if (type == 'l') {
                // 向左移动
                v = w;
                if (_left <= -(_w - w)) {
                    return;
                }
            } else {
                // 向右移动
                v = -w;
                if (_left >= 0) {
                    return;
                }
            }
            var __left = Math.ceil((_left - v) / 300) * 300;
            // 修正左偏向值
            if (__left > 0) {
                __left = 0;
            }
            new animateManage({
                'content': e,  // 被操作的元素
                'effect': 'linear',
                'time': 200,  // 持续时间
                'starCss': {  // 元素的起始偏移量
                    'left': _left
                },
                'css': {  //元素的结束值偏移量
                    'left': __left
                },
                'callback': () => {
                    callback && callback();
                }
            }).init();
        }
        var direction = 'l', horizontalID = -1,  // 横向轮播，定时调用
            closeHorizontal = () => {
                horizontalID != -1 && clearInterval(horizontalID);
            },
            openHorizontal = () => {
                horizontalID = setInterval(() => {
                    var _left = parseInt((e.style.left || e.offsetLeft), 10);
                    if (_left == -(_w - w)) {
                        direction = 'r';
                    }
                    if (_left == 0) {
                        direction = 'l'
                    }
                    move(direction);
                }, 2000)
            };
            openHorizontal();
            // 左按钮单击，执行左轮播
            options.left.onclick = () => {
                move('l');
            }
            // 左按键移入，停止轮播
            options.left.onmouseover = () => {
                closeHorizontal();
            }
            // 左按键移出，开始轮播
            options.left.onmouseout = () => {
                openHorizontal();
            }
            // 右按钮单击，执行右轮播
            options.right.onclick = () => {
                move('r');
            }
            // 右按键移入，停止轮播
            options.right.onmouseover = () => {
                closeHorizontal();
            }
            // 右按键移出，开始轮播
            options.right.onmouseout = () => {
                openHorizontal();
            }    
    }
    // 图片轮播：一般轮播效果
    horizontalShuffling({
        'e': document.getElementById('horizontalShuffling'),
        'left': document.getElementById('horizontalShufflingBtnLeft'),
        'right': document.getElementById('horizontalShufflingBtnRight'),

    })
} 