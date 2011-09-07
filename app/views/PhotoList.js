sencha_hdc.overlay = new Ext.Panel({
    // We'll set the image src attribute's value programmatically.
    tpl: "<tpl for='.'><div class='gram-container'><img id='current-gram'/></div></tpl>",
    floating: true,
    modal: true,
    centered: true,
    width: 300,
    height: 300,
    styleHtmlContent: true,
    scroll: false,
    cls: 'htmlcontent',
    // Loadmask is true so we see the loading animation.
    loadmask: true
});
 
// This is the list item inside in the main list.  It is created for every record in the model, or simply
// each item in the array returned from the Instagram API.
sencha_hdc.views.PhotoInnerList = Ext.extend(Ext.List, {
    itemTpl: sencha_hdc.views.photoCellTemplate(),

    // The class name associated with each InnerList item.  We can style using this as the root CSS class for
    // all styles inside the InnerList items.
    itemCls: 'photoCell',

    // Here's where we add the pull to refresh plugin.  Yep, that's all you need to do. =)
    plugins: [{
        ptype: 'pullrefresh'
    }],

    // Bind our listeners to the each InnerList item.
    // On itemtap, we grab the current record so we can create the full size image overlay.
    // We added a loading animation while the image is downloaded so the user knows what's going on.
    listeners: {
        itemtap: function (list, index, element, event) {
            // Grab a reference the record.
            var record = list.getRecord(element);

			// First, we update the the overlay with the proper record (data binding).
            sencha_hdc.overlay.update(record.data);

            // Next we show the overlay.
            sencha_hdc.overlay.show({type: 'fade', duration: 400})
            
            // Show the loading indicator.
            sencha_hdc.overlay.setLoading(true); 
            
            // Now, we grab a reference to the img element.
            var img = document.getElementById('current-gram');
            // Set the src value to the standard_res_url
            img.src = record.data.standard_res_url;
            
            // After this has loaded, let's hide the loading animation.
            img.onload = function()
            {
              sencha_hdc.overlay.setLoading(false);
            }
        }
    }

});

sencha_hdc.views.photoInnerList = new sencha_hdc.views.PhotoInnerList({
           store: null
       });

// Main Panel component.
// This panel contains a docked toolbar at the top and then its items are all instances 
// of the PhotoInnerList component defined above.
sencha_hdc.views.PhotoList = Ext.extend(Ext.Panel, {
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Omaha Photos'        
    }],
    items: [
        // The PhotoLists is made up of a collection of PhotoInnerLists, defined above.
        sencha_hdc.views.photoInnerList
    ]
});