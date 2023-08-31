import anime from './anime.es.js';
// const anime = require('anime.es.js');
const element = document.getElementById('card');

element.addEventListener('pointermove', (e) => {

    if (e.type === "touchmove") {
        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;
    }

    computePositions(e.clientX, e.clientY);
});

function computePositions(pointerX, pointerY){
    const rect = element.getBoundingClientRect(); // get element's current size/position

    // get absolute position inside the card
    const absolute = {
        x: pointerX - rect.left, // get mouse position from left
        y: pointerY - rect.top, // get mouse position from right
    };
    // compute the absolute position to a percentage value
    const percent = {
        x: clamp(round((100 / rect.width) * absolute.x)),
        y: clamp(round((100 / rect.height) * absolute.y)),
    };
    // compute the center of the card
    const center = {
        x: percent.x - 50,
        y: percent.y - 50,
    };

    updateCard({
        x: adjust(percent.x, 0, 100, 37, 63),
        y: adjust(percent.y, 0, 100, 33, 67),
    }, {
        x: round(-(center.x / 3.5)),
        y: round(center.y / 2),
    }, {
        x: round(percent.x),
        y: round(percent.y),
        o: 1,
    });
}

element.addEventListener("mouseout", (e) => {
    resetElement(e, element);
});

let animation;

function resetElement(event, element) {
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    animation = anime({
        targets: '.card__rotator',
        rotateX: {
            value: 0,
            easing: 'easeOutBack',
            delay: 100,
            endDelay: 100,
            duration: 800,
        },
        rotateY: {
            value: 0,
            easing: 'easeOutBack',
            delay: 100,
            endDelay: 100,
            duration: 800,
        },
        // Utilisation d'une fonction de mise à jour à chaque étape de l'animation
        update: function(anim) {
            const progress = anim.progress; // Valeur entre 0 et 100

            // todo refacto this
            const rect = element.getBoundingClientRect(); // get element's current size/position

            // get absolute position inside the card
            const absolute = {
                x: pointerX - rect.left, // get mouse position from left
                y: pointerY - rect.top, // get mouse position from right
            };
            // compute the absolute position to a percentage value
            const percent = {
                x: clamp(round((100 / rect.width) * absolute.x)),
                y: clamp(round((100 / rect.height) * absolute.y)),
            };
            // compute the center of the card
            const center = {
                x: percent.x - 50,
                y: percent.y - 50,
            };

            // diff computation
            const diffX = 50 - percent.x;
            const diffY = 50 - percent.y;
            const newX = percent.x + (diffX * progress / 100);
            const newY = percent.y + (diffY * progress / 100);

            console.log(100 - progress);

            updateCardReset({
                x: adjust(newX, 0, 100, 37, 63),
                y: adjust(newY, 0, 100, 33, 67),
            }, {
                x: round(-(center.x / 3.5)),
                y: round(center.y / 2),
            }, {
                x: round(newX),
                y: round(newY),
                o: 1 - (progress / 100),
            });

        }
    });
}

const updateCard = (background, rotate, glare) => {
    // if animation typeof object, pause it
    if (typeof animation === 'object') {
        animation.pause();
    }

    const pointerFromCenter =
        clamp(Math.sqrt(
            (glare.y - 50) * (glare.y - 50) +
            (glare.x - 50) * (glare.x - 50)
        ) / 50, 0, 1);

    element.style.setProperty('--pointer-x', glare.x + '%');
    element.style.setProperty('--pointer-y', glare.y + '%');
    element.style.setProperty('--pointer-from-center', pointerFromCenter);
    element.style.setProperty('--pointer-from-top', glare.y / 100);
    element.style.setProperty('--pointer-from-left', glare.x / 100);
    element.style.setProperty('--card-opacity', glare.o);
    // element.style.setProperty('--rotate-x', rotate.x + 'deg');
    // element.style.setProperty('--rotate-y', rotate.y + 'deg');
    element.style.setProperty('--background-x', background.x + '%');
    element.style.setProperty('--background-y', background.y + '%');
    element.style.setProperty('--card-scale', '1');
    element.style.setProperty('--translate-x', '0px');
    element.style.setProperty('--translate-y', '0px');


    document.querySelector('.card__rotator').style.setProperty("transform", "rotateX(" + rotate.y + "deg) rotateY(" + rotate.x + "deg)");

}

const updateCardReset = (background, rotate, glare) => {
    const pointerFromCenter =
        clamp(Math.sqrt(
            (glare.y - 50) * (glare.y - 50) +
            (glare.x - 50) * (glare.x - 50)
        ) / 50, 0, 1);

    element.style.setProperty('--pointer-x', glare.x + '%');
    element.style.setProperty('--pointer-y', glare.y + '%');
    element.style.setProperty('--pointer-from-center', pointerFromCenter);
    element.style.setProperty('--pointer-from-top', glare.y / 100);
    element.style.setProperty('--pointer-from-left', glare.x / 100);
    element.style.setProperty('--card-opacity', glare.o);
    element.style.setProperty('--background-x', background.x + '%');
    element.style.setProperty('--background-y', background.y + '%');
    element.style.setProperty('--card-scale', '1');
    element.style.setProperty('--translate-x', '0px');
    element.style.setProperty('--translate-y', '0px');
}

const round = (value, precision = 3) => parseFloat(value.toFixed(precision));

const clamp = (value, min = 0, max = 100) => {
    return Math.min(Math.max(value, min), max);
};

const adjust = (value, fromMin, fromMax, toMin, toMax) => {
    return round(toMin + (toMax - toMin) * (value - fromMin) / (fromMax - fromMin));
};
