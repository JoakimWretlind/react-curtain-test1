import React, { useRef, useState } from "react";
import { Plane, useCurtains } from "react-curtains";
import { Vec2 } from "curtainsjs";
import { vertexShader, fragmentShader } from "../Shaders/shaders";
// css in globalstyle

function SimplePlane() {
    const [plane, setPlane] = useState(null);
    // Vec2 is the class used for all 2 dimensions vector manipulations
    const mousePosition = useRef(new Vec2());
    const mouseLastPosition = useRef(new Vec2());

    const deltas = useRef({
        max: 0,
        applied: 0
    });

    const uniforms = {
        resolution: {
            // resolution of the plane
            name: "uResolution",
            type: "2f", // the length of 2 arrays of floats
            value: [0, 0]
        },
        time: {
            // time uniform that will be updated at each draw call
            name: "uTime",
            type: "1f",
            value: 0
        },
        mousePosition: {
            // mouse position
            name: "uMousePosition",
            type: "2f", // again an array of floats
            value: mousePosition.current
        },
        mouseMoveStrength: {
            // mouse move strength
            name: "uMouseMoveStrength",
            type: "1f",
            value: 0
        }
    };

    useCurtains(
        (curtains) => {
            const onMouseMove = (e) => {
                // update mouse last pos
                mouseLastPosition.current.copy(mousePosition.current);

                const mouse = new Vec2();

                // get mouse/touch position
                if (e.targetTouches) {
                    mouse.set(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
                } else {
                    mouse.set(e.clientX, e.clientY);
                }

                // lerp the mouse position a bit to smoothen the overall effect
                mousePosition.current.set(
                    curtains.lerp(mousePosition.current.x, mouse.x, 0.3),
                    curtains.lerp(mousePosition.current.y, mouse.y, 0.3)
                );

                // calculate the mouse move strength
                if (mouseLastPosition.current.x && mouseLastPosition.current.y) {
                    let delta =
                        Math.sqrt(
                            Math.pow(
                                mousePosition.current.x - mouseLastPosition.current.x,
                                2
                            ) +
                            Math.pow(
                                mousePosition.current.y - mouseLastPosition.current.y,
                                2
                            )
                        ) / 30;
                    delta = Math.min(4, delta);
                    // update max delta only if it increased
                    if (delta >= deltas.current.max) {
                        deltas.current.max = delta;
                    }
                }

                if (plane) {
                    // update mouse position uniform
                    plane.uniforms.mousePosition.value = plane.mouseToPlaneCoords(
                        mousePosition.current
                    );
                }
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("touchmove", onMouseMove, { passive: true });

            return () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("touchmove", onMouseMove, { passive: true });
            };
        },
        [plane]
    );

    const setResolution = (plane) => {
        const planeBBox = plane.getBoundingRect();
        plane.uniforms.resolution.value = [planeBBox.width, planeBBox.height];
    };

    const onReady = (plane) => {
        plane.setPerspective(35);

        deltas.current.max = 2;

        setResolution(plane);

        setPlane(plane);
    };

    const onRender = (plane) => {
        // increment time uniform
        plane.uniforms.time.value++;

        // decrease both deltas by damping : if the user doesn't move the mouse, effect will fade away
        deltas.current.applied +=
            (deltas.current.max - deltas.current.applied) * 0.5;
        deltas.current.max += (0 - deltas.current.max) * 0.1;

        // send the new mouse move strength value
        plane.uniforms.mouseMoveStrength.value = deltas.current.applied;
    };

    const onAfterResize = (plane) => {
        setResolution(plane);
    };

    return (
        <Plane
            className="SimplePlane"
            // plane init parameters
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            widthSegments={20}
            heightSegments={20}
            uniforms={uniforms}
            // plane events
            onReady={onReady}
            onRender={onRender}
            onAfterResize={onAfterResize}
        >
            <img
                src="https://unsplash.it/1920/1080?random=1"
                data-sampler="simplePlaneTexture"
                alt=""
            />
        </Plane >
    );
}

export default SimplePlane;
