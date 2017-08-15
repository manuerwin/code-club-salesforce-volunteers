<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Class_Leader_Email</fullName>
        <description>Class Leader Email</description>
        <protected>false</protected>
        <recipients>
            <field>Session_Leader_Email__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Code_Club/Leader_upcoming_class_details</template>
    </alerts>
    <alerts>
        <fullName>Leader_post_class_attendance_update_reminder</fullName>
        <description>Leader - post class attendance update reminder</description>
        <protected>false</protected>
        <recipients>
            <field>Session_Leader_Email__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Code_Club/Leader_post_class_update_reminder</template>
    </alerts>
</Workflow>
