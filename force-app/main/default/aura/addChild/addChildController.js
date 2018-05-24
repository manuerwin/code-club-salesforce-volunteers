({
    doInit: function(component, event, helper) {
        // call the helper function on component load
        helper.getChildRecords(component, event); 
        component.set("v.RecordsSelected", 0);
    },    
    
    addSelected: function(component, event, helper) {
        // create array[list] type temp. variable for store child record's id's from selected checkboxes.  
        var SelectedIDs = [];
        var boxesChecked = 0;
        
        // get(find) all checkboxes with aura:id "checkBox"
        var getAllId = component.find("checkBox");
        var recordsDisplayed = 0;     
        
        if (typeof getAllId.length == 'undefined') {//then 0 or one rows displayed
            console.log("getAllId.length = undefined");
            if (typeof getAllId != 'undefined') { // then 1 row displayed
                console.log("getAllId = undefined");
                recordsDisplayed = 1;     
            }
        }
        
        // play a for loop and check every checkbox values 
        // if value is checked(true) then add those Id (store in Text attribute on checkbox) in tempIDs var.
        
        if (recordsDisplayed == 1) {
            console.log("1");
            console.log(getAllId.get("v.value"));
            debugger;
            if (getAllId.get("v.value") == true) {
                console.log("2");
                SelectedIDs.push(getAllId.get("v.text"));
                boxesChecked = 1;
            }
        } else {
            console.log("3");
            for (var i = 0; i < getAllId.length; i++) {   // 
                console.log("Looping through the records to find how many checked. i=" + i);
                if (getAllId[i].get("v.value") == true) {
                    console.log("4");
                    console.log("Record " + i + " is checked");
                    SelectedIDs.push(getAllId[i].get("v.text"));
                    boxesChecked++;
                }
            }
        }
        console.log(boxesChecked + " Records selected (boxesChecked)");
        console.log(SelectedIDs.length + " Records selected array size (tempIDs.length)");
        
        if (boxesChecked > 0 ) {
            // call the helper function and pass all selected record id's.   
            helper.addSelectedHelper(component, event, SelectedIDs);        
            // Clear the Select All checkbox
            component.find("box3").set("v.value", false);
            
        } else {
            var toastEvent = $A.get("e.force:showToast"); 
            toastEvent.setParams({
                "title": "Warning!",
                "message": "No records selected to be copied"
            });
            toastEvent.fire();
        }      
        component.set("v.CopyCount", boxesChecked);
        boxesChecked = 0;
    },
    
    
    // For select all Checkboxes 
    selectAll: function(component, event, helper) {
        //get the header checkbox value  
        var selectedHeaderCheck = event.getSource().get("v.value");
        var recordsDisplayed = 0;
        
        // get all checkbox on table with "checkBox" aura id (all iterate value have same Id)
        // return the List of all checkBox elements 
        var getAllId = component.find("checkBox");
        if (typeof getAllId.length == "undefined") {//then 0 or one rows displayed
            console.log("getAllId.length = undefined.  There might be 1 or 0 records displayed");
            if (typeof getAllId.get("v.text") != "undefined") { // then 1 row displayed
                console.log("getAllId = is defined");
                recordsDisplayed = 1;     
            }
        }        
        
        // check if select all (header checkbox) is true then true all checkboxes on table in a for loop  
        // if value is false then make all checkboxes false in else part with play for loop 
        if (selectedHeaderCheck == true) {
            if (recordsDisplayed != 1) {
                for (var i = 0; i < getAllId.length; i++) {
                    component.find("checkBox")[i].set("v.value", true);
                }
            } else {
                console.log(" one record - set to true");
                component.find("checkBox").set("v.value", true);                
            }
        } else {
            if (recordsDisplayed != 1) {
                for (var i = 0; i < getAllId.length; i++) {
                    component.find("checkBox")[i].set("v.value", false);
                }
            } else {
                component.find("checkBox").set("v.value", false);                
            }
        }
    },
    
    selectChangeStaff: function(component, event, helper) {
        // Toggle the contact type value and
        // requery the list of records
        
        if (component.get("v.ContactTypevar") == "Student"){
            component.set("v.ContactTypevar", "Staff");
        } else {
            component.set("v.ContactTypevar", "Student");
        }
        // Clear the Select All checkbox and return the values
        component.find("box3").set("v.value", false);
        helper.getChildRecords(component, event);
    },
    
    cbChange: function(component, event, helper) {
        var caller=event.getSource().get("v.value");
        var toastEvent = $A.get("e.force:showToast"); 
        toastEvent.setParams({
            "title": "Checkbox changed by",
            "message": caller
        });
        toastEvent.fire();
        
        
    },
    
})