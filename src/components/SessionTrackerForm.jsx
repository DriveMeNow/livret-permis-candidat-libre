import { useState } from 'react';

export default function SessionTrackerForm() {
  const [sessions, setSessions] = useState([]);

  function ajouterSession(session) {
    setSessions([...sessions, session]);
  }

  return (
    <div>
      {/* Ton formulaire ici avec Tailwind */}
      <table>
        {sessions.map(session => (
          <tr key={session.date}>
            <td>{session.date}</td>
            <td>{session.lieu}</td>
            {/* autres champs */}
          </tr>
        ))}
      </table>
    </div>
  );
}
