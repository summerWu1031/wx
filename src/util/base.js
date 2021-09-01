const baseURL = process.env.VUE_APP_BASE_API
//全局根路径
//var basePath ="http://www.gzsundo.com";
let basePath = "http://wushu.sportsit.com";

export default {
    install(Vue) {
        //加载图片路径渲染图片 +"/upload",图片加载路径
        Vue.prototype.loadUrl = function loadUrl(url) {
            return "http://wushu.sportsit.cn" + url;
        }
        // 日期格式化（全）
        Vue.prototype.formatNumber = function formatNumber(n) {
            n = n.toString();
            return n[1] ? n : '0' + n
        }
        // 日期格式化（全）
        const formatNumber = function (n) {
            // let date
            // if (this.isString(dateObj)) {
            // 	date = this.strToDate(dateObj)
            // } else if (this.isDate(dateObj)) {
            // 	date = dateObj
            // }
            // else {
            // 	return ""
            // }
            n = n.toString();
            return n[1] ? n : '0' + n
        }

        /**
         * 时间戳和日期转换(年月日+时间)
         * @param times
         */
        Vue.prototype.formatDateTime = function formatDateTime(times) {
            let now = new Date(times)
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let date = now.getDate();
            let hour = now.getHours();
            let minute = now.getMinutes();
            let second = now.getSeconds();
            return year + "-" + formatNumber(month) + "-" + formatNumber(date) + " " + formatNumber(hour) + ":" + formatNumber(minute) + ":" + formatNumber(second);
        }

        /**
         * 时间戳和日期转换（年月日）
         * @param {*} times
         */
        Vue.prototype.formatDate = function formatDate(times) {
            let now = new Date(times)
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let date = now.getDate();
            return year + "-" + formatNumber(month) + "-" + formatNumber(date);
        }

        // 日期格式化
        Vue.prototype.parseTime = function parseTime(time, pattern) {
            if (arguments.length === 0 || !time) {
                return null
            }
            const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
            let date
            if (typeof time === 'object') {
                date = time
            } else {
                if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
                    time = parseInt(time)
                } else if (typeof time === 'string') {
                    time = time.replace(new RegExp(/-/gm), '/');
                }
                if ((typeof time === 'number') && (time.toString().length === 10)) {
                    time = time * 1000
                }
                date = new Date(time)
            }
            const formatObj = {
                y: date.getFullYear(),
                m: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                i: date.getMinutes(),
                s: date.getSeconds(),
                a: date.getDay()
            }
            const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
                let value = formatObj[key]
                if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
                if (result.length > 0 && value < 10) {
                    value = '0' + value
                }
                return value || 0
            })
            return time_str
        }

        /**
         * 身份证获取出身（年月日）/ 年龄/性别
         * @param {*} IdCard
         */
        Vue.prototype.IdCard = function IdCard(UUserCard, num) {
            if (num == 1) {
                //获取出生日期
                let birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
                return birth;
            }
            if (num == 2) {
                //获取性别
                if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                    //男
                    return "1";
                } else {
                    //女
                    return "2";
                }
            }
            if (num == 3) {
                //获取年龄
                let myDate = new Date();
                let month = myDate.getMonth() + 1;
                let day = myDate.getDate();
                let age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
                if (
                    UUserCard.substring(10, 12) < month ||
                    (UUserCard.substring(10, 12) == month &&
                        UUserCard.substring(12, 14) <= day)
                ) {
                    age++;
                }
                return age;
            }
            /* let birthday = "";
            if (idCard != null && idCard != "") {
                if (idCard.length == 15) {
                    birthday = "19" + idCard.substr(6, 6);
                } else if (idCard.length == 18) {
                    birthday = idCard.substr(6, 8);
                }

                birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
            }
            return birthday; */
        }

        /**
         * 浮点运算（加，减，乘，除）
         */
        Vue.prototype.float_calculator = function float_calculator(fun, arg1, arg2) {
            return float_calculators[fun](arg1, arg2);
        }

        //对象格式写法
        var float_calculators = {
            /**
             * 1.记录两个运算数小数点后的位数
             * 2.将其转化为整数类型进行运算
             * 3.移动小数点的位置
             **/
            add: function (arg1, arg2) {
                let r1, r2, m;
                try {
                    //取小数位长度
                    r1 = arg1.toString().split(".")[1].length;
                    r2 = arg2.toString().split(".")[1].length;
                } catch (e) {
                    r1 = 0; r2 = 0;
                }
                m = Math.pow(10, Math.max(r1, r2));		//计算因子

                return (arg1 * m + arg2 * m) / m;
            },
            minus: function (arg1, arg2) {
                return this.add(arg1, -arg2);
            },
            mul: function (arg1, arg2) {
                let r1, r2, m;
                try {
                    //取小数位长度
                    r1 = arg1.toString().split(".")[1].length;
                    r2 = arg2.toString().split(".")[1].length;
                } catch (e) {
                    r1 = 0; r2 = 0;
                }
                m = Math.pow(10, Math.max(r1, r2));		//计算因子

                return (arg1 * m) * (arg2 * m) / (m * m);
            },
            div: function (arg1, arg2) {
                if (arg2 == 0) return 0;
                let t1 = 0, t2 = 0, r1, r2;
                try {
                    t1 = arg1.toString().split(".")[1].length;
                    t2 = arg2.toString().split(".")[1].length;
                } catch (e) { }

                if (Math) {
                    r1 = Number(arg1.toString().replace(".", ""));
                    r2 = Number(arg2.toString().replace(".", ""));
                }

                return (r1 / r2) * Math.pow(10, t2 - t1);
            }
        };

        /**
         * 登出
         */
        Vue.prototype.logouts = function logouts() {
            window.sessionStorage.removeItem("token");
            window.sessionStorage.removeItem("user")
            window.location.href = login
        }

        /**
         * 获取微信授权code
         */
        Vue.prototype.getUrlParam = function getUrlParam(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
        }

        // 时间区间
        Vue.prototype.isDuringDate = function isDuringDate(beginDateStr, endDateStr) {
            let curDate = new Date(),
                beginDate = new Date(beginDateStr),
                endDate = new Date(endDateStr);
            if (curDate >= beginDate && curDate <= endDate) {
                return 0;
            }
            if (curDate >= endDate) {
                return -1;
            }
            if (curDate <= beginDate) {
                return 1;
            }

        }
    }
}


