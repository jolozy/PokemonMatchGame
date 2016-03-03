$(function() {
  console.log("Everything is ready. Let's go!");

//landing page: shows rules and ok button
  $('#player1Choice').hide();
  $('#player2Choice').hide();
  $('#fightButton1').hide();
  $('#fightButton2').hide();
  $('#fightButton1').hide();
  $('#restart1').hide();
  $("#restart2").hide();
  $('.startButton').hide();
  $(".placeholder").append("<p><br><br>Rules:<br><br>First to faint loses.<br><br>WATER > FIRE > GROUND > ELECTRIC <br><br>WARNING: SOME OF YOUR OWN ATTACKS CAN DAMAGE YOU TOO. BE CAREFUL!<br><br>Press POTION to regain HP. Use only once.<p>");

//click ok and shows pokemons for Player1 to choose
  $('#okButton').on('click',function(event)
  {
    $('#player1Choice').show();
    $('#player2Choice').hide();
    $('#fightButton1').hide();
    $('#fightButton2').hide();
    $('.startButton').show();
    $(".placeholder p:nth-of-type(2)").hide();
    $('#okButton').hide();
    $('.HPmeter1').hide();
    $('.HPmeter2').hide();
  })

  //PLAYER 1 CHOOSES
  $('#player1Choice .img').on('click',function(event) //attach click event to pokemon imgs
  {
    $('#player1Choice .img').removeClass("imgChosen"); //removes CSS class imgChosen which makes it black
    $(this).addClass("imgChosen"); //adds CSS class back to imgChosen and makes it black

    var selected = event.currentTarget.alt;//registers which pokemon was clicked = referencing its alt property
    for(i=0;i<pokemon.length;i++)
    {
      if(pokemon[i].name == event.currentTarget.alt) //matches the index in pokemon array to what was clicked
      {
        player1 = pokemon[i]; //equates player1 to that pokemon object clicked
      }
    }
    alert("Player 1 has chosen "+selected+"!"); //pops up Player has selected pokemon upon click
    $(this).removeClass("imgChosen"); //removes CSS class imgChosen again for Player to choose
    $('#player1Choice').hide(); //hides #player1Choice div
    $('#player2Choice').show(); //shows #player1Choice div
    //insert my player1 choice = pokemon2 into game function here
  })

  //PLAYER 2 CHOOSES
  $('#player2Choice .img').on('click',function(event) //attach click event to pokemon imgs
  {
    $('#player2Choice .img').removeClass("imgChosen"); //removes CSS class imgChosen which makes it black
    $(this).addClass("imgChosen"); //adds CSS class back to imgChosen and makes it black
    var selected = event.currentTarget.alt; //currentTarget is a property of this element that you have clicked on. Creating a variable for selected because you want to reference to it later in the alert
    for(i=0;i<pokemon.length;i++)
    {
      console.log(event.currentTarget.alt);
      console.log(pokemon[i].name);
      if(pokemon[i].name == event.currentTarget.alt)
      {
        player2 = pokemon[i];

      }
    }
    alert("Player 2 has chosen "+selected+"!"); //pops up Player has chosen pokemon xx upon click
  })

//PRESS START and confirm pokemon choices for both players
$('.startButton').on('click',function() //attach click event to pokemon imgs
{
  $('#player1Choice').hide();
  $('#player2Choice').hide();
  $(".placeholder").append("<p>Player 1, choose your move<p>");
  $('.startButton').hide();
  $('#fightButton1').show();
  $('.img').hide();//hides all pokemons to choose
  $("#restart1").show();
  $("#restart1").click(function() {
  location.reload();
  });

  $('.pokeImg1 img').each(function(i,single) //function that loops through all the pokemon images
  {
    console.log(single);
    if (single.alt == player1.name) //check and if the images in the array has the same alt(i.e. name) as the player.name that you click i.e. returns true
    {
      $(single).css({
      width: '120px',
      height: 'auto'
    }); //then make it bigger
    }
    else
    {
      $(single).hide(); //for every image in the array that is NOT, i.e. false, hide it
    }
  })
  $('#pokeName1').text(player1.name); //change to player1 name
  $('#pokeEle1').text(player1.type); //change to player1 type
  $('#HPLife1').text(player1.hp +"/100"); //change to player1 hp

  $('.pokeImg2 img').each(function(i,single)
  {
    console.log(player2.name);
    if (single.alt == player2.name)
    {
      $(single).css({
      width: '120px',
      height: 'auto'
      });
    }
    else
    {
      $(single).hide();
    }
  })
  $('#pokeName2').text(player2.name);
  $('#pokeEle2').text(player2.type);
  $('#HPLife2').text(player2.hp +"/100");


  for (i=0; i<player1.skills.length; i++) //SELECT SKILL TO MATCH SKILL & ATTACK: loop through the array of player1.skills
    {

      var div = $('<div>').addClass("skills1"); //create a variable div and add the class "skills" (the skills of the player)
      div.append(player1.skills[i].name); //go to player1's skill[index looped].name and append it to div
      $('.placeholder').append(div) //select placeholder and append div to it
    }
    $('.placeholder .skills1').addClass('skillDeco');
    $('.placeholder .skills1').on('click', selectSkill);

    function selectSkill (event)
    {
      $(this).toggleClass('skillDecoActive');
      // console.log(event);
      console.log("hi");
      skillSelected = event.currentTarget.innerText;
      console.log(event.currentTarget.innerText);
      console.log(skillSelected);
    }
})

// PRESS FIGHT Button 1 AFTER CONFIRMING SKILL FOR PLAYER 1
$('#fightButton1').on('click',function()
{
  game.round(player1,player2,skillSelected);
  game.getWinner(player1,player2);
  $('.skills1').hide();
  $(".placeholder p").hide();
  $(".placeholder").append("<p><br>Player 2, choose your move<p>");
  $('#fightButton1').hide();
  $('#fightButton2').show();

  for (i=0; i<player2.skills.length; i++) //loop through the array of player2.skills
    {
      var div = $('<div>').addClass("skills2"); //create a variable div and add the class "skills" (the skills of the player)
      div.append(player2.skills[i].name); //go to player2's skill[index looped].name and append it to div
      $('.placeholder').append(div) //select placeholder and append div to it
    }
    $('.placeholder .skills2').addClass('skillDeco');
    $('.placeholder .skills2').on('click', selectSkill);
    function selectSkill (event)
    {
      $(this).toggleClass('skillDecoActive');//skillDecoActive is a CSS style that states what will happen to whatever it is applied to
      skillSelected = event.currentTarget.innerText; //so my function will always be assigned to the innertext property of my toggle event
    }
})

// PRESS FIGHT Button 2
$('#fightButton2').on('click',function()
{
    game.round(player2,player1,skillSelected);
    game.getWinner(player2,player1);

    $('.skills2').hide();
    $(".placeholder p").hide();
    $(".placeholder").append("<p><br>Player 1, choose your move<p>");
    $('#fightButton2').hide();
    $('#fightButton1').show();

    for (i=0; i<player1.skills.length; i++) //loop through the array of player2.skills
      {

        var div = $('<div>').addClass("skills1"); //create a variable div and add the class "skills" (the skills of the player)
        div.append(player1.skills[i].name); //go to player2's skill[index looped].name and append it to div
        $('.placeholder').append(div) //select placeholder and append div to it
      }
      $('.placeholder .skills1').addClass('skillDeco');
      $('.placeholder .skills1').on('click', selectSkill);
      function selectSkill (event)
      {
        $(this).toggleClass('skillDecoActive');
          skillSelected = event.currentTarget.innerText;
      }
})

//PRESS POTION: takes in the click and on click, add 40HP
$("#potionButton1").on('click', function()
{
  player1.hp += 50;
  $('#HPLife1').html(player1.hp + "/100");
  console.log(player1.hp);
  $("#potionButton1").hide();
})

$("#potionButton2").on('click', function()
{
  player2.hp += 50;
  $('#HPLife2').html(player2.hp + "/100");
  console.log(player2.hp);
  $("#potionButton2").hide();
})



})//end

