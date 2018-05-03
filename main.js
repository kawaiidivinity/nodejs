//=============================================
//Script by Marlon Martine B2B Ingesup
//Le script permet de recupérer le code source d'une page web via l'api axios
//et si on le shouaite la récupérer dans un fichier script.txt.
//Requierement : npm install readline, axiosn, inquirer
//=============================================


//On appel l'api axios pour communiquer avec notre site web
const request = require('axios');

//on import fs pour ecrire dans un fichier
const fs = require('fs');

//On appel la fonction readline pour lire l'argument de l'utilisateur car plus
//manouvrable que inquirer et ses prompt input de plus il fait la fonction
//commander a lui seul.
const readline = require('readline');

//on import inquirer pour le sondage
'use strict';
var inquirer = require('inquirer');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var mark = "#SCRIPT BY MARLON MARTINE#"

//On demande une url a l'utilisateur sinon on lance le script sur notre base url de test
rl.question('Le programme recupère le script d\'un site internet.\nDonner une url personnel ? (Oui/Non)\n', (reponse) => {
  if (reponse == 'oui' && 'Oui') {
    //si oui on demande l'url a l'utilisateur
    rl.question('Le programme recupère le script d un site internet.\nDonner une url : ', (url) => {
      request.get(url)
      .then(function (response) {
        console.log(response.data);
        //on demande si il veut ecrire dans un fichier
        rl.question('Ecrire le script dans un fichier ? (Oui/Non)\n', (save) => {
          //si oui on ecrit dans un fichier script.txt
          if (save == 'oui' && 'Oui') {
            fs.writeFile('script.txt', response.data, function (err) {
                if (err) throw err;
                var logger = fs.createWriteStream('script.txt', {
                flags: 'a'
                  })
                  //on oublie pas d'ajouter la trace de notre script
                  logger.write('\n')
                  logger.write(mark)
                  console.log('Le script est sauvegarder dans le fichier script.txt merci d\'avoir utiliser mon script !');
                  sondage();
                  //rl.close();
                  });
          }
          else {
            //fin du programme pour une url perso
            console.log('Merci d\'avoir utiliser mon script !');
            sondage();
            //rl.close();
          }
        });
      })

      .catch(function (error) {
        console.log(error);
        //rl.close();
      })
  });
  }
  else {
    url = 'https://nodejsmarlon.000webhostapp.com/headers.html'
    request.get(url)
    .then(function (response) {
      console.log(response.data);
      //on demande si il veut ecrire dans un fichier
      rl.question('Ecrire le script dans un fichier ? (Oui/Non)\n', (save) => {
        //si oui on ecrit dans un fichier script.txt
        if (save == 'oui' && 'Oui') {
          fs.writeFile('script.txt', response.data, function (err) {
              if (err) throw err;
              var logger = fs.createWriteStream('script.txt', {
              flags: 'a'
                })
                //on oublie pas d'ajouter la trace de notre script
                logger.write('\n')
                logger.write(mark)
                console.log('Le script est sauvegarder dans le fichier script.txt merci d\'avoir utiliser mon script !');
                sondage();
                //rl.close();
                });
        }
        else {
          //fin du programme pour une url de base
          console.log('Merci d\'avoir utiliser mon script !');
          sondage();
          //rl.close();
        }
      });
    })

    .catch(function (error) {
      console.log(error);
      //rl.close();
    })
  }
});

function sondage() {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Please Select Review of my program :',
        name: 'sondage',
        choices: [
          new inquirer.Separator(' = Choices = '),
          {
            name: 'Bad'
          },
          {
            name: 'Good'
          }
        ],
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one answer';
          }
          return true;
        }
      }
    ])
    .then(answers => {
        console.log("Thanks you for the review!")
    });
}
