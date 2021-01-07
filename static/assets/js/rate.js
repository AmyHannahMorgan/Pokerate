class MatchupMaker {
    constructor(contenders) {
        this.contenders = contenders;

        this.contenders[0].element.addEventListener('click', e => {
            this.win(0, 1);
        });

        this.contenders[1].element.addEventListener('click', e => {
            this.win(1, 0);
        });
    }

    win(winner, loser) {
        fetch(`/api/rate/?win=${this.contenders[winner].mon.id}&loss=${this.contenders[loser].mon.id}`, {
            'method': 'post'
        }).then(r => {
            return fetch('/api/match').then(r => r.json())
        }).then(json => {
            this.contenders[0].update(json[0]);
            this.contenders[1].update(json[1]);
        })
    }
}

class Contender {
    constructor(initMon, element) {
        this.mon = initMon;
        this.element = element;
        this.element.querySelector('img').src = this.mon.pic;
        this.element.querySelector('img').alt = this.mon.name;
        this.element.querySelector('h1').innerText = this.mon.name;
    }

    update(mon) {
        this.mon = mon;
        this.element.querySelector('img').src = this.mon.pic;
        this.element.querySelector('img').alt = this.mon.name;
        this.element.querySelector('h1').innerText = this.mon.name;
    }
}

let maker;

window.onload = () => {
    fetch('/api/match').then(response => response.json()).then(json => {
        let contenders = [new Contender(json[0], document.querySelector('#contender1')), new Contender(json[1], document.querySelector('#contender2'))];
        maker = new MatchupMaker(contenders);
    })
}