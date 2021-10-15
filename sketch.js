let brain;
let trainingData = [
	{
		inputs: [0, 0],
		targets: [0],
	},
	{
		inputs: [1, 1],
		targets: [0],
	},
	{
		inputs: [1, 0],
		targets: [1],
	},
	{
		inputs: [0, 1],
		targets: [1],
	},
];
let finishedTraining = false;
let count = 0;

function setup() {
	// neural network test -> solve xor function -> 2 inputs, 2 hidden, 1 output
	brain = new NeuralNetwork(2, 4, 1);

	createCanvas(800, 800);
}

function draw() {
	//training
	background(0);
	fill(255);
	textSize(40);
	if (!finishedTraining) {
		text('Training, cycle count: ' + count, 10, 10, width - 10, height - 10);
		for (let i = 0; i < 100; i++) {
			const { inputs, targets } = random(trainingData);
			brain.train(inputs, targets);
			count++;
			finishedTraining = true;
			trainingData.forEach(({ inputs, targets }, i) => {
				if (
					!compareArrays(
						brain.feedforward(inputs).map((value) => Math.round(value)),
						targets
					)
				) {
					finishedTraining = false;
				}
			});
		}
	} else {
		//finished training
		text('Trained successfuly in ' + count + ' cycles', 10, 10, width - 10, height - 10);
	}
	trainingData.forEach(({ inputs, targets }, i) => {
		text(
			`${JSON.stringify(inputs)} -> ${JSON.stringify(
				Math.round(brain.feedforward(inputs))
			)}`,
			50,
			(i + 1) * 80,
			width - 50,
			height - (i + 1) * 80
		);
	});
}

const compareArrays = (array1, array2) =>
	array1.length === array2.length &&
	array1.every(function (value, index) {
		return value === array2[index];
	});
