// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}
// fortune cookie fun facts (fact #n goes with table card #n)
const fortunes = [
    'M in R\'s phone: "Home Depot Queen." R in M\'s phone: just his phone number. No name.',
    'M&R bike to work together with matching helmets',
    'M&R have messaged each other over 1 million words',
    'M texts R most at 3pm, R texts most at 11pm',
    'M&R once spent an anniversary hiking with llamas',
    'M makes R stop to look at every deer they see',
    'M&R\'s Snapchat streak is 2,996 days. R & Saheel\'s is 3,130',
    'M&R met in RoundTable at Duke, but Kevin knew M first',
    'M has sent R 2,205 emojis, R has sent 214',
    'R is a parasite on M\'s Costco membership',
    'M\'s most-hated R clothing: the light-up bike vest',
    'M\'s first snow day was spent with R!',
    '$ spent at Bar Cino: 3,255',
    'M\'s top link to R: tiktok.com. R to M: theatlantic.com',
    'The most common noun in their messages is coffee',
    'M&R average 120 texts a day, the peak was 788',
    'M&R\'s 2nd date was in Duke hospital, 12am @ Starbucks',
    'Their cat\'s name is Freya, but she only responds to "Cat"',
    'M&R\'s 6hr London itinerary: Dishoom & the cholera pump',
    'R used to do archery a few miles from where M grew up',
    'R has a daily calendar reminder to nag M lest he forget'
];

let cookieBtn = document.querySelector('#cookie-btn');

if (cookieBtn) {
    let reveal = document.querySelector('#fortune-reveal');
    let tableImg = document.querySelector('#fortune-table');
    let fortuneText = document.querySelector('#fortune-text');
    let fortuneNum = document.querySelector('#fortune-num');
    let cookieCount = document.querySelector('#cookie-count');
    let bag = [];
    let opened = 0;

    // shuffled list of fortunes so there are no repeats until all have been seen
    const refillBag = () => {
        bag = fortunes.map((_, i) => i);
        for (let i = bag.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [bag[i], bag[j]] = [bag[j], bag[i]];
        }
    };

    cookieBtn.onclick = () => {
        if (bag.length === 0) refillBag();
        let i = bag.pop();
        let num = String(i + 1).padStart(2, '0');

        // restart the wobble + crack animation
        cookieBtn.classList.remove('cracked', 'wobble');
        reveal.hidden = true;
        void cookieBtn.offsetWidth;
        cookieBtn.classList.add('wobble');

        setTimeout(() => {
            cookieBtn.classList.add('cracked');
            tableImg.src = `images/after/table-${num}.jpg`;
            tableImg.alt = `Table ${i + 1} card`;
            fortuneText.textContent = fortunes[i];
            fortuneNum.textContent = i + 1;
            reveal.hidden = false;

            opened = Math.min(opened + 1, fortunes.length);
            cookieCount.textContent = opened < fortunes.length
                ? `${opened} of ${fortunes.length} cracked. Tap for another!`
                : `You've cracked all ${fortunes.length}! Tap to go again.`;
            if (bag.length === 0) opened = 0;
        }, 450);
    };

    // "show all" list
    let fortuneList = document.querySelector('#fortune-list');
    fortunes.forEach((text, i) => {
        let li = document.createElement('li');
        let b = document.createElement('b');
        b.textContent = `Table ${i + 1}`;
        li.append(b, text);
        fortuneList.append(li);
    });
}
