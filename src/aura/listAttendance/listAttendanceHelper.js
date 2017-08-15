({
    getAttRecords: function(component, event) {
        // Pass the Class record in so that Child records already in the class are
        // not offered up for selection
        
        // call apex method for fetch child records list.
        var action = component.get('c.getAttendances');
       
        action.setParams({
            "parentClassID": component.get("v.recordId")
        });
        
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === 'SUCCESS') 
            {//set response value in AttRecordList attribute on component.
                component.set('v.AttRecordList', actionResult.getReturnValue());

//                var toastEvent = $A.get("e.force:showToast"); 
//                var toastMessage = j + " record(s) have attended or cancelled, " + k + " records still to update";
//                toastEvent.setParams({
//                    "title": "Info!",
//                    "message": toastMessage
//                });
//                toastEvent.fire();
                

            }
        });
        $A.enqueueAction(action);
    },
    
    delAttendee: function(component, event, AttName) {
        // Pass the Attendee record to the APEX controller that should be deleted        
        
        var action = component.get('c.delAttendance');
        
        action.setParams({
            "parentClassID": component.get("v.recordId"),
            "attendeeName": AttName  // Need to check to see that this is the right attendee
        });
        

        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === 'SUCCESS') {
                //set response value in AttRecordList attribute on component.
                component.set('v.AttRecordList', actionResult.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
        // Fire event to make the other component refresh the list
        var appEvent = $A.get("e.c:aeEvent");        
        appEvent.setParam("SourceComponent", "listAttendance");
        appEvent.fire();
    },
    
    AttendedYes: function(component, event, AttName) {
        // Pass the Attendee record to the APEX controller so the attendance status is set to "Attended"        
        
        var action = component.get('c.updAttendance');
        
        action.setParams({
            "parentClassID": component.get("v.recordId"),
            "attendeeName": AttName, // Need to check to see that this is the right attendee
            "AttStatus" : "Attended"
        });
        
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === 'SUCCESS') {
                //set value of Attendance status on the record to be "Attended"
                component.set('v.AttRecordList', actionResult.getReturnValue());
            }
        });
        $A.enqueueAction(action);
               
    },
    
    AttendedNo: function(component, event, AttName) {
        // Pass the Attendee record to the APEX controller so the attendance status is set to "Cancelled"        
        
        var action = component.get('c.updAttendance');
        
        action.setParams({
            "parentClassID": component.get("v.recordId"),
            "attendeeName": AttName, // Need to check to see that this is the right attendee
            "AttStatus" : "Cancelled"
        });
        
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === 'SUCCESS') {
                //set response value in AttRecordList attribute on component.
                component.set('v.AttRecordList', actionResult.getReturnValue());
            }
        });
        $A.enqueueAction(action);
               
    },
    

})