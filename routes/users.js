var express = require('express');
var router = express.Router();
var acl = [];

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        // do something
    } else {
        next();
    }
    res.send('editar usuario ' + id);
});

/* GET users listing. */
router.get('/', function (req, res, next) {

  var rules = {
    "id": "app", "label": "Privilégios", "children": [
      {
        "id": "users", "label": "Usuários", "children": [
          {
            "id": "admin",  "label": "Administrar", "isRule": true, "children": [
              {
                "id": "teste", "label": "Específica", "isRule": true
              }
            ]
          }
        ]
      },
      {
        "id": "news", "label": "Notícias", "children": [
          {
            "id": "create", "label": "Criar", "isRule": true
          },
          {
            "id":"edit", "label": "Editar", "isRule": true
          },
          {
            "id":"delete", "label": "Excluir", "isRule": true
          }
        ]
      }
    ]
  };

  parseRules(rules);

  console.log(acl);


  res.render('users', {title: 'Usuários', acl: acl});
});

function parseRules(obj, idResult, hierarchyResult) {
  idResult = idResult || "";
  hierarchyResult = hierarchyResult || "";
  if (obj instanceof Array) {
    obj.forEach(function(key) {
      parseRules(key, idResult, hierarchyResult); // recursive call
    });
  } else {
    Object.keys(obj).forEach(function(key) {
      if (key === 'id') {
        idResult+= (idResult === "") ? obj[key] :"_" + obj[key];
      } else if (key === 'label') {
        hierarchyResult+= (hierarchyResult === "") ? obj[key] : "/" + obj[key];
      }
    });
    if(obj.hasOwnProperty("children")) {
      parseRules(obj.children, idResult, hierarchyResult); // recursive call
    }
    if (obj.hasOwnProperty("isRule") && obj.isRule === true) {
      // {id: "app_users_editar", hierarchy: "/App/Usuários", label: "Editar"}
      acl.push({id: idResult, allow: false, hierarchy: hierarchyResult.replace(/[^\/]*$/, '').replace(/\/$/, ""), label: hierarchyResult.replace(/^.*[\\\/]/, '')});
    }
  }
}

module.exports = router;
