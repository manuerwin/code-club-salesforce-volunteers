({
    
    loadAttendees : function(component, event) {
        // Load all attendee data
        var action = component.get('c.getAttendances');
        
        action.setParams({
            "parentClassID": component.get("v.recordId")
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.attendees", response.getReturnValue());
                component.set("v.attList", response.getReturnValue());
                this.updateTotal(component);
            }
            
            // Display toast message to indicate load status
            var toastEvent = $A.get("e.force:showToast");
            if (state === 'SUCCESS'){
            //    toastEvent.setParams({
            //        "title": "Success!",
            //        "message": " Your Attendees have been loaded successfully."
            //    });
            }
            else {
                toastEvent.setParams({
                    "title": "Error!",
                    "message": " Unable to retrieve Attendees for this Class."
                });
            }
            toastEvent.fire();
        });
        $A.enqueueAction(action);
    },
    
    updateTotal: function(component) {
        var attendees = component.get("v.attendees");
        component.set("v.totalAtts", attendees.length);

        
    },
})