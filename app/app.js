var senncha_hdc = new Ext.Application({
    name: 'sencha_hdc',
    instagram_client_id: "75a6289409504c2ab38f54873d69d13c",
	instagram_tag: "omaha",
	onlineStore: new Ext.data.Store({
	   // We provide an id for the store so it's easy to debug.
       // You can pull it up in the console with
       // Ext.getStore('store_tp');
       id: 'store_tp',
       // State the model to which we want to be bound, namely, Photo (defined in models/Thoto.js)
       model: 'Photo',
       proxy: {
            // JSON-P FTW
            type: 'scripttag',
            // If you're offline, uncomment the two lines below
            // type: 'ajax',
            // url: 'app/models/data_from_instagram_api.json'
            url: 'https://api.instagram.com/v1/tags/omaha/media/recent?client_id=75a6289409504c2ab38f54873d69d13c',
            reader: {
                type: 'json',
                // The root of the JSON response from which we will iterate over is called "data".  
                // See an example of the JSON response in models/data_from_instagrams.json
                root: 'data'
            },
			timeout: 2000,
			listeners: {
			    exception:function () {
			        console.log("I think we are offline");
			        sencha_hdc.views.photoInnerList.bindStore(sencha_hdc.offlineStore);
			        sencha_hdc.offlineStore.load();
			    }
			}
       }
	}),
	offlineStore: new Ext.data.Store({
	    model: 'LocalPhoto',
	    proxy: {
	        type: 'localstorage',
	        id: 'sencha_hdc'
	    }
	}),
	launch: function() {
		this.views.viewport = new this.views.Viewport(); 
		
		this.onlineStore.addListener('load', function () {
			console.log("I think we are online");
			sencha_hdc.offlineStore.proxy.clear();
		    this.each(function (record) {
		        var photo = sencha_hdc.offlineStore.add(record.data)[0];
		    });
		    sencha_hdc.offlineStore.sync();
		    sencha_hdc.views.photoInnerList.bindStore(sencha_hdc.onlineStore);
		});
		this.onlineStore.load();
    }
});