var skillSelected;
var player1;
var player2;
var pokemon = [];
var game = new Game();


function Game ()
{
    this.fight = function (player1, player2) {
        while (player1.hp > 0 || player2.hp > 0) {
            round();//Game function will continue to loop while players are both still alive
        }
    };

    var player = true;

    this.round = function (attacker, defender, a) { //where you pass the attacker, defender and a (selected/clicked on skill)

        var dmg;
        for (var i=0; i<attacker.skills.length; i++) {
          if (a == attacker.skills[i].name)//find dmg if clicked skill matches name of attacker's skills
          {
            dmg = attacker.skills[i].dmg;
          }
        }
        if (multipier(attacker, defender) === true ) {

            defender.hp =  defender.hp - Math.floor(((Math.random()+1)*dmg));
            attacker.hp -= 5;
            // console.log(defender.hp);
            // console.log(attacker.hp);
        }
        else {
            defender.hp -= dmg;
        }

          updateHp(attacker, defender);
          console.log(attacker);
          console.log(defender);
    };

    this.getWinner = function (player1, player2) //takes in player1.hp and player2.hp. if 0, $().append status text and add restart button (reload)
    {
      console.log(player1);
      console.log(player2);
      if (player1.hp <= 0 && player2.hp > 0) {
        console.log("player2 wins!");
        $(".placeholder").hide();
        $("potionButton1").hide();
        $("potionButton2").hide();
        $(".container > div:nth-of-type(2)").add("p").html(player1.name + " FAINTED and " + player2.name + " WINS!");
        $("#restart2").show();
        $("#restart2").click(function() {
        location.reload();
        });
      } else if (player2.hp <= 0 && player1.hp > 0) {
        $(".placeholder").hide();
        $("potionButton1").hide();
        $("potionButton2").hide();
        $(".container > div:nth-of-type(2)").add("p").html(player2.name + " FAINTED and " + player1.name + " WINS!");
        $("#restart2").show();
        $("#restart2").click(function() {
        location.reload();
        });
      } else if (player2.hp <= 0 && player1.hp <= 0) {
        $(".placeholder > div").hide();
        $("potionButton1").hide();
        $("potionButton2").hide();
        $(".container > div:nth-of-type(2)").add("p").html("It's a draw!");
        $("#restart2").show();
        $("#restart2").click(function() {
        location.reload();
        });
      }
    }

    var updateHp = function (def, att)
    {
      if(player)
      {
        $('#HPLife1').html(def.hp + "/100");
        $('#HPLife2').html(att.hp + "/100");
      }
      else {
        $('#HPLife1').html(att.hp + "/100");
        $('#HPLife2').html(def.hp + "/100");
      }
        player = !player;

    }

    var multipier = function (attacker, defender) {
        var result = (attacker.weight - defender.weight);//to check for combinations when multiplier gets activated (1 and -3);based on G(4) > E(3) > W(2) > F(1), it should get activated whenever 4-3=1, 3-2=1, 2-1=1, 1-4=-3
        if (result === 1 || result === -3) {
            return true;
        } else
        return false;
    };
}

