({
    
    getChildRecords: function(component, event) {
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
            if (state === "SUCCESS") {
                if (component.get("v.CopyCount") > 0) {
//                    var toastEvent = $A.get("e.force:showToast"); 
//                    var toastMessage = component.get("v.CopyCount") + " attendee record(s) have been added successfully."
//                    toastEvent.setParams({
//                        "title": "Success!",
//                        "message": toastMessage
//                    });
//                    toastEvent.fire();
                    
                    // refresh/reload the page view and set the count of checked boxes to zero
                    $A.get('e.force:refreshView').fire();
                    component.get("v.CopyCount", "0");
                    
                    // call init function again [clear selected checkboxes]
                    this.getChildRecords(component,event);
                    
                } else {
//                    var toastEvent = $A.get("e.force:showToast");  
//                    toastEvent.setParams({
//                        "title": "Warning!",
//                        "message": component.get("v.CopyCount") + " records copied."
//                    });
//                    toastEvent.fire();
                }            
            }  
        });
        
        $A.enqueueAction(action);
        
        // Fire event to make the other components refresh the list
        var appEvent = $A.get("event.c:aeEvent");        
        appEvent.setParam("SourceComponent", "addChild");
        appEvent.fire();
    },
})