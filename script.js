const tableauPays = [ "France", "Espagne", "Chine", "Italie", "Turquie", "Angleterre", "Allemagne", "Malaisie", "Autriche", "Russie", "Ukraine", "Canada",
  "Grece", "Pologne", "Singapour", "Mexique", "Croatie", "Maroc", "Egypte", "Danemark", "Suisse", "Tunisie", "Indonesie", "Belgique", "Portugal",
  "Inde", "Japon", "Vietnam", "Irlande", "Bulgarie", "Australie", "Argentine", "Bresil", "Suede", "Syrie", "Finlande" ];

const tableauAnimaux = [ "Chien", "Chat", "Hamster", "Lapin", "Poisson", "Pingouin", "Ours", "Phoque", "Morse", "Elephant", "Sauterelle", "Criquet", "Meduse", "Requin", 
  "Cerf", "Baleine", "Girafe", "Singe", "Crocodile", "Tigre", "Lion", "Rhinoceros", "Zebre", "Mouton", "Chevre", "Coque", "Dauphin", "Raie", "Poule", 
  "Canard", "Cheval", "Vache", "Cochon", "Renard", "Sanglier", "Tortue", "Loup", "Herisson", "Araignee", "Moustique", "Coccinelle", "Limace", "Escargot" ];

const tableauSport = [ "Course", "Natation", "Cyclisme", "Randonnee", "Fitness", "Handball", "Football", "Rugby", "Basketball", "Hockey", "Volleyball",
  "Tennis", "Badminton", "Gymnastique", "Yoga", "Danse", "Judo", "Boxe", "MMA", "Karate", "Ski", "Snowboard", "Skateboard", "Golf", "Aviron", "Surf", "Kayak",
  "Curling", "Escrime", "Nage", "Patinage", "Plongeon", "Voile", "Escalade", "Lutte", "Trampoline", "Baseball", "Bobsleigh" ];

const tableauLegumes = [ "Ail", "Artichaut", "Asperge", "Aubergine", "Avocat", "Bette", "Betterave", "Blette", "Brocoli", "Carotte", "Celeri", "Champignon",
  "Choux", "Citrouille", "Concombre", "Courge", "Endive", "Epinard", "Fenouil", "Flageolet", "Haricot", "Salade", "Mais", "Navet", "Oignon", "Olive",
  "Patate", "Poireau", "Poivron", "Potimarron", "Potiron", "Radis", "Rhubarbe", "Rutabaga", "Salsifi", "Tomate", "Topinambour" ];

var boutonlancement, boutonPays, boutonAnimaux, boutonSports, boutonLegumes, boutonLocalStorage, titreMotCache, tableauOccurences;
var choixTheme, consignetheme, titreJeu, saisieMot, div1, div2, titresacaLettres, motMystere, motCache, lettre, comparaison, result, contains, tentativesRatees;
var tempsfin, tempsdepart, tempspartie, saisiepseudo;
var indexOf = [];
var sacaLettres = [];
var top10 = [];
var top10JSON;

init(top10);
boutoninit();

function jouer(theme) {

  $("div[id='Themes']").remove();

  div1 = $("<div>").attr('id','divTexte');
  $(document.body).append(div1);
  div2 = $("<div>").attr('id','divDessin');
  $(document.body).append(div2);

  motMystere = retournerMot(theme);
  tableauOccurences = [];
  tentativesRatees = 0;
  tempsdepart = Date.now();
  sacaLettres = ["Lettres saisies : "];

  titreJeu = $('<h1>');
  $(titreJeu).html('LE JEU DU PENDU');
  $(div1).append(titreJeu);

  titreMotCache = $('<h2>').attr('id','motCache');
  motCache = cacherMot(motMystere);
  $(titreMotCache).html(motCache);
  $(div1).append(titreMotCache);

  saisieMot = $('<input>').attr('id','saisieMot');
  saisieMot.attr('type','text');
  saisieMot.attr('maxlength','1');
  saisieMot.attr('placeholder','ici');
  $(div1).append(saisieMot);

  titresacaLettres = $('<p>');
  $(div1).append(titresacaLettres);

  $(saisieMot).change(function(event){
    lettre = this.value;
    contains = motMystere.includes(lettre);

    if (contains){
        indexOf = [];
        let pos = 0;
        for (let index = 0 ; index < motMystere.length ; index ++){
          if (motMystere.charAt(index) === lettre){
            indexOf[pos] = index;
            pos++;
          }
        };
        
        for (let index = 0 ; index < indexOf.length; index ++){
          pos = indexOf[index];
          motCache[pos] = lettre;
        };

        $(titreMotCache).html(motCache);

        if ((motCache.includes("_ ") == false))
          gagner();
    }
    if (!contains){
      tentativesRatees++;
      afficherPendu(tentativesRatees);
    }
    sacaLettres.push(lettre);
    $(titresacaLettres).html(sacaLettres.join(" "));
  })
}
  

