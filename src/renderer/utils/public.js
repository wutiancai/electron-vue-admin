import {getBaseURL} from "@/utils/request";
import {Terminal} from "xterm";
import {FitAddon} from "xterm-addon-fit";
class Public {
    static getObjKeys(jsonObject1) {
        let keys1 = [];
        for (let p1 in jsonObject1) {
            if (jsonObject1.hasOwnProperty(p1))
                keys1.push(p1);
        }
        return keys1;
    }
}

let IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
let IPV4_MASK_CHUNK = /^(?:(?:\S+)(?:\s+)(?:\S+))$/;
let IPV4_WILDCARD_CHUNK = /^(?:([01]?[0-9]?\*|2[0-5]?\*|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\-(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))$/;
let IPV6_REGEX = /^((?:[a-f\d]{1,4}:){7}[a-f\d]{1,4}|((?:[a-f\d]{1,4}:){0,6}[a-f\d]{1,4})?::((?:[a-f\d]{1,4}:){0,6}[a-f\d]{1,4})?)$/i;
let IPV6_WILDCARD_CHUNK = /^(\*[a-f\d]{0,3}|[a-f\d]{0,3}\*|[a-f\d]{1,4}\-[a-f\d]{1,4}|[a-f\d]{1,4})$/i
/**
 * Validates an IP address
 */
let isValidIp = function (scan) {
    if (scan.indexOf(":") != -1) {
        return IPV6_REGEX.test(scan);
    } else {
        return IPV4_REGEX.test(scan);
    }
}
let isValidCidr = function (scan) {
    let pieces = scan.split('/');
    if (pieces.length == 2 && isValidIp(pieces[0])) {
        let strMask = pieces[1];
        if (strMask.match(/^\d+$/) == null) {
            return false;
        }
        let mask = new Number(strMask)
        if (pieces[0].indexOf(":") != -1) {
            return (mask >= 0 && mask <= 128);
        } else {
            return (mask >= 0 && mask <= 32);
        }
    }
}
let isValidRange = function (scan) {
    let pieces = scan.split('-');
    // return (pieces.length == 2 && isValidIp(pieces[0]) && isValidIp(pieces[1]));
    return (pieces.length == 2 && isValidIp(pieces[0] + '') && /^\d+$/.test(pieces[1]) && parseInt(pieces[1]) < 256);
}
let isValidWildcard = function (scan) {
    let addrChunks = [];
    if (scan.indexOf('*') == -1)
        return false;

    if (scan.indexOf(':') != -1) {
        addrChunks = scan.split(':');
        let oneEmpty = false;
        for (let v6Chunk in addrChunks) {
            if (v6Chunk.length > 0) {
                if (!IPV6_WILDCARD_CHUNK.test(v6Chunk)) {
                    return false;
                }
            } else if (!oneEmpty) {
                oneEmpty = true;
            } else {
                return false;
            }
        }
    } else {
        addrChunks = scan.split('.');
        for (let v4Chunk in addrChunks) {
            if (!IPV4_WILDCARD_CHUNK.test(v4Chunk)) {
                return false;
            }
        }
    }
    return true;
}
let isValidMask = function (scan) {
    let addrChunks = [];
    if (IPV4_MASK_CHUNK.test(scan)) {
        addrChunks = scan.split(/\s+/);
        return IPV4_REGEX.test(addrChunks[0]) && IPV4_REGEX.test(addrChunks[1]);
    }
    return false;
}
// ip格式验证
let isIP = function (scan) {
    if (isValidIp(scan)) {
        return true;
    } else if (isValidCidr(scan)) {
        return true;
    } else if (isValidRange(scan)) {
        return true;
    } else if (isValidWildcard(scan)) {
        return true;
    } else if (isValidMask(scan)) {
        return true;
    } else {
        return false;
    }
};
// 座机格式验证
let isvalidTelephone = function (scan) {
    // const reg = /^\d{3,4}-?\d{7,9}$/;//正确的座机号码格式校验
    const reg = /^[0-9]+(.[0-9]{0,3})?$/;//只输入数字，不做格式验证

    return reg.test(scan)
}
// 手机号码格式验证
let isvalidMobilephone = function (scan) {
    // const reg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    const reg = /^1[34578]\d{9}$/
    return reg.test(scan)
}

/*
* 表格表头下拉
* */
let renderHeaderSelect = function (h, column, filters, callback) {


    //下拉框内容包裹在一个div里面
    return h(
        "div",
        {
            style: {
                height: "55px",
                float: "left",
                width: "75%"
            }
        },
        [
            h(
                "span",
                {
                    //div里面有一个文字提示：下拉框所属内容
                    style: {},

                },
                column.label
            ),
            h(
                "el-select",
                {
                    //el-select实现下拉框
                    on: {
                        input: (value) => {

                            //随着下拉框的不同，文字框里的内容在边
                            //alert(value)
                            $('.' + column.id).children().find("input").val(value)
                            setTimeout(function () {
                                $('.' + column.id).children().find("input").blur()
                            }, 100)
                            callback(value)
                        }
                    },
                    props: {
                        value: "请选择",//文字框的内容取决于这个value，如果value不存在，会报错
                        size: "small",

                    },
                    style: {
                        "line-height": '24px',
                        height: '24px'
                    },
                    class: "table-head-input"

                },
                [
                    //下拉框里面填充选项，通过filters遍历map，为每一个选项赋值。
                    filters.map(item => {
                        return h("el-option", {
                            props: {
                                value: item.value,
                                label: item.label
                            }
                        });
                    })
                ]
            )
        ]
    );
}
/*
* 表格表头输入框
* */
let renderHeaderInput = function (h, column, callback) {


    //下拉框内容包裹在一个div里面
    return h(
        "div",
        {
            style: {
                height: "55px",
                float: "left",
                width: "75%"
            }
        },
        [
            h(
                "span",
                {
                    //div里面有一个文字提示：下拉框所属内容
                    style: {},

                },
                column.label
            ),
            h(
                "input",
                {

                    on: {
                        click: (ev) => {
                            ev.stopPropagation();

                        },
                        input: (v) => {
                            callback(v.target.value)
                        }
                    },
                    props: {
                        value: "",//文字框的内容取决于这个value，如果value不存在，会报错
                        size: "small",
                        "v-model": ""
                    },
                    style: {
                        "line-height": '24px',
                        height: '24px',
                        'border-radius': '4px 4px 4px 4px!important'
                    },
                    class: "table-head-input form-control"

                }
            )
        ]
    );
}
const getDateStr = function (strDate) {
    var st = strDate;
    var a = st.split("T"); //这个根据你的字符串决定，如果中间为T则改T
    var b = a[0].split("-");
    var c = a[1].split(".");
    c.pop()
    // var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
    return b.join('-') + ' ' + c.join('.');
}
const dragDiv = function () {
                var resize = document.getElementsByClassName('resize');
                var left = document.getElementsByClassName('left');
                var mid = document.getElementsByClassName('mid');
                var box = document.getElementsByClassName('box');
                for (let i = 0; i < resize.length; i++) {
                    // 鼠标按下事件
                    resize[i].onmousedown = function (e) {
                        //颜色改变提醒
                        resize[i].style.background = '#818181';
                        var startX = e.clientX;
                        resize[i].left = resize[i].offsetLeft;
                        // 鼠标拖动事件
                        document.onmousemove = function (e) {
                            var endX = e.clientX;
                            var moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
                            var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

                            if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
                            if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px

                            resize[i].style.left = moveLen; // 设置左侧区域的宽度

                            for (let j = 0; j < left.length; j++) {
                                left[j].style.width = moveLen + 'px';
                                mid[j].style.width = (box[i].clientWidth - moveLen - 10) + 'px';
                            }
                        };
                        // 鼠标松开事件
                        document.onmouseup = function (evt) {
                            //颜色恢复
                            resize[i].style.background = '#d6d6d6';
                            document.onmousemove = null;
                            document.onmouseup = null;
                            resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
                        };
                        resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
                        return false;
                    };
                }
            }
export default {
    install (Vue, options) {
        Vue.prototype.getBaseURL = getBaseURL
        Vue.prototype.getObjKeys = function (jsonObject1) {
            return Public.getObjKeys(jsonObject1)
        }
        // IP验证
        Vue.prototype.isIP = function (IP) {
            return isIP(IP)
        }
        // 座机号码验证
        Vue.prototype.isvalidTelephone = function (telephone) {
            return isvalidTelephone(telephone)
        }
        // 手机号码验证
        Vue.prototype.isvalidMobilephone = function (mobilephone) {
            return isvalidMobilephone(mobilephone)
        }
        Vue.prototype.table_head_select = function (h, column, filters, callback) {

            return renderHeaderSelect(h, column, filters, callback);
        }
        Vue.prototype.table_head_input = function (h, column, callback) {

            return renderHeaderInput(h, column, callback);
        }
        // 在Vue的原型链上注册方法，控制组件
        Vue.prototype.getDateStr = (msg) => {
            return getDateStr(msg);
        }
        Vue.prototype.dragDiv = () => {
            return dragDiv();
        }
        Vue.prototype.getTerminal = () => {
            const term = new Terminal({
                rendererType: "dom", //渲染类型canvas,dom
                rows: 30, //行数
                // cols: 200, // 不指定行数，自动回车后光标从下一行开始
                convertEol: true, //启用时，光标将设置为下一行的开头
                  scrollback: 50000000000, //终端中的回滚量
                disableStdin: false, //是否应禁用输入。
                cursorStyle: 'bar', //"underline", //光标样式
                // cursorBlink: true, //光标闪烁
                theme: {
                    foreground: "#BBBBBB", //"#7e9192", //字体
                    background: "#304156", //背景色
                    cursor: "help", //设置光标
                    lineHeight: 16
                }
            });
            const fitAddon = new FitAddon();
            term.loadAddon(fitAddon);
            window.onresize = () => {
                fitAddon.fit();
            };
            setTimeout(function () {
                console.log('fit the terminal')
                fitAddon.fit();
            }, 1000)
            return {'term': term, 'fitAddon': fitAddon};
        }
        Vue.prototype.inputRule = (rule, value, callback) => { // 判断手机号是否正确
            console.log('input_type', rule.value_type)
            let obj = {
                "float": {"reg": /^(-?\d+)(\.\d+)?$/, "message": "请输入浮点型数据"},
                "int": {"reg": /^-?\d+$/, "message": "请输入整数数据"},
                "string": {"reg": /.+/, "message": "请输入内容"},
                "tuple": {"reg": /.*/, "message": "请输入元组内容"},
                "list": {"reg": /.*/, "message": "请输入元组内容"}
                // "boolean": {"reg": /^(-?\\d+)(\\.\\d+)?$/, "message": "请输入浮点型数据"}
            }
            if (!obj[rule.value_type]["reg"].test(value)) {
                callback(new Error(obj[rule.value_type]["message"]))
            } else {
                callback()
            }
        }
        Vue.prototype.removeArrayObj = (_arr, _obj) => {
            var length = _arr.length;
            for (var i = 0; i < length; i++) {
                if (_arr[i] === _obj) {
                    if (i === 0) {
                        _arr.shift(); //删除并返回数组的第一个元素
                        return _arr;
                    } else if (i === length - 1) {
                        _arr.pop(); //删除并返回数组的最后一个元素
                        return _arr;
                    } else {
                        _arr.splice(i, 1); //删除下标为i的元素
                        return _arr;
                    }
                }
            }
        }
        Vue.prototype.subStringOne = function (text, begin, end) {
            var regex;
            if (end === "") {
                let index = text.lastIndexOf(begin);
                return text.substring(index + begin.length + 1, text.length);
            }
            if (end === '\\n')
                regex = RegExp(begin + '(.+)?');
            else
                regex = RegExp(begin + '([.\\s\\S]+?)' + end);
            try {
                return regex.exec(text)[1].trim()
            } catch (err) {
                return null;
            }
        };
    }
};