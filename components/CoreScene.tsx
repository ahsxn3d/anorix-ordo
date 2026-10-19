"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

const vert = /* glsl */ `
  attribute vec3 aA; attribute vec3 aB; attribute vec3 aC; attribute float aR;
  uniform float uP; uniform float uT;
  varying vec3 vN; varying float vMint; varying float vDepth;
  mat3 rotAxis(vec3 ax, float a){ ax=normalize(ax); float s=sin(a), c=cos(a), oc=1.-c;
    return mat3(oc*ax.x*ax.x+c, oc*ax.x*ax.y+ax.z*s, oc*ax.z*ax.x-ax.y*s,
                oc*ax.x*ax.y-ax.z*s, oc*ax.y*ax.y+c, oc*ax.y*ax.z+ax.x*s,
                oc*ax.z*ax.x+ax.y*s, oc*ax.y*ax.z-ax.x*s, oc*ax.z*ax.z+c); }
  float ease(float t){ return t<.5 ? 4.*t*t*t : 1.-pow(-2.*t+2.,3.)/2.; }
  void main(){
    float d = aR*0.28;
    float t1 = ease(clamp((uP - d)/0.62, 0., 1.));
    float t2 = ease(clamp((uP - 1.05 - d)/0.62, 0., 1.));
    vec3 A = aA + vec3(sin(uT*.35+aR*40.), cos(uT*.3+aR*23.), sin(uT*.25+aR*11.))*0.22;
    // ring: aC = (ringIndex, angle, radius)
    float ri = aC.x; float ang = aC.y + uT*(0.12 + ri*0.035)*(mod(ri,2.)==0.?1.:-1.);
    vec3 ring = vec3(cos(ang)*aC.z, sin(ang*3.+ri)*0.06 + (aR-.5)*0.22, sin(ang)*aC.z);
    float tilt = (ri-1.5)*0.42; ring = rotAxis(vec3(1.,0.,0.2*ri), tilt) * ring;
    vec3 B = aB * (1. + 0.02*sin(uT*1.4 + aR*30.));
    vec3 pos = mix(mix(A, B, t1), ring, t2);
    float spin = (1.-t1)*(aR*12.+uT*.4) + t2*(ang*2.);
    mat3 R = rotAxis(aA + vec3(.3,.7,.1), spin);
    vec3 local = position * mix(1.0, 0.8, t1) * mix(1.0, 0.9, t2);
    vec4 mv = modelViewMatrix * vec4(R*local + pos, 1.0);
    vN = normalize(normalMatrix * (R*normal));
    vMint = step(0.9, aR) * max(t1*0.8, t2) + step(0.985, aR);
    vDepth = clamp(-mv.z/14., 0., 1.);
    gl_Position = projectionMatrix * mv;
  }`;
const frag = /* glsl */ `
  varying vec3 vN; varying float vMint; varying float vDepth;
  uniform vec3 uBase; uniform vec3 uMint; uniform vec3 uBg;
  void main(){
    vec3 L = normalize(vec3(.5,.8,.6));
    float diff = max(dot(vN,L),0.)*.75 + .25;
    float rim = pow(1.-abs(vN.z), 2.5);
    vec3 col = mix(uBase*diff, uMint*(.75+.5*diff), clamp(vMint,0.,1.));
    col += rim*0.18*mix(vec3(.9), uMint, .5);
    col = mix(col, uBg, smoothstep(.35, 1., vDepth)*.75);
    gl_FragColor = vec4(col, 1.);
  }`;

