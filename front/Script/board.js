function createBoard(element) {
    console.log("createBoard");
    if (element.value < 2) {
        element.value = 2;
    } else if (element.value > 100) {
        element.value = 8;
    }
    let points = []
    let pointsSky = []
    let value = Number(element.value);
    let n = value === 2 ? 8 : value * 2;
    let board = document.getElementById('board');
    let radio = Number(board.width.animVal.value) / 2;
    let carcels = [];
    for (i = 0; i < n; i++) {
        points.push(calculateNextPoint(n, i, radio, radio));
    }
    for (i = 0; i < n / 2; i++) {
        pointsSky.push(calculateNextPoint(n / 2, i, radio / 3, radio, Math.PI / (n)));
        carcels.push([points[i * 2], calculateNextPoint(n / 2, i, radio * (-(Math.sin(Math.PI / (n)) / Math.tan(2 * Math.PI / (n))) + Math.cos(Math.PI / (n))), radio, Math.PI / (n)), points[((i * 2) + 1) % n], calculateNextPoint(n / 2, i, radio, radio, Math.PI / (n))])
    }
    longitud = 2 * radio * Math.sin(Math.PI / n);
    casillaAnchor = longitud / 3;
    board.innerHTML = `
    <polygon points="${points.map(x => `${x.x}, ${x.y}`).join(' ')}"
              style="stroke:purple;stroke-width:1;">
    </polygon>
    <polygon points="${pointsSky.map(x => `${x.x}, ${x.y}`).join(' ')}"
              style="fill:blue;stroke:purple;stroke-width:1;">
    </polygon>    
    ${
        carcels.map(c => `<polygon points="${c.map(x => `${x.x}, ${x.y}`).join(' ')}"
              style="fill:red;stroke:purple;stroke-width:1;">
    </polygon>`).join(' ')
    }
`;
}

function calculateNextPoint(n, step, length, center, fase = 0) {
    return {
        x: center + length * Math.cos((step * 2 * Math.PI / n) + fase),
        y: center + length * Math.sin((step * 2 * Math.PI / n) + fase)
    }
}

var numeroJugadores = numeroJugadores;