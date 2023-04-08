// 等待文档结构加载完毕再执行
document.addEventListener('DOMContentLoaded', function () {
    initCrumbsNav()
    leftTabClick()
    bottomTabClick()
    asideClick()
    rightMenu()
    showImg()
    zoomUp()
    goodsInfoRender()
    goodsSizeInfo()
    goodsSizeClick()
    goodsCar()
    choosedClick()
})
// 面包屑导航
function initCrumbsNav() {
    let conPoin = document.querySelector('.wrap .con .conPoin')

    goodData.path.forEach(function (item, index) {
        let aNode = document.createElement('a')
        aNode.innerText = item.title
        //当前所在的导航不用加href属性
        // 方法一
        if (index !== goodData.path.length - 1) {
            aNode.href = item.url
        }
        // 方法二
        // if (item.url) aNode.href = item.url
        // 将aNode追加到conPoin中
        conPoin.appendChild(aNode)
    })
    // let last = conPoin.lastElementChild
    // console.log(last);
}
// 左侧tab栏切换
function leftTabClick() {
    let h4Eles = document.querySelectorAll('.wrap .productDetail .aside .tabWrap h4')
    let contents = document.querySelectorAll('.wrap .productDetail .aside .tabContent > div')
    h4Eles.forEach(function (h4Node, index) {
        h4Node.addEventListener('click', function () {
            document.querySelector('.wrap .productDetail .aside .tabWrap h4.active').classList.remove('active')
            this.classList.add('active')
            document.querySelector('.wrap .productDetail .aside .tabContent > div.active').classList.remove('active')
            contents[index].classList.add('active')
        })
    })
}

// 底部tab栏切换
function bottomTabClick() {
    let lisEle = document.querySelectorAll('.wrap .productDetail .detail .intro .tabWrap li')
    let tabContents = document.querySelectorAll('.wrap .productDetail .detail .intro .tabContent > div')
    lisEle.forEach(function (lisNode, index) {
        lisNode.addEventListener('click', function () {
            document.querySelector('.wrap .productDetail .detail .intro .tabWrap li.active').classList.remove('active')
            this.classList.add('active')
            document.querySelector('.wrap .productDetail .detail .intro .tabContent > div.active').classList.remove('active')
            tabContents[index].classList.add('active')
        })
    })
}

// 侧边栏展开折叠
function asideClick() {
    let toolBar = document.querySelector('.wrap .toolBar')
    let butEle = document.querySelector('.wrap .toolBar .but')

    let isClicked = false
    butEle.addEventListener('click', function () {
        this.classList.replace('list', 'cross')
        toolBar.classList.replace('toolWrap', 'toolOut')

        if (isClicked) {
            this.classList.replace('cross', 'list')
            toolBar.classList.replace('toolOut', 'toolWrap')
            console.log(1)
        }
        isClicked = !isClicked
    })
}

//右侧菜单
function rightMenu() {
    let list = document.querySelectorAll('.wrap .toolBar .toolList li')
    list.forEach(function (lisNode, index) {
        // 悬浮时i的背景色 rgb(200,17,34),离开时i的背景色 rgb(122,110,110)
        // 悬浮时em的left = -62px，离开时em的left = 35px
        lisNode.addEventListener('mouseenter', function () {
            this.querySelector('i').style.backgroundColor = 'rgb(200,17,34)'
            this.querySelector('em').style.left = '-62px'
        })
        lisNode.addEventListener('mouseleave', function () {
            this.querySelector('i').style.backgroundColor = 'rgb(122,110,110)'
            this.querySelector('em').style.left = '35px'
        })
    })
}

