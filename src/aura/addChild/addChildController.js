({
    doInit: function(component, event, helper) {
        // call the helper function on component load
        helper.getChildRecords(component, event);        
    },    

    addSelected: function(component, event, helper) {
        // create array[list] type temp. variable for store child record's id's from selected checkboxes.  
        var tempIDs = [];
        
        // get(find) all checkboxes with aura:id "checkBox"
        var getAllId = component.find("checkBox");
        var boxesChecked = 0;
        // play a for loop and check every checkbox values 
        // if value is checked(true) then add those Id (store in Text attribute on checkbox) in tempIDs var.
        
        for (var i = 0; i < getAllId.length; i++) {              
            if (getAllId[i].get("v.value") == true) {
                tempIDs.push(getAllId[i].get("v.text"));
                boxesChecked++;
            }
        }
        
        if (tempIDs.length > 0 ) {
            // call the helper function and pass all selected record id's.   
            helper.addSelectedHelper(component, event, tempIDs);        
            // Clear the Select All checkbox
            component.find("box3").set("v.value", false);
//            var toastEvent = $A.get("e.force:showToast"); 
//            toastEvent.setParams({
//                "title": "Success!",
//                "message": tempIDs.length + " records selected to be copied"
//            });
//            toastEvent.fire();
            
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
        // get all checkbox on table with "checkBox" aura id (all iterate value have same Id)
        // return the List of all checkBox elements 
        var getAllId = component.find("checkBox");
        // check if select all (header checkbox) is true then true all checkboxes on table in a for loop  
        // if value is false then make all checkboxes false in else part with play for loop 
        if (selectedHeaderCheck == true) {
            for (var i = 0; i < getAllId.length; i++) {
                component.find("checkBox")[i].set("v.value", true);
            }
        } else {
            for (var i = 0; i < getAllId.length; i++) {
                component.find("checkBox")[i].set("v.value", false);
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
    
    
    
})