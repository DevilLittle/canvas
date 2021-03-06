class Chart {
    constructor(id, data, option) {

        this.id = id;
        this.data = data;
        this.option = option;

        let canvas = document.getElementById(this.id);
        this.context = canvas.getContext("2d");

        //初始化
        this.init(this.context);

        //画布
        this.width = canvas.width;
        this.height = canvas.height;

        //标题
        let titlePosition = this.getTitlePosition();
        this.setTitle(this.option.title.text, this.option.title.color, titlePosition.x, titlePosition.y);


        //网格内容
        this.canvasWidth = this.width - this.option.grid.left - this.option.grid.right;
        this.canvasHeight = this.height - this.option.grid.top - this.option.grid.bottom;


        //初始位置，会改变
        let xStart = this.option.grid.left;
        let yStart = this.height - this.option.grid.bottom;
        let xEnd = this.width - this.option.grid.right;
        let yEnd = this.option.grid.top;
        //初始位置，不会变化
        let y0 = this.height - this.option.grid.bottom;

        //画坐标轴
        this.drawAxis(xStart, xEnd, yStart, yEnd);

        //x轴刻度
        let xItemLength = this.canvasWidth / this.data.xData.length;


        //y轴刻度
        let yScale = this.getYScale(this.data.series);
        let yLength = 10;

        let yItemLength = this.canvasHeight / yLength;


        //每个柱状和文字的位置
        let xPosition,yPosition;
        for (let i = 0; i < this.data.xData.length; i++) {

            xPosition = xStart + xItemLength / 2-this.option.chart.barWidth/2;
            yPosition = y0 - this.data.series[i] / yLength * yItemLength;
            // 柱状图
            this.fillBar(xPosition, yPosition, this.option.chart.barWidth, this.data.series[i] / yLength * yItemLength);

            // XY刻度
            this.barText(this.data.series[i], xPosition, yPosition -5);

            // X轴坐标文字
            let textStartPosition = y0 + this.option.grid.bottom / 2;
            this.LabelXAxis(this.data.xData[i], xPosition, textStartPosition);

            xStart += xItemLength;

            this.ScaleXAxis(xStart, yStart);
        }

        for (let i = 0; i <= yLength; i++) {
            //Y轴刻度
            this.context.fillText(yScale[i], 0, i * yItemLength + this.option.grid.top);
            this.ScaleYAxis(this.option.grid.left, yStart);

            yStart -= yItemLength;
        }
    }

    init(context) {
        context.translate(0.5, 0.5);  // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
        context.font = "12px Arial";
        context.lineWidth = 1;
        context.fillStyle = "#000000";
        context.strokeStyle = "#000000";
    }

    /**
     * 获取标题初始位置的x,y
     * @returns {{x: *, y: *}}
     */
    getTitlePosition(){
        let x, y;
        if (this.option.title.position && this.option.title.position === 'top') {
            x = this.width / 2;
            y = this.option.grid.top / 2;
        } else if (this.option.title.position && this.option.title.position === 'bottom') {
            x = this.width / 2;
            y = this.option.grid.bottom / 2;
        }

        return{
            x,
            y
        }
    }
    setTitle(title, titleColor, x, y) {
        this.context.fillStyle = titleColor;
        this.context.fillText(title, x, y);
    }

    /**
     * drawAxis 画坐标轴函数
     * @param xStart 画布总宽
     * @param xEnd 画布总高
     * @param yStart x轴偏移量
     * @param yEnd y轴偏移量
     */
    drawAxis(xStart, xEnd, yStart, yEnd) {

        this.context.beginPath();

        this.context.moveTo(xStart, yStart);
        this.context.lineTo(xEnd, yStart);
        this.context.moveTo(xStart, yStart);
        this.context.lineTo(xStart, yEnd);

        this.context.stroke();
        this.context.closePath();
    }

    /**
     * 获取Y轴刻度数组
     * @param series
     * @returns {Array}
     */
    getYScale(series) {
        let yScale = [];

        let yScaleMax = Math.max.apply(null, series) > 0 ? Math.max.apply(null, series) : 0;
        let yScaleMin = Math.min.apply(null, series) > 0 ? 0 : Math.min.apply(null, series);

        let yAllLength = yScaleMax - yScaleMin;
        let yLength = 10;
        for (let i = 0; i <= yLength; i++) {
            yScale.push((yAllLength / yLength) * (yLength - i));
        }

        return yScale;
    }

    /**
     * 填充X轴标注
     * @param data
     * @param x
     * @param y
     * @constructor
     */
    LabelXAxis(data, x, y) {
        this.context.fillText(data, x, y);
    }

    /**
     * 画出X轴刻度
     * @param xStart
     * @param yStart
     * @constructor
     */
    ScaleXAxis(xStart, yStart) {
        this.context.moveTo(xStart, yStart);
        this.context.lineTo(xStart, yStart - 10);
        this.context.stroke();
        this.context.closePath();
    }

    /**
     * 画出Y轴刻度
     * @param xStart
     * @param yStart
     * @constructor
     */
    ScaleYAxis(xStart, yStart) {
        this.context.moveTo(xStart, yStart);
        this.context.lineTo(xStart + 10, yStart);
        this.context.stroke();
        this.context.closePath();
    }

    /**
     * 填充柱状
     * @param x
     * @param y
     * @param barWidth
     * @param height
     */
    fillBar(x,y,barWidth,height){
        this.context.fillStyle = "#2dacfd";
        this.context.fillRect(x, y, barWidth,height);
    }

    /**
     * 柱状上显示数数量
     * @param data
     * @param x
     * @param y
     */
    barText(data, x, y) {
        // 柱状图上方文字
        this.context.fillStyle = '#000000';
        this.context.fillText(data, x, y);
    }


}