// 图片展示
function showImg() {
    let ulEle = document.querySelector('.wrap .con .mainCon .previewWrap .specScroll .itemCon .list')
    let zoom = document.querySelector('.wrap .con .mainCon .previewWrap .preview .zoom')
    //小图预览
    let smallImg = document.createElement('img')
    let prev = document.querySelector('.wrap .con .mainCon .previewWrap .specScroll .prev')
    let next = document.querySelector('.wrap .con .mainCon .previewWrap .specScroll .next')
    // 将小图追加到容器中
    zoom.appendChild(smallImg)
    goodData.imgsrc.forEach(function (imgs) {
        // 遍历数据生成相应数量的li和img
        let liNodes = document.createElement('li')
        let imgNodes = document.createElement('img')
        // 将生成的li和img放入相应的缩略图容器
        ulEle.appendChild(liNodes)
        liNodes.appendChild(imgNodes)
        // 为生成的img添加src属性
        imgNodes.src = imgs.s
        // 为小图预览添加src属性
        smallImg.src = imgs.s
        // 点击缩略图将相应的缩略图src赋值给预览图中的src
        liNodes.addEventListener('click', function () {
            smallImg.src = this.firstElementChild.src
        })
    })
    let lisEle = document.querySelectorAll('.wrap .con .mainCon .previewWrap .specScroll .itemCon .list li')
    let maxMoveLength = lisEle.length - 5
    let stepLength = lisEle[0].offsetWidth + parseInt(getComputedStyle(lisEle[0], null).marginRight)
    let num = 0
    next.addEventListener('click', function () {
        num++
        if (num > maxMoveLength) num = maxMoveLength
        ulEle.style.left = -stepLength * num + 'px'
    })
    prev.addEventListener('click', function () {
        num--
        if (num < 0) num = 0
        ulEle.style.left = -stepLength * num + 'px'
    })
}
//放大镜效果
function zoomUp() {
    let smallBox = document.querySelector('.wrap .con .mainCon .previewWrap .preview .zoom')
    let previewEle = document.querySelector('.wrap .con .mainCon .previewWrap .preview')
    let maskNode = document.createElement('div')
    let bigBoxNode = document.createElement('div')
    let imgNode = document.createElement('img')
    let lisEle = document.querySelectorAll('.wrap .con .mainCon .previewWrap .specScroll .itemCon .list li')
    // 大图盒子默认显示第一张图
    imgNode.src = goodData.imgsrc[0].b
    lisEle.forEach(function (item, index) {
        item.addEventListener('click', function () {
            imgNode.src = goodData.imgsrc[index].b
        })
    })
    smallBox.addEventListener('mouseenter', function () {
        smallBox.appendChild(maskNode)
        previewEle.appendChild(bigBoxNode)
        bigBoxNode.appendChild(imgNode)
        maskNode.className = 'mask'
        bigBoxNode.className = 'bigBox'

        // 鼠标移动遮盖层也随之移动
        smallBox.addEventListener('mousemove', function (e) {
            let X = e.pageX - maskNode.clientWidth / 2 - smallBox.getBoundingClientRect().left - document.documentElement.scrollLeft
            let Y = e.pageY - maskNode.clientHeight / 2 - smallBox.getBoundingClientRect().top - document.documentElement.scrollTop
            // 遮盖层最大移动距离
            let maxMoveX = smallBox.clientWidth - maskNode.offsetWidth
            let maxMoveY = smallBox.clientHeight - maskNode.offsetHeight
            if (X < 0) X = 0
            if (Y < 0) Y = 0
            if (X > maxMoveX) X = maxMoveX
            if (Y > maxMoveY) Y = maxMoveY
            maskNode.style.left = X + 'px'
            maskNode.style.top = Y + 'px'
            // 大图最大移动距离
            let bigImgMaxMoveLeft = imgNode.clientWidth - bigBoxNode.offsetWidth
            let bigImgMaxMoveTop = imgNode.clientHeight - bigBoxNode.offsetHeight
            // 遮盖层移动距离 / 遮盖层最大移动距离=大图移动距离 / 大图最大移动距离
            let bigImgMoveLeft = X * bigImgMaxMoveLeft / maxMoveX
            let bigImgMoveTop = Y * bigImgMaxMoveTop / maxMoveY
            imgNode.style.left = -bigImgMoveLeft + 'px'
            imgNode.style.top = -bigImgMoveTop + 'px'
        })
    })

    smallBox.addEventListener('mouseleave', function () {
        smallBox.removeChild(maskNode)
        previewEle.removeChild(bigBoxNode)
    })
}