function boutoninit(){

  var boutonlancement = $('<button>').attr('id','jouer');
  $(boutonlancement).html('JOUER');
  $(document.body).append(boutonlancement);
  $(boutonlancement).click(function(event){
    $('#jouer').remove();
    choisirTheme();
  })
}

function choisirTheme() {
  choixTheme = $('<div>').attr('id','Themes');
  $(document.body).append(choixTheme);

  consignetheme = $('<h2>');
  $(consignetheme).html('A propos de quel thème souhaitez-vous jouer ?');
  $(choixTheme).append(consignetheme);

  boutonPays = $('<button>').attr('id','Pays');
  $(boutonPays).html('PAYS');
  $(choixTheme).append(boutonPays);
  $(boutonPays).click(function(event){
    jouer(tableauPays);
  })

  boutonAnimaux = $('<button>').attr('id','Animaux');
  $(boutonAnimaux).html('ANIMAUX');
  $(choixTheme).append(boutonAnimaux);
  $(boutonAnimaux).click(function(event){
    jouer(tableauAnimaux);
  })

  boutonSports = $('<button>').attr('id','Sports');
  $(boutonSports).html('SPORTS');
  $(choixTheme).append(boutonSports);
  $(boutonSports).click(function(event){
    jouer(tableauSport);
  })

  boutonLegumes = $('<button>').attr('id','Legumes');
  $(boutonLegumes).html('LEGUMES');
  $(choixTheme).append(boutonLegumes);
  $(boutonLegumes).click(function(event){
    jouer(tableauLegumes);
  })

}

function retournerMot(tableau){
  var motMystere = tableau[Math.floor(Math.random() * tableau.length)];
  return motMystere.toLowerCase();
}

function cacherMot(mot){
  result = [];
  for (let index = 0; index < mot.length; index++)
    result[index] = "_ ";
  return result;
}

function afficherPendu(compteur){
  var pied = $('<img>');
  $(pied).attr({id : 'pied', src : 'pieddepoutre.png', width : 120, height : 20});
  $('#divDessin').append(pied);
  $(pied).hide();

  var poutreverticale = $('<img>');
  $(poutreverticale).attr({id : 'poutreverticale', src : 'poutreverticale.png', width : 20, height : 250});
  $('#divDessin').append(poutreverticale);
  $(poutreverticale).hide();
  
  var chevron = $('<img>');
  $(chevron).attr({id : 'chevron', src : 'chevron.png', width : 60, height : 60});
  $('#divDessin').append(chevron);
  $(chevron).hide();

  var poutrehaut = $('<img>');
  $(poutrehaut).attr({id : 'poutrehaut', src : 'poutrehaut.png', width : 150, height : 20});
  $('#divDessin').append(poutrehaut);
  $(poutrehaut).hide();

  var corde = $('<img>');
  $(corde).attr({id : 'corde', src : 'corde.png', width : 15, height : 90});
  $('#divDessin').append(corde);
  $(corde).hide();

  var corps = $('<img>');
  $(corps).attr({id : 'corps', src : 'corps.png', width : 50, height : 60});
  $('#divDessin').append(corps);
  $(corps).hide();

  var jambes = $('<img>');
  $(jambes).attr({id : 'jambes', src : 'jambes.png', width : 40, height : 50});
  $('#divDessin').append(jambes);
  $(jambes).hide();

  var brasgauche = $('<img>');
  $(brasgauche).attr({id : 'brasgauche', src : 'brasgauche.png', width : 10, height : 45});
  $('#divDessin').append(brasgauche);
  $(brasgauche).hide();

  var brasdroit = $('<img>');
  $(brasdroit).attr({id : 'brasdroit', src : 'brasdroit.png', width : 10, height : 45});
  $('#divDessin').append(brasdroit);
  $(brasdroit).hide();

  var tete = $('<img>');
  $(tete).attr({id : 'tete', src : 'tete.png', width : 35, height : 35});
  $('#divDessin').append(tete);
  $(tete).hide();

  if (compteur == 1)
    $(pied).show();

  if (compteur == 2){
    $(poutreverticale).show();
    $(chevron).show();
  }

  if (compteur == 3)
    $(poutrehaut).show();

  if (compteur == 4){
    $(corde).show();
    $(tete).show();
  }

  if (compteur == 5)
    $(corps).show();

  if (compteur == 6)
    $(jambes).show();
  
  if (compteur == 7){
    $(brasgauche).show();
    $(brasdroit).show();
    var perdu = $('<h2>').html("Vous avez perdu ! Le mot était "+motMystere+".");
    $('#divTexte').append(perdu);
    $('#saisieMot').remove();

    boutonsdeFin();
  }
}

function gagner() {
  $('h2').attr('id','motCache').html("Bravo ! Vous avez trouvé le mot ' "+motMystere+" ' en faisant "+tentativesRatees+" erreurs");
  tempsfin = Date.now();

  var finpartie = tempsfin.valueOf();
  var debutpartie = tempsdepart.valueOf();

  tempspartie = finpartie - debutpartie;

  $('input').attr('id', 'motCache').remove();

  if (tentativesRatees < top10[9].score && tempspartie < top10[9].temps)
    enregistrerdansTop10();
}

