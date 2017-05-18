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

    var bookmark =
        {
            name: siteName,
            url:siteURL
        }

    
    //get bookmarks from local storage and if there are none create one
    if (localStorage.getItem("bookmarks") === null)
    {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    else
    {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
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
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    //get output id
    var bookmarksResults = document.getElementById("bookmarksResults");
    bookmarksResults.innerHTML = '';

    for(var i=0;i<bookmarks.length;i++)
    {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += "<div class=well>" +
        "<h3>" + name  +
        "<a class=' btn btn-default' target='_blank' href='" + url + "'>Visit</a>" +
        "<a class=' btn btn-danger' onclick='deleteBookmark(\"" + url + "\")' href='#'>Delete</a>" +
         "</h3>"+
        "</div>";
    }

    
   
}

function deleteBookmark(url)
{
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //loop through bookmarks
    for(var i=0;i<bookmarks.length;i++)
    {
        if(bookmarks[i].url===url)
        {
            bookmarks.splice(i, 1);
        }
    }

    //reset local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

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