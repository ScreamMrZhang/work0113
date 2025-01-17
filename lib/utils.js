
function typeOf(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
  }
function createElement(tag, attrs, children) {
    // 检测tag是否合法
    if (typeOf(tag) !== 'string') throw new Error('标签名不合法');
    if (tag instanceof HTMLUnknownElement) throw new Error('标签名不合法');
    // 创建节点
    let element = document.createElement(tag)
    // 检测attr是否是对象(非必选项)
    attrs = typeOf(attrs) === 'object' ? attrs : {}
    // 给节点添加属性值
    Object.entries(attrs).forEach(function (item) {
        let attrName = item[0]
        let attrValue = item[1]
        // 判断 属性值为对象的情况
        if (typeOf(attrValue) === 'object') {
            let attrValueStr = ''
            Object.entries(attrValue).forEach(function (ele) {
                attrValueStr += ele.join(':') + ';'
            })
            attrValue = attrValueStr
        }
        element[attrName] = attrValue
    })
    // 子节点
    if (typeOf(children) === 'string') {
        element.innerText = children
    }
    return element
}

// async function readExcelFile(url) {
//
//     var file = await (await fetch(url)).arrayBuffer();
//
//     var workbook = XLSX.read(file);
//
//     // 获取工作表名
//     var sheetNames = workbook.SheetNames;  // 获取第一个工作表名
//     var sheets = sheetNames.map(function (sheetName) {
//         return workbook.Sheets[sheetName]
//     })
//     // console.log(sheets)
//     // 将工作表转换为 JSON 格式
//     // const json = XLSX.utils.sheet_to_json(sheet);
//     var sheetList = sheets.reduce(function (acc, sheet) {
//         acc.push(XLSX.utils.sheet_to_json(sheet))
//         return acc;
//     },[]);
//     return sheetList;
// }