const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('quote-author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Loading Function
function loading(){
    loader.hidden= false;
    quoteContainer.hidden=true;
}

//Complete Loading Function

function complete(){
    if (!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

// Get Quotes from The API

async function getQuote(){

    loading();
    const apiURL= 'https://type.fit/api/quotes';

try{

    const response = await fetch(apiURL);
    const data = await response.json();
    var randomNo = Math.floor(Math.random()*1644);
    
    // If Author is Unknown
    if(data[randomNo].author === ""){
        author.innerText ="Unknown";
    }
    else{
        author.innerText = data[randomNo].author;
    }

    // If the Quotes is Too long
    if(data[randomNo].text.length>120){
        quoteText.classList.add("long-quote");
    }
    else{
        quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data[randomNo].text;
    complete();
    

} catch(error){
console.log("Opps their is an error "+ error);
}

    
}


// Twitter Function
function Tweetquote(){
    const quote = quoteText.innerText;
    const authorName = author.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${authorName}`;
    window.open(tweetUrl, "_blank");

}


//Event Listners

newQuoteBtn.addEventListener('click',function(){
    getQuote();
});


twitterBtn.addEventListener('click',function(){
Tweetquote();
});

//On Loading Page
getQuote();

