Photo = Ext.regModel("Photo", {
    fields: [
        {name: "filter", type: "string"},
        {name: "link", type: "string"},
		{name: "created_time", type: "date", dateFormat: "timestamp"},
        {name: "username", type: "string", mapping: "user.username"},
        {name: "thumbnail_url", type: "string", mapping: "images.thumbnail.url"},
        {name: "low_res_url", type: "string", mapping: "images.low_resolution.url"},
        {name: "standard_res_url", type: "string", mapping: "images.standard_resolution.url"},
    ]
});

LocalPhoto = Ext.regModel("LocalPhoto", {
    fields: [
        {name: "filter", type: "string"},
        {name: "link", type: "string"},
		{name: "created_time", type: "date"},
        {name: "username", type: "string", mapping: "user.username"},
        {name: "thumbnail_url", type: "string", mapping: "images.thumbnail.url"},
        {name: "low_res_url", type: "string", mapping: "images.low_resolution.url"},
        {name: "standard_res_url", type: "string", mapping: "images.standard_resolution.url"},
    ]
});