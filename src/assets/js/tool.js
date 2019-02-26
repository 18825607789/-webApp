const weelArr = ['天', '一', '二', '三', '四', '五', '六']

export function timeDesc(time) {
    let date = new Date().getTime() // 获取当前日期时间戳
    let decTime = date - time // 判断日期是几天前的
    let decDay = Math.floor(decTime / (1000 * 60 * 60 * 24)) //天数差

    var msgTime = new Date(time)
    if (decDay <= 1) {
        // 时间差一天以内 获取时间
        let h = msgTime.getHours()
        let m = msgTime.getMinutes() + ''
        h = h > 12 ? `下午${h - 12}` : `上午${h}`
        return h + ":" + returnDoubleDate(m)
    } else if (decDay > 1 && decDay < 5) {
        // 星期几
        let week = msgTime.getDay()
        return `星期${weelArr[week]}`
    } else {
        let M = returnDoubleDate(msgTime.getMonth() + 1 + '')
        let d = returnDoubleDate(msgTime.getDate() + '')
        return M + '-' + d
    }

}

export function getLetter(name) {
    return pinyinUtil.getFirstLetter(name).substring(0, 1);
}

export function handleMessage(msg) {
    let message;
    let imgReg = /<img\b.*?(?:\>|\/>)/gi;
    if (imgReg.test(msg)) {
        return msg;
    } else {
        let reg = /</gi;
        message = msg.replace(reg, "&lt;");
        return message;
    }
}

function returnDoubleDate(time) {
    return ('00' + time).substr(time.length)
}