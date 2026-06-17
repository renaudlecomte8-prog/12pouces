// Aide à l'agenda des ateliers.
// Les dates sont gérées librement au CMS (n'importe quel jour). En l'absence de
// dates saisies, on propose automatiquement les prochains 2èmes samedis (filet de sécurité).

const MOIS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const JOURS_FR = [
  'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi',
];

const pad = (n) => String(n).padStart(2, '0');

// Décompose une date ISO "YYYY-MM-DD" en éléments d'affichage FR.
// Parsing manuel pour éviter tout décalage de fuseau horaire.
export function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  const dt = new Date(year, month - 1, day);
  return {
    iso,
    day,
    month, // 1-12
    year,
    monthName: MOIS_FR[month - 1],
    weekday: JOURS_FR[dt.getDay()],
  };
}

// Renvoie le 2ème samedi d'un mois donné (year, month0 = 0-11).
function secondSaturday(year, month0) {
  const first = new Date(year, month0, 1);
  // 6 = samedi. Décalage jusqu'au 1er samedi, puis +7 jours.
  const firstSaturday = 1 + ((6 - first.getDay() + 7) % 7);
  return new Date(year, month0, firstSaturday + 7);
}

// Renvoie les `count` prochains 2èmes samedis à venir (à partir d'aujourd'hui inclus).
export function nextSecondSaturdays(count = 3, from = new Date()) {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const dates = [];
  let year = today.getFullYear();
  let month0 = today.getMonth();

  while (dates.length < count) {
    const d = secondSaturday(year, month0);
    if (d >= today) {
      dates.push(`${d.getFullYear()}-${pad(month0 + 1)}-${pad(d.getDate())}`);
    }
    month0 += 1;
    if (month0 > 11) {
      month0 = 0;
      year += 1;
    }
  }
  return dates;
}
