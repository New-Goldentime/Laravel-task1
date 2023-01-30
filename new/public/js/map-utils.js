
/**
 * Process each point in a Geometry, regardless of how deep the points may lie.
 * https://developers.google.com/maps/documentation/javascript/examples/layer-data-dragndrop
 */
function processPoints(
    geometry, // : google.maps.LatLng | google.maps.Data.Geometry
    callback, // : any*
    thisArg   // : google.maps.LatLngBounds
) {
    if (geometry instanceof google.maps.LatLng) {
        callback.call(thisArg, geometry);
    } else if (geometry instanceof google.maps.Data.Point) {
        callback.call(thisArg, geometry.get());
    } else {
        // @ts-ignore
        geometry.getArray().forEach((g) => {
            processPoints(g, callback, thisArg);
        });
    }
}

/**
 * Expand bounding box
 *
 * @param bound
 * @param scale
 * @returns {google.maps.LatLngBounds}
 */
function expandBoundBox(bound, scale) {
    let projection = map.getProjection();
    //let nePoint = projection.fromLatLngToPoint(bound.getNorthEast()); // top-right
    let swPoint = projection.fromLatLngToPoint(bound.getSouthWest()); // bottom-left
    let centerPoint = projection.fromLatLngToPoint(bound.getCenter());

    let newNE = new google.maps.Point(centerPoint.x - (centerPoint.x - swPoint.x) * scale, centerPoint.y - (swPoint.y - centerPoint.y) * scale);
    let newSW = new google.maps.Point(centerPoint.x + (centerPoint.x - swPoint.x) * scale, centerPoint.y + (swPoint.y - centerPoint.y) * scale);

    return new google.maps.LatLngBounds(projection.fromPointToLatLng(newNE), projection.fromPointToLatLng(newSW));
}
