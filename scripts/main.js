// scripts/main.js

// fonctions globales :
function hideAllSections() { /* code existant */ }
function activateFirstTocLink(sectionId) { /* code existant */ }

// Événements navigation sidebar :
document.getElementById('menuButton').addEventListener('click', () => { /* code existant */ });

// Sidebar navigation clicks
document.getElementById('coverPageBtn').addEventListener('click', e => { /* code existant */ });
// etc. pour chaque lien sidebar...

// Initialisation au chargement :
window.addEventListener('load', () => {
    
  initAutocomplete();
  initDocuments();
  // Autres initialisations globales
});
