var ctx;
var curSpeed = 0;
var accSpeed = 0.5;
// 绘制点的总数
var maxPoint = 100;
// 每100个点一个周期, maxPoint / piCycl 可以获取波动的sin函数的个数
var piCycl = 25;
// x轴放大的倍数
var xMultiple = 15;
// y轴放大的倍数
var yMultiple = 6;
// y轴起始偏移量
var yOffset = 45;
// y轴加载的速度
var yLoadSpeed = 0;
// 波浪颜色
var waveColor = "rgba(52, 152, 219,1.0)";
// 描绘波浪边的颜色
var waveLineColor = "rgba(44, 62, 80,0.4)";
// 描绘波浪阴影的大小
var waveLineShadowBlur = 2;
// 波浪边上的阴影
var waveLineShadowColor = "rgba(44, 62, 80,0.4)";
// 中间字体的样式
var fontStyle = "50px Georgia";
// 要显示的字
var core = "帅";
window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	ctx.moveTo(0, 100);
	setInterval(function() {
		curSpeed += accSpeed;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.lineTo(-30, canvas.height);

		for(var i = 0; i < maxPoint; ++i) {
			// 计算当前point在一个周期内的位置，并根据位置计算sin值
			var x = (i / piCycl) * Math.PI;
			// 放大x轴10倍，然后根据sin(x)计算出y轴并放大7倍 - 45个像素;
			ctx.lineTo(x * xMultiple, Math.sin(x + curSpeed) * yMultiple + yOffset);

		}

		ctx.lineTo(x * 10, 300);
		ctx.fillStyle = waveColor;
		ctx.fill();
		// 保存波浪效果去堆栈1
		ctx.save();

		// 设置取新图片和原图的交集，保留交集图片 图1
		ctx.globalCompositeOperation = "source-in";
		ctx.font = fontStyle;
		ctx.fillStyle = "white";
		// 此时为图1
		ctx.fillText(core, 25, 60);

		// 取出堆栈1的效果即波浪效果
		ctx.restore();
		// 将后续的模糊效果添加至图1，将新效果添加到图1上面
		ctx.globalCompositeOperation = "destination-over";
		ctx.strokeStyle = "";
		ctx.lineWidth = 3;
		ctx.shadowBlur = waveLineShadowBlur;
		ctx.shadowColor = "";
		// 此时为图2
		ctx.stroke();

		// 绘制波浪到图2上面
		ctx.globalCompositeOperation = "destination-over";
		// 重置阴影属性
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.fillStyle = waveColor;
		// 此时为图3
		ctx.fill();

		// 将后续的文字绘制到图3上
		ctx.globalCompositeOperation = "destination-over";
		ctx.font = fontStyle;
		ctx.fillStyle = waveColor;
		// 此时为图4
		ctx.fillText(core, 25, 60);
		
		if(yLoadSpeed > 0 && yOffset > 0) {
			yOffset -= yLoadSpeed;
		}
	}, 40);

};