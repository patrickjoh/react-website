// This code was based on the a video by freeCodeCamp.org on Youtube ref: https://www.youtube.com/watch?v=cT_ZYrS3tKc
// and code or information for the various Javascript lecture slides by the lecturer
// Slides 22 to 29 from w41_JavaScript_DOM lecture was used and referenced for much of the code

let events = document.querySelector('#eventList');
let bookmarkedEvents = document.querySelector('#bookmarkList');
let bookmarkListHeader = document.querySelector('#bookmark-header');
// ref: slides 12 to 16 in the w42_JavaScript_StorageAPI lecture
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

// Start of Implementation of the task 1.b
// Array with data for the events
let eventItemData = [{
    id: "rick",
    name: "Rick Astley",
    datetime: "2023-02-12",
    date: "12.02.2023",
    where: "Huset",
    description: "Rick Astley holder konsert på huset! Det blir en strålende konsert med bare fan-favoritter og dansing til beina ikke lenger virker.",
    img: "images/rick_astley.png",
    alt: "Bilde av Rick Astley",
    buttonimg: "images/stjerne_tom.svg"
},
{
    id: "puteslott",
    name: "Bygging av puteslott",
    datetime: "2023-03-17",
    date: "17.03.2023",
    where: "Jysk Gjøvik",
    description: "Slå dine venner, slå dine fiender. Nå er tiden for puteslott og rå krig. Lag det største slottet, vis dominanse og bygg ditt livs største bragd.",
    img: "images/pillow_fort.png",
    alt: "Et puteslott",
    buttonimg: "images/stjerne_tom.svg"
},
{
    id: "paintball",
    name: "Paintball",
    datetime: "2023-03-27",
    date: "23.03.2023",
    where: "Narnias skoger",
    description: "Nå er tiden for å skyte venner, familie, fiender og fremmede helt uten konsekvenser. Bli med på paintball!",
    img: "images/paintball.png",
    alt: "Folk som spiller paintball",
    buttonimg: "images/stjerne_tom.svg"
}]
// End of Implementation of the task 1.b

// Start of Implementation of the task 1.c
// Start of Implementation of the task 1.a
// Because of the nature of the website, the eventList is generated from an array instead of a constructor function
// And then generates each event from the data in the array from a HTML-template 
// Generates the eventlist
let generateEvents = () => {
    // Goes through the eventItemData array and creates each event from the data
    // ref: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code#active_learning_launch_countdown under "Looping through a collection"
    return (events.innerHTML = eventItemData.map((event) => {
        return `
            <li id=event-${event.id}>    
                <div class="eventListItem">
                    <div class="eventListItemName">${event.name}</div>
                    <div class="evenListInfo">
                        <!-- Each peace of information for the event, including the date, location and more information - with time and datetime for better accessibility -->
                        <div class="eventListInfoAll"><span class="eventListInfoType">Når:</span><time datetime="${event.datetime}"> ${event.date} </time></div>
                        <div class="eventListInfoAll"><span class="eventListInfoType">Hvor:</span> ${event.where} </div>
                        <div class="eventListInfoAll"><span class="eventListInfoType">Mer informasjon:</span> ${event.description} </div>
                    </div>    
                    <div class="eventListImg">
                        <!-- Image of the event -->
                        <!-- Alt text for accessibility reasons -->
                        <img src="${event.img}" alt="${event.alt}"> 
                    </div>
                    <div class="eventListButton">
                        <!-- Button that adds the event to the bookmarks -->
                        <img id=${event.id} class=eventlistStar src=${event.buttonimg} alt="Bilde av en tom stjerne">
                    </div>   
                </div>
            </li>
        `
        // .join removes the commas between the events
    }).join(""));
};
// End of Implementation of the task 1.a
// Runs the function to generate the eventlist
generateEvents();
// End of Implementation of the task 1.c

// Adds a single bookmark
let addBookmark = (id) => {
    // Stores the id of the event that is to be added
    let selectedItem = id;
    // Finds the matching event in the bookmarks array
    let search = bookmarks.find((event) => event.id === selectedItem.id);
    // If the event is not bookmarked, add it to the bookmarks
    if (search === undefined) {
        // Pushes the event to the bookmarks array
        bookmarks.push({
            id: selectedItem.id,
        });
    }; 
    // ref: slides 12 to 16 in the w42_JavaScript_StorageAPI lecture
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    // Updates the bookmark button on the eventlist
    update(selectedItem.id);
};

// Removes a single bookmark
let removeBookmark = (id) => {
    // Stores the id of the event that is to be removed
    let selectedItem = id;
    // Find the event in the bookmarks array
    let search = bookmarks.find((event) => event.id === selectedItem.id);

    // If the event is bookmarked, remove it from the bookmarks
    if (search !== undefined) {
        // Finds the index of the event in the bookmarks array and removes it
        bookmarks.splice(bookmarks.indexOf(search), 1);
    }
    // ref: slides 12 to 16 in the w42_JavaScript_StorageAPI lecture
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    // Updates the bookmark button on the eventlist
    update(selectedItem.id);
};

