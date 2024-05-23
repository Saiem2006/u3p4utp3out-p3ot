// Listen for form og submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Gem bogmærke
function saveBookmark(e) {
  // få form værdierne
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }



  // Tester om bogmærkernes værdi
  if (localStorage.getItem('bookmarks') === null) {
    // tilsæt array
    var bookmarks = [];
    // tilføj to array
    bookmarks.push(bookmark);
    // Sæt til localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // få bogmærkerne from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // tilføj bogbærke til array
    bookmarks.push(bookmark);
    // Re-set tilbage til localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re fetch bogmærkerne
  fetchBookmarks();

  // forhindre form fra at vise altså submit
  e.preventDefault();
}

// slet bogmærke
function sletBookmark(url) {
  // få bogmærkerne fra localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop igennem bogmærkerne
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Fjern fra array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set tilbage til localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re fetch bogmærkerne
  fetchBookmarks();
}

// Fetch bogmærkerne
function fetchBookmarks() {
  // få bogmærkerne fra localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // få output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Byg output
  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">' +
      '<h3>' + name +
      ' <a class="btn btn-default" target="_blank" href="' + addhttp(url) + '">vis</a> ' +
      ' <a onclick="sletBookmark(\'' + url + '\')" class="btn btn-danger" href="#">slet</a> ' +
      '</h3>' +
      '</div>';
  }
}

// Validere Form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Udfyld alle felterne inden du gemmer');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}





