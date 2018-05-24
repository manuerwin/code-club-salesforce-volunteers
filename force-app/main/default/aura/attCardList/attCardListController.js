({
    doInit : function(component, event, helper) {
        // Retrieve attendees during component initialization
        helper.loadAttendees(component);
    },
    
    handleSelect : function(component, event, helper) {
        var attendees = component.get("v.attendees");
        var attList = component.get("v.attList");
        
        //Get the selected option: "Student", "Assistant", or "All"
        var selected = event.getSource().get("v.value");
        
        var filter = [];
        if (selected != "All"){
            var j=0;
            for (var i=0; i<attList.length; i++){
                var c = attList[i];
                if(c.Role__c == selected) {
                    filter[j] = c; 
                    j=j+1;
                }
            }
        }
        else {
            filter = attList;
        }       
        
        //Set the filtered list of contacts based on the selected option
        component.set("v.attendees", filter);

        helper.updateTotal(component);
    }
})