function Swarm({ progress, count }: { progress: MutableRefObject<number>; count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const { geo, mat } = useMemo(() => {
    const g = new THREE.BoxGeometry(0.075, 0.075, 0.075);
    const inst = new THREE.InstancedBufferGeometry().copy(g as unknown as THREE.InstancedBufferGeometry);
    inst.instanceCount = count;
    const A = new Float32Array(count * 3), B = new Float32Array(count * 3), C = new Float32Array(count * 3), R = new Float32Array(count);
    let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      // chaos: wide flattened cloud
      const u = rnd() * Math.PI * 2, r = Math.pow(rnd(), 0.6) * 6.5;
      A.set([Math.cos(u) * r * 1.3, (rnd() - 0.5) * 4.2, Math.sin(u) * r * 0.7 - 1], i * 3);
      // order: fibonacci sphere shell
      const y = 1 - (i / (count - 1)) * 2, rad = Math.sqrt(1 - y * y), th = golden * i, sr = 1.75;
      B.set([Math.cos(th) * rad * sr, y * sr, Math.sin(th) * rad * sr], i * 3);
      // orbit rings
      const ring = i % 4;
      C.set([ring, rnd() * Math.PI * 2, 1.3 + ring * 0.66 + (rnd() - 0.5) * 0.3], i * 3);
      R[i] = rnd();
    }
    inst.setAttribute("aA", new THREE.InstancedBufferAttribute(A, 3));
    inst.setAttribute("aB", new THREE.InstancedBufferAttribute(B, 3));
    inst.setAttribute("aC", new THREE.InstancedBufferAttribute(C, 3));
    inst.setAttribute("aR", new THREE.InstancedBufferAttribute(R, 1));
    const m = new THREE.ShaderMaterial({
      vertexShader: vert, fragmentShader: frag,
      uniforms: { uP: { value: 0 }, uT: { value: 0 }, uBase: { value: new THREE.Color("#b9b7b1") }, uMint: { value: new THREE.Color("#7cffc4") }, uBg: { value: new THREE.Color("#0c0d0f") } },
    });
    return { geo: inst, mat: m };
  }, [count]);

  const smooth = useRef(0);
  useFrame((state, dt) => {
    const target = progress.current * 2.2;
    smooth.current += (target - smooth.current) * Math.min(1, dt * 5);
    mat.uniforms.uP.value = smooth.current;
    mat.uniforms.uT.value = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.06 + smooth.current * 0.9;
      group.current.rotation.x = 0.18 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      const px = state.pointer.x * 0.15, py = state.pointer.y * 0.1;
      group.current.position.x += (px + (size.width > 768 ? 1.1 : 0) - group.current.position.x) * 0.05;
      group.current.position.y += (py + (size.width > 768 ? 0.1 : 0.9) - group.current.position.y) * 0.05;
    }
  });
  return (
    <group ref={group}>
      <mesh geometry={geo} material={mat} ref={mesh as never} frustumCulled={false} />
    </group>
  );
}

function Core({ progress }: { progress: MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(() => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uO: { value: 0 } },
    vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 mv=modelViewMatrix*vec4(position,1.); vN=normalize(normalMatrix*normal); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `varying vec3 vN; varying vec3 vV; uniform float uO; void main(){ float f=pow(1.-max(dot(vN,vV),0.),2.2); gl_FragColor=vec4(vec3(.49,1.,.77)*f*1.4, f*uO); }`,
  }), []);
  useFrame(() => {
    const p = progress.current * 2.2;
    mat.uniforms.uO.value = THREE.MathUtils.smoothstep(p, 0.7, 1.4) * 0.55;
    if (ref.current) ref.current.scale.setScalar(0.6 + THREE.MathUtils.smoothstep(p, 0.7, 2.0) * 0.5);
  });
  return <mesh ref={ref} material={mat}><sphereGeometry args={[1.5, 48, 48]} /></mesh>;
}

function Group({ progress, count }: { progress: MutableRefObject<number>; count: number }) {
  return (<><Swarm progress={progress} count={count} /></>);
}

export default function CoreScene({ progress, running }: { progress: MutableRefObject<number>; running: boolean }) {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={[1, mobile ? 1.5 : 1.75]}
      gl={{ antialias: !mobile, powerPreference: "high-performance", alpha: false }}
      camera={{ position: [0, 0, mobile ? 10.5 : 8], fov: 38 }}
      onCreated={({ gl }) => gl.setClearColor("#0c0d0f")}
    >
      <Group progress={progress} count={mobile ? 1600 : 3600} />
      <group position={[mobile ? 0 : 1.1, mobile ? 0.9 : 0.1, 0]}><Core progress={progress} /></group>
    </Canvas>
  );
}
