# Face Recognition App

This was built **Javascript** and using the [face-api.js library](https://github.com/justadudewhohacks/face-api.js/) and the VS Code extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to see the changes in real time.

You can see the live demo [here](https://corozb.github.io/face-recognition/)

Steps:
1. Import `face-api.js` and `models` folder
2. Create `cameraOn`function to enable camera from browser
3. Load models
4. Build `Canvas` element and center it in DOM
5. Create an object with the models and manage the canvas size similar to video size
6. Create a function that detect the face every so often and render a rectangle. How we see several rectangles we need to clear the canvas before
7. Select every model to detect face, landmarks, expressions, age and gender.
