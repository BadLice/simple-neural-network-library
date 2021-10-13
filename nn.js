//only 3 layer network
class NeuralNetwork {
	constructor(inputNodes, hiddenNodes, outputNodes) {
		this.inputNodes = inputNodes;
		this.hiddenNodes = hiddenNodes;
		this.outputNodes = outputNodes;

		//weights between input layer and hidden layer
		this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes);
		this.weights_ih.randomize();
		//weights between hidden layer and output layer
		this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes);
		this.weights_ho.randomize();

		//bias of hidden layer
		this.bias_h = Matrix.fromArray(Array.from({ length: this.hiddenNodes }, () => 1));
		//bias of output layer
		this.bias_o = Matrix.fromArray(Array.from({ length: this.outputNodes }, () => 1));
	}

	// https://www.youtube.com/watch?v=MPmLWsHzPlU&list=PLRqwX-V7Uu6Y7MdSCaIfsxc561QI0U0Tb&index=13
	feedforward(inputArray) {
		let inputs = Matrix.fromArray(inputArray);

		// GENERATING HIDDEN LAYER OUTPUTS
		// H = sig(W * I + B)
		// H -> hidden layer
		// W -> matrix of weights between inputs layer and hidden layer
		// B -> bias vector
		// sig -> sigmoid (activation function)
		//convert input array into matrix
		//calculate weighted sum of inputs
		let hidden = Matrix.multiply(this.weights_ih, inputs);
		//add bias to prevent limit case 0
		hidden.add(this.bias_h);
		//activation function
		hidden.map(sigmoid);

		// GENERATING OUTPUT LAYER OUTPUTS
		// O = sig(W * H + B)
		// o -> output layer
		// W -> matrix of weights between hidden layer and output layer
		// B -> bias vector
		// sig -> sigmoid (activation function)
		let outputs = Matrix.multiply(this.weights_ho, hidden);
		outputs.add(this.bias_o);
		outputs.map(sigmoid);

		return outputs.toArray();
	}

	// https://www.youtube.com/watch?v=r2-P1Fi1g60&list=PLRqwX-V7Uu6Y7MdSCaIfsxc561QI0U0Tb&index=15
	train(inputs, targets) {
		let outputs = Matrix.fromArray(this.feedforward(inputs));
		targets = Matrix.fromArray(targets);

		//calculate the error of the output layer -> error = targets - outputs
		let output_errors = Matrix.subtract(targets, outputs);

		//calculate the error of the hidden layer
		//backpropagation -> the error of the hidden layer is a portion of the total error for each weight -> trough some maths we get this formula (the weights matrix has to be transposed to match rows and cols in multiplications)
		let hidden_errors = Matrix.multiply(Matrix.transpose(this.weights_ho), output_errors);
	}
}

// sigmoid function used as activation function
const sigmoid = (x) => 1 / (1 + Math.exp(-x));
