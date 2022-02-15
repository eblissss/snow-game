import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Torus } from "@react-three/drei";
import SimplexNoise from "simplex-noise";

const simplex = new SimplexNoise();

const dir = new THREE.Vector3(0, 1, 0);
const centroid = new THREE.Vector3(0, 0, 0);
const plane = new THREE.Plane();
plane.setFromNormalAndCoplanarPoint(dir, centroid).normalize();

const raycaster = new THREE.Raycaster();
const intersect = new THREE.Vector3();

function Player(props: JSX.IntrinsicElements["mesh"]) {
    const ref = useRef<THREE.Mesh>(null!);

    const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));

    const { camera, mouse } = useThree();

    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0));

    useFrame((state, delta) => {
        ref.current.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            plane.normal
        );

        // Raycast onto plane
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, intersect);

        const t = state.clock.getElapsedTime();
        intersect.y =
            0.2 + simplex.noise3D(intersect.x * 2, intersect.z * 2 - t, 0) / 2;

        // lerp
        const lerp = new THREE.Vector3().copy(position).multiplyScalar(1 - 0.1);
        lerp.add(new THREE.Vector3().copy(intersect).multiplyScalar(0.1));

        // Drop check?
        if (position.y - lerp.y > 0.1) {
            lerp.y = position.y - 0.1;
        }

        // Side check
        if (lerp.x > 7 || lerp.x < -7) {
            lerp.copy(position);
        }
        // Top check
        if (lerp.z > 10 || lerp.z < -13) {
            lerp.copy(position);
        }

        setPosition(lerp);
    });

    return (
        <mesh {...props} ref={ref} position={position}>
            <Torus args={[1, 0.4, 20, 20]}>
                <meshStandardMaterial color="slategray" />
            </Torus>
        </mesh>
    );
}

export default Player;
