function verify(){
var amount = parseFloat(document.getElementById("amount").value);

  if(isNaN(amount)){
    alert("The Amount Entered is not a number")
  }
  else{
    var payment = document.getElementsByName('payment');

    for (var i = 0; i < payment.length; i++) {
      if(payment[i].checked){
        switch (payment[i].id ) {

            case "weekly":weekly(amount);
            break;
            case "monthly": monthly(amount);
            break;
            case "annually": annually(amount);
            break;


        }
      }
    }
  }
}

function weekly(amount){

  let weekly = amount.toFixed(2);
  let monthly = (amount*4).toFixed(2);
  let annually = (monthly*12).toFixed(2);

  var gross = document.getElementsByClassName("gross");
  gross[1].innerHTML = "$" + weekly;
  gross[2].innerHTML = "$" + monthly;
  gross[3].innerHTML = "$"  + annually;

  net(paye(monthly), health(monthly),  nis(weekly), monthly);


}

function monthly(amount){
  let weekly = (amount/4).toFixed(2);
  let monthly = (amount).toFixed(2);
  let annually = (monthly*12).toFixed(2);

  var gross = document.getElementsByClassName("gross");
  gross[1].innerHTML = "$" + weekly;
  gross[2].innerHTML = "$" + monthly;
  gross[3].innerHTML = "$"  + annually;

  net(paye(monthly), health(monthly),  nis(weekly), monthly);
}

function annually(amount){

  let monthly = (amount/12).toFixed(2);
  let annually = amount.toFixed(2);
  let weekly = (monthly/4).toFixed(2);

  var gross = document.getElementsByClassName("gross");
  gross[1].innerHTML = "$" + weekly;
  gross[2].innerHTML = "$" + monthly;
  gross[3].innerHTML = "$"  + annually;

  net(paye(monthly), health(monthly),  nis(weekly), monthly);
}

function paye(monthly){
let mPaye = 0;
let aPaye;
  if(monthly>6000){
    mPaye = (monthly-6000)*0.25;
  }
aPaye = mPaye*12;

var paye = document.getElementsByClassName("paye");
paye[1].innerHTML = "$" + (mPaye/4).toFixed(2);
paye[2].innerHTML = "$" + (mPaye).toFixed(2);
paye[3].innerHTML = "$"  + (aPaye).toFixed(2);

return mPaye;

}

function health(monthly){
let weekly = 4.80;
if(monthly>469.99){
weekly = 8.25;
}
let mHealth = weekly*4;
let aHealth = mHealth*12;
var health = document.getElementsByClassName("health");
health[1].innerHTML = "$" + (weekly).toFixed(2);
health[2].innerHTML = "$" + (mHealth).toFixed(2);
health[3].innerHTML = "$"  + (aHealth).toFixed(2);

return mHealth;

}

function nis(weekly){
let wNis = (weekly/100)*13.2;
let mNis = wNis*4;
let aNis = mNis*12;


var nis = document.getElementsByClassName("nis");
nis[1].innerHTML = "$" + (wNis).toFixed(2);
nis[2].innerHTML = "$" + (mNis).toFixed(2);
nis[3].innerHTML = "$"  + (aNis).toFixed(2);

return mNis;

}

function net(mPaye, mHealth, mNis, amount){

mNet = amount - (mPaye, mHealth, mNis);
wNet = mNet/4;
aNet= mNet*12;
var net = document.getElementsByClassName("net");
net[1].innerHTML = "$" + (wNet).toFixed(2);
net[2].innerHTML = "$" + (mNet).toFixed(2);
net[3].innerHTML = "$"  + (aNet).toFixed(2);

}
