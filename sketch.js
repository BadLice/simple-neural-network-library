let brain;

function setup() {
	brain = new NeuralNetwork(2, 2, 3);

	let inputs = [1, 0];
	let targets = [1, -1, 1];

	let output = brain.train(inputs, targets);
	console.log(output);
}

function draw() {}