function init(tableau) {
  for (let index = 0; index < 10 ; index++)
    tableau[index] = { "name" : "---", "temps" : 1000000, "score" : 7 };
}

function enregistrerdansTop10() {
    var divtop10 = document.createElement("div");
    divtop10.setAttribute("id","divtop10");
    document.body.appendChild(divtop10);

    var felicitations = document.createElement("h1");
    felicitations.innerHTML="Felicitations vous êtes dans le top 10 !";
    divtop10.appendChild(felicitations);

    var pseudo = document.createElement("h2");
    pseudo.innerHTML="Votre pseudo svp ?";
    divtop10.appendChild(pseudo);

    var inputpseudo = document.createElement("input");
    inputpseudo.setAttribute('id','pseudo');
    inputpseudo.setAttribute('placeholder','ici');
    divtop10.appendChild(inputpseudo);

    inputpseudo.onchange = function(event) {
      saisiepseudo = this.value;
      top10[9].name = String(saisiepseudo);
      top10[9].temps = tempspartie;
      top10[9].score = tentativesRatees;

      top10.sort(function(a, b) {
        if (a.score - b.score != 0)
          return a.score - b.score;
        else return a.temps - b.temps
        }); 

      inputpseudo.parentNode.removeChild(inputpseudo);
      pseudo.innerHTML="";

      div1 = document.getElementById('divTexte');
      var arrayDiv1 = div1.childNodes;
      arrayDiv1[0].innerHTML = "Que souhaitez-vous faire maintenant "+saisiepseudo+" ?";
      
      var titreh2 = arrayDiv1[1];
      titreh2.parentNode.removeChild(titreh2);

      divtop10.parentNode.removeChild(divtop10);
      
      top10JSON = JSON.stringify(top10);
      localStorage.setItem("top10",top10JSON);
      boutonsdeFin();
    };
}

function boutonsdeFin() {

      divboutons = document.createElement("div");
      divboutons.id="divboutons";
      document.body.appendChild(divboutons);

      boutonrejouer = document.createElement("button");
      boutonrejouer.innerHTML="Rejouer";
      divboutons.appendChild(boutonrejouer);
      boutonrejouer.onclick=rejouer;
      
      boutonquitter = document.createElement("button");
      boutonquitter.innerHTML="Quitter";
      divboutons.appendChild(boutonquitter);
      boutonquitter.onclick=quitter;

      boutonLocalStorage = document.createElement("button");
      boutonLocalStorage.id ="localStorage";
      boutonLocalStorage.innerHTML="Copier le top 10 (localStorage) dans le presse-papiers";
      divboutons.appendChild(boutonLocalStorage);
      boutonLocalStorage.onclick=extraireLocalStorage;

      boutonclassement = document.createElement("button");
      boutonclassement.id="boutonClassement";
      boutonclassement.innerHTML="Afficher classement";
      divboutons.appendChild(boutonclassement);
      boutonclassement.onclick = function(event){
        genererTableau();
        var b = document.getElementById("boutonClassement");
        b.parentNode.removeChild(b);
      }
}

function genererTableau() {
  var table = document.createElement("table");
  table.id="table";
  document.body.appendChild(table);

  var tr = document.createElement("tr");
  table.appendChild(tr);
  tr.id="enteteTable";

  var td1 = document.createElement("td");
  tr.appendChild(td1);
  td1.innerHTML="Rang";
  var td2 = document.createElement("td");
  tr.appendChild(td2);
  td2.innerHTML="Nom";
  var td3 = document.createElement("td");
  tr.appendChild(td3);
  td3.innerHTML="Temps";
  var td4 = document.createElement("td");
  tr.appendChild(td4);
  td4.innerHTML="Score";

  for (let index1 = 0; index1 < 10; index1++){
    var tr = document.createElement("tr");
    table.appendChild(tr);
    for (let index2 = 0; index2 < 4; index2++){
      var td = document.createElement("td");
      tr.appendChild(td);

      if (index2 == 0)
        td.innerHTML=""+(index1+1);
      if(index2 == 1)
        td.innerHTML=""+top10[index1].name;
      if(index2 == 2)
      td.innerHTML=""+top10[index1].temps;
      if(index2 == 3)
      td.innerHTML=""+top10[index1].score;
    }
  }

  var divDessin = document.getElementById("divDessin");
  divDessin.parentNode.removeChild(divDessin);
}

function rejouer() {
  tentativesRatees = 0;

  while (document.body.hasChildNodes()){
    document.body.removeChild(document.body.firstChild);
  };

  choisirTheme();
}

function extraireLocalStorage() {
  var ls = localStorage.getItem("top10");
  var ls10 = JSON.parse(ls);
  copy(ls10);

  var divlocalStorage = document.getElementById("localStorage");
  divlocalStorage.parentNode.removeChild(divlocalStorage);
}

function quitter(){
  while (document.body.hasChildNodes()){
    document.body.removeChild(document.body.firstChild);
  }
  document.write("Au revoir et peut-être à bientôt !");
}