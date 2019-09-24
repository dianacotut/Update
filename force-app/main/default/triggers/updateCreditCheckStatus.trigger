trigger updateCreditCheckStatus on Case (after insert) {
    if(Trigger.isAfter && Trigger.isInsert) {
        List<Id> accountsIds = new List<Id>();
        for(Case caseRecord : Trigger.New) {
            accountsIds.add(caseRecord.AccountId);
        }
        Map<ID, Account> accounts = new Map<Id, Account>([SELECT Id, Credit_Check_Status__c FROM Account WHERE ID IN :accountsIds]);
        List<Account> accountsToUpdate = new List<Account>();
        for(Case caseRecord : Trigger.New) {
            Account parentAccount = accounts.get(caseRecord.AccountId);
            parentAccount.Credit_Check_Status__c = caseRecord.Credit_Check_Status__c;
            accountsToUpdate.add(parentAccount);
        }
        update accountsToUpdate;
    }
}