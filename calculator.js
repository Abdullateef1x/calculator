 const plusOperator = '+';
const minusOperator = '−';
const divideOperator = '÷';
const timesOperator = '×';
const equationOperators = [plusOperator, minusOperator, divideOperator, timesOperator];

// OTHER KEY OPERATOR
const dotKey = '.'

// ACTION OPERATOR
const clearOperator = 'CE';
const clearAllOperator = 'C';
const percentOperator = '%';
const equalOperator = '=';
const enterOperator = 'Enter';
const resultOperators = [enterOperator, clearAllOperator, clearOperator, percentOperator, equalOperator];

let currentEquation = ''


function showEquation() {
    let newValue = currentEquation
    .replaceAll('+', plusOperator)
    .replaceAll('-', minusOperator)
    .replaceAll('/', divideOperator)
    .replaceAll('x', timesOperator)
    .replaceAll(dotKey, '.')
let equationEl = document.getElementById("equation")
    equationEl.textContent = newValue
}


function addKeyToEquation(key) {
	currentEquation += key;
	showEquation();
}


const gridItems = document.querySelectorAll('.grid-operator');
gridItems.forEach((item) => {
	item.addEventListener('click', function () {
		handleKeyPress(item.innerText.toString());
	});
});


// TO VALIDATE EACH KEY

function validateKeyPress(key) {
	let valid = false;

	const validKeys = [
		...equationOperators,
		...resultOperators,
		dotKey,
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
	];

	validKeys.forEach((validKey) => {
		if (validKey === key) valid = true;
	});

	return valid;
}

// Handle key pressed or clicked
function handleKeyPress(key) {
	// Validate the key
	const valid = validateKeyPress(key);
	if (!valid) {
		// console.log('The key pressed is not valid.');
		return;
	}

	handleKeyOperation(key);
}

document.addEventListener('keydown', function(event) {
    const name = event.key.toString()

    const swaps = [
        {
            lookup: 'backSpace',
            repalce: clearOperator
        },

        {
            lookup: 'delete',
            repalce: clearAllOperator
        },

        {
            lookup: 'backSpace',
            repalce: clearAllOperator
        },

        {
            lookup: 'enter',
            repalce: enterOperator
        },

        {
            lookup: '=',
            repalce: equalOperator
        },

        {
            lookup: '+',
            repalce: plusOperator
        },

        {
            lookup: '-',
            repalce: minusOperator
        },

        {
            lookup: 'x',
            repalce: timesOperator
        },

        {
			lookup: '.',
			replace: dotKey,
		},
		{
			lookup: '%',
			replace: percentOperator,
		},

        
    ]

    let results = name

    swaps.forEach((swap) => {
        if(swap.lookup === name) results = swap.replace 

    })

	handleKeyPress(results)
})




// A function to handle key operation
function handleKeyOperation(key) {
	switch (key) {
		case clearAllOperator:
			currentEquation = '';
			showEquation();
			handleResult();
			break;
		case clearOperator:
			currentEquation = currentEquation.slice(0, currentEquation.length - 1);
			showEquation();
			break;
		case enterOperator:
		case equalOperator:
			handleResult();
			break;
		default:
			addKeyToEquation(key);
	}
}


function handleResult() {
    if(currentEquation.trim().length < 1) {
        const theResult = document.getElementById("result")
        theResult.textContent = 0
    } else {
            let realEquation = currentEquation      
        .replaceAll(minusOperator, '-')
			.replaceAll(plusOperator, '+')
			.replaceAll(divideOperator, '/')
			.replaceAll(timesOperator, '*')
			.replaceAll(dotKey, '.');    
                const result = eval(realEquation)             
            const theResult = document.getElementById("result")
        theResult.textContent = result
    }
}