//% color="#4169E1" iconWidth=50 iconHeight=40
namespace cvshow{

    //% externalFunc
    export function getColorsFunc_() {
        return [
            "#fff", "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "#000"
        ]
    }

    //% block="初始化OPENCV" blockType="command"
    export function cv2_init(parameter: any, block: any){
        Generator.addImport("import cv2");

    }

    //% block="对象名[NAME]初始化[NUM]号摄像头并设置帧缓冲 " blockType="command"
    //% NAME.shadow="normal"   NAME.defl="cap"
    //% NUM.shadow="normal"   NUM.defl="0"
    export function init(parameter: any, block: any){
        let name = parameter.NAME.code
        let num = parameter.NUM.code
        Generator.addCode(`${name} = cv2.VideoCapture(${num})`)
        Generator.addCode(`${name}.set(cv2.CAP_PROP_BUFFERSIZE, 1)`)

    }

    //%block="创建窗口[WIN]并设置为全屏"blockType="command"
    //% WIN.shadow="normal"   WIN.defl="winname"
    export function window(parameter: any, block: any){
        let win = parameter.WIN.code
        Generator.addCode(`cv2.namedWindow('${win}',cv2.WND_PROP_FULLSCREEN)`);
        Generator.addCode(`cv2.setWindowProperty('${win}', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)`);

    }

    //% block="每[SEC]毫秒刷新图像" blockType="command"
    //% SEC.shadow="number"   SEC.defl="1"
    export function refrash(parameter: any, block: any){
        let sec = parameter.SEC.code
        Generator.addCode(`key = cv2.waitKey(${sec})`)
    }


    //% block="在图片[IMG]上绘制文字[TEXT]位置[LOC]大小[SIZ] 颜色[COLOR]" blockType="command"
    //% IMG.shadow="normal"   IMG.defl="img"
    //% TEXT.shadow="normal"   TEXT.defl="text"
    //% LOC.shadow="normal"   LOC.defl="(0,0)"
    //% SIZ.shadow="normal"   SIZ.defl="0.8"
    //% COLOR.shadow="colorPalette"
    export function puttext(parameter: any, block: any){
        let img = parameter.IMG.code
        let text = parameter.TEXT.code
        let loc = parameter.LOC.code
        let siz = parameter.SIZ.code
        let color=parameter.COLOR.code; //获取传进来的值

        var r = 0;
        var g = 0;
        var b = 0;
        try {
            if ( color.length == 8 ) {//分别截取RGB值然后转换为数字值
                r = parseInt(color.substring(2, 4), 16);
                g = parseInt(color.substring(4, 6), 16);
                b = parseInt(color.substring(6, 8), 16);
            }
        } catch(e) {
            return '';
        }
        Generator.addCode(`cv2.putText(${img}, ${text}, (${loc}) ,cv2.FONT_HERSHEY_SIMPLEX, ${siz}, (${b},${g},${r}), 2)`)
    }


    //%block="对象名[IMG2]用opencv将图片[IMG1]剪裁为宽[WID]高[HEI]"blockType="command"
    //% IMG1.shadow="normal"   IMG1.defl="img"
    //% IMG2.shadow="normal"   IMG2.defl="img"
    //% WID.shadow="number"   WID.defl="123"
    //% HEI.shadow="number"   HEI.defl="123"
    export function resize(parameter: any, block: any){
        let img1 = parameter.IMG1.code
        let img2 = parameter.IMG2.code
        let wid = parameter.WID.code
        let hei = parameter.HEI.code
        Generator.addCode(`${img2} = cv2.resize(${img1},(${wid},${hei})) `);
        
    }


    //%block="对象[IMG4]调整图像[IMG3]大小为[SIZ]"blockType="command"
    //% IMG3.shadow="normal"   IMG3.defl="img"
    //% IMG4.shadow="normal"   IMG4.defl="img"
    //% SIZ.shadow="normal"   SIZ.defl="[0:130, 0:255]"
    export function crop(parameter: any, block: any){
        let img3 = parameter.IMG3.code
        let img4 = parameter.IMG4.code
        let siz = parameter.SIZ.code
        Generator.addCode(`${img4} = ${img3}${siz} `)
        
    }

    //%block="对象名[OBJ]将图像[IMG]水平翻转"blockType="command"
    //% OBJ.shadow="normal"   OBJ.defl="img"
    //% IMG.shadow="normal"   IMG.defl="img"
    export function flip(parameter: any, block: any){
        let obj = parameter.OBJ.code
        let img = parameter.IMG.code
        Generator.addCode(`${obj} = cv2.flip(${img}, 1)`)
        
    }

