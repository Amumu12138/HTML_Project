export default function () {
    var point = { x: 0, y: 0 }

    document.body.onmousedown = function (event) {
        var event = event || window.event;
        console.log('Amumu event -->', event)
        point.x = event.pageX;
        point.y = event.pageY;
    }
    console.log('Amumu point -->', point)
    return point;
}