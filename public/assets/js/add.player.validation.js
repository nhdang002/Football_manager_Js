jQuery(function(){
    jQuery('#txtDOB').datetimepicker({
        format: 'd/m/Y',
        timepicker: false,
        mask: true,
    });
    jQuery('#quocTich').countrySelect({
        defaultStyling:"inside"
    });
})