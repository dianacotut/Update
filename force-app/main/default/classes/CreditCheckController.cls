public with sharing class CreditCheckController {
    @AuraEnabled
    public static Case createCase(String accountId, String creditCheckStatus){
        Case newCase = new Case();
        newCase.Status = 'New';
        newCase.AccountId = accountId;
        newCase.Credit_Check_Status__c = creditCheckStatus;
        insert newCase;
        return newCase;
    }
}
