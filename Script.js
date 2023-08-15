//@input SceneObject target
//@input vec3 aimVector
//@input vec3 upVector
//@input vec3 worldUpVector
//@input quat offsetRotation

var event = script.createEvent("UpdateEvent");

function onUpdate(eventData) {
    if (script.target) {
        // Get the position of the target and the camera
        var targetPos = script.target.getTransform().getWorldPosition();
        var cameraPos = script.getSceneObject().getTransform().getWorldPosition();

        // Calculate the look direction
        var lookDir = targetPos.sub(cameraPos);

        // Calculate the right direction
        var rightDir = lookDir.cross(script.upVector).normalize();

        // Calculate the up direction
        var upDir = rightDir.cross(lookDir).normalize();

        // Calculate the forward direction
        var forwardDir = lookDir.normalize();

        // Calculate the rotation matrix
        var rotMatrix = new mat3(rightDir.x, upDir.x, -forwardDir.x,
                                 rightDir.y, upDir.y, -forwardDir.y,
                                 rightDir.z, upDir.z, -forwardDir.z);

        // Convert the matrix to a quaternion
        var rotQuaternion = quat.fromMat3(rotMatrix);

        // Apply the offset rotation
        rotQuaternion.mul(script.offsetRotation);

        // Set the rotation of the camera
        script.getSceneObject().getTransform().setWorldRotation(rotQuaternion);
    }
}

event.bind(onUpdate);
