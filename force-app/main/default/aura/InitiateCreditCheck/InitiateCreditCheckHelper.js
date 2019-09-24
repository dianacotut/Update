({
	saveCase_Rec : function(component, params) {

        console.log(params.get('accountId'));
        var action = component.get("c.createCase");
        action.setParams({
            accountId : params.get('accountId'),
            creditCheckStatus : params.get('creditCheckStatus')
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("From Server: " + response.getReturnValue());
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
	}
})