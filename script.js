window.addEventListener('load', function() {

// create variables to store total savings amount and an array, holding all of the checks entered so far
    var checkAmount, checkHistory, checks, checksDeposited, clearCheckHistory, depositButton, moneySaved, percentage, savings, sliderReadout, totalSavings;

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
                // find value in Savings category of table, remove it from the totalSavings array and update the Savings Total section of the page.
                for (i=0; i < totalSavings.length; i++) {
                    let rmValue = target.parentNode.previousSibling.value;
                    if (rmValue == totalSavings[i]) {
                        let index = totalSavings.indexOf(rmValue);
                        totalSavings.splice(index, 1);
                    }
                }
                console.log(totalSavings);
            }
    });

    clearCheckHistory.addEventListener('click', function() {
        for (i = checks.rows.length - 1; i > 0; i--) {
        checks.deleteRow(i);
        }
        checkHistory = [];
        savings.innerHTML = '';
        console.log(checkHistory);
    });

// Add each new check deposited onto the beginning of an array  
    depositButton.addEventListener('click', depositCheck);
  
//  Create funcitons that update HTML with new check history
    function depositCheck() {
        checkHistory.unshift(checkAmount.value);
        checks.innerHTML += '<tr class="entry"> <td>' + checkAmount.value + '</td>' + '<td>' + percentage.value + ' %' + '</td>' + '<td class="savings-class">' + convertPercentage(checkAmount.value).toFixed(2) + '</td> <td><button class="remove-check">X</button> </td></tr>';
        
        totalSavings.push(Number(convertPercentage(checkAmount.value).toFixed(2)));
        console.log(totalSavings);
        savings.innerHTML = totalSavings.reduce(function(a, b) {
            return a + b;
        });
        console.log('check collection: ' + checkHistory);
        console.log('savings collection: ' + totalSavings);
    }

    function convertPercentage(n) {
        let sliderValue = percentage.value;
        return sliderValue * .01 * n;
    }
    

});
