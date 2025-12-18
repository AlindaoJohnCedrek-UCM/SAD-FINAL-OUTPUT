// Get a reference to ALL buttons with the class 'tapButton'
const allButtons = document.querySelectorAll('.tapButton');

const doubleTapDelay = 300; // Time (in milliseconds) allowed for a double tap

// Loop through each button to attach the independent logic
allButtons.forEach(buttonElement => {
    let tapTimer = null; // Independent timer for THIS specific button
    
    // Get the icon element INSIDE the current button
    const iconElement = buttonElement.querySelector('.fa-solid');

    // Helper function to set the ICON's color
    function setIconColor(color) {
      // We change the 'color' property of the <i> element
      iconElement.style.color = color; 
    }

    // Attach the click listener
    buttonElement.addEventListener('click', function() {
        if (tapTimer === null) {
            // 1. FIRST TAP: Start the timer for the single-tap action
            
            tapTimer = setTimeout(function() {
                // Single Tap Action: Turn icon GREEN
                setIconColor('#4CAF50');
                console.log('Single Tap: Icon is now GREEN');
                tapTimer = null; 
            }, doubleTapDelay);

        } else {
            // 2. SECOND TAP: Happens before the timer expires

            // Clear the pending single tap action
            clearTimeout(tapTimer);
            
            // Double Tap Action: Turn icon RED
            setIconColor('#F44336');
            console.log('Double Tap: Icon is now RED');
            
            // Reset the timer for the next sequence
            tapTimer = null;
        }
    });
});

//Session Header

/**
 * Function to handle the click event and prompt for session confirmation.
 */
function confirmSessionEnd(event) {
    // 1. Stop the link from navigating immediately
    event.preventDefault();

    // 2. Display the confirmation dialog box
    const userConfirmed = confirm("End this session?");

    if (userConfirmed) {
        // The user clicked "OK"
        console.log("Session ending confirmed. Redirecting...");
        
        // 3. Manually navigate to the link's intended destination (the next page)
        // This is where the session would effectively "end" if it's treated as a logout.
        window.location.href = event.currentTarget.href; 
    } else {
        // The user clicked "Cancel"
        console.log("Session ending cancelled. Staying on current page.");
        // The user stays on the current page because the default action was prevented.
    }
}

// --- Attach the Listener ---

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Modal Element References ---
    const confirmationModal = document.getElementById('confirmationModal');
    const endSessionBtn = document.getElementById('endSessionBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    const statusModal = document.getElementById('statusModal');
    const statusMessage = document.getElementById('statusMessage');
    const statusOkBtn = document.getElementById('statusOkBtn');

    let targetUrl = null; 

    // Helper functions: These MUST successfully override your CSS display: none
    function showModal(modal) {
        modal.style.display = 'flex'; 
    }

    function hideModal(modal) {
        modal.style.display = 'none';
    }

    // --- 2. Header Navigation Logic ---
    
    // Select ONLY the links with the class .headerClassLink
    const sessionNavLinks = document.querySelectorAll('a.headerClassLink');

    sessionNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const currentPath = window.location.pathname.split('/').pop();

            // Condition Check: The pop-up ONLY appears if we are on Attendance.html
            if (currentPath === 'Attendance.html') {
                event.preventDefault(); 
                
                targetUrl = this.getAttribute('href'); 
                showModal(confirmationModal); // <--- THIS line makes it visible!
            }
        });
    });

    // --- 3. Confirmation Modal Actions ---

    cancelBtn.addEventListener('click', () => {
        targetUrl = null; 
        hideModal(confirmationModal);
    });

    endSessionBtn.addEventListener('click', () => {
        hideModal(confirmationModal);
        // ... (Session Save Logic) ...
        
        statusMessage.textContent = "Session saved!";
        showModal(statusModal); 
    });
    
    // --- 4. Status Modal Action ---
    
    statusOkBtn.addEventListener('click', () => {
        hideModal(statusModal);
        
        if (targetUrl) {
            window.location.href = targetUrl;
            targetUrl = null; 
        }
    });
    
    // --- 5. Dedicated Session Button Actions (End Session / Save Draft) ---
    
    const sessionButtons = document.querySelectorAll('.sessionButton button');

    if (sessionButtons.length >= 2) {
        // 'End Session' button
        sessionButtons[0].addEventListener('click', function() {
            targetUrl = null; 
            statusMessage.textContent = "Session saved!";
            showModal(statusModal);
        });
        
        // 'Save Draft' button
        sessionButtons[1].addEventListener('click', function() {
            targetUrl = null; 
            statusMessage.textContent = "Draft saved successfully.";
            showModal(statusModal); 
        });
    }

    // --- 6. Student Attendance Button Logic (Tap/Double Tap) ---
    // (Existing logic preserved)
    const allButtons = document.querySelectorAll('.tapButton');
    const doubleTapDelay = 300; 
    
    allButtons.forEach(buttonElement => {
        let tapTimer = null; 
        const iconElement = buttonElement.querySelector('.fa-solid');

        function setIconColor(color) {
          iconElement.style.color = color; 
        }

        buttonElement.addEventListener('click', function() {
            if (tapTimer === null) {
                tapTimer = setTimeout(function() {
                    setIconColor('#4CAF50'); // Single Tap: Green (Present)
                    tapTimer = null; 
                }, doubleTapDelay);

            } else {
                clearTimeout(tapTimer);
                setIconColor('#F44336'); // Double Tap: Red (Absent)
                tapTimer = null;
            }
        });
    });
});