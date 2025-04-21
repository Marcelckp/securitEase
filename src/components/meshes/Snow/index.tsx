export const SnowWeatherVisual = () => {
  // You can expand this to show different visuals based on weatherType
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
};
