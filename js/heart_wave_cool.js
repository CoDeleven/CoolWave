var ctx;
var curSpeed = 0;
var accSpeed = 0.5;
// 绘制点的总数
var maxPoint = 300;
// 每100个点一个周期, maxPoint / piCycl 可以获取波动的sin函数的个数
var piCycl = 25;
// x轴放大的倍数
var xMultiple = 30;
// y轴放大的倍数
var yMultiple = 11;
// y轴起始偏移量
var yOffset = 220;
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
var fontStyle = "20px Georgia";
// 要显示的字
var core = "瘟猪和骚鹿在一起的";
var core1 = "第{DAY}天"
var core2 = "{hh}时{MM}分{ss}秒"
window.onload = function () {
	var canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	var canvas2 = document.getElementById("myCanvas2");
	var ctx2 = canvas2.getContext("2d");

	var canvas3 = document.getElementById("myCanvas3");
	var ctx3 = canvas3.getContext("2d");

	drawCanvas3(ctx3, canvas3);

	setInterval(function () {
		curSpeed += accSpeed;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

		drawCanvas2(ctx2, canvas2);
		drawCanvas(ctx, canvas);

	}, 40);

};

function drawCanvas3(ctx3, canvas3) {
	ctx3.beginPath();
	ctx3.strokeStyle = waveColor;
	for (var i = 0; i <= Math.PI * 3; i += 0.02) {
		var x = getHeartX(i);
		var y = getHeartY(i);
		// 因为y是增量，由于x，y是第四象限，所以要减去y
		ctx3.lineTo(200 + x, 200 - y);
	}
	ctx3.stroke();
}

function drawCanvas(ctx, canvas) {

	ctx.globalCompositeOperation = "source-over"
	// 设置取新图片和原图的交集，保留交集图片 图1
	ctx.font = fontStyle;
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "center";
	// 此时为图1
	ctx.fillText(core, 200, 170);
	ctx.fillText(core1, 200, 220);
	ctx.fillText(core2, 200, 250);

	ctx.globalCompositeOperation = "destination-in";
	drawWave(ctx, canvas);

	ctx.globalCompositeOperation = "destination-over";
	drawWave(ctx, canvas);

	ctx.globalCompositeOperation = "destination-in";
	ctx.beginPath();
	ctx.fillStyle = "#000000";
	for (var i = 0; i <= Math.PI * 3; i += 0.02) {
		var x = getHeartX(i);
		var y = getHeartY(i);
		// 因为y是增量，由于x，y是第四象限，所以要减去y
		ctx.lineTo(200 + x, 200 - y);
	}
	ctx.fill();
}

function drawCanvas2(ctx2, canvas2) {
	ctx2.globalCompositeOperation = "source-over";
	ctx2.font = "20px Georgia";
	ctx2.fillStyle = "#000000";
	ctx2.textAlign = "center";
	ctx2.fillText("瘟猪和骚鹿在一起的", 200, 170);
	ctx2.fillText("第{DAY}天", 200, 220);
	ctx2.fillText("{hh}时{MM}分{ss}秒", 200, 250);

	ctx2.globalCompositeOperation = "destination-out";
	drawWave(ctx2, canvas2);
}

function drawCustomBorder(ctx, canvas) {
	ctx.globalCompositeOperation = "destination-in";

	ctx.restore();
	ctx.save();


	// ctx.restore();
}

const magnitude = 10;

/**
 * 绘制波浪效果，最后会保存到到层1里
 * @param {context} ctx 
 * @param {Canvas} canvas 
 */
function drawWave(ctx, canvas) {
	ctx.beginPath();
	ctx.lineTo(-100, canvas.height);

	for (var i = 0; i < maxPoint; ++i) {
		// 计算当前point在一个周期内的位置，并根据位置计算sin值
		var x = (i / piCycl) * Math.PI;
		// 放大x轴10倍，然后根据sin(x)计算出y轴并放大7倍 - 45个像素;
		ctx.lineTo(x * xMultiple, Math.sin(x + curSpeed) * yMultiple + yOffset);

	}

	ctx.lineTo(x * 10, 500);
	ctx.fillStyle = waveColor;
	ctx.fill();
}



function drawText(ctx, canvas) {
	ctx.save();
	ctx.globalCompositeOperation = "source-in";

	// 设置取新图片和原图的交集，保留交集图片 图1
	ctx.font = fontStyle;
	ctx.fillStyle = "#000000";
	ctx.textAlign = "center";
	// 此时为图1
	ctx.fillText(core, 200, 170);
	// ctx.fillText(core1, 200, 220);
	// ctx.fillText(core2, 200, 250);

	// ctx.restore();
	// ctx.stroke();
	// ctx.fill();


}


/**
 * 获取心形的X
 * @param {float} degree 弧度
 */
function getHeartX(degree) {
	return magnitude * (16 * Math.pow(Math.sin(degree), 3));
}

/**
 * 获取心形的Y
 * @param {float} degree 弧度
 */
function getHeartY(degree) {
	return magnitude * (13 * Math.cos(degree) - 5 * Math.cos(2 * degree) - 2 * Math.cos(3 * degree) - Math.cos(4 * degree));
}