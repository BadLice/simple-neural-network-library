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

function setup() {
	//neural network test -> solve xor function -> 2 inputs, 2 hidden, 1 output
	brain = new NeuralNetwork(2, 2, 1);

	for (let i = 0; i < 1000000; i++) {
		const { inputs, targets } = random(trainingData);
		brain.train(inputs, targets);
	}

	console.log(brain.feedforward([0, 0]));
	console.log(brain.feedforward([1, 0]));
	console.log(brain.feedforward([0, 1]));
	console.log(brain.feedforward([1, 1]));
}

function draw() {}
