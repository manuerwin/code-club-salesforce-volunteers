({
      doInit: function(component, event, helper) {
        // call the helper function on component load
        helper.getAttRecords(component, event);        
    },
    delAttendee: function(component, event, helper) {
        // call the helper function to delete the attendee record
        var selectedItem = event.currentTarget; // Get the target object
        var AttName = selectedItem.value; // Get its value i.e. the index
        
        helper.delAttendee(component, event, AttName);        
    },
    AttendYes: function(component, event, helper) {
        // call the helper function on component load
        var selectedItem = event.currentTarget; // Get the target object
        var AttName = selectedItem.value; // Get its value i.e. the index
        
        helper.AttendedYes(component, event, AttName);        
    },
    AttendNo: function(component, event, helper) {
        // call the helper function on component load
        var selectedItem = event.currentTarget; // Get the target object
        var AttName = selectedItem.value; // Get its value i.e. the index
         
        helper.AttendedNo(component, event, AttName);        
    },

})