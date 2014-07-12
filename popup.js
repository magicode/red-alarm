document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('op').addEventListener('click', function () {
        window.open(chrome.extension.getURL('option.html'));

    });
    
    //// Initialize the option controls.
    //popup.isActivated.checked = localStorage.isActivated || true;
    //popup.SoundActivated.checked = localStorage.isActivated || true;
    //// The display activation.
    //popup.frequency.value = localStorage.frequency || null;
    // The display frequency, in minutes.
    var strSoundActivated;
    var strisActivated;
    var strfrequency;
    
    if (localStorage.isActivated || true) {
        strisActivated="הצגת התראות פועלת";
    }else {
        strisActivated="הצגת התראות מופסקת";
    }
    if (localStorage.SoundActivated || true) {
        strSoundActivated = "צליל התראה פעיל";
    } else {
        strSoundActivated = "צליל התראה כבוי";
    }
    if (localStorage.getItem("frequency") === null) {
        strfrequency= "לא נבחרה עיר מועדפת"
    } else {
        strfrequency = "העיר שלך - " + localStorage.frequency+" מושבת";
    }

    document.getElementById("isActivated").innerHTML = strisActivated //"העיר שלך - ירושלים";
    document.getElementById("SoundActivated").innerHTML = strSoundActivated;
    document.getElementById("frequency").innerHTML = strfrequency;
    

    // Set the display activation and frequency.



});