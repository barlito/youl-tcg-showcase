let keySequence = '';
let displayed = false;
const appDiv = document.getElementById('app');
const htmlToAdd = `
    <h2>KDA</h2>
    <p>Découvrez la magie ultime avec Magic, l'extension enchantée de YTCG : maîtrisez le pouvoir des sorts
        et des créatures dans un univers fantastique épique!</p>

    <section class="card-grid">
        <div id="kda1" class="card interactive">
            <div class="card__translater">
                <div class="card__rotator">
                    <div class="card__front">
                        <img src="https://media.discordapp.net/attachments/1088613372204941322/1148347893225369660/farf_card.png?width=484&height=675">
                        <div class="card__shine"></div>
                        <div class="card__glare"></div>
                    </div>
                </div>
            </div>
        </div>

        <div id="kd2" class="card interactive">
            <div class="card__translater">
                <div class="card__rotator">
                    <div class="card__front">
                        <img src="https://media.discordapp.net/attachments/1088613372204941322/1148347893225369660/farf_card.png?width=484&height=675">
                        <div class="card__shine"></div>
                        <div class="card__glare"></div>
                    </div>
                </div>
            </div>
        </div>

        <div id="kd3" class="card interactive">
            <div class="card__translater">
                <div class="card__rotator">
                    <div class="card__front">
                        <img src="https://media.discordapp.net/attachments/1088613372204941322/1148347893225369660/farf_card.png?width=484&height=675">
                        <div class="card__shine"></div>
                        <div class="card__glare"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.getItem('displayed') ? displayed = true : displayed = false;

    if(displayed){
        displayDiv();
    }
});

document.addEventListener('keydown', function (event) {
    const key = event.key.toUpperCase();

    keySequence += key;

    if (keySequence.includes('KDA') && !displayed) {
        displayDiv(true);
        displayed = true;
        sessionStorage.setItem('displayed', true);
    }
});

document.addEventListener("keyup", () => {
    keySequence = '';
});

function displayDiv(scroll = false) {
    const newDiv = document.createElement("div");
    newDiv.classList.add('extension');
    newDiv.classList.add('kda');
    newDiv.innerHTML = htmlToAdd;
    appDiv.appendChild(newDiv);

    if(scroll){
        newDiv.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
}
