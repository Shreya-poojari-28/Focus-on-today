const checkBoxList = document.querySelectorAll('.checkBox');
const goal = document.querySelectorAll('.goal');
const error = document.querySelector('.error')
const progressBar = document.querySelector('.progressBar');
const progressValue = document.querySelector('.progressValue');
const tagLine = document.querySelector('#tagLine')

const allQuotes = [
    `Raise the bar by completing your goals!`,
    `Well begun.. it's half done!`,
    `Just a step away, keep going!!`,
    `Whoa! You just completed all the goals, time to chill!!🤩`
]
    

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: '',
        completed: false
    },
    second: {
        name: '',
        completed: false
    },
    third: {
        name: '',
        completed: false
    }
};
let completedGoals = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.style.width = `${(completedGoals / 3) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoals}`
tagLine.innerText = allQuotes[completedGoals]



checkBoxList.forEach(checkBox => {
    checkBox.addEventListener('click', (e) => {
        const allGoalsAdded = [...goal].every((input) => {
            return input.value
        })
        if(allGoalsAdded) {
            checkBox.parentElement.classList.toggle('completed')
            const inputId = checkBox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoals = Object.values(allGoals).filter((goal) => goal.completed).length;
            progressValue.style.width = `${(completedGoals / 3) * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoals}`
            tagLine.innerText = allQuotes[completedGoals]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
            
        }
         else {
            error.classList.add('showError')
        }

        // if(completedGoals === 3) {
        //     alert('Congratulations! You have completed all your goals')
        // }
    
    })
})

goal.forEach(input => {

    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed) {
        input.parentElement.classList.add('completed')
    }
    

    input.addEventListener('focus', () => {
        error.classList.remove('showError')
    })

    input.addEventListener('input', (e) => {
        if(allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        
        allGoals[input.id].name = input.value
            
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
        
    })
})

// if(completedGoals == 1) {
//     tagLine.innerText = `Well begun.. it's half done!`
// } 
// else if (completedGoals == 2) {
//     tagLine.innerText = `Just a step away, keep going!!`
// }
// else if (completedGoals == 3) {
//     tagLine.innerText = `Whoa! You just completed all the goals, time to chill!!🤩`
// }




    

