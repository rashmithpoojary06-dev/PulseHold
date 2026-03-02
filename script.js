const orb = document.getElementById("orb");
const statusText = document.getElementById("status");

let startTime = 0;
let breathingInterval;

// Trigger Detection
orb.addEventListener("touchstart", startHold);
orb.addEventListener("mousedown", startHold);

orb.addEventListener("touchend", endHold);
orb.addEventListener("mouseup", endHold);

function startHold() {
    startTime = Date.now();
    statusText.innerText = "Hold...";
    orb.style.transform = "scale(1.1)";
}

function endHold() {
    orb.style.transform = "scale(1)";
    let duration = Date.now() - startTime;
    detectStress(duration);
}

function detectStress(duration) {

    let level;

    if (duration < 1500) {
        level = "mild";
    } else if (duration < 4000) {
        level = "moderate";
    } else {
        level = "high";
    }

    startIntervention(level);
}

function startIntervention(level) {

    clearInterval(breathingInterval);

    if (level === "mild") {
        statusText.innerText = "Gentle Breathing";
        breathingExercise(4000, false);
    }

    if (level === "moderate") {
        statusText.innerText = "Guided Breathing";
        breathingExercise(3500, true);
    }

    if (level === "high") {
        statusText.innerText = "Grounding Mode";
        groundingMode();
    }
}

function breathingExercise(speed, vibrate = false) {

    let inhale = true;

    breathingInterval = setInterval(() => {

        if (inhale) {
            orb.style.transform = "scale(1.6)";
            statusText.innerText = "Inhale";
            if (vibrate) navigator.vibrate(200);
        } else {
            orb.style.transform = "scale(1)";
            statusText.innerText = "Exhale";
            if (vibrate) navigator.vibrate(200);
        }

        inhale = !inhale;

    }, speed);
}

function groundingMode() {

    statusText.innerText = "Tap slowly with rhythm";

    document.body.addEventListener("click", () => {
        navigator.vibrate(100);
        orb.style.transform = "scale(1.3)";
        setTimeout(() => {
            orb.style.transform = "scale(1)";
        }, 200);
    });
}