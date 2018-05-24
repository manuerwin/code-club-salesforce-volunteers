public class addChildController {
    @AuraEnabled
    public static List<contact> getContacts(String ParentId, String ContactType) {
        // This method receives a Class Id and Contact type (i.e. Student or staff)
        // and returns a list of that type of contacts not already on the class passed in
        system.debug('Passed in - ParentID: ' + ParentId + ' ContactType: ' + ContactType);
        List<contact> totalList = new List<contact>();
        for(Contact cc : [SELECT id,Full_Name__c,Registration_Status__c from contact 
                          where Contact_Type__c = :ContactType
                         and Registration_Status__c != 'Withdrawn'
                         and id not in (Select Contact__c from Attendance__c
                                       where Class__c = :ParentId)
                          order by Full_Name__c]){
                              totalList.add(cc);
                          }	
        return totalList;
    }
    
    @AuraEnabled
    public static String addParentClass(String ParentId , List<String> lstOfContactIds, String Role){
		// This method receives the following parameters:
		// 	ParentID - the class to add attendees to
		// 	lstOfContactIds - the IDs of contacts to add to the class as attendees
		// 	Role - what role the the contacts shoiuld be added in (Student or Assistant) 
        String retMsg;
        System.debug('Entering  addChildController.apxc - addParentClass' );
        list<Attendance__c> lstAttendance = new list<Attendance__c>();
        for(string sContactId : lstOfContactIds){
            Attendance__c oAtt = new Attendance__c();
            oAtt.Contact__c = sContactId;
            oAtt.Class__c = ParentId;
            if (Role == 'Student') {
                oAtt.Role__c = 'Student';
            } else {
                oAtt.Role__c = 'Assistant';
            }
            oAtt.Attendance_Status__c = 'Enrolled';
            lstAttendance.add(oAtt);
        }
        try {
            insert lstAttendance;
            System.debug('Added ' + lstAttendance + ' to the Class' );
            retMsg = 'SUCCESS';
        } catch(DmlException e) {
            String errorMsg = e.getMessage();
            System.debug('An unexpected error has occurred: ' + errorMsg);
            // "Convert" the exception into an AuraHandledException
            if(errorMsg.contains('FIELD_CUSTOM_VALIDATION_EXCEPTION')){
                errorMsg = errorMsg.substringBetween('FIELD_CUSTOM_VALIDATION_EXCEPTION, ', ': ');
            }
            throw new AuraHandledException(errorMsg); //This more friendly message goes to the LEX component;
            retMsg = e.getMessage();
        }
        finally {
            // If anything should be executed whether there was an error or not

    }

        
        return retMsg;
    }
    
}