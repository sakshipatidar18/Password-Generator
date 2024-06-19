const inputslider=document.querySelector("[data-lengthslider]");
const lengthDispaly=document.querySelector("[data-length]");
const passwordDisplay=document.querySelector("[data-passworddispaly]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copied]");
const upperCaseCheck=document.querySelector("#upperCase");
const lowerCaseCheck=document.querySelector("#lowerCase");
const numberCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".generatebtn");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
var symbls='~`!@#$%^&*()_-+={[}]|\:;<,>.?/';

let password="";
let passwordlength=10;
let checkcount=0;
// deafault strength indicator is grey
handleslider();

// first we will create the handle slider function
// it will set the password length
function handleslider(){
    inputslider.value=passwordlength;
    lengthDispaly.innerText=passwordlength;
    const min=inputslider.min;
    const max=inputslider.max;
    inputslider.style.backgroundSize=((passwordlength-min)*100/(max-min))+"% 100%"
}
function setIndicator(color){
    indicator.style.backgroundColor=color;
    // shadow
    // hme java scriptt me shadow dalni hogi since shadow chang eho rhi hogi
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`
}
function getRdmInteger(min,max){
   return  Math.floor(Math.random()*(max-min))+min;
}
function generateRdmNumber(){
    return getRdmInteger(0,9);
}
function generateLowercase(){
    // this is number convert into char
    return String.fromCharCode(getRdmInteger(97,123));
}
function generateUppercase(){
    // this is number convert into char
    return String.fromCharCode(getRdmInteger(65,91));
}
// now genrating the symbols we will create the string of the symbols and then take random number and taje number index 
// from array
function generateRdmsymbols(){
    const randomNum=getRdmInteger(0,symbls.length);
    // us index pr konsa character pda hua hai bo btata hai charat function hmara
    return symbls.charAt[randomNum];
}
function sufflepassword(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=> (str += el));
    return str;
}
function calacStrength(){
    let hasUpper=false;
    let haslower=false;
    let hasNum=false;
    let hassym=false;
    if(upperCaseCheck.checked) hasUpper=true;
    if(lowerCaseCheck.checked) haslower=true;
    if(numberCheck.checked) hasNum=true;
    if(symbolCheck.checked) hassym=true;
    if(hasUpper && haslower && (hasNum || hassym && passwordlength>=8)){
        setIndicator("#0f0");
    }
    else if((haslower || hasUpper) && (hasNum || hassym) && passwordlength>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00")
    }
}
// since i want to await it function will bw the async function
async function copyContent() {
    try {
        // Since the text to be copied might take some time to load, we await it
        await navigator.clipboard.writeText(passwordDisplay.value);
        // If copying succeeds, display "copied" message
        copyMsg.innerText = "Copied";
    } catch (e) {
        // If copying fails, display "failed" message
        copyMsg.innerText = "Failed";
    }
    // Add the "active" class to the copyMsg span to display the message
    copyMsg.classList.add("active");
    // Remove the "active" class after 2000 milliseconds (2 seconds) to hide the message
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

copyBtn.addEventListener('click',()=>{
    if(password.length!=0){
        copyContent();
    }
})
function handlecheckbox(){
    checkcount=0;
     allcheckbox.forEach( (checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
     });
     if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
     }
}
allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckbox);
})
// now main function is to generate the password
// their will be three evnet listner in copy button slider and the generate password button
// adding eventlistner to slider
inputslider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    // then again hmen default function likh diya
    handleslider();
})
console.log('yha tk mera kam hogya hai');
generatebtn.addEventListener('click',()=>{
    // none of the checkbox are selected
    if(checkcount<=0){
        return ;
    }
    if(passwordlength < checkcount){
        passwordlength=checkcount;
        handleslider();
    }
    // lets generate the new password 
    // now for that i have to delete the privious password
    console.log('step1 tk ho gya hai');
    password="";
    let funcarr=[];
    if(upperCaseCheck.checked){
        funcarr.push(generateUppercase);
    }
    if(lowerCaseCheck.checked){
        funcarr.push(generateLowercase);
    }
    if(numberCheck.checked){
        funcarr.push(generateRdmNumber);
    }
    if(symbolCheck.checked){
        funcarr.push(generateRdmsymbols);
    }
    for(let i=0;i<funcarr.length;i++){
        console.log("1")

        password+=funcarr[i]();
    }
    console.log('step 2 bhi mera ho gya hai');
    // remaining addition hme krna hai ab
    for(let i=0;i<passwordlength-funcarr.length;i++){
        console.log("2")
        let randmindex=getRdmInteger(0,funcarr.length);
        password+=funcarr[randmindex]();
    }
    console.log('step 3 bhi ho vya hai');
    // now i have to suffle the password
    // you have a algorithm to suffle the password
    // fisher yates method use to suffle the array
    password=sufflepassword(Array.from(password));
    console.log('suffiling donbe ho gyi hai');
    passwordDisplay.value=password;
    // now calculate bala functon bhi use krna pdega
    console.log('final ban gya hai');
    calacStrength();
});
