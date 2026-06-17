// Calcul automatique des dates d'atelier : le 2ème samedi de chaque mois.
// Aucune date n'est saisie à la main — elles roulent toutes seules à chaque build.

const MOIS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

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
      dates.push({
        day: d.getDate(),
        month: month0 + 1, // 1-12 (aligné sur la saisie CMS)
        year: d.getFullYear(),
        monthName: MOIS_FR[month0],
      });
    }
    month0 += 1;
    if (month0 > 11) {
      month0 = 0;
      year += 1;
    }
  }
  return dates;
}
