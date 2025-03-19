document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', calculateGrade);
});

function calculateGrade() {
    const currentGrade = parseFloat(document.getElementById('currentGrade').value);
    const desiredGrade = parseFloat(document.getElementById('desiredGrade').value);
    const examWeight = parseFloat(document.getElementById('examWeight').value);
    
    const errorElement = document.getElementById('error');
    const resultElement = document.getElementById('result');
    const resultTextElement = document.getElementById('resultText');
    const warningTextElement = document.getElementById('warningText');
    
    errorElement.style.display = 'none';
    resultElement.style.display = 'none';
    warningTextElement.textContent = '';
    
    if (isNaN(currentGrade) || isNaN(desiredGrade) || isNaN(examWeight)) {
        errorElement.textContent = 'Please enter all values.';
        errorElement.style.display = 'block';
        return;
    }
    
    if (examWeight <= 0) {
        errorElement.textContent = 'Final exam weight must be greater than 0%.';
        errorElement.style.display = 'block';
        return;
    }
    
    const examWeightDecimal = examWeight / 100;
    const currentWeightDecimal = 1 - examWeightDecimal;
    
    const neededExamGrade = (desiredGrade - (currentGrade * currentWeightDecimal)) / examWeightDecimal;
    
    resultTextElement.innerHTML = `<strong>You need to score ${neededExamGrade.toFixed(2)}%</strong> on your final exam to achieve a final grade of ${desiredGrade}%.`;
    
    if (neededExamGrade > 100) {
        warningTextElement.textContent = 'Note: This score is above 100%';
    } else if (neededExamGrade < 0) {
        warningTextElement.textContent = 'Note: A negative score means you could still achieve your desired grade even if you scored 0% on the final exam.';
    }
    
    resultElement.style.display = 'block';
}
