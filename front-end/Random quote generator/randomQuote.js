$(document).ready(function() {
    $('#tweet-quote').hide();
    var quotesArray = [{
            author: "Mark Twain",
            quotes: ["Whenever you find yourself on the side of the majority, it is time to pause and reflect.",
                "If you tell the truth, you don't have to remember anything.",
                "Don't go around saying the world owes you a living. The world owes you nothing. It was here first.",
                "I have never let my schooling interfere with my education.",
                "The man who does not read good books has no advantage over the man who cannot read them.",
                "The secret of getting ahead is getting started."
            ]
        },

        {
            author: "Al Pacino",
            quotes: ["Vanity is my favourite sin.",
                "You are in no position to disagree. I've got a loaded .45; you got pimples. \n Scent of a woman (1992)",
                "You're outta order. You're outta order. This whole trial is outta order. \n And justice for all (1979)",
                "Keep your friends close, but your enemies closer. \n The Godfather Part II (1974)"
            ]

        },
        {
            author: "Marlon Brando",
            quotes: ["There's a line in the picture where he (Johnny - The Wild One) snarls, 'Nobody tells me what to do.' That's exactly how I've felt all my life.",
                "I'm gonna make him an offer he can't refuse. \n The Godfather (1972)"
            ]
        },
        {
            author: "APJ Abdul Kalam",
            quotes: ["Those who cannot work with their hearts achieve but a hollow, half-hearted success that breeds bitterness all around.",
                "Great dreams of great dreamers are always transcended."
            ]
        },
        {
            author: "Sean Connery",
            quotes: ["Bond. James Bond. \n Dr. No (1962)",
                "A martini. Shaken, not stirred. \n Goldfinger (1964) "
            ]
        },
        {
            author: "Clint Eastwood",
            quotes: [
                "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk? \n Sudden Impact (1983)",
                "Go ahead, make my day. \n Dirty Harry (1971)"
            ]
        },
        {
            author: "Franklin D. Roosevelt",
            quotes: [
                "When you reach the end of your rope, tie a knot in it and hang on."
            ]
        },
        {
            author: "Indira Gandhi",
            quotes: [
                "You cannot shake hands with a clenched fist."
            ]
        },
        {
            author: "Edgar Allan Poe",
            quotes: [
                "All that we see or seem is but a dream within a dream."
            ]
        },
        {
            author: "William Blake",
            quotes: [
                "Think in the morning. Act in the noon. Eat in the evening. Sleep in the night."
            ]
        },
        {
            author: "Sun Tzu",
            quotes: [
                "The supreme art of war is to subdue the enemy without fighting."
            ]
        },
        {
            author: "Albert Einstein",
            quotes: [
                "You can't blame gravity for falling in love.",
                "Imagination is more important than knowledge.",
                "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
                "Anyone who has never made a mistake has never tried anything new.",
                "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
                "Science without religion is lame, religion without science is blind.",
                "No problem can be solved from the same level of consciousness that created it.",
                "I have no special talents. I am only passionately curious."
            ]
        },
        {
            author: "Walt Whitman",
            quotes: [
                "Keep your face always toward the sunshine - and shadows will fall behind you."
            ]
        },
        {
            author: "Lao Tzu",
            quotes: [
                "The journey of a thousand miles begins with one step."
            ]
        },
        {
            author: "Samuel Beckett",
            quotes: [
                "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better."
            ]
        },
        {
            author: "J. R. R. Tolkien",
            quotes: [
                "Not all those who wander are lost."
            ]
        },
        {
            author: "Walt Disney",
            quotes: [
                "All our dreams can come true, if we have the courage to pursue them."
            ]
        },
        {
            author: "Euripides",
            quotes: [
                "Friends show their love in times of trouble, not in happiness."
            ]
        },
        {
            author: "William Arthur Ward",
            quotes: [
                "The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails."
            ]
        },
        {
            author: "Robert Louis Stevenson",
            quotes: [
                "Don't judge each day by the harvest you reap but by the seeds that you plant."
            ]
        },
        {
            author: "Aristotle",
            quotes: [
                "It is during our darkest moments that we must focus to see the light."
            ]
        }
    ];


    var generateButton = document.getElementById("genQuote");
    generateButton.onclick = genRandomQuote;
    var hexColors = [{
            //Blue
            divColor: "#0066cc",
            backColor: "#cce0f4"
        },
        {
            //Magenta or bright pink
            divColor: "#c80032",
            backColor: "#eeb2c1"
        },
        {
            //Black
            divColor: "#0a1117",
            backColor: "#b5b7b9"
        },
        {
            //Brown
            divColor: "#794044",
            backColor: "#d6c5c6"
        },
        {
            //Orange
            divColor: "#ff8a05",
            backColor: "#ffe7cd"
        },

        {
            //colored - grey
            divColor: "#8f9462",
            backColor: "#dddecf"
        },
        {
            //Lemon green
            divColor: "#000442",
            backColor: "#b2b3c6"
        },
        {
            //Purple
            divColor: "#9642d3",
            backColor: "#ead9f6"
        }
    ];

    function genRandomQuote() {

        var authorIndex = Math.floor(Math.random() * (quotesArray.length - 1));
        var quoteIndex = Math.floor(Math.random() * (quotesArray[authorIndex].quotes.length - 1))
        var authorName = quotesArray[authorIndex].author;
        var quoteGenerated = quotesArray[authorIndex].quotes[quoteIndex];
        var colorIndex = Math.floor(Math.random() * (hexColors.length - 1));
        var backColor = hexColors[colorIndex].backColor;
        var divColor = hexColors[colorIndex].divColor;
        document.body.style.backgroundColor = backColor;
        document.getElementById("quoteBox").style.backgroundColor = divColor;
        document.getElementById("quotePlace").innerHTML = quoteGenerated + "<br> </br> - " + authorName;
        $('#tweet-quote').show();
        $('#tweet-quote').click(() => window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quoteGenerated + '" - ' + authorName)));

    }




});