/**
 * @author Elijah Sawyers <elijahsawyers@gmail.com>
 */

 import Canvas from './Canvas';
 import CanvasImage from './Canvas/CanvasImage';
 import CanvasPoint from './Canvas/CanvasPoint';

(function main() {
    /** HTMLCanvasElement used for drawing. */
    const canvasHTMLElement = <HTMLCanvasElement>document.getElementById('PDFCanvas');
    canvasHTMLElement.width = (<HTMLDivElement>canvasHTMLElement.parentElement).clientWidth;
    canvasHTMLElement.height = canvasHTMLElement.width/2;

    /** Toolbar point button, used to switch the canvas state to 'drawingPoints'. */
    const pointButton = <HTMLDivElement>document.getElementById('point');

    /** Toolbar point button, used to switch the canvas state to 'drawingConnections'. */
    const connectionsButton = <HTMLDivElement>document.getElementById('line');

    /** Toolbar trash button, used to delete points from the canvas. */
    const trashButton = <HTMLDivElement>document.getElementById('trash');

    /** The image to be drawn onto the canvas. */
    const image = new CanvasImage('../assets/images/chalkboard.png');

    /** Manages a HTMLCanvasElement, used for drawing an image, points, and connections. */
    const canvas = new Canvas(canvasHTMLElement, image);

    /*
     * Resizes the canvas when the window is resized.
     *
     * Grab the current transform of the canvas' ctx, change the canvas' width and height,
     * set the transform to the grabbed transfrom, and redraw the canvas.
     */
    window.onresize = () => {
        const transform = canvas.ctx.getTransform();

        canvasHTMLElement.width = (<HTMLDivElement>canvasHTMLElement.parentElement).clientWidth;
        canvasHTMLElement.height = canvasHTMLElement.width/2;

        canvas.ctx.setTransform(
            transform.a,
            transform.b,
            transform.c,
            transform.d,
            transform.e,
            transform.f,
        );
        canvas.redraw();
    };
})();

// /* 
//     Setup mousemove event listenter.
//     Used for panning and storing the cursor's location.
// */
// canvas.onmousemove = (e) => {
//     // Store the cursor's location each time it moves.
//     cursorLocation.x = e.offsetX;
//     cursorLocation.y = e.offsetY;

//     // If the cursor is over the trashcan, restyle it.
//     if ((cursorLocation.x >= canvas.width - 50 && cursorLocation.x <= canvas.width - 10) && (cursorLocation.y >= 10 && cursorLocation.y <= 50)) {
//         trashcan.style.background = '#B22222';
//         trashcan.style.color = '#fff';
//     } else {
//         trashcan.style.background = '#fff';
//         trashcan.style.color = '#4A5056';
//     }

//     // If the mouse is clicked and the state is 'panning,' pan the canvas.
//     if (e.which == 1 && state == states.panning) {
//         /* 
//             Translate the origin of the grid by the result of dividing movement by scale.
//             Diving by the scale causes the panning speed to be slower the more that you zoom in.
//         */
//         ctx.translate(e.movementX / ctx.getTransform().a, e.movementY / ctx.getTransform().d);

//         // Redraw the canvas.
//         redraw(ctx, png, points);
//     }

//     // If a point is being grabbed, don't pan; instead, move the point by the mouse movement.
//     if (latched) {
//         // Set the curser to indicate a point is grabbed.
//         canvas.style.cursor = 'grabbing';
        
//         /* 
//             Move the latched point by the result of dividing the mouse movement by scale.
//             Diving by the scale causes the movement speed to be slower the more that you zoom in.
//         */
//         latchedPoint.point.updateLocation(latchedPoint.point.x + (e.movementX / ctx.getTransform().a), latchedPoint.point.y + (e.movementY / ctx.getTransform().d));

//         // Redraw the canvas.
//         redraw(ctx, png, points);
//     }

//     // If a first point has been clicked while in 'drawingLines' state, draw a line to the cursor.
//     if (firstPointClicked != null) {
//         // Redraw the canvas.
//         redraw(ctx, png, points);

//         // Draw a line to the cursor.
//         let cursorGrid = canvasPointToGridPoint(ctx, cursorLocation.x, cursorLocation.y);
//         ctx.beginPath();
//         ctx.moveTo(firstPointClicked.x, firstPointClicked.y);
//         ctx.lineTo(cursorGrid.x, cursorGrid.y);
//         ctx.strokeStyle = 'red';
//         ctx.stroke();
//     }
// }

// /*
//     Setup mousewheel event listener.
//     Used for zooming.
// */
// canvas.onmousewheel = (e) => {
//     // Set the curser to indicate zoom.
//     canvas.style.cursor = 'ns-resize';

//     // Zoom in.
//     if (e.deltaY > 0) {
//         // Grab the mouse x and y value before scaling.
//         let mouseBeforeScale = canvasPointToGridPoint(ctx, cursorLocation.x, cursorLocation.y);

