// this script will be linked to all but the 5th page since this produces the content for that page
$(document).click(function (e) {
    // the item 'SFL' is parsed because it is in array that is stored as a string 
    let savedForLater_array = JSON.parse(localStorage.getItem('SFL'));

    // this is to initialise the array if it returns null
    if (savedForLater_array == null) {
        savedForLater_array = [];
    }

    // this if is implemented to prevent the wrong elements from being saved as the user goes through the website
    // so only UL's, P's, and IMG's can be saved for later
    if (e.target.nodeName == 'UL' || e.target.nodeName == 'P' || e.target.nodeName == 'IMG') {
        let clicked_element = e.target;

        // this prevents duplicates from being saved into the array and storage
        if (savedForLater_array.includes(clicked_element.outerHTML)) {
            alert('You have already saved this item.')
        } else {
            savedForLater_array.push(clicked_element.outerHTML);

            let stringified_SFL = JSON.stringify(savedForLater_array)
            localStorage.setItem('SFL', stringified_SFL);
            alert(`Saved! You have ${savedForLater_array.length} items saved.`)
        }
    }
});