//当窗口大小重置之后，重新执行
$(window).on('resize',function(){
    reset()
})
//当窗口加载完毕，执行瀑布流
$(window).on('load',function(){
    reset()
})      
function onfilter()
{
    reset()
}

function reset(){
    var filterStr=document.getElementById("filterInput").value
    var imgWidth = $('img').outerWidth(true)   //单张图片的宽度
    var divWidth = $('div').width() //页宽
    var colCount = parseInt(divWidth/imgWidth)   //计算出列数
    var leftMargin = parseInt((divWidth - imgWidth * colCount - colCount)/2)  // 左边距，保持居中
    var topMargin = 70  //预留过滤条件输入框高度
    var colHeightArry= []   //定义列高度数组
    for(var i = 0 ; i < colCount; i ++){
        colHeightArry[i] = topMargin
    }
    var showCount = 0   //显示的项目数
    var filterTagSet = new Set(filterStr.toLowerCase().replace('，',',').replace(' ','').split(','))
    filterTagSet.delete("") //过滤条件转成无空不重复的集合

    $('img').each(function(){
        var showThis = true //没有过滤条件，则显示所有项
        var imgTagStr = $(this).attr('tag')
        
        if (0 != filterTagSet.size) {                    
            if (imgTagStr) {
                // var imgTagSet = new Set(imgTagStr.split(','))
                for (tag of filterTagSet) {
                    // if (!imgTagSet.has(tag)) {
                    if (!imgTagStr.includes(tag)) { // 支持过滤条件未输入完整时的部分匹配
                        showThis = false   //只要有一个过滤的标签不属于项目标签，则不显示
                    }
                }                        
            }
            else {
                showThis = false // 项目无标签
            }
        }
        
        var tipId = $(this).attr("src")
        var tipBtn = document.getElementById(tipId)
        tipBtn.style.opacity = 1
        
        if (showThis){
            var minValue = colHeightArry[0]
            var minIndex = 0
            for(var i = 0 ; i < colCount; i ++){
                if(colHeightArry[i] < minValue){
                    minValue = colHeightArry[i]
                    minIndex = i
                }
            }

            $(this).css({
                left: minIndex * imgWidth + leftMargin,
                top: minValue,
                opacity: 1
            })
            colHeightArry[minIndex] += $(this).outerHeight(true)
            
            showCount += 1
            
            tipBtn.style.left = minIndex * imgWidth + leftMargin + 65 + "px"
            tipBtn.style.top = minValue + 5 + "px"
            //tipBtn.style.opacity = 1
        }
        else {
            $(this).css({
                left: -1000,
                top: -1000,
                opacity: 0  // 隐藏未包含标签项
            })
            
            tipBtn.style.left = "-1000px"
            tipBtn.style.top = "-1000px"
            //tipBtn.style.opacity = 0
        }
    })
        
    document.getElementById("count").innerHTML = showCount
}
