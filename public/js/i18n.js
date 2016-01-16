var option = {
    lng: 'pt',
    lngWhitelist: ['pt', 'en'],
    //detectLngQS: 'lang',
    cookieName: 'lang',
    fallbackLng: ['pt'],
    resGetPath: 'locales/__lng__.json'
    //dynamicLoad: true
};

i18n.init(option, function(err, t) {
    // translate html
    $("html").i18n();
    // programatical access
    console.log(t("lang.current"));
});