    //%block="对象名[OBJ] 将图片[FRAME]转化为HSV格式"blockType="command"
    //% OBJ.shadow="normal"   OBJ.defl="img"
    //% FRAME.shadow="normal"   FRAME.defl="img"
    export function hsv_trans(parameter: any, block: any){
        let obj = parameter.OBJ.code
        let frame = parameter.FRAME.code
        Generator.addCode(`${obj}=cv2.cvtColor(${frame},cv2.COLOR_BGR2HSV)`);
        
    }

    //%block="获取图片[FRAME]的高h 宽w 通道数c"blockType="command"
    //% FRAME.shadow="normal"   FRAME.defl="img"
    export function shape(parameter: any, block: any){
        let frame = parameter.FRAME.code
        Generator.addCode(`h, w, c = ${frame}.shape`);
        
    }

    //%block="提取图片[FRAME]的范围内像素 范围下限[RANGE1] 范围上限[RANGE2]"blockType="reporter"
    //% FRAME.shadow="normal"   FRAME.defl="img"
    //% RANGE1.shadow="normal"   RANGE1.defl="blue_lower"
    //% RANGE2.shadow="normal"   RANGE2.defl="blue_upper"
    export function hsv(parameter: any, block: any){
        let frame = parameter.FRAME.code
        let range1 = parameter.RANGE1.code
        let range2 = parameter.RANGE2.code
        Generator.addCode(`cv2.inRange(${frame},${range1},${range2})`);
        
    }

