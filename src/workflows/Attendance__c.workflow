<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Assistant_3_day_warning</fullName>
        <description>Assistant - 3-day warning</description>
        <protected>false</protected>
        <recipients>
            <field>Notification_email_copy__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Code_Club/Assistant_upcoming_class_details</template>
    </alerts>
    <alerts>
        <fullName>Student_attended_post_class_summary</fullName>
        <description>Student (attended) - post class summary</description>
        <protected>false</protected>
        <recipients>
            <field>Notification_email_copy__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Code_Club/Student_post_Class_informer</template>
    </alerts>
    <alerts>
        <fullName>Student_attended_post_class_summary_ACTIVITYLOG</fullName>
        <ccEmails>emailtosalesforce@mn4m6ru52nzpzdkwlfffly2wmuqmsgqlvflbzdmr7e424q24i.7f-ypubuaa.ap5.le.salesforce.com</ccEmails>
        <description>Student (attended) - post class summary ACTIVITY LOG</description>
        <protected>false</protected>
        <senderType>CurrentUser</senderType>
        <template>Code_Club/Student_post_Class_ACTIVITYLOG</template>
    </alerts>
    <alerts>
        <fullName>Student_canceled_post_class_summary</fullName>
        <description>Student (canceled) - post class summary</description>
        <protected>false</protected>
        <recipients>
            <field>Notification_email_copy__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Code_Club/Student_canceled_post_Class_informer</template>
    </alerts>
    <alerts>
        <fullName>Student_canceled_post_class_summary_ACTIVITYLOG</fullName>
        <ccEmails>emailtosalesforce@mn4m6ru52nzpzdkwlfffly2wmuqmsgqlvflbzdmr7e424q24i.7f-ypubuaa.ap5.le.salesforce.com</ccEmails>
        <description>Student (canceled) - post class summary ACTIVITY LOG</description>
        <protected>false</protected>
        <senderType>CurrentUser</senderType>
        <template>Code_Club/Student_canceled_post_Class_informer_ACTIVITYLOG</template>
    </alerts>
    <alerts>
        <fullName>Student_upcoming_class_notice</fullName>
        <description>Student - upcoming class notice</description>
        <protected>false</protected>
        <recipients>
            <field>Notification_email_copy__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Code_Club/Student_class_reminder</template>
    </alerts>
    <alerts>
        <fullName>Student_upcoming_class_notice_ACTIVITYLOG</fullName>
        <ccEmails>emailtosalesforce@mn4m6ru52nzpzdkwlfffly2wmuqmsgqlvflbzdmr7e424q24i.7f-ypubuaa.ap5.le.salesforce.com</ccEmails>
        <description>Student - upcoming class notice ACTIVITY LOG</description>
        <protected>false</protected>
        <senderType>CurrentUser</senderType>
        <template>Code_Club/Student_class_reminder_ACTIVITYLOG</template>
    </alerts>
</Workflow>
