
document.addEventListener('DOMContentLoaded', function() {
    const displayElement = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    
    let currentinput = '';
    let storedop = '';
    let firstval= '';
    
    function Display(value) {
        displayElement.innerText = value;
    }
    
    function Calculate(value1, value2, operator) {
        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);
        switch (operator) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '*': return num1 * num2;
            case '/': return num1 / num2;
            default: return 0;
        }
    }

    function roundtoseven(num) {
        return Number(num.toFixed(7));
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const btnValue = button.getAttribute('data-value');
            
            if (btnValue === 'C') {
                currentinput = '';
                storedop = '';
                firstval= '';
                Display('0');
            } else if (btnValue === '=') {
                if (storedop && firstval!== '') {
                    const result = Calculate(firstval, currentinput, storedop);
                    const roundedResult = roundtoseven(result);
                    Display(roundedResult);
                    currentinput = roundedResult.toString();
                    firstval= '';
                    storedop = '';
                }
            } else if (['+', '-', '*', '/'].includes(btnValue)) {
                if (currentinput !== '') {
                    if (firstval=== '') {
                        firstval= currentinput;
                    } else if (storedop) {
                        const result = Calculate(firstval, currentinput, storedop);
                        firstval= roundtoseven(result).toString();
                    }
                    storedop = btnValue;
                    const displayOperator = btnValue === '*' ? '×' : btnValue;
                    currentinput = '';
                    Display(firstval+ " " + displayOperator);
                }
            } else {
                currentinput += btnValue;
                const displayOperator = storedop === '*' ? '×' : storedop;
                Display(firstval+ " " + displayOperator + " " + currentinput);
            }
        });
    });
});



