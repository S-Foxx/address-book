(function () {
  'use strict';

  angular.module('abApp', [])
    .controller('MainCtrl', ['$http', '$sce', function ($http, $sce) {
      var vm = this;
      vm.view = 'table';
      vm.searchText = '';
      vm.countryFilter = '';
      vm.contacts = [];
      vm.countries = [];
      vm.error = '';

      // Search + filter predicate (single, dumb function)
      vm.predicate = function (item) {
        // country filter
        if (vm.countryFilter && item.Country !== vm.countryFilter) return false;

        // text search across a few fields
        var q = (vm.searchText || '').toLowerCase().trim();
        if (!q) return true;

        var hay = [
          item.CompanyName, item.ContactName, item.ContactTitle,
          item.City, item.Country, item.Email, item.Phone,
          item.CustomerID, item.Address, item.PostalCode, item.Region
        ].filter(Boolean).join(' ').toLowerCase();

        return hay.indexOf(q) !== -1;
      };

      // Load ab.xml via AJAX, parse to array of objects
      $http.get('ab.xml', { responseType: 'text' })
        .then(function (res) {
          var text = res.data || '';
          var parser = new DOMParser();
          var xml = parser.parseFromString(text, 'application/xml');

          // Basic XML error check
          var parseErr = xml.getElementsByTagName('parsererror')[0];
          if (parseErr) {
            vm.error = 'Failed to parse ab.xml';
            return;
          }

          var nodes = xml.getElementsByTagName('Contact');
          var list = [];
          for (var i = 0; i < nodes.length; i++) {
            var c = nodes[i];
            list.push({
              CustomerID: txt(c, 'CustomerID'),
              CompanyName: txt(c, 'CompanyName'),
              ContactName: txt(c, 'ContactName'),
              ContactTitle: txt(c, 'ContactTitle'),
              Address: txt(c, 'Address'),
              City: txt(c, 'City'),
              Region: txt(c, 'Region'),
              PostalCode: txt(c, 'PostalCode'),
              Country: txt(c, 'Country'),
              Email: txt(c, 'Email'),
              Phone: txt(c, 'Phone'),
              Fax: txt(c, 'Fax')
            });
          }
          vm.contacts = list;

          // Build unique sorted country list for dropdown
          var set = {};
          list.forEach(function (x) { if (x.Country) set[x.Country] = true; });
          vm.countries = Object.keys(set).sort();
        })
        .catch(function (err) {
          vm.error = 'Could not load ab.xml (did you run a local web server?)';
        });

      function txt(node, tag) {
        var el = node.getElementsByTagName(tag)[0];
        return el ? (el.textContent || '').trim() : '';
      }
    }]);
})();
