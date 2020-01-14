function renderMenu() {
    const div = document.createElement('div');
    const img = document.getElementById('backgroundImg');
    let top = img.clientHeight * 0.5;
    let left = img.clientWidth * 0.5;
    console.log(img.clientWidth)
    console.log(img.clientHeight)
    div.className = 'menu';
    div.id = 'menu';
    div.style.height = '30vh';
    div.style.width = '30vw';
    div.style.position = 'fixed';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.zIndex = '10000';
    div.innerHTML = `
        <div class="menu-item">
            A
        </div>
        <div class="menu-item">
            A
        </div>
        <div class="menu-item">
            A
        </div>
  `;
    div.style.top = (top - vh(15)) + 'px';
    div.style.left = (left - vw(15)) + 'px';
    document.getElementById('appWrapper').appendChild(div);
}

function updateMenuOnResize() {
    const img = document.getElementById('backgroundImg');
    const div = document.getElementById('menu');
    let top = img.clientHeight * 0.5;
    let left = img.clientWidth * 0.5;
    div.style.top = (top - vh(15)) + 'px';
    div.style.left = (left - vw(15)) + 'px';
    console.log(img.clientWidth)
    console.log(img.clientHeight)
}

function vh(v) {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}

function vw(v) {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}