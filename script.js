const video = document.querySelector('#video')

const cameraOn = () => {
	navigator.getUserMedia =
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia
	navigator.getUserMedia(
		{ video: {} },
		(stream) => (video.srcObject = stream),
		(err) => console.log(err)
	)
}

cameraOn()

Promise.all([
	faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
	faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
	faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
	faceapi.nets.faceExpressionNet.loadFromUri('/models'),
	faceapi.nets.ageGenderNet.loadFromUri('/models'),
]).then(cameraOn)

video.addEventListener('play', () => {
	const canvas = faceapi.createCanvasFromMedia(video)
	document.body.append(canvas)
	const displaySize = { width: video.width, height: video.height }
	faceapi.matchDimensions(canvas, displaySize)
	setInterval(async () => {
		const detections = await faceapi
			.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
			.withFaceLandmarks()
			.withFaceExpressions()
		const resizeDetections = faceapi.resizeResults(detections, displaySize)
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
		faceapi.draw.drawDetections(canvas, resizeDetections)
		faceapi.draw.drawFaceLandmarks(canvas, resizeDetections)
		faceapi.draw.drawFaceExpressions(canvas, resizeDetections)
	}, 100)
})