//         // Scale the grid.
//         ctx.scale(1.05, 1.05);

//         // Grab the mouse x and y value after scaling.
//         let mouseAfterScale = canvasPointToGridPoint(ctx, cursorLocation.x, cursorLocation.y);

//         // Translate by the displacement of the mouse's location.
//         ctx.translate(mouseAfterScale.x - mouseBeforeScale.x, mouseAfterScale.y - mouseBeforeScale.y);

//         // Redraw the canvas.
//         redraw(ctx, png, points);

//         // If a first point has been clicked while in 'drawingLines' state, draw a line to the cursor.
//         if (firstPointClicked != null) {
//             // Redraw the canvas.
//             redraw(ctx, png, points);

//             // Draw a line to the cursor.
//             let cursorGrid = canvasPointToGridPoint(ctx, cursorLocation.x, cursorLocation.y);
//             ctx.beginPath();
//             ctx.moveTo(firstPointClicked.x, firstPointClicked.y);
//             ctx.lineTo(cursorGrid.x, cursorGrid.y);
//             ctx.strokeStyle = 'red';
//             ctx.stroke();
//         }
//     }
//     // Zoom out.
//     else if (e.deltaY < 0) {
//         // Grab the mouse x and y value before scaling.
//         let mouseBeforeScale = canvasPointToGridPoint(ctx, cursorLocation.x, cursorLocation.y);

//         // Scale the grid.
//         ctx.scale(0.95, 0.95);

//         // Grab the mouse x and y value after scaling.
//         let mouseAfterScale = canvasPointToGridPoint(ctx, cursorLocation.x, cursorLocation.y);

//         // Translate by the displacement of the mouse's location.
//         ctx.translate(mouseAfterScale.x - mouseBeforeScale.x, mouseAfterScale.y - mouseBeforeScale.y);

//         // Redraw the canvas.
//         redraw(ctx, png, points);

//         // If a first point has been clicked while in 'drawingLines' state, draw a line to the cursor.
//         if (firstPointClicked != null) {
//             // Redraw the canvas.
//             redraw(ctx, png, points);

//             // Draw a line to the cursor.
//             let cursorGrid = canvasPointToGridPoint(ctx, cursorLocation.x, cursorLocation.y);
//             ctx.beginPath();
//             ctx.moveTo(firstPointClicked.x, firstPointClicked.y);
//             ctx.lineTo(cursorGrid.x, cursorGrid.y);
//             ctx.strokeStyle = 'red';
//             ctx.stroke();
//         }
//     }

//     // Use a timer to determine if zooming has stopped, and if so, set the curser to indicate zooming has stopped.
//     if(scrollingTimer !== null) {
//         clearTimeout(scrollingTimer);        
//     }
//     scrollingTimer = setTimeout(function() {
//         if (state == states.panning) {
//             canvas.style.cursor = 'grab';
//         } else {
//             canvas.style.cursor = 'pointer';
//         }
//     }, 100);
// }

// /*
//     Setup mousedown event listener.
//     Used for drawing points and dragging points.
// */
// canvas.onmousedown = (e) => {
//     // Calculate the mouse pointer's location in the grid's coordinate system.
//     let cursorGridPoint = canvasPointToGridPoint(ctx, cursorLocation.x, cursorLocation.y);

//     // If the state is 'panning,' set the curser to indicate panning.
//     if (state == states.panning) {
//         canvas.style.cursor = 'grabbing';
//     } 

//     // If the state is 'drawingPoints:'
//     if (state == states.drawingPoints) {
//         // Determine if the clicked mouse point contains a point, if so, latch onto the point...
//         for (let i = 0; i < points.length; i++) {
//             if (cursorGridPoint.x <= points[i].x + 5 && cursorGridPoint.x >= points[i].x - 5) {
//                 if (cursorGridPoint.y <= points[i].y + 5 && cursorGridPoint.y >= points[i].y - 5) {
//                     latched = true;
//                     latchedPoint.point = points[i];
//                     latchedPoint.index = i;
//                     return;
//                 }
//             }
//         }
//         // ...otherwise, create a new point at that location, and draw it.
//         let newPoint = new Point(ctx, cursorGridPoint.x, cursorGridPoint.y);
//         points.push(newPoint);
//         newPoint.draw(ctx);
//     }

//     // If the state is 'drawingLines:'
//     if (state == states.drawingLines) {
//         // Determine if the clicked mouse point contains a point, if so, set if it's the first or second point clicked...
//         for (let i = 0; i < points.length; i++) {
//             if (cursorGridPoint.x <= points[i].x + 5 && cursorGridPoint.x >= points[i].x - 5) {
//                 if (cursorGridPoint.y <= points[i].y + 5 && cursorGridPoint.y >= points[i].y - 5) {
//                     // If a first point hasn't been clicked, set it as the first point clicked.
//                     if (firstPointClicked == null) {
//                         firstPointClicked = points[i];
//                     }
//                     // Otherwise, set the second point clicked, and draw the line.
//                     else {
//                         // Ensure not trying to connect to first point.
//                         if (points[i] === firstPointClicked) {
//                             return;
//                         }

