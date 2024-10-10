"use client"
import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
// The following import causes issues without type declaration
// @ts-expect-error: maath's random types are not available
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three' // Importing three.js for type support

const StarBackground = (props: JSX.IntrinsicElements['group']) => { // Use appropriate type for props
    const ref = useRef<THREE.Points>(null)
    const [sphere] = useState(() =>
        random.inSphere(new Float32Array(5000), { radius: 1.2 })
    );

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]} {...props}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled
            >
                <PointMaterial
                    transparent
                    color="#fff"
                    size={0.002}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </group>
    )
};

const StarsCanvas = () => (
    <div className='w-full h-full fixed inset-0 z-[20]'>
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <StarBackground />
            </Suspense>
            <Preload all />
        </Canvas>
    </div>
)

export default StarsCanvas
