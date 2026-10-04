import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeRotorSceneProps {
  className?: string;
}

export const ThreeRotorScene: React.FC<ThreeRotorSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Main Rotor Assembly Group
    const rotorGroup = new THREE.Group();
    scene.add(rotorGroup);

    // 1. Friction Disc (outer brake ring with center cutout)
    // Custom geometry: ring extruded with bevel
    const discShape = new THREE.Shape();
    discShape.absarc(0, 0, 2.5, 0, Math.PI * 2, false);
    const discHole = new THREE.Path();
    discHole.absarc(0, 0, 1.5, 0, Math.PI * 2, true);
    discShape.holes.push(discHole);

    const extrudeSettings = {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02
    };

    const discGeometry = new THREE.ExtrudeGeometry(discShape, extrudeSettings);
    discGeometry.center();

    const discMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8dadc,
      metalness: 0.9,
      roughness: 0.28,
      flatShading: false
    });

    const discMesh = new THREE.Mesh(discGeometry, discMaterial);
    rotorGroup.add(discMesh);

    // 2. Hub / Hat (center bell)
    const hubGeometry = new THREE.CylinderGeometry(1.48, 1.48, 0.45, 48);
    const hubMaterial = new THREE.MeshStandardMaterial({
      color: 0x24272a,
      metalness: 0.85,
      roughness: 0.35
    });
    const hubMesh = new THREE.Mesh(hubGeometry, hubMaterial);
    hubMesh.rotation.x = Math.PI / 2;
    hubMesh.position.z = 0.15;
    rotorGroup.add(hubMesh);

    // Hub center bore
    const boreGeometry = new THREE.CylinderGeometry(0.55, 0.55, 0.5, 32);
    const boreMaterial = new THREE.MeshStandardMaterial({
      color: 0x111213,
      metalness: 0.9,
      roughness: 0.5
    });
    const boreMesh = new THREE.Mesh(boreGeometry, boreMaterial);
    boreMesh.rotation.x = Math.PI / 2;
    boreMesh.position.z = 0.16;
    rotorGroup.add(boreMesh);

    // 3. Lug Bolts / Holes around hub (5-lug pattern)
    const boltGroup = new THREE.Group();
    const boltGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 6);
    const boltMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8cad0,
      metalness: 0.95,
      roughness: 0.2
    });

    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const bolt = new THREE.Mesh(boltGeometry, boltMaterial);
      bolt.position.set(Math.cos(angle) * 1.0, Math.sin(angle) * 1.0, 0.38);
      bolt.rotation.x = Math.PI / 2;
      boltGroup.add(bolt);
    }
    rotorGroup.add(boltGroup);

    // 4. Slots / Grooves on the Rotor Friction Ring
    const slotsGroup = new THREE.Group();
    const slotGeometry = new THREE.BoxGeometry(0.04, 0.65, 0.04);
    const slotMaterial = new THREE.MeshStandardMaterial({
      color: 0x33363b,
      metalness: 0.6,
      roughness: 0.7
    });

    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI * 2) / 16;
      const slot = new THREE.Mesh(slotGeometry, slotMaterial);
      slot.position.set(Math.cos(angle) * 2.0, Math.sin(angle) * 2.0, 0.08);
      slot.rotation.z = angle + 0.35;
      slotsGroup.add(slot);
    }
    rotorGroup.add(slotsGroup);

    // 5. Performance Brake Caliper (fixed, clamped over rotor on top-right)
    const caliperGroup = new THREE.Group();
    const caliperBodyGeom = new THREE.BoxGeometry(1.1, 2.1, 0.65);
    const caliperMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a0011, // BARAKO Signature Crimson Red
      metalness: 0.6,
      roughness: 0.28
    });
    const caliperMesh = new THREE.Mesh(caliperBodyGeom, caliperMaterial);
    caliperMesh.position.set(1.95, 1.25, 0.15);
    caliperMesh.rotation.z = -0.55;
    caliperGroup.add(caliperMesh);

    // Caliper metallic accent bar / pistons
    const pistonGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16);
    const pistonMat = new THREE.MeshStandardMaterial({
      color: 0xd8dadc,
      metalness: 0.95,
      roughness: 0.2
    });
    for (let p = -0.4; p <= 0.4; p += 0.4) {
      const piston = new THREE.Mesh(pistonGeom, pistonMat);
      piston.position.set(2.0 + p * 0.4, 1.45 + p * 0.7, 0.45);
      piston.rotation.x = Math.PI / 2;
      caliperGroup.add(piston);
    }

    scene.add(caliperGroup);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainDirectional = new THREE.DirectionalLight(0xffffff, 2.2);
    mainDirectional.position.set(5, 5, 6);
    scene.add(mainDirectional);

    const coolRimLight = new THREE.DirectionalLight(0x7da4d4, 1.4);
    coolRimLight.position.set(-6, -4, 3);
    scene.add(coolRimLight);

    // Sweeping Red Laser Spotlight across Rotor
    const redLaserLight = new THREE.PointLight(0xff1e32, 4.5, 8);
    redLaserLight.position.set(-3, 0, 2);
    scene.add(redLaserLight);

    // Initial orientation
    rotorGroup.rotation.x = 0.22;
    rotorGroup.rotation.y = -0.32;
    caliperGroup.rotation.x = 0.22;
    caliperGroup.rotation.y = -0.32;

    // Mouse & Scroll Tracking
    let targetRotX = 0.22;
    let targetRotY = -0.32;
    let scrollDelta = 0;
    let lastScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = -0.32 + x * 0.55;
      targetRotX = 0.22 - y * 0.45;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDelta += (currentScrollY - lastScrollY) * 0.003;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous smooth rotation + scroll impulse
        rotorGroup.rotation.z += 0.008 + scrollDelta;
        scrollDelta *= 0.94; // dampen scroll inertia

        // Smooth mouse tilt easing
        rotorGroup.rotation.x += (targetRotX - rotorGroup.rotation.x) * 0.05;
        rotorGroup.rotation.y += (targetRotY - rotorGroup.rotation.y) * 0.05;
        caliperGroup.rotation.x = rotorGroup.rotation.x;
        caliperGroup.rotation.y = rotorGroup.rotation.y;

        // Sweeping red light motion across disc face
        const sweepPhase = (Math.sin(elapsedTime * 1.2) + 1) * 0.5;
        redLaserLight.position.x = -3.2 + sweepPhase * 6.4;
        redLaserLight.position.y = Math.cos(elapsedTime * 1.5) * 1.8;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      discGeometry.dispose();
      discMaterial.dispose();
      hubGeometry.dispose();
      hubMaterial.dispose();
      boreGeometry.dispose();
      boreMaterial.dispose();
      boltGeometry.dispose();
      boltMaterial.dispose();
      slotGeometry.dispose();
      slotMaterial.dispose();
      caliperBodyGeom.dispose();
      caliperMaterial.dispose();
      pistonGeom.dispose();
      pistonMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[380px] lg:min-h-[460px] flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-label="3D Interactive Ventilated Brake Rotor"
    >
      {/* Decorative Red Laser Flare Beam Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-[#8a0011]/35 to-transparent blur-xl animate-laser-sweep pointer-events-none" />
      </div>
    </div>
  );
};

export default ThreeRotorScene;
