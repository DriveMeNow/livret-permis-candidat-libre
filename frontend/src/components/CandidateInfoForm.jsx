// src/components/CandidateInfoForm.jsx
export default function CandidateInfoForm() {
  return (
    <form>
      <div className="info-field">
        <label>Nom du candidat :</label>
        <input type="text" required />
      </div>
      <div className="info-field">
        <label>Prénom du candidat :</label>
        <input type="text" required />
      </div>
      <div className="info-field">
        <label>Date de naissance :</label>
        <input type="date" required />
      </div>
      {/* ajoute les autres champs exactement de la même façon */}
      <div className="info-field neph-boxes">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="neph-box">
            <input type="text" maxLength="1" pattern="[0-9]" />
          </div>
        ))}
      </div>

      <div className="photo-placeholder">
        <span>Ajouter une photo</span>
        <input type="file" accept="image/*" required />
      </div>

      <button className="btn" type="submit">Envoyer</button>
    </form>
  );
}
