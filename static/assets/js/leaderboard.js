window.onload = () => {
    fetch('/api/leaderboard').then(r => r.json())
    .then(json => {
        let template = document.querySelector('#leaderboardObjectTemplate').content.firstElementChild;
        for(let i = 0; i < json.length; i++) {
            let currElement = template.cloneNode(true);
            console.log(currElement.innerHTML);
            console.log(json);
            currElement.innerHTML = currElement.innerHTML.replace('{{pic}}', json[i].pic);
            currElement.innerHTML = currElement.innerHTML.replace(/{{name}}/g, json[i].name, );
            currElement.innerHTML = currElement.innerHTML.replace('{{ratio}}', `${json[i].ratio * 100}%`);
            console.log(currElement.innerHTML);

            if(i < 3) document.querySelector('.top3Container').appendChild(currElement);
            else document.querySelector('.leaderboardContainer').appendChild(currElement)
        }
    })
}