var inputedValuesInCalculator = "";
var currentValue;
var buttonValue;
var textOnScreen = false;
var buttonClicked;
var displayValue;
var clickedFirstTime = false;
var tooLargeTextWarning = false;

//button click option


$(".actionButtion").click(function(){

    if(clickedFirstTime == false){
        clickedFirstTime = true;
        $(".mainText").text("");
        $(".mainText").addClass("calculatorNumbersTextFont");
    }
    
    if(textOnScreen == false && tooLargeTextWarning == false){
        if(inputedValuesInCalculator.length < 50){

    buttonClicked = $(this).text().trim();
    currentValue = $(".mainText").text().trim();
   currentRealValue = inputedValuesInCalculator;
    if(buttonClicked == "π"){

        buttonValue = "Math.PI";
        inputedValuesInCalculator = currentRealValue + buttonValue; //important. This is what shows on backend
        displayValue = currentValue.toString() + "π";
    
    }
    else if(buttonClicked == "√"){

        buttonValue = "Math.sqrt(";
        inputedValuesInCalculator = currentRealValue + buttonValue; //important. This is what shows on backend
        displayValue = currentValue.toString() + "√(";
    }
    else if(buttonClicked == "^"){

        buttonValue = "** ";
        inputedValuesInCalculator = "(" + currentRealValue + buttonValue; //important. This is what shows on backend
        displayValue = currentValue.toString() + "^(";
    }
    else if(buttonClicked == "e"){
        buttonValue = "Math.E";
        inputedValuesInCalculator = currentRealValue + buttonValue;
        displayValue = currentValue.toString() + "e";
    }
    else if(buttonClicked == "←"){
        deleteKeys();
    }

    else{
    buttonValue = $(this).text().trim();
    //add some if statements for buttons to add space around them to get them to look nice
    inputedValuesInCalculator = currentRealValue + buttonValue; //important. This is what shows on backend
   
    displayValue = currentValue.toString() +  buttonValue.toString();
    }
    $(".mainText").text(displayValue);

} 
else{
    $(".mainText").html("Entering Too Large Of A Number.<br>Clear To Use Again");
    textOnScreen = true;  
    tooLargeTextWarning = true; 

}

}
else if(textOnScreen == true && tooLargeTextWarning == false){
$(".mainText").text("Clear Text To Use");

}

})


function deleteKeys(){

    var lastChar = displayValue.slice(-1);
    var lastFewChars = displayValue.slice(-2);
    var inputLength = inputedValuesInCalculator.length;

    if(lastChar == "π"){

        inputedValuesInCalculator = inputedValuesInCalculator.slice(0, inputLength-7);
        displayValue = displayValue.slice(0, -1);
}
    else if(lastFewChars == "^("){
        inputedValuesInCalculator = inputedValuesInCalculator.slice(0, inputLength-3);
        inputedValuesInCalculator = inputedValuesInCalculator.slice(1);
        displayValue = displayValue.slice(0, -2);
    }
    else if(lastFewChars == "√("){
        inputedValuesInCalculator = inputedValuesInCalculator.slice(0,inputLength-10);
        displayValue = displayValue.slice(0, -2);

    }
    else if(lastChar == "e"){
        inputedValuesInCalculator = inputedValuesInCalculator.slice(0, inputLength-6);
        displayValue = displayValue.slice(0, -1);
    }
    else{
        displayValue = displayValue.slice(0, -1);
        inputedValuesInCalculator = inputedValuesInCalculator.slice(0, -1);  
    }
    $(".mainText").text(displayValue);

}


//key down function
$(document).keydown(function(event){

    if(clickedFirstTime == false){
        clickedFirstTime = true;
        $(".mainText").text("");
        $(".mainText").addClass("calculatorNumbersTextFont");
    }

    if(textOnScreen == false && tooLargeTextWarning == false){
    if(inputedValuesInCalculator.length < 50){

    buttonClicked = event.key;
    currentValue = $(".mainText").text().trim();
   currentRealValue = inputedValuesInCalculator;

    if(buttonClicked == "^"){

        buttonValue = "** ";
        inputedValuesInCalculator = "(" + currentRealValue + buttonValue; //important. This is what shows on backend
        displayValue = currentValue.toString() + "^(";
        $(".mainText").text(displayValue);
    }
    else if(buttonClicked == "e"){
        buttonValue = "Math.E";
        inputedValuesInCalculator = currentRealValue + buttonValue;
        displayValue = currentValue.toString() + "e";
        $(".mainText").text(displayValue);
    }
    else if(buttonClicked == "Backspace"){
        deleteKeys();
    }
    else if (buttonClicked == 9 || buttonClicked == 8 || buttonClicked == 7 || buttonClicked == 6 || buttonClicked == 5 || buttonClicked == 4 || buttonClicked == 3 || buttonClicked == 2 || buttonClicked == 1 || buttonClicked == 0 || buttonClicked == "-" || buttonClicked == "/" || buttonClicked == "+" || buttonClicked == "*" || buttonClicked == "(" || buttonClicked == ")" || buttonClicked == "."){
    buttonValue = event.key;
    inputedValuesInCalculator = currentRealValue + buttonValue; //important. This is what shows on backend
   
    displayValue = currentValue.toString() +  buttonValue.toString();
    $(".mainText").text(displayValue);
    }
    

    } 
    else{
        $(".mainText").html("Entering Too Large Of A Number.<br>Clear To Use Again");
        textOnScreen = true;  
        tooLargeTextWarning = true; 

    }

}
else if(textOnScreen == true && tooLargeTextWarning == false){
    $(".mainText").text("Clear Text To Use");
    
}

})





$(".clearEverything").click(clearMainText) //This calls clear function when clear button is clicked

$(document).keydown(function(event){

    if (event.key == "Delete" || event.key == "C" || event.key == "c"){
        clearMainText();
    }

})

function clearMainText(){

    inputedValuesInCalculator = "";
    displayValue = "";
    textOnScreen = false;
    tooLargeTextWarning = false;
    $(".miniText").html("0"); 
    $(".mainText").text(displayValue);

}

var numberCount = 0;
var calculatedNumber = 0;

$(document).keydown(function(event){

    if(event.key == "c" || event.key == "C"){
        halfClear();
    }

});



$(".equalBox").click(calculatingValues)

$(document).keydown(function(event){

    var keyPressed = event.key;
    if(keyPressed == "=" | keyPressed  == "Enter"){
        calculatingValues();
    }

})


function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num.toString();
    } else {
        return num.toFixed(10).replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.$/, "");
    }
}

function calculatingValues(){
    try{

        $(".miniText").text(displayValue);
        var result = eval(inputedValuesInCalculator);
        var displayedResult = result.toLocaleString(); //converts to commas
        if(result == Infinity){
            $(".mainText").html("Can't Divide By 0<br>CE To Try Again");
            //add boolean to force user to clear before using again
            textOnScreen = true;
        }
        else{
            var displayedResult = result.toLocaleString(undefined, {maximumFractionDigits: 10});
            $(".mainText").text(displayedResult);
            inputedValuesInCalculator = formatNumber(result); // Adjust decimal places as required
            displayValue = formatNumber(result);
        }
    }
    catch (e){
            if (e.message.includes("missing ) after argument list")) {            
            $(".mainText").html("Missing Parenthesis<br>CE To Try Again");
            textOnScreen = true;
            //add boolean to force user to clear before using again
            }
            else{
            console.log(e);
            $(".mainText").html("Invalid Mathematical Format<br>CE To Try Again");
            textOnScreen = true;
            //add boolean to force user to clear before using again
            }
    }
    
        

}