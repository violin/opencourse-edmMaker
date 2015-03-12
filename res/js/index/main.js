/**
 * edm model
 */

(function(jq) {

	function cbGetEdm(data) {
	    if(!!data && data.result == 1){
	        edm.set(data.data);
	    }else{
	        alert('该直邮不存在');

	        edm.set(NEW_ITEM_DEFAULT);
	    }
	}

	if (!!window.fn && window.fn != '') {
		jq.get('/edm/get', {
            fn : window.fn
        }, cbGetEdm);
	}else{
		edm.set(NEW_ITEM_DEFAULT);
	}

})($);
