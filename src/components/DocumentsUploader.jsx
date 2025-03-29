// src/components/DocumentsUploader.jsx
export default function DocumentsUploader() {
  return (
    <div className="info-field">
      <label>Ajouter des fichiers :</label>
      <input type="file" multiple />
    </div>
  );
}