    //%block="对图象[IMG]进行模糊处理"blockType="reporter"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    export function blur(parameter: any, block: any){
        let img = parameter.IMG.code
        Generator.addCode(`cv2.blur(${img},(9,9))`)

    }


    //%block="对图象[IMG]进行腐蚀处理 迭代次数[NUM]"blockType="reporter"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    //% NUM.shadow="number"   NUM.defl="2"
    export function erode(parameter: any, block: any){
        let img = parameter.IMG.code
        let num = parameter.NUM.code
        Generator.addCode(`cv2.erode(${img}, None, iterations=${num})`)

    }

    //%block="对图象[IMG]进行膨胀处理 迭代次数[NUM]"blockType="reporter"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    //% NUM.shadow="number"   NUM.defl="2"
    export function dilate(parameter: any, block: any){
        let img = parameter.IMG.code
        let num = parameter.NUM.code
        Generator.addCode(`cv2.dilate(${img}, None, iterations=${num})`)

    }

    //%block="对象名[OBJ] 对图象[IMG]进行二值化处理"blockType="command"
    //% OBJ.shadow="normal"   OBJ.defl="img_name"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    export function binnary(parameter: any, block: any){
        let obj = parameter.OBJ.code
        let img = parameter.IMG.code
        Generator.addCode(`${obj}=cv2.threshold(${img},127,255,cv2.THRESH_BINARY)`)

    }

    //%block="对象名[OBJ] 对二值化图象[IMG]进行形态学闭合处理"blockType="command"
    //% OBJ.shadow="normal"   OBJ.defl="img_name"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    export function morphologyEx(parameter: any, block: any){
        let obj = parameter.OBJ.code
        let img = parameter.IMG.code
        Generator.addCode(`kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (21, 7))`)
        Generator.addCode(`${obj} = cv2.morphologyEx(${img}, cv2.MORPH_CLOSE, kernel)`)

    }

    //%block="对象名[OBJ] 对二值化图象[IMG]进行形态学去噪点处理"blockType="command"
    //% OBJ.shadow="normal"   OBJ.defl="img_name"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    export function morphologyEx_zaodian(parameter: any, block: any){
        let obj = parameter.OBJ.code
        let img = parameter.IMG.code
        Generator.addCode(`kernel = np.ones((5, 5), np.uint8)`)
        Generator.addCode(`${obj} = cv2.morphologyEx(${img}, cv2.MORPH_OPEN, kernel)`)

    }

    //%block="计算数组[OBJ]中非零元素数目"blockType="reporter"
    //% OBJ.shadow="normal"   OBJ.defl="img_name"
    export function countNonZero(parameter: any, block: any){
        let obj = parameter.OBJ.code
        Generator.addCode(`cv2.countNonZero(${obj})`)

    }

    //%block="返回图象[IMG]中的轮廓并存储到序列[CON]"blockType="command"
    //% CON.shadow="normal"   CON.defl="contours"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    export function findcontours(parameter: any, block: any){
        let con = parameter.CON.code
        let img = parameter.IMG.code
        Generator.addCode(`${con}, hierarchy=cv2.findContours(${img}, cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)`)

    }

    //%block="对轮廓序列[CON]从大到小排序"blockType="reporter"
    //% CON.shadow="normal"   CON.defl="contours"
    export function sorted(parameter: any, block: any){
        let con = parameter.CON.code
        Generator.addCode(`sorted(${con}, key=cv2.contourArea, reverse=True)`)

    }

    //%block="返回对象[CON]的最小外接矩形"blockType="reporter"
    //% CON.shadow="normal"   CON.defl="contours"
    export function minrect(parameter: any, block: any){
        let con = parameter.CON.code
        Generator.addCode(`cv2.minAreaRect(${con})`)

    }

    //%block="返回矩形[CON]的高度上限[H1] 高度下限[H2] 宽度上限[L1] 宽度下限[L2]"blockType="command"
    //% CON.shadow="normal"   CON.defl="rect"
    //% H1.shadow="normal"   H1.defl="h1"
    //% H2.shadow="normal"   H2.defl="h2"
    //% L1.shadow="normal"   L1.defl="l1"
    //% L2.shadow="normal"   L2.defl="l2"
    export function box(parameter: any, block: any){
        let con = parameter.CON.code
        let h1 = parameter.H1.code
        let h2 = parameter.H2.code
        let l1 = parameter.L1.code
        let l2 = parameter.L2.code
        Generator.addCode(`box=np.int0(cv2.boxPoints(${con}))`)
        Generator.addCode(`
${h1} = max(box[0][1], box[1][1], box[2][1], box[3][1])
${h2} = min(box[0][1], box[1][1], box[2][1], box[3][1])
${l1} = max(box[0][0], box[1][0], box[2][0], box[3][0])
${l2} = min(box[0][0], box[1][0], box[2][0], box[3][0])
        `)

    }



    //%block="对象[MOD]加载本地级联分类器[HAAR]"blockType="command"
    //% MOD.shadow="normal"   MOD.defl="model_name"
    //% HAAR.shadow="normal"   HAAR.defl="model_path"
    export function haar_load(parameter: any, block: any){
        let mod = parameter.MOD.code
        let haar = parameter.HAAR.code
        Generator.addCode(`${mod} = cv2.CascadeClassifier('${haar}')`)

    }

    //%block="返回级联分类器[HAAR]检测到的对象 输入图象[IMG] 缩放比例[SCA] 相邻个数[NUM] 最小检测大小[SIZ]"blockType="reporter"
    //% HAAR.shadow="normal"   HAAR.defl="model_name"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    //% SCA.shadow="number"   SCA.defl="1.1"
    //% NUM.shadow="number"   NUM.defl="5"
    //% SIZ.shadow="normal"   SIZ.defl="(30,30)"
    export function haar_detect(parameter: any, block: any){
        let haar = parameter.HAAR.code
        let img = parameter.IMG.code
        let sca = parameter.SCA.code
        let num = parameter.NUM.code
        let siz = parameter.SIZ.code
        Generator.addCode(`${haar}.detectMultiScale(${img}, scaleFactor=${sca}, minNeighbors=${num}, minSize=${siz})`)

    }

    //%block="对象名[OBJ] 提取图片[FRAME]的范围内像素 范围下限[RANGE1] 范围上限[RANGE2] 并进行形态学处理"blockType="command"
    //% OBJ.shadow="normal"   OBJ.defl="dilate"
    //% FRAME.shadow="normal"   FRAME.defl="img"
    //% RANGE1.shadow="normal"   RANGE1.defl="blue_lower"
    //% RANGE2.shadow="normal"   RANGE2.defl="blue_upper"
    export function hsvAndxtx(parameter: any, block: any){
        let obj = parameter.OBJ.code
        let frame = parameter.FRAME.code
        let range1 = parameter.RANGE1.code
        let range2 = parameter.RANGE2.code
        Generator.addCode(`
mask = cv2.inRange(${frame},${range1},${range2})
blurred = cv2.blur(mask,(9,9))
ret,binary=cv2.threshold(blurred,127,255,cv2.THRESH_BINARY)
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (21, 7))
closed = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
erode = cv2.erode(closed, None, iterations=4)
${obj} = cv2.dilate(erode, None, iterations=4)
        `);
        
    }

    


    //%block="对象名[OBJ] 剪裁图像[IMG]中最大的轮廓 宽[WEI] 高[HEI] 并处理数组维度"blockType="command"
    //% OBJ.shadow="normal"   OBJ.defl="input_data"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    //% WEI.shadow="normal"   WEI.defl="32"
    //% HEI.shadow="number"   HEI.defl="32"
    export function lunkuo(parameter: any, block: any){
        let obj = parameter.OBJ.code
        let img = parameter.IMG.code
        let wei = parameter.WEI.code
        let hei = parameter.HEI.code
        
        Generator.addCode(`
contours, hierarchy=cv2.findContours(${img}, cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
contours = sorted(contours, key=cv2.contourArea, reverse=True)
if (len(contours) > 0):
    con = (contours[0])
    rect = cv2.minAreaRect(con)
    box=np.int0(cv2.boxPoints(rect))

    h1 = max(box[0][1], box[1][1], box[2][1], box[3][1])
    h2 = min(box[0][1], box[1][1], box[2][1], box[3][1])
    l1 = max(box[0][0], box[1][0], box[2][0], box[3][0])
    l2 = min(box[0][0], box[1][0], box[2][0], box[3][0])

    if ((h1-h2 > 20) and (l1-l2 > 20)):
        temp = img[h2:h1,l2:l1]
        if ((temp.shape[0] > 0) and (temp.shape[1] > 0)):
            temp_gray = cv2.cvtColor(temp, cv2.COLOR_BGR2GRAY)
            temp_resized = cv2.resize(temp_gray,(${hei},${wei}))
            cv2.imshow("sign", temp_resized)
            input_data = np.expand_dims(temp_resized, axis=2)
            ${obj} = np.expand_dims(input_data, axis=0)

        `)

    }


    //%block="获取图片[IMG]的高度[HEI]和宽度[WEI]"blockType="command"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    //% HEI.shadow="normal"   HEI.defl="height"
    //% WEI.shadow="normal"   WEI.defl="weight"
    export function h_w(parameter: any, block: any){
        let img = parameter.IMG.code
        let hei = parameter.HEI.code
        let wei = parameter.WEI.code
        Generator.addCode(`
${hei}, ${wei} = ${img}.shape
        `)

    }

    //%block="对象名[IMG]对图像[HAAR]进行矩形遮罩，顶点坐标[P1][P2][P3][P4]"blockType="command"
    //% IMG.shadow="normal"   IMG.defl="img_name"
    //% HAAR.shadow="normal"   HAAR.defl="img_name"
    //% P1.shadow="normal"   P1.defl="point1"
    //% P2.shadow="normal"   P2.defl="point2"
    //% P3.shadow="normal"   P3.defl="point3"
    //% P4.shadow="normal"   P4.defl="point4"
    export function cover(parameter: any, block: any){
        let img = parameter.IMG.code
        let haar = parameter.HAAR.code
        let p1 = parameter.P1.code
        let p2 = parameter.P2.code
        let p3 = parameter.P3.code
        let p4 = parameter.P4.code
        Generator.addCode(`
vec = np.zeros_like(${haar})
polygon = np.array([[
    ${p1}, 
    ${p2},
    ${p3},
    ${p4},
]], np.int32)

cv2.fillPoly(vec, polygon, 255)
${img} = cv2.bitwise_and(${haar}, vec) 
        `)

    }

    //%block="返回图片[FRAME]质心的坐标[CEN]和横坐标偏移量[CENX]"blockType="command"
    //% CEN.shadow="normal"   CEN.defl="center"
    //% CENX.shadow="normal"   CENX.defl="centerx"
    //% FRAME.shadow="normal"   FRAME.defl="img"
    export function centerx(parameter: any, block: any){
        let cen = parameter.CEN.code
        let cenx = parameter.CENX.code
        let frame = parameter.FRAME.code
        Generator.addCode(`
contours, hierarchy = cv2.findContours(${frame}, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
if len(contours) > 0:
    # 找到面积最大的轮廓
    c = max(contours, key=cv2.contourArea)
    # 计算轮廓的矩
    M = cv2.moments(c)
    # 计算质心
    if M["m00"] != 0:
        ${cen} = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
    #画质心
        cv2.circle(img, ${cen}, 5, (0, 0, 255), -1)
        cx = int(M['m10'] / M['m00'])
        ${cenx} = abs(cx - (img.shape[1] //2))
        `);
        
    }




}