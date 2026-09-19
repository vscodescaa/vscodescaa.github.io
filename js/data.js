/**
 * data.js
 * -----------------------------------------------------------------------
 * Fuente única de verdad para todo lo que cambia con el tiempo:
 * año actual, semestre en curso, años "Building since", copyright, etc.
 *
 * Edita SOLO este archivo cuando quieras actualizar fechas relativas.
 * El resto del sitio (ver js/main.js -> applyDynamicData) las inserta
 * automáticamente en cada elemento con [data-dynamic="clave"].
 * -----------------------------------------------------------------------
 */

const CV_DATA = (() => {
  const now = new Date();
  const currentYear = now.getFullYear();

  // --- Config editable ---------------------------------------------------

  // Año en que Ángel empezó a construir software.
  const buildingSinceYear = 2024;

  // Fecha de inicio de la carrera en el Tec (para calcular el semestre).
  // Semestres de Tec: Ago-Dic (otoño) y Ene-May (primavera).
  const degreeStartYear = 2026;
  const degreeStartMonth = 8; // agosto

  // Rango de años que dura la carrera (para el año de graduación mostrado).
  const degreeDurationYears = 4;

  // --- Cálculo de semestre actual ----------------------------------------

  function currentSemesterNumber() {
    const monthsSinceStart =
      (now.getFullYear() - degreeStartYear) * 12 +
      (now.getMonth() + 1 - degreeStartMonth);

    if (monthsSinceStart < 0) return 0;

    // Cada semestre académico dura ~6 meses.
    return Math.floor(monthsSinceStart / 6) + 1;
  }

  function ordinal(n) {
    const specials = ["Zeroth","First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth","Tenth"];
    return specials[n] || `${n}th`;
  }

  const semesterNumber = currentSemesterNumber();
  const semesterNumberPadded = String(Math.max(semesterNumber, 1)).padStart(2, "0");
  const semesterLabel = semesterNumber > 0
    ? `Currently completing my ${ordinal(semesterNumber).toLowerCase()} semester in Robotics and Digital Systems Engineering.`
    : "Starting my Robotics and Digital Systems Engineering degree soon.";

  return {
    currentYear,
    buildingSinceYear,
    yearsBuilding: currentYear - buildingSinceYear,
    degreeStartYear,
    degreeEndYear: degreeStartYear + degreeDurationYears,
    semesterNumber,
    semesterNumberPadded,
    semesterOrdinal: ordinal(semesterNumber),
    semesterLabel,
  };
})();
