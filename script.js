window.addEventListener('load', function() {

// create variables to store total savings amount and an array, holding all of the checks entered so far
    var addSavingsUp, checkAmount, checkHistory, checks, checksDeposited, clearCheckHistory, depositButton, moneySaved, percentage, savings, sliderReadout, totalSavings;

    addSavingsUp = document.getElementById('check-savings-total');
    checkAmount = document.getElementById('check-input');
    checkHistory = [];
    checks = document.getElementById('checks');
    checksDeposited = document.getElementById('checks-deposited');
    clearCheckHistory = document.getElementById('clear-check-history');
    depositButton = document.getElementById('deposit');
    moneySaved = document.getElementById('money-saved');
    percentage = document.getElementById('percentage');
    savings = document.getElementById('savings-total');
    sliderReadout = document.getElementById('slider-readout');
    sliderReadout.innerHTML = percentage.value + ' %';
    totalSavings = [];

// Trigger deposit button when user hits "Enter" key
    checkAmount.addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            depositButton.click();
        }
    });

// Show savings amount when user either enters in a check amount or adjusts the savings percentage using the slider
    checkAmount.addEventListener('input', function() {
        moneySaved.innerHTML = convertPercentage(checkAmount.value).toFixed(2);
    });

    percentage.addEventListener('input', function() {
        sliderReadout.innerHTML = percentage.value + ' %';
        moneySaved.innerHTML = convertPercentage(checkAmount.value).toFixed(2);
    });

// Remove selected entry and clear check history upon clicking appropriate buttons
    document.addEventListener('click', function(e) {
        let target = e.target;
        if (e.target.className == 'remove-check') {
                target.parentNode.parentNode.remove();
            }
    });

    clearCheckHistory.addEventListener('click', function() {
        for (i = checks.rows.length - 1; i > 0; i--) {
        checks.deleteRow(i);
        }
        checkHistory = [];
        console.log(checkHistory);
    });

// Add each new check deposited onto the beginning of an array  
    depositButton.addEventListener('click', depositCheck);
  
//  Create funcitons that update HTML with new check history
    function depositCheck() {
        checkHistory.unshift(checkAmount.value);
        checks.innerHTML += '<tr class="entry"> <td>' + checkAmount.value + '</td>' + '<td>' + percentage.value + ' %' + '</td>' + '<td class="savings-class">' + convertPercentage(checkAmount.value).toFixed(2) + '</td> <td><button class="remove-check">X</button> </td></tr>';
        
        totalSavings.push(convertPercentage(checkAmount.value).toFixed(2));
        savings.innerHTML = '';
        savings.innerHTML = totalSavings.reduce(addSavings);
        console.log('check collection: ' + checkHistory);
        console.log('savings collection: ' + totalSavings);
    }

    function convertPercentage(n) {
        let sliderValue = percentage.value;
        return sliderValue * .01 * n;
    }

    addSavingsUp.addEventListener('click', addSavings);

    let fullAmount = 0;
    let savingsClass = document.querySelectorAll('.savings-class');
    function addSavings() {
        for (i=0; i < savingsClass.length; i++) {
            fullAmount += savingsClass[i];
            return fullAmount;
        }
    }

});
