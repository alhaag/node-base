$(document).ready(function () {
  //https://github.com/patosai/tree-multiselect.js
  var options = {
    //sortable: true,
    hideSidePanel: true
  };
  $("select#acl").treeMultiselect(options);
});
