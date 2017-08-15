public with sharing class listAttendanceAPEXController {
    
    @AuraEnabled
    public Static List<sObject> reQuery ( ID parentClassID ) {
                return [SELECT Id, Name, Role__c, Attendance_Status__c, Contact__r.ID,
                Contact__r.Name, Contact__r.Full_Name__c, Contact__r.Firstname, Contact__r.Lastname,
                	Notification_email_copy__c,DisableButtons__c FROM Attendance__c
               where Class__c = :parentClassID
                Order by Role__c DESC
               ];
    }
        
    
    @AuraEnabled
    public static List<sObject> getAttendances( ID parentClassID ) {
        system.debug('Passed in - parentClassID: ' + parentClassID );
        
        return reQuery (parentClassID);
    }
    
    @AuraEnabled
    public Static List<sObject> delAttendance (ID parentClassID, String attendeeName) {
        
        System.debug('Attendee record name passed in to delAttendance APEX Class: ' + attendeeName);
        
        try {
            delete [select id from Attendance__c Where Name = :attendeeName]; 
        } catch(DmlException e) {
            System.debug('An unexpected error has occurred: ' + e.getMessage());
        }
        
        system.debug('Refreshing attendance list for - parentClassID: ' + parentClassID );
        // Return the updated list of attendees on this class
        return reQuery (parentClassID);


    }
    
        @AuraEnabled
    public Static List<sObject> updAttendance (ID parentClassID, String attendeeName, String AttStatus) {
        Attendance__c Att = [SELECT Id, Attendance_Status__c FROM Attendance__c
               where Name = :attendeeName ];
        
        System.debug('Name passed in to updAttendance APEX Class: ' + attendeeName + ' status = ' + AttStatus);
        Att.Attendance_Status__c = AttStatus;
        
        try {
            update att;
        } catch(DmlException e) {
            System.debug('An unexpected error has occurred: ' + e.getMessage());
        }
        return reQuery (parentClassID);
    }
    

}