//                         // Ensure a connection between these points doesn't already exist...
//                         for (let k = 0; k < connections.length; k++) {
//                             if (firstPointClicked === connections[k].a ||  firstPointClicked === connections[k].b) {
//                                 if (points[i] === connections[k].a ||  points[i] === connections[k].b) {
//                                     // ...if so, don't add a new connection; instead, just reset the first point clicked.
//                                     firstPointClicked = null;
//                                     return;
//                                 }
//                             }
//                         }

//                         // Store the connection.
//                         connections.push(new Connection(firstPointClicked, points[i]));

//                         // Update both points to visually show that they're connected.
//                         firstPointClicked.fill = true;
//                         points[i].fill = true;

//                         /*
//                             Add connection only to the first point for drawing.
//                             This eleminates drawing the connection twice.
//                         */
//                         firstPointClicked.addConnection(points[i]);

//                         // Redraw the canvas.
//                         redraw(ctx, png, points);

//                         // Reset the first point clicked.
//                         firstPointClicked = null;
//                     }
//                 }
//             }
//         }
//     }
// }

// /*
//     Setup mouseup event listener.
//     Used for drawing or deleting points.
// */
// canvas.onmouseup = (e) => {
//     // If the cursor is released over the trashcan while latched onto a point, delete it.
//     if (cursorLocation.x >= canvas.width - 50 && cursorLocation.x <= canvas.width - 10) {
//         if (cursorLocation.y >= 10 && cursorLocation.y <= 50) {
//             if (latched) {
//                 // Remove the point from the points array.
//                 points.splice(latchedPoint.index, 1);

//                 // Remove all connections from storage that include the deleted point.
//                 for (let i = 0; i < connections.length; i++) {
//                     if (connections[i].a === latchedPoint.point || connections[i].b === latchedPoint.point) {
//                         connections.splice(i, 1);
//                         i = 0;
//                     }
//                 }

//                 // Redraw the canvas.
//                 redraw(ctx, png, points, latchedPoint.point, latchedPoint.index);
//             }
//         }
//     }

//     // If the state is 'panning,' reset the cursor so that it's no longer grabbing.
//     if (state == states.panning) {
//         canvas.style.cursor = 'grab';
//     }
//     /* 
//         If the state is 'drawingPoints,' reset the cursor so that it's no longer grabbing, 
//         reset latched point, and indicate that you're no longer latched. 
//     */
//     else if (state == states.drawingPoints) {
//         canvas.style.cursor = 'pointer';
//         latched = false;
//         latchedPoint.point = null;
//         latchedPoint.index = null;
//     }
// }

// /*
//     Setup mouseleave event listener.
//     Used for reseting misc. styles.
// */
// canvas.onmouseleave = (e) => {
//     if (state == states.drawingPoints) {
//         latched = false;
//         canvas.style.cursor = 'pointer';
//     }
//     trashcan.style.background = '#fff';
//     trashcan.style.color = '#4A5056';
// }

// /*
//     Setup pointButton onclick event listener.
//     Used for changing state.
// */
// pointButton.onclick = (e) => {
//     if (state != states.drawingPoints) {
//         state = states.drawingPoints;
//         canvas.style.cursor = 'pointer';
//         pointButton.style.background = '#71815f'
//         pointButton.style.color = '#fff'
//         lineButton.style.background = '#fff'
//         lineButton.style.color = '#4A5056'
//     } else {
//         state = states.panning;
//         canvas.style.cursor = 'grab';
//         pointButton.style.background = '#fff'
//         pointButton.style.color = '#4A5056'
//     }
// }

// /*
//     Setup lineButton onclick event listener.
//     Used for changing state.
// */
// lineButton.onclick = (e) => {
//     if (state != states.drawingLines) {
//         state = states.drawingLines;
//         canvas.style.cursor = 'pointer';
//         lineButton.style.background = '#71815f'
//         lineButton.style.color = '#fff'
//         pointButton.style.background = '#fff'
//         pointButton.style.color = '#4A5056'
//     } else {
//         state = states.panning;
//         canvas.style.cursor = 'grab';
//         lineButton.style.background = '#fff'
//         lineButton.style.color = '#4A5056'
//     }
// }

// /*
//     Setup delete key event listener.
//     Used for removing first clicked point when drawing lines.
// */
// window.onkeydown = (e) => {
//     if (e.keyCode == 8 || e.keyCode == 127) {
//         firstPointClicked = null;
//         redraw(ctx, png, points);
//     }
// }
