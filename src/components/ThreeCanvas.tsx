import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Support reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create Scene with a subtle background light
    const scene = new THREE.Scene();

    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 24;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Group to hold the entire abstract artwork composition
    const artworkGroup = new THREE.Group();
    scene.add(artworkGroup);

    // 1. Central Glass Tech Sphere / Digital Core
    const sphereGeometry = new THREE.IcosahedronGeometry(4.8, 4);
    
    // Premium physical glass-like material with Apple/Stripe-level refraction
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      roughness: 0.12,
      metalness: 0.05,
      transmission: 0.95, // Frosted refractive glass look
      thickness: 2.2, // Refraction thickness
      ior: 1.48, // Index of refraction for glass
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      sheen: 1.0,
      sheenColor: new THREE.Color("#0EA5E9"), // Soft blue glow rim
      specularIntensity: 1.5,
      specularColor: new THREE.Color("#ffffff")
    });

    const centralGlassCore = new THREE.Mesh(sphereGeometry, glassMaterial);
    artworkGroup.add(centralGlassCore);

    // 2. Inner Glowing Energy Core
    const innerGeometry = new THREE.IcosahedronGeometry(2.4, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    centralGlassCore.add(innerMesh);

    // A tiny solid bright core inside that radiates light
    const tinyCoreGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const tinyCoreMaterial = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.9,
    });
    const tinyCore = new THREE.Mesh(tinyCoreGeometry, tinyCoreMaterial);
    centralGlassCore.add(tinyCore);

    // 3. Floating Technology Elements / Abstract Glass Sheets
    const floatingElementsGroup = new THREE.Group();
    artworkGroup.add(floatingElementsGroup);

    const sheets: { mesh: THREE.Mesh; speed: number; rotSpeed: number; baseOffset: number }[] = [];
    const sheetCount = 6;
    
    // Geometries representing floating modular software layers
    const sheetGeometries = [
      new THREE.BoxGeometry(3.2, 1.8, 0.08), // Horizontal layout panel
      new THREE.BoxGeometry(1.6, 2.6, 0.08), // Vertical layout panel
      new THREE.IcosahedronGeometry(0.7, 1), // Digital block
      new THREE.TorusGeometry(1.5, 0.08, 8, 32) // Connection rings
    ];

    for (let i = 0; i < sheetCount; i++) {
      const geom = sheetGeometries[i % sheetGeometries.length];
      
      const sheetMat = new THREE.MeshPhysicalMaterial({
        color: i % 3 === 0 ? 0x2563eb : i % 3 === 1 ? 0x06b6d4 : 0x8b5cf6,
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        transmission: 0.8,
        thickness: 0.8,
        clearcoat: 0.8,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geom, sheetMat);
      
      // Position them symmetrically around the central core to form a beautiful orbit
      const angle = (i / sheetCount) * Math.PI * 2;
      const radius = 7.5 + Math.random() * 2.0;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 6,
        Math.sin(angle) * radius
      );

      // Random rotation
      mesh.rotation.set(
        Math.random() * 0.4,
        Math.random() * Math.PI,
        Math.random() * 0.4
      );

      floatingElementsGroup.add(mesh);
      sheets.push({
        mesh,
        speed: 0.4 + Math.random() * 0.5,
        rotSpeed: 0.005 + Math.random() * 0.005,
        baseOffset: Math.random() * 100
      });
    }

    // 4. Subtle Connected Digital Nodes (representing software engineering and networks)
    const nodesGroup = new THREE.Group();
    artworkGroup.add(nodesGroup);

    const nodeCount = 30;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeGeometry = new THREE.BufferGeometry();
    const nodeArray: { pos: THREE.Vector3; vel: THREE.Vector3 }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      // Spherically distributed nodes around the core
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 8.5 + Math.random() * 3.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      nodeArray.push({
        pos: new THREE.Vector3(x, y, z),
        vel: new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02)
      });
    }

    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeTexture = createCircleTexture();
    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.42,
      map: nodeTexture,
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    nodesGroup.add(nodePoints);

    // 5. Ambient & Directional Soft Colored Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const blueLight = new THREE.DirectionalLight(0x2563eb, 3.5);
    blueLight.position.set(12, 12, 10);
    scene.add(blueLight);

    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 3.0);
    cyanLight.position.set(-12, -8, 8);
    scene.add(cyanLight);

    const purpleLight = new THREE.SpotLight(0x8b5cf6, 6.0, 35, Math.PI / 4, 0.5, 1);
    purpleLight.position.set(0, 15, 5);
    scene.add(purpleLight);

    // Mouse coordinates tracking for premium parallax depth
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll trigger interaction
    let scrollYOffset = 0;
    const handleScroll = () => {
      scrollYOffset = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Render loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Fluid mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Parallax rotation of the entire artwork based on subtle mouse movement
      artworkGroup.rotation.y = mouse.x * 0.12;
      artworkGroup.rotation.x = mouse.y * 0.12;

      // Slowly rotate the glass sphere crystal and its energy cores
      centralGlassCore.rotation.y = elapsedTime * 0.08;
      centralGlassCore.rotation.z = elapsedTime * 0.04;

      innerMesh.rotation.y = -elapsedTime * 0.15;
      innerMesh.rotation.x = elapsedTime * 0.1;

      // Gently wave/pulse the scale of the glass core
      const pulse = 1.0 + Math.sin(elapsedTime * 1.5) * 0.025;
      centralGlassCore.scale.set(pulse, pulse, pulse);

      // Animate the orbiting software layout sheets
      sheets.forEach((sheet, idx) => {
        sheet.mesh.rotation.x += sheet.rotSpeed;
        sheet.mesh.rotation.y += sheet.rotSpeed * 0.5;

        // Orbit calculation
        const angle = (idx / sheetCount) * Math.PI * 2 + (elapsedTime * 0.04 * sheet.speed);
        const radius = 7.5 + Math.sin(elapsedTime * 0.5 + sheet.baseOffset) * 0.6;
        sheet.mesh.position.x = Math.cos(angle) * radius;
        sheet.mesh.position.z = Math.sin(angle) * radius;
        sheet.mesh.position.y = Math.sin(elapsedTime * 0.3 + sheet.baseOffset) * 2.2;
      });

      // Animate connected node networks
      const positions = nodePoints.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        // Slow drift
        nodeArray[i].pos.add(nodeArray[i].vel);
        
        // Keep them bounded around the core
        const length = nodeArray[i].pos.length();
        if (length > 13.0 || length < 7.0) {
          nodeArray[i].vel.multiplyScalar(-1);
        }

        positions[i * 3] = nodeArray[i].pos.x;
        positions[i * 3 + 1] = nodeArray[i].pos.y;
        positions[i * 3 + 2] = nodeArray[i].pos.z;
      }
      nodePoints.geometry.attributes.position.needsUpdate = true;
      nodePoints.rotation.y = elapsedTime * 0.02;

      // Scroll-driven interactive camera depth transitions (Apple style)
      // As user scrolls, the camera zooms in slightly and objects spread out
      const scrollProgress = Math.min(scrollYOffset / 800, 1.0);
      camera.position.z = 24 - (scrollProgress * 4.5);
      
      // Let the elements spread out as camera gets closer
      floatingElementsGroup.scale.set(1 + scrollProgress * 0.3, 1 + scrollProgress * 0.3, 1 + scrollProgress * 0.3);
      nodesGroup.scale.set(1 + scrollProgress * 0.15, 1 + scrollProgress * 0.15, 1 + scrollProgress * 0.15);

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer (Container responsive fluid rendering)
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    // Cleanup WebGL resources cleanly
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeometry.dispose();
      glassMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      tinyCoreGeometry.dispose();
      tinyCoreMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      nodeTexture.dispose();
      
      sheetGeometries.forEach(g => g.dispose());
      sheets.forEach(s => {
        if (Array.isArray(s.mesh.material)) {
          s.mesh.material.forEach(m => m.dispose());
        } else {
          s.mesh.material.dispose();
        }
      });

      ambientLight.dispose();
      blueLight.dispose();
      cyanLight.dispose();
      purpleLight.dispose();
    };
  }, []);

  // Soft anti-aliased dot texture
  function createCircleTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(255, 255, 255, 0.85)");
      grad.addColorStop(0.5, "rgba(255, 255, 255, 0.25)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  return (
    <div 
      id="three-webgl-artwork"
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden" 
    />
  );
}
