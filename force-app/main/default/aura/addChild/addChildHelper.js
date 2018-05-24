({
    
    getChildRecords: function(component, event) {
        console.log("In helper.getChildRecords");
        // Pass the Class record in so that Child records already in the class are
        // not offered up for selection
        
        // call apex method for fetch child records list. 
        var action = component.get('c.getContacts');
        
        action.setParams({
            "ParentId": component.get("v.recordId"),
            "ContactType": component.get("v.ContactTypevar")
        });
        
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === 'SUCCESS') {
                //set response value in ChildRecordList attribute on component.
                component.set('v.ChildRecordList', actionResult.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    addSelectedHelper: function(component, event, childRecordsIds) {
        //call apex class method
        var action = component.get('c.addParentClass');
        
        // Pass the all selected child record's Id's and
        // Parent Record id (ID of the currently displaying record[context record]) to apex method. 
        // ### You don’t need to add a recordId attribute to a component yourself.
        // It's automatically created with implements force:hasRecordId interface.###
        var RoleStr = component.get("v.ContactTypevar")
        if (RoleStr == "Staff") {
            RoleStr = "Assistant";
        } else {
            RoleStr = "Student";
        }
        action.setParams({
            "ParentId": component.get("v.recordId"), 
            "lstOfContactIds": childRecordsIds,
            "Role" : RoleStr
        });
        
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "ERROR") {
                console.log("ERROR detected: state = " + state);
                var errors = response.getError();
                // Configure error toast
                var toastParams = {
                    title: "Error",
                    message: "Unknown error", // Default error message
                    type: "error"
                };
                
                // Retrieve the error message sent by the server
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    toastParams.message = errors[0].message;
                }
                // Display the message
                console.error(toastParams.message);
                // Fire error toast
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams(toastParams);
                toastEvent.fire();
                
            } else if (state === "SUCCESS") {
                console.log('Adding attendees Function Response Return State ==="SUCCESS"');
                if (component.get("v.CopyCount") > 0) {
                    
                    // refresh/reload the page view and set the count of checked boxes to zero
                    $A.get('e.force:refreshView').fire();
                    component.set("v.CopyCount", "0");
                    
                    // call init function again [clear selected checkboxes and refresh list of
                    // unassigned students or staff]
                    this.getChildRecords(component,event);
                    // Fire the app event that causes the list of attendees on the class to be refreshed
                    var appEvent = $A.get("event.c:aeEvent");        
                    appEvent.setParam("SourceComponent", "addChild");
                    appEvent.fire();
                }        
                else {
                    console.log('Something other than SUCCESS or ERROR has happened');
                }
                
            }  
        });
        
        $A.enqueueAction(action);
        
    },
})