$(document).ready(function () {
 // Selectors 
 let counter = $('.count span') , 
     bullets_container = $('.bullets .spans')  ,
     BUlletsDiv = $(".bullets") , 
     index = 0 , 
     RightAnswers = 0, 
     titles_container = $('.quiz-area') , 
     Answers_Area  = $('.answers-area') , 
     SubmitButton = $(".submit-button") , 
     endDiv = $(".end") , 
     tryagianButton = $(".end .try") , 
     exitbutton = $(".end #exit") ,
     wordResult = $(".wordresult") ,  
     resultDiv = $('.results');

// Function  Get json 
    function get_gsonQuestions(){
        $.getJSON("questions.json",
        function (data) {     
          let objlength = data.length ; 
          CreateBullets(objlength);
          createQuestions(data[index] , objlength);
          // WHEN SUBMIT
       SubmitButton.click(()=> { 
           CheckAnswer(data[index], objlength) ; 
           index++;
           CustomizeBullets(); 
           titles_container.html("");
           Answers_Area.html("") ; 
           createQuestions(data[index] , objlength);
       });
          
        }
    );}get_gsonQuestions() ; 


// Initialize quiz 
function CreateBullets(Number){
counter.text(Number) ; 
for(let i = 0 ; i< Number ; i++){
    let span = $("<span></span>") ; 
    if(i===0)
    span.addClass('on');
    bullets_container.append(span) ;}
}
// Function  ADD Questions
function createQuestions(obj , num){

    if(index < num ){
    let header = $("<h2></h2>")  , 
    innerText=  obj.title;
    header.text(innerText);
    titles_container.append(header) ; 
     
    for(let  i = 1 ; i<= 4 ; i++){

        let Create_div = $("<div></div>") ; 
        Create_div.addClass('answer') ; 
        let Create_radioinp = $("<input></input>") ;  
        Create_radioinp.attr('id' ,`answer_${i}` );
        Create_radioinp.attr('name' ,`questions` );
        Create_radioinp.attr('type' ,`radio` );
        Create_radioinp.attr('data-answer' ,`${obj[`answer_${i}`]}`) ; 

        let create_label = $("<label></label>") , 
        labelText = obj[`answer_${i}`]; 
        create_label.attr('for', `answer_${i}` );
        create_label.text(labelText) ;  
Create_div.append(Create_radioinp); 
Create_div.append(create_label); 
Answers_Area.append(Create_div) ; 
    }
    }
    else{
        SubmitButton.css("pointer-events" , "none") ;
        showresult(num) ;  
    }
}

    
function CheckAnswer(obj , sizeofquestions){

  let RAnswer = obj.right_answer  , 
  userAnswer = "" , 
  AllAnswers = $("input[name= 'questions']"); 
for(let i = 0 ; i<AllAnswers.length ; i++){
    if(AllAnswers[i].checked){
        userAnswer = AllAnswers[i].dataset.answer ;
         break ; 
    }   
} 
   if(userAnswer === RAnswer){
       RightAnswers++ ; 
       console.log("RIGHT");
   }
}
function CustomizeBullets() {
    let BulletsSpan = $('.bullets .spans span') ; 
   $.each(BulletsSpan, function (indexInArray) { 
        if(index ==indexInArray)
           BulletsSpan[indexInArray].className = "on" ; 
   });
  }

function showresult(allquestioncount){
titles_container.remove() ; 
Answers_Area.remove() ; 
SubmitButton.remove() ; 
bullets_container.remove() ;
BUlletsDiv.remove() ; 

let spanResult ;
if(RightAnswers > (allquestioncount/2))
spanResult = `<span> congratulations You answerd <span class="RA">  ${RightAnswers} <span> From <span class="AA"> ${allquestioncount} </span> </span>` ; 
else {
spanResult = `<span> Bad Answers You answerd <span class="RA">  ${RightAnswers} <span> From <span class="AA"> ${allquestioncount} </span> </span>` ; 
wordResult.text("Sorry You Cannot pass Quiz...! ");
}
resultDiv.html(spanResult);
setTimeout(() => {
    
    endDiv.css("display" , "block");
}, 2500);
}

tryagianButton.click(()=>{
    location.reload();
})
exitbutton.click(()=>{
    window.open("", '_self').window.close();
    console.log("closed");
})
}); // end jquery 


