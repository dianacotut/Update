({
    saveCase_Rec: function(component, event, helper) {
        console.log('reaches here');

        var recordId = component.get('v.recordId');
 
        var creditCheckStatus = component.find('creditCheckStatus').get('v.value');
 
        var action = component.get("c.createCase");
        action.setParams({
            accountId : recordId,
            creditCheckStatus : creditCheckStatus
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
  
                $A.get('e.force:closeQuickAction').fire();
                $A.get('e.force:refreshView').fire();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been updated successfully."
                });
                toastEvent.fire(); 
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    handleCancel: function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    }
})