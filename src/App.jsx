// Exemple dans App.jsx ou composant spécifique
export default function App({ nonce }) {
  return (
    <>
      <style nonce={nonce}>
        {`
          h1 { color: blue; }
        `}
      </style>
      <h1>Bienvenue sur DriveMeNow</h1>
    </>
  );
}
