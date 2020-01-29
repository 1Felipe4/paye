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

function updateTable(){
  total_emo_income();
  net_employment_income();
  totalIncome();
  totalNetIncome();
  assessableIncome()
  line19();
  totalDeduction();
  chargeableIncome();
  taxOnChargeable()
  taxationRelief();
  incomeTaxLiability();
  totalPrepayments()
  difference();

}

function total_emo_income(){
  var income = parseInt(document.getElementById("income").value);
  var severance = parseInt(document.getElementById("severance").value);
  var pension = parseInt(document.getElementById("pension").value);

  if( (Number.isInteger(income)) && (Number.isInteger(severance)) && (Number.isInteger(pension))){
  document.getElementById("total_emo_income").innerHTML = "$" + (income+severance+pension);
  return  (income+severance+pension);
}
}

function net_employment_income(){
  var travel_expenses = parseInt(document.getElementById("travel_expenses").value);
  var totalemo_income = total_emo_income();
  if((Number.isInteger(travel_expenses)) && (Number.isInteger(totalemo_income))){
  document.getElementById("net_employment_income").innerHTML = "$" + (totalemo_income-travel_expenses);
  return (totalemo_income-travel_expenses);
}
}

function totalIncome(){
  var cancelled_pension =  parseInt(document.getElementById("cancelled_pension").value);
  var employers_approved_pension = parseInt(document.getElementById("employers_approved_pension").value)
  var netEmployement_income = net_employment_income();
  var total_income = (netEmployement_income + cancelled_pension + employers_approved_pension);
  if(Number.isInteger(total_income)){
    document.getElementById("total_income").innerHTML = "$" + total_income;
    return total_income;
  }
}

function totalNetIncome(){
   var tertiary_expenses = parseInt(document.getElementById("tertiary_expenses").value);
   var firstTime_house = parseInt(document.getElementById("first-time_house").value);
   var covenanted_donations = parseInt(document.getElementById("covenanted_donations").value);

   document.getElementById("covenanted_donations").max = (totalIncome()*0.15);

   if(Number.isInteger(tertiary_expenses+firstTime_house+covenanted_donations)){
     document.getElementById("total_net_income").innerHTML = "$" +
     (totalIncome()-(tertiary_expenses+firstTime_house+covenanted_donations));

     return (totalIncome()-(tertiary_expenses+firstTime_house+covenanted_donations));
   }

}

function assessableIncome(){
  var assessable_income = (totalNetIncome()-72000)
  //if(assessable_income< 0){assessable_income = 0};
  document.getElementById("assessable_income").innerHTML = "$" + (assessable_income);
  return assessable_income;
}

function line19(){
var approved_pension = parseInt(document.getElementById("approved_pension").value);
var contribution_widows = parseInt(document.getElementById("contribution_widows").value);
var national_insurance_payments = parseInt(document.getElementById("national_insurance_payments").value);
var sum = (approved_pension+ contribution_widows + national_insurance_payments);
if(sum>30000){
  sum = 30000
}

if(Number.isInteger(sum)){
  document.getElementById("19").innerHTML ="$" + sum;
  return sum;
}

}

function totalDeduction(){
  var employers_contribution_nis = parseInt(document.getElementById("employers_contribution_nis").value);
  var maintenance_payment = parseInt(document.getElementById("maintenance_payment").value);
  var sum = (employers_contribution_nis+maintenance_payment+line19());
  if(Number.isInteger(sum)){
    document.getElementById("total_deductions").innerHTML = "$" + sum;
    return sum;

  }

}

function chargeableIncome(){
  var sum = totalNetIncome() - totalDeduction();
  if(Number.isInteger(sum)){
    document.getElementById("chargable_income").innerHTML =  "$" + sum;
    return sum;
  }
}

function taxOnChargeable(){
    var sum = chargeableIncome()*.25;
    if(Number.isInteger(sum)){
      document.getElementById("tax_chargable_income").innerHTML = "$" + sum;
      return sum;
    }
}

function taxationRelief(){
   document.getElementById("taxation_relief").max = taxOnChargeable();
   return   parseInt(document.getElementById("taxation_relief").value);
}

function incomeTaxLiability(){
  var sum = chargeableIncome() - taxationRelief();
  if(Number.isInteger(sum)){
    document.getElementById("income_tax_liability").innerHTML = "$" + sum;
    return sum;
  }
}

function totalPrepayments(){
  var line27 = parseInt(document.getElementById("27").value);
  var income_tax_deducted = parseInt(document.getElementById("income_tax_deducted").value);
  var sum = line27 + income_tax_deducted;

  if(Number.isInteger(sum)){
    document.getElementById("total_prepayments").innerHTML = "$" + sum;
    return sum;
  }

}

function difference(){
  var income_tax_liability = incomeTaxLiability();
  var total_prepayments = totalPrepayments();
  var balance;
  if(income_tax_liability> total_prepayments){
    document.getElementById("31").innerHTML = "$0";
    balance = income_tax_liability - total_prepayments;
    document.getElementById("30").innerHTML = "$" + balance;
  }
  else{
    document.getElementById("30").innerHTML = "$0";
    balance =  total_prepayments - income_tax_liability;
    document.getElementById("31").innerHTML = "$" + balance;
  }
}
