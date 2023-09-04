let keySequence = '';
let displayed = false;
const appDiv = document.getElementById('app');
const h2Content = 'KDA';
const pContent = 'Découvrez la magie ultime avec Magic, l\'extension enchantée de YTCG : maîtrisez le pouvoir des sorts et des créatures dans un univers fantastique épique!';
const img1 = 'https://media.discordapp.net/attachments/1138141574044319868/1148375233808576512/farf_kda.png?width=494&height=676';
const img2 = 'https://media.discordapp.net/attachments/1138141574044319868/1148375234915872859/ahri_kda.png?width=494&height=676';
const img3 = 'https://media.discordapp.net/attachments/1138141574044319868/1148375234378993815/julian_kda.png?width=494&height=676';

document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.getItem('displayed') ? displayed = true : displayed = false;

    if(displayed){
        hydrateDiv();
    }
});

document.addEventListener('keydown', function (event) {
    const key = event.key.toUpperCase();

    keySequence += key;

    if (keySequence.includes('KDA') && !displayed) {
        hydrateDiv(true);
        displayed = true;
        sessionStorage.setItem('displayed', true);
    }
});

document.addEventListener("keyup", () => {
    keySequence = '';
});

function hydrateDiv(scroll = false) {
    const emptyDiv = document.querySelector(".extension.empty");
    emptyDiv.querySelector('h2').innerHTML = h2Content;
    emptyDiv.querySelector('p').innerHTML = pContent;
    emptyDiv.getElementsByTagName('img')[0].src = img1;
    emptyDiv.getElementsByTagName('img')[1].src = img2;
    emptyDiv.getElementsByTagName('img')[2].src = img3;

    emptyDiv.style.setProperty('display', '');

    if(scroll){
        emptyDiv.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
}
