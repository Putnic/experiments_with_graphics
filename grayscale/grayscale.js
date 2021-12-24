window.addEventListener('load', removeColors);

function showColorImg() {
	this.style.display = 'none';
	this.nextSibling.style.display = 'block';
}

function showGrayImg() {
	this.previousSibling.style.display = 'block';
	this.style.display = 'none';
}

function removeColors() {
	const images = document.getElementsByClassName('grayscale');
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	for (const imgColor of images) {
		let imgWidth = imgColor.width;
		let imgHeight = imgColor.height;

		canvas.width = imgWidth;
		canvas.height = imgHeight;
		ctx.drawImage(imgColor, 0, 0, imgColor.naturalWidth, imgColor.naturalHeight, 0, 0, imgWidth, imgHeight);

		let imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
		let imgRawData = imgData.data;
		let imgRawDataLen = imgRawData.length;

		// from the color image makes the image in the gray tones for each pixel
		for (let imgPixel = 0; imgPixel < imgRawDataLen; imgPixel += 4) {
			imgRawData[imgPixel + 2] = imgRawData[imgPixel + 1] = imgRawData[imgPixel] = 
				(imgRawData[imgPixel] + imgRawData[imgPixel + 1] + imgRawData[imgPixel + 2]) / 3;
		}

		ctx.putImageData(imgData, 0, 0);
		let imgGray = new Image();
		imgGray.src = canvas.toDataURL();

		imgGray.onmouseover = showColorImg;
		imgColor.onmouseout = showGrayImg;
		ctx.clearRect(0, 0, imgWidth, imgHeight);
		imgColor.style.display = "none";
		imgColor.parentNode.insertBefore(imgGray, imgColor);
	}
}