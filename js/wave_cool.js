var ctx;
window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	ctx.moveTo(0, 100);
	var j = 0.1;
	setInterval(function() {
		j += 0.5;

		ctx.clearRect(0, 0, 500, 300);
		ctx.beginPath();
		ctx.lineTo(0, 300);

		for(var i = 0; i < 400; ++i) {
			var x = (i / 100) * Math.PI;
			// 放大x轴10倍，然后根据sin(x)计算出y轴并放大7倍 - 45个像素;
			ctx.lineTo(x * 10, Math.sin(x + j) * 6 + 45);
		}

		ctx.lineTo(x * 10, 300);
		ctx.fillStyle = "rgba(52, 152, 219,1.0)";
		ctx.fill();
		// 保存波浪效果去堆栈1
		ctx.save();

		// 设置取新图片和原图的交集，保留交集图片 图1
		ctx.globalCompositeOperation = "source-in";
		ctx.font = "50px Georgia";
		ctx.fillStyle = "white";
		// 此时为图1
		ctx.fillText("帅", 25, 60);

		// 取出堆栈1的效果即波浪效果
		ctx.restore();
		// 将后续的模糊效果添加至图1，将新效果添加到图1上面
		ctx.globalCompositeOperation = "destination-over";
		ctx.strokeStyle = "rgba(44, 62, 80,0.4)";
		ctx.lineWidth = 5;
		ctx.shadowBlur = 4;
		ctx.shadowColor = "rgba(44, 62, 80,0.6)";
		// 此时为图2
		ctx.stroke();

		// 绘制波浪到图2上面
		ctx.globalCompositeOperation = "destination-over";
		// 重置阴影属性
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.fillStyle = "rgba(52, 152, 219,1.0)";
		// 此时为图3
		ctx.fill();

		// 将后续的文字绘制到图3上
		ctx.globalCompositeOperation = "destination-over";
		ctx.font = "50px Georgia";
		ctx.fillStyle = "rgba(52, 152, 219,1.0)";
		// 此时为图4
		ctx.fillText("帅", 25, 60);

	}, 40);

};