// 商品信息渲染
let selectedNum;
function goodsInfoRender() {
    let infoBox = document.querySelector('.wrap .con .mainCon .infoWrap .info1')
    let goodsDetail = goodData.goodsDetail
    let pEle = document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .master p')
    // 获取配件选择个数的标签
    let selectedBox = document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result .selected')
    // 获取所有配件的input选项框
    let ipts = document.querySelectorAll('.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem input')
    let rightPrice = document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result .price')
    let pPrice = document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .master p')
    selectedBox.innerHTML = 2
    let priceTotal = 0
    ipts.forEach(function (item) {
        item.addEventListener('change', function () {
            // 获取已选择的配件个数
            selectedNum = document.querySelectorAll('.wrap .productDetail .detail .fitting .goodSuits .suits input:checked')
            selectedBox.innerHTML = selectedNum.length
            changePrice()
        })
    })
    selectedNum = document.querySelectorAll('.wrap .productDetail .detail .fitting .goodSuits .suits input:checked')
    selectedNum.forEach(function (val) {
        let iptPrice = val.getAttribute('value')
        priceTotal += parseFloat(iptPrice)
    })
    // 改变右侧价格
    rightPrice.innerHTML = '￥' + (priceTotal + parseFloat(pPrice.innerText.slice(1)))
    pEle.innerHTML = '￥' + goodsDetail.price

    infoBox.innerHTML = `
            <h3 class="infoName">
                ${goodsDetail.title}
            </h3>
            <p class="news">
                ${goodsDetail.recommend}
            </p>
            <div class="priceArea">
                <div class="priceArea1">
                <div class="title">
                    价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                    <i>￥</i>
                    <em>${goodsDetail.price}</em>
                    <span>降价通知</span>
                </div>
                <div class="remark">
                    <i>累计评价</i>
                    <span>${goodsDetail.evaluateNum}</span>
                </div>
                </div>
                <div class="priceArea2">
                <div class="title">
                    促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销
                </div>
                <div class="fixWidth">
                    <i>${goodsDetail.promoteSales.type}</i>
                    <span>
                    ${goodsDetail.promoteSales.content}
                    </span>
                </div>
                </div>
            </div>
            <div class="support">
                <div>
                <div class="title">
                    支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">
                ${goodsDetail.support}
                </div>
                </div>
                <div>
                <div class="title">配&nbsp;送&nbsp;至</div>
                <div class="fixWidth">${goodsDetail.address}</div>
                </div>

            </div>`
}
// 购物车
function goodsCar() {
    let plus = document.querySelector('.wrap .con .mainCon .infoWrap .choose .carWrap .controls .plus')
    let mins = document.querySelector('.wrap .con .mainCon .infoWrap .choose .carWrap .controls .mins')
    let ipt = document.querySelector('.wrap .con .mainCon .infoWrap .choose .carWrap .controls > input')
    ipt.value = 1
    plus.addEventListener('click', function () {
        ipt.value++
        if (ipt.value > 200) {
            ipt.value = 200
        }
    })
    mins.addEventListener('click', function () {
        ipt.value--
        if (ipt.value < 1) {
            ipt.value = 1
        }
    })

    function debounce(fn, delay = 1000) {
        let timer = 0
        return function () {
            let _this = this
            let args = arguments
            timer && clearTimeout(timer)
            timer = setTimeout(function () {
                fn.apply(_this, args)
            }, delay)
        }
    }
    ipt.addEventListener('input', debounce(function (e) {
        if (Number(ipt.value)) {
            if (ipt.value > 200) {
                ipt.value = 200
            } else if (ipt.value < 1) {
                ipt.value = 1
            }
        } else {
            ipt.value = 1
        }
    }))
}
// 商品规格信息
function goodsSizeInfo() {
    let chooseArea = document.querySelector('.wrap .con .mainCon .infoWrap .choose .chooseArea')

    let info = goodData.goodsDetail.crumbData
    info.forEach(function (item) {
        let dlNode = document.createElement('dl')
        let dtNode = document.createElement('dt')
        dtNode.innerText = item.title
        dlNode.appendChild(dtNode)
        item.data.forEach(function (obj) {
            let ddNode = document.createElement('dd')
            ddNode.innerHTML = obj.type
            ddNode.setAttribute('price', obj.changePrice)
            dlNode.appendChild(ddNode)
        })
        chooseArea.appendChild(dlNode)

    })
}

// 改变规格信息
let conditionArr = [0, 0, 0, 0]
function goodsSizeClick() {
    let dlEle = document.querySelectorAll('.wrap .con .mainCon .infoWrap .choose .chooseArea dl')
    let choosed = document.querySelector('.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed')
    dlEle.forEach(function (item, index) {
        item.addEventListener('click', function (e) {
            if (e.target.tagName === 'DD') {
                choosed.innerHTML = ''
                conditionArr[index] = {
                    text: e.target.innerText,
                    price: parseFloat(e.target.getAttribute('price'))
                }
                conditionArr.forEach(function (val, dlIndex) {
                    if (!val) return
                    let mark = document.createElement('mark')
                    let aNode = document.createElement('a')
                    mark.innerHTML = val.text
                    aNode.innerHTML = 'X'
                    aNode.setAttribute('dlIndex', dlIndex)
                    choosed.appendChild(mark)
                    mark.appendChild(aNode)
                })
                // console.log(conditionArr)
                // 改变dd颜色
                item.querySelectorAll('dd').forEach(function (ddNodes) {
                    ddNodes.style.color = 'rgb(102, 102, 102)'
                })
                e.target.style.color = 'red'
            }
            changePrice()
        })
    })
}
// 修改规格（删除、换色）
function choosedClick() {
    let choosed = document.querySelector('.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed')
    choosed.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            choosed.removeChild(e.target.parentElement)
            let dlIndex = e.target.getAttribute('dlIndex')
            let dlEle = document.querySelectorAll('.wrap .con .mainCon .infoWrap .choose .chooseArea dl')[dlIndex]
            let dds = dlEle.querySelectorAll('dd')
            dds.forEach(function (val) {
                val.style.color = 'rgb(102, 102, 102)'
            })
            dds[0].style.color = 'red'
            conditionArr[dlIndex] = 0
            changePrice()
        }
    })
}
// 价格联动
function changePrice() {
    let em = document.querySelector('.wrap .con .mainCon .infoWrap .info1 .priceArea .priceArea1 .price em')
    let leftPrice = document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .master p')
    // 右侧价格
    let rightPrice = document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result .price')
    let originPrice = goodData.goodsDetail.price  //原始价格5300
    let sumPrice = 0
    conditionArr.forEach(function (item) {
        if (item === 0) return
        sumPrice += item.price
    })
    let topPrice = sumPrice + originPrice
    em.innerText = topPrice
    leftPrice.innerText = '￥' + topPrice

    let priceTotal = 0
    selectedNum.forEach(function (val) {
        let iptPrice = val.getAttribute('value')
        priceTotal += parseFloat(iptPrice)
    })
    rightPrice.innerText = '￥' + (priceTotal + topPrice)
}

