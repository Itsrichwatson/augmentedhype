// -----JS CODE-----
// @input float brushSize {"widget":"slider", "min":0.0, "max":10.0, "step":0.1}
// @input bool advanced
//@ui {"widget":"group_start", "label":"Advanced Properties", "showIf": "advanced"}
// @input Component.MeshVisual brushMesh
// @input Component.Camera perspectiveCamera
//@ui {"widget":"group_end"}

global.touchSystem.touchBlocking = true;
var brushObjectTransform = script.brushMesh.getSceneObject().getTransform();
var currBrushSize = Math.abs((script.brushSize * 50) - 550);

function onTouchStart()
{
    script.brushMesh.enabled = true;
}

function onTouchEnd()
{
    script.brushMesh.enabled = false;
}

function onTouchMove(eventData)
{
    var touchPos = eventData.getTouchPosition();
    var worldPos = script.perspectiveCamera.screenSpaceToWorldSpace(touchPos, currBrushSize);
    
    brushObjectTransform.setWorldPosition(worldPos);
}

var touchStartEvent = script.createEvent("TouchStartEvent");
touchStartEvent.bind(onTouchStart);

var touchMoveEvent = script.createEvent("TouchMoveEvent");
touchMoveEvent.bind(onTouchMove);

var touchEndEvent = script.createEvent("TouchEndEvent");
touchEndEvent.bind(onTouchEnd);
