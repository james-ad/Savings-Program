window.addEventListener('load', function() {

// create variables to store total savings amount and an array, holding all of the checks entered so far
    var checkAmount, checkHistory, checks, checksDeposited, clearCheckHistory, depositButton, moneySaved, percentage, removeSelectedChecks, savings, sliderReadout;

    checkAmount = document.getElementById('check-input');
    checkHistory = [];
    checks = document.getElementById('checks');
    checksDeposited = document.getElementById('checks-deposited');
    clearCheckHistory = document.getElementById('clear-check-history');
    depositButton = document.getElementById('deposit');
    moneySaved = document.getElementById('money-saved');
    percentage = document.getElementById('percentage');
    removeSelectedChecks = document.getElementById('remove-selected-checks');
    sliderReadout = document.getElementById('slider-readout');
    sliderReadout.innerHTML = percentage.value + ' %';

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

// Remove last entry and clear check history upon clicking appropriate buttons
    removeSelectedChecks.addEventListener('click', function() {
        let removeCheckBox = document.getElementsByClassName('remove-check');
        for(i=0; i < removeCheckBox.length; i++) {
        if (removeCheckBox[i].checked) {
            removeCheckBox[i].parentNode.parentNode.remove();
        }
        console.log(checks)
    }
        
        // let rowCount = checks.rows.length - 1;
        // if (checks.rows.length > 1) {
        // checks.deleteRow(rowCount);
        // checkHistory.shift();
        // console.log(checkHistory);
        // }
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
  
// Update HTML with new check history
    function depositCheck() {
        checkHistory.unshift(checkAmount.value);
        checks.innerHTML += '<tr class="entry"> <td>' + checkAmount.value + '</td>' + '<td>' + convertPercentage(checkAmount.value).toFixed(2) + '</td> <td><input type="checkbox" class="remove-check"> </td></tr>';
        console.log(checkHistory);
    }

    function convertPercentage(n) {
        let sliderValue = percentage.value;
        return sliderValue * .01 * n;
    }

});