const listsModule = (function () {
  const courses = [
    "Acordeon",
    "Baixo acústico e elétrico",
    "Bateria",
    "Canto Popular",
    "Cavaquinho",
    "Flauta doce e transversa",
    "Guitarra",
    "Harmônica de boca",
    "Percussão",
    "Piano",
    "Saxofone",
    "Teatro",
    "Teclado",
    "Técnica Vocal",
    "Trompete",
    "Ukulele",
    "Viola",
    "Violão",
    "Violino",
    "Harmonia aplicada a MPB",
    "Teoria Musical",
    "Preparação para a prova específica da UFRGS",
  ];

  const musicStyles = [
    "Blues",
    "Bossa Nova",
    "Choro",
    "Clássica",
    "Fado",
    "Gospel",
    "Hip Hop",
    "Indie",
    "Jazz",
    "K-pop",
    "MPB",
    "Punk",
    "Reggae",
    "Rock",
    "Salsa",
    "Samba",
    "Sertanejo",
    "Tango",
    "Forró",
  ];

  const teacher = ["Rosana Marques", "Gustavo Strapazon", "Eric Nelsis"];

  const howDidYouFindUs = [
    "Instagram",
    "Facebook",
    "Site da escola",
    "Eventos da Escola",
    "Rádio",
    "TV",
    "Familia/Amigos",
  ];

  return {
    courses: courses,
    musicStyles: musicStyles,
    teacher: teacher,
    howDidYouFindUs: howDidYouFindUs,
  };
})();

export default listsModule;
