class Chart{
    constructor(id,data,option){

        this.id = id;
        this.data = data;
        this.option = option;

        let canvas = document.getElementById(this.id);
        this.context = canvas.getContext("2d");

        //初始化
        this.init(this.context);
        this.define = {
            width: canvas.width,
            height: canvas.height,
        };

        //标题
        let x ,y;
        if(this.option.title.position&&this.option.title.position==='top'){
            x = this.define.width/2;
            y = this.option.grid.top/2;
        }else if(this.option.title.position&&this.option.title.position==='bottom'){
            x = this.define.width/2;
            y = this.option.grid.bottom/2;
        }
        this.setTitle(this.option.title.text,this.option.title.color,x,y);

        //画坐标轴
        this.drawAxis(this.context, this.define.width, this.define.height, this.option.grid.left, this.option.grid.bottom,this.option.grid.top);


        this.width = canvas.width;
        this.height = canvas.height;


        this.canvasWidth = this.width - this.option.grid.left-this.option.grid.right;
        this.canvasHeight = this.height - this.option.grid.top - this.option.grid.bottom;




        this.context.fillStyle = "#2dacfd";

        let xData = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
        let seriesData = [100, 20, 40, 50, 30, 80, 10];
        let series = [100, 20, 40, 50, 30, 80, 10];

        //x轴刻度
        // let xLength = this.define.width - this.option.grid.left-this.option.grid.right;
        let xItemLength = this.canvasWidth / xData.length;
        console.log('x',xItemLength);


        //TODO y轴刻度
        let yDataMax = seriesData.sort(function (a, b) {
            return b - a;
        })[0];
        let yDataMin = seriesData.sort(function (a, b) {
            return a - b;
        })[0] > 0 ? 0 : seriesData.sort(function (a, b) {
            return a - b;
        })[0];
        let yData = [];
        let yAllLength = yDataMax-yDataMin;
        let yLength =10;
        for(let i = 0; i < yLength; i++){
            yData.push((yAllLength/yLength)*(yLength-i));
        }
        let yItemLength = (this.define.height-this.option.grid.bottom-this.option.grid.top)/yLength;

        console.log('========');
        console.log(yItemLength);


        let left = this.option.grid.left;
        let x0=this.option.grid.left;
        let y0=canvas.height-30;
        let xPosition,yPosition;
        for (let i = 0; i < xData.length; i++) {

            // 柱状图
            this.context.fillRect(i * xItemLength +left, (this.define.height-this.option.grid.bottom)-series[i]/yLength*yItemLength , 30, series[i]/yLength*yItemLength);


            // XY刻度
            // 柱状图上方文字
            this.context.fillText(series[i], i * xItemLength + left, (this.define.height-this.option.grid.bottom-this.option.grid.top)-series[i]/yLength*yItemLength+50);
            // X轴刻度
            this.context.fillText(xData[i], x0, y0 +this.option.grid.bottom);
            x0 += xItemLength;

            // this.context.moveTo(x0, y0 +this.option.grid.bottom-10);
            // this.context.lineTo(x0, y0 +this.option.grid.bottom-20);
            // this.context.stroke();
            // this.context.closePath();
        }

        for(let i = 0; i < yLength; i++){
            //Y轴刻度
            this.context.fillText(yData[i], 0, i*yItemLength+this.option.grid.top);
            console.log(yItemLength,i*yItemLength);


            y0+=yItemLength;

            this.context.moveTo(this.option.grid.left, y0);
            this.context.lineTo(this.option.grid.left+20, y0);
            this.context.stroke();
            this.context.closePath();
        }
    }


    init(context){
        context.translate(0.5,0.5);  // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
        context.font = "12px Arial";
        context.lineWidth = 1;
        context.fillStyle = "#000000";
        context.strokeStyle = "#000000";
    }

    setTitle(title,titleColor,x,y){
        this.context.fillStyle = titleColor;
        this.context.fillText(title,x,y);
    }
    /**
     * drawAxis 画坐标轴函数
     * @param context 画布上下文
     * @param totalWidth 画布总宽
     * @param totalHeight 画布总高
     * @param paddingLeft x轴偏移量
     * @param paddingBottom y轴偏移量
     * @param paddingTop 画布上方留白距离
     */
    drawAxis(context, totalWidth, totalHeight, paddingLeft, paddingBottom,paddingTop) {

        let width = totalWidth - paddingLeft;
        let height = totalHeight - paddingBottom;

        context.beginPath();

        context.moveTo(paddingLeft, height);
        context.lineTo(width, height);
        context.moveTo(paddingLeft, height);
        context.lineTo(paddingLeft, paddingTop);
        context.stroke();
        context.closePath();
    }
}