class MatchupMaker {
    constructor(contenders, matchups) {
        this.contenders = contenders;
        this.matchups = matchups;
        this.matchup = 0;

        this.contenders[0].element.addEventListener('click', e => {
            this.win(0, 1);
        });

        this.contenders[1].element.addEventListener('click', e => {
            this.win(1, 0);
        });
    }

    win(winner, loser) {
        this.contenders[0].hide();
        this.contenders[1].hide();
        fetch(`/api/rate/?win=${this.contenders[winner].mon.id}&loss=${this.contenders[loser].mon.id}`, {
            'method': 'post'
        }).then(r => {
            console.log(r);
            this.matchup++
            if(this.matchup < this.matchups.length) return this.matchups
            else{
                this.matchup = 0;
                return fetch('/api/match').then(r => r.json())  
            } 
        }).then(json => {
            if(this.matchup === 0) this.matchups = json;
            this.contenders[0].update(json[this.matchup][0]);
            this.contenders[1].update(json[this.matchup][1]);
        })
    }
}

class Contender {
    constructor(initMon, element) {
        this.mon = initMon;
        this.element = element;
        this.image = new Image();
        this.image.src = this.mon.pic
        this.image.addEventListener('load', e => {
            this.display()
        });
        this.element.querySelector('img').alt = this.mon.name;
        this.element.querySelector('h2').innerText = this.mon.name;
    }

    update(mon) {
        this.mon = mon;
        this.image.src = this.mon.pic
        this.element.querySelector('img').alt = this.mon.name;
        this.element.querySelector('h2').innerText = this.mon.name;
    }

    display() {
        console.log(this);
        this.element.querySelector('img').src = this.mon.pic;
        this.element.classList.remove('hide');
    }

    hide() {
        this.element.classList.add('hide');
    }
}

let maker;

window.onload = () => {
    fetch('/api/match').then(response => response.json()).then(json => {
        let contenders = [new Contender(json[0][0], document.querySelector('#contender1')), new Contender(json[0][1], document.querySelector('#contender2'))];
        maker = new MatchupMaker(contenders, json);
    })
}