// Start of Implementation of the task 1.c
let generateBookmarkItems = () => {
    // If there are bookmarks, the bookmark list is generated, with text and a button to remove all bookmarks
    if (bookmarks.length !== 0) {
        bookmarkListHeader.innerHTML = `
            <h3>Bokmerker</h3>
            <h5 class="remove-all">Fjern alle</h5>
        `;

        // Creates all the bookmarks and append them to bookmarkedEvents
        bookmarkedEvents.innerHTML = bookmarks.map((event) => {
            // Finds the events that is bookmarked
            let search = eventItemData.find((y) => y.id === event.id) || [];
            return `
            <li>
                <div id=bookmark-${search.id} class="bookmarkListItem">
                    <div class="bookmarkName">${search.name}</div>
                    <div class="bookmarkWhen"><span class="bookmarkInfoType">Når:</span><time datetime=${search.datetime}> ${search.date} </time></div>
                    <div class="bookmarkWhere"><span class="bookmarkInfoType">Hvor:</span> ${search.where} </div>
                    <img class="remove_Bookmark" src="images/remove.svg" alt="Rød knapp som fjerner event" >
                </div>
            </li>
            `
            // .join removes the commas between the bookmarks
        }).join("");

        // If there are no bookmarks, the bookmark list is empty and the header is removed
    } else {
        bookmarkListHeader.innerHTML = `
        <h2> Du har ingen bokmerker </h2>
        `;
        bookmarkedEvents.innerHTML = ``;
    }


    // Adds eventlisteners to all the remove-buttons
    // Finds all the remove buttons
    let removeButtons = document.querySelectorAll('.remove_Bookmark');
    // Goes through all the remove buttons and adds an eventlistener to each one
    removeButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            // Finds the ID of the bookmarkListItem
            let button = e.target.parentNode.id;
            // Finds the unique part of the ID
            // ref: https://www.w3schools.com/jsref/jsref_split.asp
            let id = button.split('-')[1];
            // Finds the event with the same unique ID as the bookmarkListItem
            let search = bookmarks.find((event) => event.id === id);
            // Removes the event from the bookmarks
            removeBookmark(search);
        });
    });

    // Adds eventlistener to the remove-all button
    // ref: w41_JavaScript_Events page 15
    // Checks if the remove-all button exists
    if (bookmarks.length !== 0) {
        // Finds the remove-all button
        let removeAll = document.querySelector('.remove-all');
        // Adds an eventlistener to the remove-all button
        removeAll.addEventListener('click', (e) => {
            // Removes all the bookmarks
            removeAllBookmarks();
        });
    }
};
// End of Implementation of the task 1.c

// Updates the bookmark button on the eventlist
let update = (id) => {
    // Finds the matching event in the bookmarks array
    let search = bookmarks.find((event) => event.id === id);

    // If the event is bookmarked, the img and alt attribute is changed to reflect this
    if (search !== undefined) {
        document.getElementById(id).src = "images/stjerne_fylt.svg";
        document.getElementById(id).alt = "Bilde av fylt stjerne";
        numberOfBookmark();
        // Else the img and alt attribute is changed to reflect that the event is not bookmarked
    } else {
        document.getElementById(id).src = "images/stjerne_tom.svg";
        document.getElementById(id).alt = "Bilde av en tom stjerne";
        numberOfBookmark();
    }

    // Updates the bookmark list
    generateBookmarkItems();
};

// Updates the numbers that shows how many events are bookmarked
let numberOfBookmark = () => {
    // Stores the size of the bookmarks array
    let numberOfBookmarks = bookmarks.length;
    // Changes the number above the calendar icon
    document.querySelector('#calAmount').innerHTML = numberOfBookmarks;
};
// Updates the bookmark list
numberOfBookmark();

// Updates the bookmarks when the page loads
for (let i = 0; i < bookmarks.length; i++) {
    update(bookmarks[i].id);
};
// Is only used by the "Fjern alle" button and removes all the bookmarks
let removeAllBookmarks = () => {
    // Empties the array of bookmarks
    bookmarks = [];
    // Updates the localStorage
    // ref: slides 12 to 16 in the w42_JavaScript_StorageAPI lecture
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    // Updates the number of bookmarks
    numberOfBookmark();
    // Updates the bookmarked events
    generateEvents();
    // Updates the bookmark list
    generateBookmarkItems();
};

// Add eventlisteners to all the bookmark buttons
// Finds all the buttons with the class eventlistStar
// ref: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener under "Other notes"
let starButton = document.querySelectorAll(".eventlistStar");
// Goes through all the buttons and adds an eventlistener to each one
starButton.forEach(button => {
    button.addEventListener("click", (e) => {
        // Finds the ID of the button
        let button = e.target;
        // Finds the event with the same ID as the button
        let search = bookmarks.find((event) => event.id === button.id);
        // Check if the event is bookmarked or not
        if (search === undefined) {
            // If the event is not bookmarked, add it to the bookmarks
            addBookmark(button);
        } else {
            // If the event is bookmarked, remove it from the bookmarks
            removeBookmark(button);
        }


    });
});