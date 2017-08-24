//listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

//save Bookmark
function saveBookmark(e)
{
    // get form values
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteUrl").value;

    //validate form
    if (!validateForm(siteName, siteURL))
    {
        return false;
    }

    //create bookmark object
    var bookmark =
        {
            name: siteName,
            url:siteURL
        }

    
    //get bookmarks from local storage and if there are none create one
    if (localStorage.getItem("bookmarks") === null)
    {
        var bookmarkObjects = {
            bookmarks:[]
        };
        bookmarkObjects.bookmarks.push(bookmark);
        //bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkObjects));
    }
    else
    {
        var bookmarkObjects = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarkObjects.bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkObjects));
    }

    //Clear form
    document.getElementById("myForm").reset();

    fetchBookmarks();
    //prevent form from submitting
    e.preventDefault();
}

function fetchBookmarks()
{   
    //get bookmarks from local storage
    var bookmarkObjects = JSON.parse(localStorage.getItem("bookmarks"));

    //get output id
    var bookmarksResults = document.getElementById("bookmarksResults");

    //generate HTML using Handlebars.js
    var rawTemplate = document.getElementById("myTemplate").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var generatedHTML = compiledTemplate(bookmarkObjects);
    bookmarksResults.innerHTML = generatedHTML;

  
   
}

function deleteBookmark(url)
{
    //get bookmarks from local storage
    var bookmarkObjects = JSON.parse(localStorage.getItem("bookmarks"));
    //loop through bookmarks
    for (var i = 0; i < bookmarkObjects.bookmarks.length; i++)
    {
        if (bookmarkObjects.bookmarks[i].url === url)
        {
            bookmarkObjects.bookmarks.splice(i, 1);
        }
    }

    //reset local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkObjects));

    fetchBookmarks();
   
}

function validateForm(siteName,siteURL)
{
    if(!siteName || !siteURL)
    {
        alert("Please fill in the form.");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteURL.match(regex))
    {
        alert("Please use a valid URL");
        return false;
    }

    return true;
}