// outside class
function Pokemon(name, hp, type, weight, skills, image)
{
  this.name = name;
  this.hp = hp;
  this.type = type;
  this.weight = weight;
  this.skills = skills;
}
//G(4) > E(3) > W(2) > F(1)

var maroskills =
[
    {
      name: "Headbutt",
      dmg: 40
    },
    {
      name: "Fling",
      dmg: 10
    },
    {
      name: "Bonemerang",
      dmg: 50
    },
    {
      name: "Rage",
      dmg: 15
    }
];
var marowak = new Pokemon("Marowak", 100, "ground", 4, maroskills);
pokemon.push(marowak); //pushing the marowak objet to pokemon array

var pikaskills =
[
    {
      name: "ElectroBall",
      dmg: 50
    },
    {
      name: "Spark",
      dmg: 10
    },
    {
      name: "Thunderbolt",
      dmg: 40
    },
    {
      name: "Growl",
      dmg: 15
    }
];
var pikachu = new Pokemon("Pikachu", 100, "lightning", 3, pikaskills);
// console.log(pikaskills.ElectroBall.dmg); //returns 25
// console.log(pikachu.skills.ElectroBall.dmg); //returns 25
pokemon.push(pikachu);

var seaskills =
[
    {
      name: "HydroPump",
      dmg: 50
    },
    {
      name: "Smokescreen",
      dmg: 15
    },
    {
      name: "Twister",
      dmg: 40
    },
    {
      name: "Splash",
      dmg: 10
    }
];
var seadra = new Pokemon("Seadra", 100, "water", 2, seaskills);
pokemon.push(seadra);

var charskills =
[
    {
      name: "Fireball",
      dmg: 50
    },
    {
      name: "Heatwave",
      dmg: 10
    },
    {
      name: "FirePunch",
      dmg: 40
    },
    {
      name: "Snore",
      dmg: 15
    }
];
var charmeleon = new Pokemon("Charmeleon", 100, "fire", 1, charskills);
pokemon.push(charmeleon);

var dragoskills =
[
    {
      name: "Hyperbeam",
      dmg: 50
    },
    {
      name: "Wrap",
      dmg: 10
    },
    {
      name: "ThunderWave",
      dmg: 40
    },
    {
      name: "Slam",
      dmg: 15
    }
];
var dragonair = new Pokemon("Dragonair", 100, "dragon", 0, dragoskills);
pokemon.push(dragonair);
