// these scripts are exclusively for the 5th page (saved for later)

// savedForLater_array is the array which was parsed from storage and stored the user's clicked/saved elements
let savedForLater_array = JSON.parse(localStorage.getItem('SFL'));
if (savedForLater_array == null) {
    savedForLater_array = [];
} else {
    // sfl_content is the string that will create the actual HTML elements of what was saved for late
    let sfl_content = '';
    // this for-of loop gets each element of the array and appends it to the string
    for (let element of savedForLater_array) {
        sfl_content += `${element}`;
    }
    // the sfl div is located then its innerHTML is set to the sfl_content string
    let sfl_div = document.getElementById('sfl-div');
    sfl_div.innerHTML = sfl_content;

    // all the user's saved content will slowly fade into appearance if it exists
    $('#sfl-div').fadeIn(500);
}

// the user can delete html elements in the sfl div by clicking on them
$('#sfl-div').click(function (e) {
    let clicked_element = e.target.outerHTML;
    // the element will first be hidden then removed from the array
    if (savedForLater_array.includes(clicked_element)) {
        e.target.style.display = 'none';
        savedForLater_array.splice(savedForLater_array.indexOf(clicked_element), 1);
    }

    // the storage item must be updated now because the user has removed an item from their saved for later list
    let stringified_SFL = JSON.stringify(savedForLater_array);
    localStorage.setItem('SFL', stringified_SFL);
})

// this will reveal the dropdown menu when hovering over 'FORMS'
$('#dropdown-button').on('mouseenter', function () {
    $('#dropdown-menu').slideDown(500);
});
// the user can click anywhere on the page to hide the dropdown menu
$(document).on('click', function () {
    $('#dropdown-menu').slideUp(500);
});

// when comment, like, or contact are clicked on in the dropdown menu the relevant form will shown
// the form will be hidden when the user selects another form
let dropdown_menu = document.getElementById('dropdown-menu');
dropdown_menu.onclick = showForm;
function showForm(c) {
    let form = c.srcElement.innerText;

    if (form == 'Comment') {
        $('#comment-form-div').show();
        $('#likes-form-div').hide();
        $('#contact-form-div').hide();
    } else if (form == 'Like') {
        $('#comment-form-div').hide();
        $('#likes-form-div').show();
        $('#contact-form-div').hide();
    } else if (form = 'Contact') {
        $('#comment-form-div').hide();
        $('#likes-form-div').hide();
        $('#contact-form-div').show();
    }
}

// --- comment section scripts ---
// this function is triggered on load so that the local storage will be looked into for any existing comments that might be saved in the 'comments' storage item
$(function () {
    if (localStorage.getItem('comments') != null) {
        document.getElementById('comment-section').innerHTML = JSON.parse(localStorage.getItem('comments'));
    }
});
// this function is triggered when the comment button is clicked.
function postComment() {
    let comment = document.getElementById('comment-input').value;

    // to empty the comment input field
    document.getElementById('comment-input').value = "";

    // the variable 'content' will be the inner HTML of the comment section div
    // every comment made by the user will create a new paragraph of HTML along with a symbol in span for deleting the comment
    let content = `<p class="comment">${comment} 
    <span onclick="removeComment(this)" >\u2715</span> </p>`;
    document.getElementById('comment-section').innerHTML += content;

    // the inner HTML of #comment-section will be in set in local storage as 'comments'
    localStorage.setItem('comments', JSON.stringify(document.getElementById('comment-section').innerHTML));
}
// when the span of the comment is clicked the entire comment will be removed
function removeComment(o) {
    o.parentNode.remove();
    // local storage will be updated after the comment is removed
    localStorage.setItem('comments', JSON.stringify(document.getElementById('comment-section').innerHTML));
}

// --- contact form ---
// the user will be alerted when they submit on the contact page
function contactMessage() {
    alert("We will get in contact with you as soon as possible.");
}