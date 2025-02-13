/**
 * @type {HTMLParagraphElement}
 */
const equationElement = document.querySelector("#equation");

/**
 * @type {HTMLInputElement}
 */
const inputElement = document.querySelector("#input");

const solvedTotalElement = document.querySelector("#solved-total");
const recordTimeElement = document.querySelector("#record-time");

/**
 * @param {number} min inclusive
 * @param {number} max exclusive
 * @returns {number}
 */
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @returns {{ equation: string, answer: number }}
 */
function generateProblem() {
    const lhs = randomInt(2, 21);
    const rhs = randomInt(2, 21);

    return {
        equation: `${lhs} * ${rhs} =`,
        answer: lhs * rhs,
    };
}

function loadStats() {
    const recordTime = localStorage.getItem("record-time");
    const solvedTotal = localStorage.getItem("solved-total");

    return {
        recordTime: recordTime === null ? null : parseInt(recordTime),
        solvedTotal: solvedTotal === null ? 0 : parseInt(solvedTotal),
    };
}

function saveStats(recordTime, solvedTotal) {
    localStorage.setItem("record-time", recordTime.toString());
    localStorage.setItem("solved-total", solvedTotal.toString());
}

function formatRecordTime(recordTime) {
    return `${(recordTime / 1000).toFixed(1)}s`;
}

function main() {
    inputElement.focus();

    let problem = generateProblem();

    let { recordTime, solvedTotal } = loadStats();

    recordTimeElement.textContent = `Record time: ${
        recordTime === null ? "none" : formatRecordTime(recordTime)
    }`;

    solvedTotalElement.textContent = `Solved in total: ${solvedTotal.toString()}`;

    let startedSolvingTime = Date.now();

    equationElement.textContent = problem.equation;

    inputElement.onkeydown = (event) => {
        if (event.key != "Enter") {
            return;
        }

        if (problem.answer == inputElement.valueAsNumber) {
            alert("Good job!");

            const timeSpentSolving = Date.now() - startedSolvingTime;

            if (recordTime === null || timeSpentSolving < recordTime) {
                recordTime = timeSpentSolving;
            }

            problem = generateProblem();

            startedSolvingTime = Date.now();
            inputElement.value = "";
            solvedTotal += 1;

            equationElement.textContent = problem.equation;
            recordTimeElement.textContent = `Record time: ${
                recordTime === null ? "none" : formatRecordTime(recordTime)
            }`;

            solvedTotalElement.textContent = `Solved in total: ${solvedTotal.toString()}`;

            saveStats(recordTime, solvedTotal);
        }
    };
}

main();
